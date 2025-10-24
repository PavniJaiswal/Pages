// Polyfill for react-native-safe-area-context on web
import React from 'react';

const SafeAreaInsetsContext = React.createContext({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const SafeAreaFrameContext = React.createContext({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

export const SafeAreaProvider = ({ children }) => {
  const insets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const frame = {
    x: 0,
    y: 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  };

  return (
    <SafeAreaFrameContext.Provider value={frame}>
      <SafeAreaInsetsContext.Provider value={insets}>
        {children}
      </SafeAreaInsetsContext.Provider>
    </SafeAreaFrameContext.Provider>
  );
};

export const useSafeAreaInsets = () => {
  return React.useContext(SafeAreaInsetsContext);
};

export const useSafeAreaFrame = () => {
  return React.useContext(SafeAreaFrameContext);
};

// Export contexts
export { SafeAreaInsetsContext, SafeAreaFrameContext };

// Default export
export default {
  SafeAreaProvider,
  SafeAreaInsetsContext,
  SafeAreaFrameContext,
  useSafeAreaInsets,
  useSafeAreaFrame,
};

