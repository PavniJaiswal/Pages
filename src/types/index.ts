// Type definitions for the magazine app

export interface Author {
  name: string;
  bio?: string;
  avatar?: string;
  email?: string;
}

export interface Column {
  id: string;
  title: string;
  author: Author;
  content: string;
  excerpt?: string;
  image?: string;
  order: number;
  theme?: ColumnTheme; // Individual column theme
}

export interface ColumnTheme {
  primaryColor?: string;
  secondaryColor?: string;
  headerStyle?: 'gradient' | 'solid' | 'minimal' | 'artistic';
  textColor?: string;
  accentColor?: string;
  fontFamily?: string; // Font for content text
  fontStyle?: 'normal' | 'italic' | 'oblique';
  headerFont?: string; // Font for the column title header
  categoryLabel?: string; // Custom label for the column category
  backgroundColor?: {
    light?: string;
    dark?: string;
  };
  contentTextColor?: {
    light?: string;
    dark?: string;
  };
}

export interface MonthConfig {
  year: number;
  month: number;
  title: string;
  subtitle?: string;
  themeTitleLine1?: string;
  themeTitleLine2?: string;
  coverDescription?: string;
  coverImage?: string;
  coverColor?: string;
  editorNote?: string;
  columns: Column[];
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background?: string;
    text?: string;
    accent?: string;
  };
  darkMode?: {
    primary?: string;
    secondary?: string;
    text?: string;
  };
  font?: {
    title?: string;
  };
  typography?: {
    titleSize?: number;
    bodySize?: number;
    fontFamily?: string;
  };
}

export interface GlobalConfig {
  magazineName: string;
  tagline?: string;
  about?: string;
}

export interface GlobalStyles {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
  };
  typography: {
    titleSize: number;
    subtitleSize: number;
    bodySize: number;
    smallSize: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

