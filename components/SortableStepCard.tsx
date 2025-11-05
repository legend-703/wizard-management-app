import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { WizardStep } from "@/lib/types"; // adjust import path
import { stepTypeMeta } from "@/lib/constants/stepTypeMeta";

interface SortableStepCardProps {
  step: WizardStep;
  index: number;
  currentStep: number;
  executedSteps: boolean[];
  showExecution: boolean;
}

export default function SortableStepCard({
  step,
  index,
  currentStep,
  executedSteps,
  showExecution,
}: SortableStepCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.6 : 1,
  };

  const { icon: Icon, color } = stepTypeMeta[step.type] || stepTypeMeta.default;

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      variant="outlined"
      sx={{
        ...style,
        borderWidth: index === currentStep && showExecution ? 2 : 1,
        borderColor:
          index === currentStep && showExecution ? "primary.main" : "divider",
        boxShadow:
          executedSteps[index] && showExecution
            ? "0 0 8px rgba(76,175,80,0.5)"
            : "none",
        transition: "all 0.2s ease-in-out",
        bgcolor: "background.paper",
        "&:hover": {
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Box display="flex" sx={{marginTop: '0px'}} alignItems="center" gap={1} mb={0.5}>
          <Icon sx={{ color, fontSize: 22 }} />
          <Typography variant="subtitle1" fontWeight={600}>
            {step.title}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={1}>
          {step.description}
        </Typography>

        <Chip
          label={step.type.toUpperCase()}
          size="small"
          sx={{
            backgroundColor: `${color}22`,
            color,
            fontWeight: 600,
            fontSize: "0.7rem",
            padding: '4px'
          }}
        />
      </CardContent>
    </Card>
  );
}
