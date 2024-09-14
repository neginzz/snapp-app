// src/pages/DirectionPage.tsx

import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BackButton from "../components/BackButton";
import DirectionMap from "../components/DirectionMap";
import { useLocation } from "../context/LocationContext";

function DirectionPage() {
  const { origin, destination } = useLocation(); // context
  const navigate = useNavigate();
  const theme = useTheme();
  const handleNavigateToDriver = () => {
    navigate("/loading");
  };

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      {/* Back Button */}
      <Box sx={{ position: "absolute", top: "20px", left: "30px", zIndex: 15 }}>
        <BackButton targetPath="/" text="ویرایش مکان ها" />
      </Box>

      {/* Direction Map */}
      {origin && destination && (
        <DirectionMap origin={origin} destination={destination} />
      )}

      {/* Button to driver */}
      <Box
        sx={{
          position: "absolute",
          bottom: "24px",
          right: "50%",
          transform: "translateX(50%)",
          width: { xs: "90%", sm: "70%", md: "50%" },
          zIndex: 10,
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={handleNavigateToDriver}
          endIcon={<NavigateNextIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          درخواست اسنپ
        </Button>
      </Box>
    </Box>
  );
}

export default DirectionPage;
