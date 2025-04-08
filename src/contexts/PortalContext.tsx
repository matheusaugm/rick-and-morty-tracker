import { createContext, useContext, useState, ReactNode } from 'react';

type PortalContextType = {
  showPortal: boolean;
  togglePortal: () => void;
};

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [showPortal, setShowPortal] = useState(true);

  const togglePortal = () => {
    setShowPortal((prev) => !prev);
  };

  return (
    <PortalContext.Provider value={{ showPortal, togglePortal }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  
  if (context === undefined) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  
  return context;
} 