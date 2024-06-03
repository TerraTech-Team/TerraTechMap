import React, { createContext, useContext, useState } from 'react';

const WidgetsStatusContext = createContext();

export function WidgetsStatusProvider({ children }) {
    const [widgetStatus, setWidgetStatus] = useState({
        "trackWidget": false,
        "rulerWidget": false,
        "magnifierWidget": false,
        "checkpointWidget": false
    })

  return (
    <WidgetsStatusContext.Provider value={{ widgetStatus, setWidgetStatus }}>
      {children}
    </WidgetsStatusContext.Provider>
  );
}

export function useWidgetsStatusContext() {
  return useContext(WidgetsStatusContext);
}