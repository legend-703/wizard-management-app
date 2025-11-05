'use client';

import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

export default function Sidebar({ open, onClose }: { open: boolean; onClose?: () => void }) {
  const router = useRouter();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'All Wizards', path: '/wizards' },
    { label: 'History', path: '/history' },
  ];

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': { width: drawerWidth },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => {
              router.push(item.path);
              if (onClose) onClose();
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
