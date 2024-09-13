// src/pages/SearchPage.tsx
import { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/driver");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <CircularProgress size={60} thickness={4} sx={{ color: "#fff", mb: 3 }} />
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        ...در حال جستجوی راننده
      </Typography>
      <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
        لطفا منتظر بمانید، در حال پیدا کردن نزدیک‌ترین راننده هستیم
      </Typography>
    </Box>
  );
};

export default LoadingPage;
