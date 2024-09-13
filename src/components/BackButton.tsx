// src/components/BackButton.tsx

import React from "react";
import { Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  targetPath: string;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ targetPath, text }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(targetPath);
  };

  return (
    <Button
      variant="outlined"
      startIcon={<NavigateBeforeIcon />}
      onClick={handleBackClick}
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#1565c0",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default BackButton;
