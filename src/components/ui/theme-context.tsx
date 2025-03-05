import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Theme types
export type ColorMode = 'dark' | 'darker' | 'cyberpunk' | 'midnight-blue' | 'matrix';

export interface ThemeContextProps {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextProps>({
  colorMode: 'dark',
  setColorMode: () => {},
  toggleColorMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  initialColorMode?: ColorMode;
}

export const ThemeProvider = ({ 
  children, 
  initialColorMode = 'dark'
}: ThemeProviderProps) => {
  const [colorMode, setColorMode] = useState<ColorMode>(initialColorMode);

  // Check for user preference on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('color-mode') as ColorMode | null;
    if (storedTheme && isValidColorMode(storedTheme)) {
      setColorMode(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setColorMode('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Add/remove classes when theme changes
  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'darker', 'cyberpunk', 'midnight-blue', 'matrix');
    
    // Add the current theme class
    document.documentElement.classList.add(colorMode);
    
    // Save to localStorage
    localStorage.setItem('color-mode', colorMode);
  }, [colorMode]);

  // Validate color mode
  const isValidColorMode = (mode: string): mode is ColorMode => {
    return ['dark', 'darker', 'cyberpunk', 'midnight-blue', 'matrix'].includes(mode);
  };

  // Toggle between themes
  const toggleColorMode = () => {
    const themes: ColorMode[] = ['dark', 'darker', 'cyberpunk', 'midnight-blue', 'matrix'];
    const currentIndex = themes.indexOf(colorMode);
    const nextIndex = (currentIndex + 1) % themes.length;
    setColorMode(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        colorMode, 
        setColorMode, 
        toggleColorMode 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);