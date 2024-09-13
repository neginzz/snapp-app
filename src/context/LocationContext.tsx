// src/context/LocationContext.tsx

import { createContext, useState, useContext, ReactNode } from "react";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

// Context value
interface LocationContextProps {
  origin: Location | null;
  destination: Location | null;
  setOrigin: (location: Location | null) => void;
  setDestination: (location: Location | null) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

//  provider component
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);

  return (
    <LocationContext.Provider
      value={{ origin, destination, setOrigin, setDestination }}
    >
      {children}
    </LocationContext.Provider>
  );
};
