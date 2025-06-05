'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#202437'
    },
    secondary: {
      main: '#394060',
    },
    info: {
      main: '#2F429C',
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          fontSize: 12,
          backgroundColor: '#394060',
          color: '#fff',
          "& .MuiListItemIcon-root": {
            color: "inherit",
          },
          "& .MuiDivider-root": {
            backgroundColor: "currentColor",
            opacity: 0.3
          }
        }
      }
    },
  }
});

export const userTheme = createTheme({
  palette: {
    primary: {
      main: '#041970'
    },
    secondary: {
      main: '#212D64',
    },
    info: {
      main: '#2F429C',
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          fontSize: 12,
          backgroundColor: '#202437',
          color: '#fff',
          "& .MuiListItemIcon-root": {
            color: "inherit",
          },
          "& .MuiDivider-root": {
            backgroundColor: "currentColor",
            opacity: 0.3
          }
        }
      }
    },
  }
});

