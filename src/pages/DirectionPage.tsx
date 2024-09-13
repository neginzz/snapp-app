// src/pages/DirectionPage.tsx

import { Box, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BackButton from "../components/BackButton";
import DirectionMap from "../components/DirectionMap";
import { useLocation } from "../context/LocationContext";

function DirectionPage() {
  const { origin, destination } = useLocation(); // context
  const navigate = useNavigate();

  const handleNavigateToDriver = () => {
    navigate("/loading");
  };

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      {/* Back Button */}
      <Box sx={{ position: "absolute", top: "10px", left: "30px", zIndex: 15 }}>
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
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
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
