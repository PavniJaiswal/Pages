/**
 * Monthly Digital Magazine App
 * 
 * A content-driven magazine application that automatically renders
 * monthly editions from content folders without code changes.
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
