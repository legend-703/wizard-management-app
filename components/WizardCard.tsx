'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Wizard } from '@/lib/server/mockWizards';

export default function WizardCard({ wizard }: { wizard: Wizard }) {
  const router = useRouter();

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': { boxShadow: 4, transform: 'translateY(-3px)' },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="h6">{wizard.name}</Typography>
          <Chip
            size="small"
            label={wizard.status.toUpperCase()}
            color={wizard.status === 'active' ? 'success' : 'default'}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {wizard.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => router.push(`/wizards/${wizard.id}`)}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
