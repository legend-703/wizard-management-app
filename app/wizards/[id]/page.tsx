"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Chip,
  LinearProgress,
  Collapse,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import type { Wizard } from "@/lib/types";
import { useWizardContext } from "@/context/WizardContext";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableStepCard from "@/components/SortableStepCard";

export default function WizardDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [wizard, setWizard] = useState<Wizard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showExecution, setShowExecution] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [executedSteps, setExecutedSteps] = useState<boolean[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const {
    completeWizard,
    addHistory,
    updateHistory,
    setCurrentWizardId,
    setCurrentStepIndex,
  } = useWizardContext();

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (!id) return;
    let ignore = false;

    const fetchWizard = async () => {
      try {
        const res = await fetch(`/api/wizards/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Wizard not found");
        const data: Wizard = await res.json();

        if (ignore) return;
        setWizard(data);
        setExecutedSteps(Array(data.steps.length).fill(false));
        setCurrentWizardId(data.id);

        addHistory({
          id: data.id,
          name: data.name,
          completed: false,
          stepsCompleted: 0,
          totalSteps: data.steps.length,
          timestamp: new Date().getTime(),
        });
      } catch (err) {
        console.error("Failed to fetch wizard:", err);
        if (!ignore) setWizard(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchWizard();
    return () => {
      ignore = true;
      setCurrentWizardId(null);
    };
  }, [id]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setWizard((prev) => {
      if (!prev) return prev;
      const oldIndex = prev.steps.findIndex((s) => s.id === active.id);
      const newIndex = prev.steps.findIndex((s) => s.id === over.id);
      return { ...prev, steps: arrayMove(prev.steps, oldIndex, newIndex) };
    });
  };

  if (loading) return <LinearProgress sx={{ mt: 4 }} />;
  if (!wizard)
    return (
      <Box p={4}>
        <Typography color="error.main">Wizard not found</Typography>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => router.push("/wizards")}>
          ← Back to Wizards
        </Button>
      </Box>
    );

  const current = wizard.steps[currentStep];

  const handleNext = () => {
    if (currentStep < wizard.steps.length - 1) {
      const newIndex = currentStep + 1;
      setCurrentStep(newIndex);
      setCurrentStepIndex(newIndex);
    } else {
      completeWizard(wizard.id);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const newIndex = currentStep - 1;
      setCurrentStep(newIndex);
      setCurrentStepIndex(newIndex);
    }
  };

  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      const data = await res.json();
      console.log(data)
      if (data.success && data.content) {
        // Update email body field for current step
        setWizard((prev) => {
          if (!prev) return prev;
          const updatedSteps = [...prev.steps];
          updatedSteps[currentStep] = {
            ...updatedSteps[currentStep],
            config: {
              ...updatedSteps[currentStep].config,
              body: data.content,
            },
          };
          return { ...prev, steps: updatedSteps };
        });
      }
    } catch (error) {
      console.error("AI generation failed:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Button variant="outlined" onClick={() => router.push("/wizards")} sx={{ mb: 2 }}>
        ← Back to Wizards
      </Button>

      <Typography sx={{ marginTop: "20px" }} variant="h4" gutterBottom>
        {wizard.name}
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={2}>
        {wizard.description}
      </Typography>

      <Chip
        label={wizard.status.toUpperCase()}
        color={wizard.status === "active" ? "success" : "default"}
        sx={{ mb: 3 }}
      />

      <Typography variant="h6" gutterBottom>
        Steps
      </Typography>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={wizard.steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <Stack spacing={1}>
            {wizard.steps.map((step, index) => (
              <SortableStepCard
                key={step.id}
                step={step}
                index={index}
                currentStep={currentStep}
                executedSteps={executedSteps}
                showExecution={showExecution}
              />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>

      <Box mt={4}>
        <Button variant="contained" onClick={() => setShowExecution((p) => !p)}>
          {showExecution ? "Hide Execution Panel" : "Execute Wizard"}
        </Button>
      </Box>

      <Collapse in={showExecution} timeout="auto" unmountOnExit>
        <Card sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6">
            Step {currentStep + 1} of {wizard.steps.length}
          </Typography>
          <Typography variant="subtitle1" mt={1}>
            {current.title}
          </Typography>
          <Typography variant="body2" mb={2}>
            {current.description}
          </Typography>

          {current.type === "email" && (
            <Stack spacing={2} mb={2}>
              <TextField label="To" value={current.config?.to ?? ""} fullWidth disabled />
              <TextField label="Subject" value={current.config?.subject ?? ""} fullWidth disabled />
              <TextField
                label="Body"
                value={current.config?.body ?? ""}
                multiline
                rows={4}
                fullWidth
                disabled
              />

              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  label="Describe what the email should say"
                  fullWidth
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{minHeight: '61px'}}
                  onClick={handleAskAI}
                  disabled={aiLoading || !aiPrompt.trim()}
                >
                  {aiLoading ? <CircularProgress size={20} /> : "Ask AI"}
                </Button>
              </Box>
            </Stack>
          )}

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              onClick={() =>
                setExecutedSteps((prev) => {
                  const next = [...prev];
                  next[currentStep] = true;
                  updateHistory(wizard.id, { stepsCompleted: next.filter(Boolean).length });
                  return next;
                })
              }
            >
              Execute Step
            </Button>

            <Button variant="outlined" onClick={handlePrev} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button variant="contained" onClick={handleNext} disabled={!executedSteps[currentStep]}>
              {currentStep < wizard.steps.length - 1 ? "Next Step" : "Finish"}
            </Button>
          </Stack>

          {executedSteps.every(Boolean) && (
            <Typography color="success.main" mt={3} fontWeight={600}>
              🎉 All steps completed successfully!
            </Typography>
          )}
        </Card>
      </Collapse>
    </Box>
  );
}