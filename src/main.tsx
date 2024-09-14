import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { LocationProvider } from "./context/LocationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LocationProvider>
  </StrictMode>
);
