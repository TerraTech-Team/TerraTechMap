import React, { createContext, useContext, useRef } from 'react';

const MapRefContext = createContext();

export function MapRefProvider({ children }) {
    const mapRef = useRef(null);

  return (
    <MapRefContext.Provider value={{ mapRef }}>
      {children}
    </MapRefContext.Provider>
  );
}

export function useMapRefContextContext() {
  return useContext(MapRefContext);
}