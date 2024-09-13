// src/components/SearchBox.tsx

import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

interface SearchBoxProps {
  onSearchSelect: (
    location: { lat: number; lng: number },
    address: string
  ) => void;
  label: string; // toggle text origin/destination
}

const SearchBox = ({ onSearchSelect, label }: SearchBoxProps) => {
  const serviceApiKey = import.meta.env.VITE_SERVICE_API_KEY;
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Search API
  const fetchSuggestions = async (value: string) => {
    const response = await fetch(
      `https://api.neshan.org/v1/search?term=${encodeURIComponent(
        value
      )}&lat=35.6892&lng=51.3890`,
      {
        headers: {
          "Api-Key": serviceApiKey,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setSuggestions(
        data.items.map((item: any) => ({
          title: item.title,
          location: { lat: item.location.y, lng: item.location.x },
        }))
      );
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={suggestions.map((option) => option.title)}
      onInputChange={(event, value) => {
        setSearchTerm(value);
        fetchSuggestions(value); // as user types
      }}
      onChange={(event, value) => {
        const selectedSuggestion = suggestions.find((s) => s.title === value);
        if (selectedSuggestion) {
          onSearchSelect(selectedSuggestion.location, value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          sx={{ textAlign: "right" }}
        />
      )}
    />
  );
};

export default SearchBox;
