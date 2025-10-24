import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../context/ThemeContext';

interface ThemeToggleButtonProps {
  color?: string;
  sx?: any;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ color = 'inherit', sx = {} }) => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        color: color,
        ...sx,
      }}
      aria-label="toggle theme"
    >
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

export default ThemeToggleButton;

