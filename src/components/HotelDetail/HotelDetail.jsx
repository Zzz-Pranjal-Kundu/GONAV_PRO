
import React from "react";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";

function HotelDetailsCard({ hotel, onGetDirections }) {
  if (!hotel) return null; // If no hotel is selected, don't render anything

  return (
    <Card style={{ marginTop: 16 }}>
      <CardMedia
        component="img"
        height="200"
        image={hotel.image || "https://via.placeholder.com/200"} // Default image if no image is available
        alt={hotel.name || "Hotel Image"}
      />
      <CardContent>
        <Typography variant="h5">{hotel.name}</Typography>
        <Typography variant="body1">{hotel.address}</Typography>
        {hotel.price && (
          <Typography variant="h6">Price: ${hotel.price}</Typography>
        )}
        {hotel.rating && (
          <Typography variant="body2">Rating: {hotel.rating} ⭐</Typography>
        )}
        <Typography variant="body2">
          Description: {hotel.description || "No description available"}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 16 }}
          onClick={() => onGetDirections(hotel)} // Trigger the get directions function
        >
          Get Directions
        </Button>
      </CardContent>
    </Card>
  );
}

export default HotelDetailsCard;
