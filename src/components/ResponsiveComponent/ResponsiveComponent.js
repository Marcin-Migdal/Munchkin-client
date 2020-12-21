import React, { createContext, useContext, useEffect, useState } from 'react';

const viewportContext = createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={width}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const width = useContext(viewportContext);
  return width;
};

const MyComponent = ({ MobileComponent, DesktopComponent }) => {
  const width = useViewport();
  const breakpoint = 620;

  return width < breakpoint ? MobileComponent : DesktopComponent;
};

export default function ResponsiveComponent({ MobileComponent, DesktopComponent }) {
  return (
    <ViewportProvider>
      <MyComponent
        MobileComponent={MobileComponent}
        DesktopComponent={DesktopComponent} />
    </ViewportProvider>
  );
}
