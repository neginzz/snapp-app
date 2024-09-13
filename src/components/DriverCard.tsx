// src/components/DriverCard.tsx

import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";

interface DriverCardProps {
  driver: {
    name: string;
    pic: string;
    model: string;
    license: string;
  };
}

const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  return (
    <Card
      sx={{
        display: "flex",
        padding: "10px",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px 0",
        bgcolor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <CardContent sx={{ textAlign: "right" }}>
        <Typography variant="h6">{driver.name}</Typography>
        <Typography variant="subtitle1">خودرو: {driver.model}</Typography>
        <Typography variant="subtitle1">پلاک: {driver.license}</Typography>
      </CardContent>
      <Avatar
        src={driver.pic}
        alt={driver.name}
        sx={{ width: 80, height: 80, marginLeft: "20px" }}
      />
    </Card>
  );
};

export default DriverCard;
