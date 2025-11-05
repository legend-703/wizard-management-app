"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Chip,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { Wizard } from "@/lib/server/mockWizards";
import WizardsSkeleton from "@/components/WizardsSkeleton";

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function WizardsPage() {
  const [wizards, setWizards] = useState<Wizard[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const fetchWizards = async () => {
      try {
        const res = await fetch("/api/wizards");
        if (!res.ok) throw new Error("Failed to fetch wizards");
        const data = await res.json();
        setWizards(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWizards();
  }, []);

  // Filter + Sort + Paginate
  const filtered = useMemo(() => {
    const list = wizards.filter((w) => {
      const matchesSearch = w.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesStatus = statusFilter === "all" || w.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sorting logic
    list.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "steps":
          return b.steps.length - a.steps.length;
        case "date":
        default:
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
      }
    });

    return list;
  }, [debouncedSearch, statusFilter, sortBy, wizards]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box p={{ xs: 1, sm: 3, md: 4, lg: 5 }}>
      <Box display="flex" sx={{marginBottom: '20px'}} justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>
          Wizards List
        </Typography>

        {/* Filters */}
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <TextField
            label="Search by name"
            variant="outlined"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            sx={{
              height: 48,
              minWidth: 250,
              "& .MuiInputBase-root": { height: 48 },
              "& .MuiInputLabel-root": { top: -4 },
            }}
          />

          <FormControl
            sx={{
              minWidth: 175,
              height: 48,
              "& .MuiInputBase-root": { height: 48 },
              "& .MuiInputLabel-root": { top: -4 },
            }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{
              minWidth: 175,
              height: 48,
              "& .MuiInputBase-root": { height: 48 },
              "& .MuiInputLabel-root": { top: -4 },
            }}
          >
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="date">Date Created</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="steps">Step Count</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {wizards.length === 0 ? (
        <WizardsSkeleton />
      ) : (
        <Grid container spacing={2}>
          {paginated.map((wizard) => (
            <Grid key={wizard.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {wizard.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5 }}
                  >
                    {wizard.shortDescription}
                  </Typography>

                  <Box
                    mt={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Chip
                      label={wizard.status.toUpperCase()}
                      color={wizard.status === "active" ? "success" : "default"}
                      size="small"
                      sx={{
                        "& .MuiChip-label": {
                          fontSize: "0.75rem",
                          px: 1,
                        },
                      }}
                    />
                    <Typography
                      sx={{ fontSize: "0.8rem" }}
                      variant="caption"
                      color="text.secondary"
                    >
                      {new Date(wizard.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Typography variant="body2" mt={1}>
                    Steps: {wizard.steps.length}
                  </Typography>
                </CardContent>

                <Box px={2} pb={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    href={`/wizards/${wizard.id}`}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {filtered.length === 0 && (
        <Typography variant="body1" color="text.secondary" mt={3}>
          No wizards found.
        </Typography>
      )}

      {filtered.length > itemsPerPage && (
        <Stack alignItems="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
}
