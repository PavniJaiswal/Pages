// Style loader utility
import globalStylesJson from '../../global/styles.json';
import globalConfigJson from '../../global/config.json';
import { GlobalStyles, GlobalConfig } from '../types';

export const globalStyles: GlobalStyles = globalStylesJson as GlobalStyles;
export const globalConfig: GlobalConfig = globalConfigJson as GlobalConfig;

// Helper to merge month theme with global styles
export const mergeStyles = (monthTheme: any) => {
  return {
    colors: {
      ...globalStyles.colors,
      ...(monthTheme?.colors || {}),
    },
    typography: {
      ...globalStyles.typography,
      ...(monthTheme?.typography || {}),
    },
    spacing: globalStyles.spacing,
  };
};

