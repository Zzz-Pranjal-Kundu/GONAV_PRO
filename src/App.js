
// import React, { useState, useEffect } from "react";
// import Navbar from "./components/Header/Navbar.jsx";
// import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
// import MapContainer from "./components/Map/MapContainer.jsx"; 
// import HotelDetailsCard from "./components/HotelDetail/HotelDetail.jsx"; 

// function App() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [mapCenter, setMapCenter] = useState({
//     lat: 30.3165, // Default center (Dehradun Clock Tower)
//     lng: 78.0322,
//   });
//   const [hotelData, setHotelData] = useState([]); 
//   const [selectedHotel, setSelectedHotel] = useState(null); 
//   const [hoveredHotel, setHoveredHotel] = useState(null); 

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const updateMapCenter = (lat, lng) => {
//     setMapCenter({ lat, lng });
//   };

//   const updateHotelData = (data) => {
//     setHotelData(data);
//   };

//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setMapCenter({ lat: latitude, lng: longitude });
//       }, () => {
//         console.error("Geolocation failed");
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     if (searchQuery.toLowerCase().includes("near me")) {
//       getUserLocation();
//     } else if (searchQuery === "") {
//       setMapCenter({ lat: 30.3165, lng: 78.0322 });
//     }
//   }, [searchQuery]);

//   const handleHover = (hotel) => {
//     setHoveredHotel(hotel);
//   };

//   const handleSelectHotel = (hotel) => {
//     setSelectedHotel(hotel);
//   };

//   return (
//     <div>
//       <Navbar onSearch={handleSearch} updateMapCenter={updateMapCenter} />
//       <Box style={{ display: "flex", height: "calc(100vh - 64px)" }}>
//         <Box
//           style={{
//             flex: 1,
//             padding: "16px",
//             borderRight: "1px solid #ccc",
//             overflowY: "auto",
//             height: "100%",
//           }}
//         >
//           <h2>Hotel Details</h2>
//            {selectedHotel && <HotelDetailsCard hotel={selectedHotel} />}
//           <List>
//             {hotelData.length > 0 ? (
//               hotelData.map((hotel, index) => (
//                 <ListItem
//                   key={index}
//                   onMouseEnter={() => handleHover(hotel)}
//                   onClick={() => handleSelectHotel(hotel)}
//                   style={{
//                     cursor: "pointer",
//                     backgroundColor: selectedHotel?.name === hotel.name ? "#f0f0f0" : "transparent",
//                   }}
//                 >
//                   <ListItemText
//                     primary={hotel.name}
//                     secondary={hotel.address}
//                   />
//                 </ListItem>
//               ))
//             ) : (
//               <Typography>No hotels found</Typography>
//             )}
//           </List>
         
//         </Box>

//         <Box style={{ flex: 2, height: "100%" }}>
//           <MapContainer
//             searchQuery={searchQuery}
//             mapCenter={mapCenter}
//             updateMapCenter={updateMapCenter}
//             onHotelDataChange={updateHotelData}
//             selectedHotel={selectedHotel}
//             hoveredHotel={hoveredHotel}
//           />
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default App;



// import React, { useState, useEffect } from "react";
// import Navbar from "./components/Header/Navbar.jsx";
// import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
// import MapContainer from "./components/Map/MapContainer.jsx"; 
// import HotelDetailsCard from "./components/HotelDetail/HotelDetail.jsx"; 

// function App() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [mapCenter, setMapCenter] = useState({
//     lat: 30.3165, // Default center (Dehradun Clock Tower)
//     lng: 78.0322,
//   });
//   const [hotelData, setHotelData] = useState([]); 
//   const [selectedHotel, setSelectedHotel] = useState(null); 
//   const [hoveredHotel, setHoveredHotel] = useState(null); 

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const updateMapCenter = (lat, lng) => {
//     setMapCenter({ lat, lng });
//   };

//   const updateHotelData = (data) => {
//     setHotelData(data);
//   };

//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setMapCenter({ lat: latitude, lng: longitude });
//       }, () => {
//         console.error("Geolocation failed");
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     if (searchQuery.toLowerCase().includes("near me")) {
//       getUserLocation();
//     } else if (searchQuery === "") {
//       setMapCenter({ lat: 30.3165, lng: 78.0322 });
//     }
//   }, [searchQuery]);

//   const handleHover = (hotel) => {
//     setHoveredHotel(hotel);
//   };

//   const handleSelectHotel = (hotel) => {
//     setSelectedHotel(hotel);
//   };

//   const handleGetDirections = (hotel) => {
//     // You can trigger the map's direction function here
//     console.log(`Get Directions for: ${hotel.name}`);
//     // For now, the MapContainer will handle this via onNavigate
//   };

//   return (
//     <div>
//       <Navbar onSearch={handleSearch} updateMapCenter={updateMapCenter} />
//       <Box style={{ display: "flex", height: "calc(100vh - 64px)" }}>
//         <Box
//           style={{
//             flex: 1,
//             padding: "16px",
//             borderRight: "1px solid #ccc",
//             overflowY: "auto",
//             height: "100%",
//           }}
//         >
//           <h2>Hotel Details</h2>
//           {selectedHotel && (
//             <HotelDetailsCard hotel={selectedHotel} onNavigate={handleGetDirections} />
//           )}
//           <List>
//             {hotelData.length > 0 ? (
//               hotelData.map((hotel, index) => (
//                 <ListItem
//                   key={index}
//                   onMouseEnter={() => handleHover(hotel)}
//                   onClick={() => handleSelectHotel(hotel)}
//                   style={{
//                     cursor: "pointer",
//                     backgroundColor: selectedHotel?.name === hotel.name ? "#f0f0f0" : "transparent",
//                   }}
//                 >
//                   <ListItemText
//                     primary={hotel.name}
//                     secondary={hotel.address}
//                   />
//                 </ListItem>
//               ))
//             ) : (
//               <Typography>No hotels found</Typography>
//             )}
//           </List>
//         </Box>

//         <Box style={{ flex: 2, height: "100%" }}>
//           <MapContainer
//             searchQuery={searchQuery}
//             mapCenter={mapCenter}
//             updateMapCenter={updateMapCenter}
//             onHotelDataChange={updateHotelData}
//             selectedHotel={selectedHotel}
//             hoveredHotel={hoveredHotel}
//             onNavigate={handleGetDirections} // Pass onNavigate to MapContainer
//           />
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Header/Navbar.jsx";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import MapContainer from "./components/Map/MapContainer.jsx";
import HotelDetailsCard from "./components/HotelDetail/HotelDetail.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 30.3165, // Default center (Dehradun Clock Tower)
    lng: 78.0322,
  });
  const [hotelData, setHotelData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hoveredHotel, setHoveredHotel] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // Store user's input location
  const [routes, setRoutes] = useState([]); // Store multiple routes
  const [routesVisible, setRoutesVisible] = useState(false); // To toggle the routes window
  const mapRef = useRef(null); // Define mapRef here

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const updateMapCenter = (lat, lng) => {
    setMapCenter({ lat, lng });
  };

  const updateHotelData = (data) => {
    setHotelData(data);
  };

  // Function to locate user using Google Maps geolocation
  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude }); // Center the map to the user's location
        },
        (error) => {
          console.error("Geolocation failed:", error);
          // Handle error case
          alert("Unable to retrieve your location.");
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 10000, // Timeout after 10 seconds
          maximumAge: 0, // Do not use cached results
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (searchQuery.toLowerCase().includes("near me")) {
      locateUser(); // Use the locateUser function when the search query includes "near me"
    } else if (searchQuery === "") {
      setMapCenter({ lat: 30.3165, lng: 78.0322 });
    }
  }, [searchQuery]);

  // Handle hovered hotel and zoom into it
  useEffect(() => {
    if (hoveredHotel && mapRef.current) {
      mapRef.current.panTo(hoveredHotel.position);
      mapRef.current.setZoom(18); // Zoom in on hovered hotel
    } else if (mapRef.current) {
      mapRef.current.setZoom(13); // Reset zoom when hover ends
    }
  }, [hoveredHotel, mapRef]);

  const handleHover = (hotel) => {
    setHoveredHotel(hotel);
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleGetDirections = (hotel) => {
    if (window.google && window.google.maps && mapRef.current && userLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      const trafficLayer = new window.google.maps.TrafficLayer();
      trafficLayer.setMap(mapRef.current); // Display traffic info

      directionsRenderer.setMap(mapRef.current); // Ensure directions are rendered on the map

      const request = {
        origin: { lat: userLocation.lat, lng: userLocation.lng }, // User's current location
        destination: hotel.position, // Selected hotel's location
        travelMode: window.google.maps.TravelMode.DRIVING, // Travel mode: DRIVING
        provideRouteAlternatives: true, // Request multiple routes
        drivingOptions: {
          departureTime: new Date(), // Use current time to get accurate traffic info
        },
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const newRoutes = result.routes;

          // Clear previous routes
          setRoutes([]);

          // Store new routes and render them on the map
          setRoutes(newRoutes);

          newRoutes.forEach((route, index) => {
            const renderer = new window.google.maps.DirectionsRenderer({
              polylineOptions: {
                strokeColor: getColorBasedOnTraffic(route.legs[0].duration_in_traffic), // Use traffic info to color
                strokeOpacity: 0.7,
              },
              suppressMarkers: true,
            });
            renderer.setMap(mapRef.current);
            renderer.setDirections(result);
          });
        } else {
          console.error("Error fetching directions: ", status);
        }
      });
    }
  };

  const getColorBasedOnTraffic = (durationInTraffic) => {
    if (durationInTraffic < 1800) return "#00FF00"; // Green: Low traffic
    if (durationInTraffic < 3600) return "#FFFF00"; // Yellow: Medium traffic
    return "#FF0000"; // Red: Heavy traffic
  };

  const handleRouteClick = (index) => {
    // Focus on the selected route
    const selectedRoute = routes[index];
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(mapRef.current);
    directionsService.route({
      origin: { lat: userLocation.lat, lng: userLocation.lng }, // User's current location
      destination: selectedHotel.position, // Selected hotel's location
      travelMode: window.google.maps.TravelMode.DRIVING, // Travel mode: DRIVING
      waypoints: selectedRoute.legs[0].via_waypoints, // Use the selected route's waypoints
      drivingOptions: {
        departureTime: new Date(),
      },
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      }
    });
  };

  const toggleRoutesWindow = () => {
    setRoutesVisible(!routesVisible); // Toggle visibility of the routes window
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} updateMapCenter={updateMapCenter} />
      <Box style={{ display: "flex", height: "calc(100vh - 64px)" }}>
        <Box
          style={{
            flex: 1,
            padding: "16px",
            borderRight: "1px solid #ccc",
            overflowY: "auto",
            height: "100%",
          }}
        >
          <h2>Location Details</h2>
          {selectedHotel && (
            <HotelDetailsCard hotel={selectedHotel} onGetDirections={handleGetDirections} />
          )}
          <List>
            {hotelData.length > 0 ? (
              hotelData.map((hotel, index) => (
                <ListItem
                  key={index}
                  onMouseEnter={() => handleHover(hotel)}
                  onClick={() => handleSelectHotel(hotel)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedHotel?.name === hotel.name ? "#f0f0f0" : "transparent",
                  }}
                >
                  <ListItemText
                    primary={hotel.name}
                    secondary={hotel.address}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No hotels found</Typography>
            )}
          </List>

          {/* Button to trigger user location detection */}
          <Typography variant="h6" style={{ marginTop: 16 }}>Use Current Location:</Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
            onClick={locateUser}
          >
            Find My Location
          </Button>
        </Box>

        <Box style={{ flex: 2, height: "100%" }}>
          <MapContainer
            searchQuery={searchQuery}
            mapCenter={mapCenter}
            updateMapCenter={updateMapCenter}
            onHotelDataChange={updateHotelData}
            selectedHotel={selectedHotel}
            hoveredHotel={hoveredHotel}
            mapRef={mapRef}  // Pass mapRef to MapContainer
          />
        </Box>
      </Box>

      {/* Toggleable routes window */}
      {routesVisible && routes.length > 0 && (
        <Box
          style={{
            padding: "16px",
            background: "#f5f5f5",
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "300px",
            maxHeight: "50%",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          <Typography variant="h6">Choose a Route:</Typography>
          <List>
            {routes.map((route, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleRouteClick(index)}
              >
                <ListItemText
                  primary={`Route ${index + 1}`}
                  secondary={`Duration: ${route.legs[0].duration.text}, Distance: ${route.legs[0].distance.text}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={toggleRoutesWindow}
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          zIndex: 20,
        }}
      >
        {routesVisible ? "Hide Routes" : "Show Routes"}
      </Button>
    </div>
  );
}

export default App;
