// src/components/BackButton.tsx

import React from "react";
import { Button, useTheme } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  targetPath: string;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ targetPath, text }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleBackClick = () => {
    navigate(targetPath);
  };

  return (
    <Button
      variant="outlined"
      startIcon={<NavigateBeforeIcon />}
      onClick={handleBackClick}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      {text}
    </Button>
  );
};

export default BackButton;
