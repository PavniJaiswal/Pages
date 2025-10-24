// Navigation type definitions

export type RootStackParamList = {
  Home: undefined;
  Cover: { monthId: string };
  Index: { monthId: string };
  Column: { monthId: string; columnId: string; columnTitle: string };
  Archive: undefined;
};

