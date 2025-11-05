'use client';

import React from 'react';
import { Grid, Typography } from '@mui/material';
import WizardCard from './WizardCard';
import { Wizard } from '@/lib/server/mockWizards';

export default function WizardList({ wizards }: { wizards: Wizard[] }) {
  if (!wizards.length)
    return (
      <Typography variant="body1" color="text.secondary">
        No wizards available.
      </Typography>
    );

  return (
    <Grid container spacing={2}>
      {wizards.map((wizard) => (
        <Grid key={wizard.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <WizardCard wizard={wizard} />
        </Grid>
      ))}
    </Grid>
  );
}
