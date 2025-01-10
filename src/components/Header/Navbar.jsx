import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, TextField, Autocomplete, MenuItem } from "@mui/material";
import useStyles from "./style";

const Navbar = ({ onSearch, updateMapCenter }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // Fetch suggestions using Google Places Autocomplete API
  useEffect(() => {
    if (!searchText) {
      setSuggestions([]);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input: searchText, componentRestrictions: { country: "IN" } }, // Restricting to India for example
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      }
    );
  }, [searchText]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.description);
    onSearch(suggestion.description); // Pass the selected suggestion to the parent

    // Get the latitude and longitude of the selected place
    const place = suggestion; // The selected place
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      updateMapCenter(lat, lng); // Update map center
    }
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Explore Now
        </Typography>
        <div className={classes.search}>
          <Autocomplete
            freeSolo
            options={suggestions}
            getOptionLabel={(option) => option.description}
            onInputChange={(e, newInputValue) => setSearchText(newInputValue)}
            onChange={(e, newValue) => {
              if (newValue) {
                setSearchText(newValue.description);
                onSearch(newValue.description);
                const place = newValue; // The selected place
                if (place.geometry) {
                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  updateMapCenter(lat, lng); // Update map center
                }
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search…"
                variant="outlined"
                fullWidth
                className={classes.input}
              />
            )}
            renderOption={(props, option) => (
              <MenuItem {...props} key={option.place_id}>
                {option.description}
              </MenuItem>
            )}
          />
        </div>
        <Button color="inherit" onClick={() => onSearch(searchText)}>
          Search
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;



// import React, { useState } from "react";

// const Navbar = ({ onSearch }) => {
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSearch = () => {
//     onSearch(inputValue);
//   };

//   return (
//     <nav style={{ padding: "10px", backgroundColor: "#f8f9fa", display: "flex" }}>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="Search for cafes, hotels, or restaurants..."
//         style={{
//           width: "300px",
//           padding: "8px",
//           borderRadius: "4px",
//           border: "1px solid #ced4da",
//           marginRight: "10px",
//         }}
//       />
//       <button
//         onClick={handleSearch}
//         style={{
//           padding: "8px 16px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         Search
//       </button>
//     </nav>
//   );
// };

// export default Navbar;
