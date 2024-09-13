import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import DriverCard from "../components/DriverCard";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { persianDrivers } from "../assets/drivers";
import DirectionMap from "../components/DirectionMap";
import { useLocation } from "../context/LocationContext";

const DriverPage: React.FC = () => {
  const navigate = useNavigate();
  const { origin, destination, setOrigin, setDestination } = useLocation();
  const [selectedDriver, setSelectedDriver] = useState(persianDrivers[0]);

  // Select a random driver
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * persianDrivers.length);
    setSelectedDriver(persianDrivers[randomIndex]);
  }, []);

  // reset origin and destination and navigate to SearchLocPage
  const handleEndRide = () => {
    setOrigin(null);
    setDestination(null);
    navigate("/");
  };

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      {/* Back Button */}
      <Box sx={{ position: "absolute", top: "10px", left: "30px", zIndex: 15 }}>
        <BackButton targetPath={"/directions"} text="بازگشت" />
      </Box>

      {/* Map component */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {origin && destination && (
          <DirectionMap
            origin={origin}
            destination={destination}
            showTaxis={false}
          />
        )}
      </Box>

      {/* DriverCard and Button */}
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "10px",
          right: "10px",
          zIndex: 10,
          margin: "auto",
          width: {
            xs: "90%",
            sm: "90%",
            md: "70%",
            lg: "70%",
            xl: "70%",
          },
        }}
      >
        {selectedDriver && <DriverCard driver={selectedDriver} />}
        <Button
          variant="contained"
          onClick={handleEndRide}
          fullWidth
          sx={{ mt: 2 }}
        >
          پایان سفر
        </Button>
      </Box>
    </Box>
  );
};

export default DriverPage;
