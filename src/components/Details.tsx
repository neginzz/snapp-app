// src/components/Details.tsx

import { Box, Typography } from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";

interface DetailsProps {
  title: string;
  location: { lat: number; lng: number } | null;
  address: string;
  isSelected: boolean;
  onClick?: () => void;
}

const Details = ({
  title,
  location,
  address,
  isSelected,
  onClick,
}: DetailsProps) => (
  <Box
    onClick={onClick}
    sx={{
      mt: 2,
      p: { xs: 1, sm: 2 },
      backgroundColor: "rgba(240, 240, 240, 0.8)",
      borderRadius: 1,
      fontSize: { xs: "0.75rem", sm: "0.85rem" },
      border: isSelected ? "2px solid blue" : "2px solid transparent",
      cursor: "pointer",
      "&:hover": { border: "2px solid lightblue" },
      textAlign: "right",
    }}
  >
    <Typography variant="h6">
      تغییر {title}
      <AdsClickIcon fontSize="small" sx={{ ml: 1 }} />
    </Typography>

    <Typography>{address || "هنوز تنظیم نشده"}</Typography>

    {location ? (
      <>
        <Typography>
          <strong>lat:</strong> {location.lat}
        </Typography>
        <Typography>
          <strong>lng:</strong> {location.lng}
        </Typography>
      </>
    ) : (
      <Typography>اطلاعات موجود نیست</Typography>
    )}
  </Box>
);

export default Details;
