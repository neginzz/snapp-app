// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Vazirmatn, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2",
      dark:"#1565c0"
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default theme;
