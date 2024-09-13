// src/pages/SearchLocPage.tsx

import { Box, Button, Alert } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import SearchBox from "../components/SearchBox";
import Details from "../components/Details";
import { useEffect, useState } from "react";
import { useLocation } from "../context/LocationContext";

function SearchLocPage() {
  const { origin, destination, setOrigin, setDestination } = useLocation(); //Context
  const [searchTarget, setSearchTarget] = useState<"origin" | "destination">(
    "destination"
  );
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  // User's current loc
  useEffect(() => {
    if (!origin && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Current loc
          setOrigin({ lat: latitude, lng: longitude, address: "موقعیت فعلی" });
        },
        () => {
          // Default to Tehran
          setOrigin({ lat: 35.6892, lng: 51.389, address: "تهران (پیشفرض)" });
        }
      );
    }
  }, [origin, setOrigin]);

  const handleNavigateToDirections = () => {
    if (!origin || !destination) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      navigate("/directions");
    }
  };

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      {/* Map component */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {origin && (
          <MapComponent
            origin={origin}
            destination={destination}
            onMarkerDragEnd={(type, lat, lng) => {
              if (type === "origin") {
                setOrigin({ lat, lng, address: "تغییر مارکر مبدا" });
              } else {
                setDestination({ lat, lng, address: "تغییر مارکر مقصد" });
              }
            }}
            searchTarget={searchTarget}
          />
        )}
      </Box>

      {/* search box */}
      <Box
        sx={{
          position: "absolute",
          bottom: "80px",
          right: "50%",
          transform: "translateX(50%)",
          width: { xs: "90%", sm: "70%", md: "50%" },
          backgroundColor: "#ffffff",
          borderRadius: 1,
          padding: 2,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
        }}
      >
        <SearchBox
          onSearchSelect={(location, address) => {
            if (searchTarget === "origin") {
              setOrigin({ ...location, address });
            } else {
              setDestination({ ...location, address });
            }
          }}
          label={
            searchTarget === "destination"
              ? "مقصد را وارد کنید"
              : "مبدا را وارد کنید"
          }
        />
      </Box>

      {/* Button to direction */}
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
          onClick={handleNavigateToDirections}
          endIcon={<NavigateNextIcon />}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          مسیریابی
        </Button>
      </Box>

      {/* Alert when searchbox not set */}
      {showAlert && (
        <Alert
          severity="info"
          dir="RTL"
          sx={{
            position: "absolute",
            bottom: "160px",
            right: "50%",
            transform: "translateX(50%)",
            width: { xs: "90%", sm: "70%", md: "50%" },
            zIndex: 10,
          }}
        >
          مبدا و مقصد خود را مشخص کنید
        </Alert>
      )}

      {/* Details boxes */}
      <Box
        sx={{
          position: "absolute",
          top: "24px",
          right: "10px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1, sm: 2 },
          textAlign: "right",
        }}
      >
        <Details
          title="مبدا"
          location={origin}
          address={origin?.address ?? ""}
          isSelected={searchTarget === "origin"}
          onClick={() => setSearchTarget("origin")}
        />
        <Details
          title="مقصد"
          location={destination}
          address={destination?.address ?? "هنوز تنظیم نشده"}
          isSelected={searchTarget === "destination"}
          onClick={() => setSearchTarget("destination")}
        />
      </Box>
    </Box>
  );
}

export default SearchLocPage;
