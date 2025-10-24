import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../components/HomeScreen';
import CoverScreen from '../components/CoverScreen';
import IndexScreen from '../components/IndexScreen';
import ColumnScreen from '../components/ColumnScreen';
import ArchiveScreen from '../components/ArchiveScreen';
import { ThemeProvider } from '../context/ThemeContext';
import { PenFriendProvider } from '../context/PenFriendContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Linking configuration for web URLs
const linking = {
  prefixes: ['http://localhost:3000', 'https://yourdomain.com'],
  config: {
    screens: {
      Home: '',
      Archive: 'archive',
      Cover: 'edition/:monthId',
      Index: 'edition/:monthId/contents',
      Column: 'edition/:monthId/article/:columnId',
    },
  },
};

const RootNavigator: React.FC = () => {
  return (
    <ThemeProvider>
      <PenFriendProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cover" component={CoverScreen} />
            <Stack.Screen name="Index" component={IndexScreen} />
            <Stack.Screen name="Column" component={ColumnScreen} />
            <Stack.Screen name="Archive" component={ArchiveScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PenFriendProvider>
    </ThemeProvider>
  );
};

export default RootNavigator;

