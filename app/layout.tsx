'use client';

import React from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Box,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { WizardProvider, useWizardContext } from '../context/WizardContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    background: { default: '#f7f9fc' },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});


function Header() {
  const { history } = useWizardContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const completedCount = React.useMemo(() => {
    if (!Array.isArray(history)) return 0;
    return history.filter(
      (w) => w && typeof w === "object" && (w as { completed?: boolean }).completed
    ).length;
  }, [history]);

  return (
    <AppBar position="sticky" elevation={1} color="primary">
      <Toolbar>
        <MenuBookIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Wizard Management App
        </Typography>

        {mounted && (
          <Badge badgeContent={completedCount} color="secondary" showZero>
            <Typography variant="body1">Completed</Typography>
          </Badge>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WizardProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Box component="main" sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              {children}
            </Box>
          </ThemeProvider>
        </WizardProvider>
      </body>
    </html>
  );
}
