import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Container style for the map
const containerStyle = {
  width: "100%",
  height: "100%",
};

// Dehradun bounds to restrict map movement
const dehradunBounds = {
  north: 30.5650, // Northern latitude of Dehradun
  south: 30.1790, // Southern latitude of Dehradun
  east: 78.2450, // Eastern longitude of Dehradun (adjusted to include Khalanga)
  west: 77.9580, // Western longitude of Dehradun
};

// Initial location of Clock Tower, Dehradun (used as default)
const initialLocation = {
  lat: 30.3155,
  lng: 78.0322, // Clock Tower coordinates
};

const MapContainer = ({
  searchQuery,
  updateMapCenter,
  onHotelDataChange,
  selectedHotel,
  hoveredHotel,
  mapRef,
}) => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(initialLocation); // Initialize with Clock Tower location
  const [googleMapsApiLoaded, setGoogleMapsApiLoaded] = useState(false); // Track if API is loaded

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Ensure Google Maps API is available before calling PlacesService
  const performSearch = useCallback(() => {
    if (!googleMapsApiLoaded || !window.google || !window.google.maps || !mapRef.current || !userLocation) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);

    let placeType = "";
    if (searchQuery.toLowerCase().includes("hotel")) {
      placeType = "lodging"; // Filter for hotels
    } else if (searchQuery.toLowerCase().includes("restaurant")) {
      placeType = "restaurant"; // Filter for restaurants
    } else if (searchQuery.toLowerCase().includes("cafe")) {
      placeType = "cafe"; // Filter for cafes
    } else if (searchQuery.toLowerCase().includes("tourist spot") || searchQuery.toLowerCase().includes("tourist attraction")) {
      placeType = "tourist_attraction"; // Filter for tourist attractions
    } else {
      placeType = "establishment"; // General search
    }

    const request = {
      location: userLocation,
      radius: 25000, // Search within 25 km radius
      keyword: searchQuery,
      type: placeType,
      bounds: dehradunBounds,
    };

    const fetchResults = (nextPageToken = null) => {
      if (nextPageToken) {
        request.pageToken = nextPageToken; // Add page token for pagination
      }

      service.nearbySearch(request, (results, status, pagination) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newMarkers = results
            .map((place) => ({
              position: place.geometry.location,
              name: place.name,
              address: place.vicinity,
              rating: place.rating || null,
              price: place.price_level || null,
              image:
                place.photos && place.photos.length > 0
                  ? place.photos[0].getUrl()
                  : null,
            }))
            .sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Sort by rating, fallback to 0 if no rating

          setMarkers(newMarkers);
          onHotelDataChange(newMarkers);

          if (pagination && pagination.hasNextPage) {
            setTimeout(() => {
              fetchResults(pagination.nextPageToken); // Fetch next page if available
            }, 2000);
          }
        } else {
          setMarkers([]);
          onHotelDataChange([]);
          console.error("No results found or error in the request", status);
        }
      });
    };

    fetchResults();
  }, [googleMapsApiLoaded, userLocation, searchQuery, onHotelDataChange]);

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [searchQuery, performSearch]);

  return (
    <LoadScript
    googleMapsApiKey={process.env.REACT_APP_API_KEY} // Replace with your actual API key
      libraries={["places"]} // Load Places library
      onLoad={() => setGoogleMapsApiLoaded(true)} // Set flag when API is ready
    >
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={13}
        onLoad={onLoad}
        bounds={dehradunBounds}
        options={{
          restriction: {
            latLngBounds: dehradunBounds,
            strictBounds: false,
          },
        }}
      >
        {markers.map((hotel, index) => (
          <Marker
            key={index}
            position={hotel.position}
            label={hotel.name}
            onClick={() => updateMapCenter(hotel.position.lat(), hotel.position.lng())}
            icon={
              selectedHotel && selectedHotel.name === hotel.name
                ? { url: "/path/to/selected-icon.png", scaledSize: new window.google.maps.Size(30, 30) }
                : undefined
            }
            animation={hoveredHotel && hoveredHotel.name === hotel.name ? window.google.maps.Animation.BOUNCE : null}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
