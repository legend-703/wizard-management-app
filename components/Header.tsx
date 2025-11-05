'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  return (
    <AppBar position="sticky" color="primary" sx={{ mb: 2 }}>
      <Toolbar>
        {onToggleSidebar && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={onToggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap>
          ⚙️ Wizard Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
