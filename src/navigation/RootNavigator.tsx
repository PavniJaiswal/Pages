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

// Linking configuration for web URLs with query parameters
const linking = {
  prefixes: ['http://localhost:3000', 'https://yourdomain.com'],
  config: {
    screens: {
      Home: {
        path: '',
        parse: {
          view: (view: string) => view === undefined ? undefined : view,
          edition: (edition: string) => edition === undefined ? undefined : edition,
          article: (article: string) => article === undefined ? undefined : article,
        },
      },
      Archive: {
        path: '',
        parse: {
          view: (view: string) => view,
        },
      },
      Cover: {
        path: '',
        parse: {
          edition: (edition: string) => edition,
        },
      },
      Index: {
        path: '',
        parse: {
          edition: (edition: string) => edition,
          view: (view: string) => view,
        },
      },
      Column: {
        path: '',
        parse: {
          edition: (edition: string) => edition,
          article: (article: string) => article,
        },
      },
    },
  },
  getStateFromPath: (path, options) => {
    // Custom path parsing to handle query parameters
    const url = new URL(path, 'http://localhost:3000');
    const params = new URLSearchParams(url.search);

    const view = params.get('view');
    const edition = params.get('edition');
    const article = params.get('article');

    // Determine which screen to navigate to based on query params
    if (article && edition) {
      return {
        routes: [{
          name: 'Column',
          params: { monthId: edition, columnId: article, columnTitle: '' },
        }],
      };
    } else if (view === 'contents' && edition) {
      return {
        routes: [{
          name: 'Index',
          params: { monthId: edition },
        }],
      };
    } else if (edition && !article) {
      return {
        routes: [{
          name: 'Cover',
          params: { monthId: edition },
        }],
      };
    } else if (view === 'archive') {
      return {
        routes: [{ name: 'Archive' }],
      };
    } else {
      return {
        routes: [{ name: 'Home' }],
      };
    }
  },
  getPathFromState: (state, options) => {
    // Custom path generation to create query parameter URLs
    const route = state.routes[state.index || 0];
    const params = route.params as any;

    let queryParams: string[] = [];

    switch (route.name) {
      case 'Archive':
        queryParams.push('view=archive');
        break;
      case 'Cover':
        if (params?.monthId) {
          queryParams.push(`edition=${params.monthId}`);
        }
        break;
      case 'Index':
        if (params?.monthId) {
          queryParams.push(`edition=${params.monthId}`);
          queryParams.push('view=contents');
        }
        break;
      case 'Column':
        if (params?.monthId) {
          queryParams.push(`edition=${params.monthId}`);
        }
        if (params?.columnId) {
          queryParams.push(`article=${params.columnId}`);
        }
        break;
      case 'Home':
      default:
        // No query params for home
        break;
    }

    return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
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

