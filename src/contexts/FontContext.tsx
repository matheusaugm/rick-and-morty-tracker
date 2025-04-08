import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type FontContextType = {
  isRickMode: boolean;
  toggleFontMode: () => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [isRickMode, setIsRickMode] = useState(() => {

    const savedPreference = localStorage.getItem('isRickMode');
    return savedPreference !== null ? JSON.parse(savedPreference) : true;
  });


  useEffect(() => {
    const root = document.documentElement;
    
    if (isRickMode) {
      root.style.setProperty('--font-sans', 'WubbaLubbaDubDub, system-ui, sans-serif');
      root.classList.remove('font-sans');
      root.classList.add('font-wubba');
    } else {
      root.style.setProperty('--font-sans', 'sans-serif');
      root.classList.remove('font-wubba');
      root.classList.add('font-sans');
    }
    

    localStorage.setItem('isRickMode', JSON.stringify(isRickMode));
  }, [isRickMode]);

  const toggleFontMode = () => {
    setIsRickMode((prev: boolean) => !prev);
  };

  return (
    <FontContext.Provider value={{ isRickMode, toggleFontMode }}>
      {children}
    </FontContext.Provider>
  );
}


export function useFontPreference() {
  const context = useContext(FontContext);
  
  if (context === undefined) {
    throw new Error('useFontPreference must be used within a FontProvider');
  }
  
  return context;
} 