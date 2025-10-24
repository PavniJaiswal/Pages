import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { loadMonthConfig, loadMonthTheme, formatMonthDisplay } from '../utils/contentLoader';
import { globalStyles, globalConfig } from '../utils/styleLoader';
import { MonthConfig, Theme } from '../types';
import { Box, Typography, Button, Container, Fade, Stack, useTheme, useMediaQuery } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArchiveIcon from '@mui/icons-material/Archive';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ThemeToggleButton from './ThemeToggleButton';
import { useThemeMode } from '../context/ThemeContext';

type CoverScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cover'>;
  route: { params: { monthId: string } };
};

const CoverScreen: React.FC<CoverScreenProps> = ({ navigation, route }) => {
  const { monthId } = route.params;
  const [config, setConfig] = useState<MonthConfig | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const { mode } = useThemeMode();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    loadContent();
  }, [monthId]);

  const loadContent = async () => {
    try {
      const monthConfig = await loadMonthConfig(monthId);
      const monthTheme = await loadMonthTheme(monthId);
      setConfig(monthConfig);
      setTheme(monthTheme);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error loading cover content:', error);
    }
  };

  if (!config) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  // Get colors from theme or config, with dark mode support
  const coverColor = mode === 'dark' 
    ? (theme?.darkMode?.primary || theme?.colors?.primary || config.coverColor || globalStyles.colors.primary)
    : (theme?.colors?.primary || config.coverColor || globalStyles.colors.primary);
  
  const secondaryColor = mode === 'dark'
    ? (theme?.darkMode?.secondary || theme?.colors?.secondary || '#ACB087')
    : (theme?.colors?.secondary || '#ACB087');
  
  const textColor = mode === 'dark'
    ? (theme?.darkMode?.text || theme?.colors?.text || '#D5E0C5')
    : (theme?.colors?.text || '#4A5238');

  // Get title font from theme or use default
  const titleFont = theme?.font?.title || 'Satisfy';

  // Determine if we have a split title or single title
  const hasSplitTitle = config.themeTitleLine1 && config.themeTitleLine2;
  const displayTitle = hasSplitTitle 
    ? { line1: config.themeTitleLine1!, line2: config.themeTitleLine2! }
    : { line1: '', line2: config.subtitle || config.title };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: coverColor,
        backgroundImage: `linear-gradient(135deg, ${coverColor} 0%, ${coverColor}dd 100%), linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.03) 50%, transparent 52%), linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.03) 50%, transparent 52%)`,
        backgroundSize: 'auto, 6px 6px, 6px 6px',
        display: 'flex',
        flexDirection: 'column',
        padding: 3,
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: mode === 'dark' 
            ? `radial-gradient(circle at 70% 30%, ${secondaryColor}15 0%, transparent 50%)`
            : `radial-gradient(circle at 70% 30%, ${secondaryColor}33 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Fade in timeout={800}>
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 }, my: 'auto', py: { xs: 4, md: 6 } }}>
          {/* Theme Toggle */}
          <Stack direction="row" justifyContent="flex-end" sx={{ mb: 3 }}>
            <ThemeToggleButton color={secondaryColor} />
          </Stack>
          
          {/* Decorative book icon */}
          <Box sx={{ mb: 3, opacity: 0.6 }}>
            <AutoStoriesIcon 
              sx={{ 
                fontSize: { xs: 50, md: 70 }, 
                color: secondaryColor,
                filter: mode === 'dark'
                  ? `drop-shadow(0 2px 8px ${secondaryColor}66)`
                  : `drop-shadow(0 2px 8px ${secondaryColor}4d)`,
              }} 
            />
          </Box>

          {/* Magazine Name */}
          <Typography
            sx={{
              fontFamily: "'Crimson Text', serif",
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: mode === 'dark' ? `${textColor}ee` : `${textColor}cc`,
              letterSpacing: 4,
              fontWeight: 400,
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            {globalConfig.magazineName}
          </Typography>

          {/* Month/Year */}
          <Typography
            sx={{
              fontFamily: "'Crimson Text', serif",
              fontSize: { xs: '0.9rem', md: '1rem' },
              color: mode === 'dark' ? `${textColor}aa` : `${textColor}99`,
              letterSpacing: 2,
              mb: 5,
              fontStyle: 'italic',
            }}
          >
            {formatMonthDisplay(monthId)}
          </Typography>

          {/* Theme Title - Split or Single */}
          <Box sx={{ my: { xs: 4, md: 6 } }}>
            {/* Decorative line above */}
            <Box 
              sx={{ 
                width: { xs: 100, md: 150 }, 
                height: 2, 
                bgcolor: secondaryColor, 
                mx: 'auto', 
                mb: 4,
                opacity: 0.4,
              }} 
            />
            
            {hasSplitTitle ? (
              <>
                {/* Line 1 - Small */}
                <Typography
                  sx={{
                    fontFamily: `'${titleFont}', cursive`,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem' },
                    color: textColor,
                    fontWeight: 400,
                    mb: 1,
                    textShadow: `0 3px 12px ${secondaryColor}66`,
                    lineHeight: 1.2,
                    letterSpacing: '0.05em',
                  }}
                >
                  {displayTitle.line1}
                </Typography>
                
                {/* Line 2 - Large */}
                <Typography
                  sx={{
                    fontFamily: `'${titleFont}', cursive`,
                    fontSize: { xs: '3.2rem', sm: '4.2rem', md: '6rem' },
                    color: textColor,
                    fontWeight: 400,
                    mb: 3,
                    textShadow: `0 3px 12px ${secondaryColor}66`,
                    lineHeight: 1.2,
                    letterSpacing: '0.05em',
                  }}
                >
                  {displayTitle.line2}
                </Typography>
              </>
            ) : (
              <Typography
                sx={{
                  fontFamily: `'${titleFont}', cursive`,
                  fontSize: { xs: '2.8rem', sm: '3.5rem', md: '5rem' },
                  color: textColor,
                  fontWeight: 400,
                  mb: 3,
                  textShadow: `0 4px 20px ${secondaryColor}66`,
                  lineHeight: 1.3,
                  px: 2,
                }}
              >
                {displayTitle.line2}
              </Typography>
            )}

            {/* Decorative line below */}
            <Box 
              sx={{ 
                width: { xs: 100, md: 150 }, 
                height: 2, 
                bgcolor: secondaryColor, 
                mx: 'auto', 
                mb: 4,
                opacity: 0.4,
              }} 
            />

            {/* Cover Description */}
            {config.coverDescription && (
              <Typography
                sx={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  color: mode === 'dark' ? `${textColor}ee` : `${textColor}dd`,
                  fontStyle: 'italic',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.7,
                  mt: 3,
                }}
              >
                {config.coverDescription}
              </Typography>
            )}
          </Box>

          {/* Tagline */}
          <Typography
            sx={{
              fontFamily: "'Crimson Text', serif",
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: mode === 'dark' ? `${textColor}cc` : `${textColor}bb`,
              fontStyle: 'italic',
              mb: 5,
              letterSpacing: 1,
            }}
          >
            {globalConfig.tagline}
          </Typography>

          {/* Decorative flourish */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2rem',
                color: `${secondaryColor}80`,
              }}
            >
              ❦
            </Typography>
          </Box>

          {/* Buttons - Read Now on first line */}
          <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
            {/* First Line - Read Now */}
            <Button
              variant="outlined"
              size="large"
              startIcon={<MenuBookIcon />}
              onClick={() => navigation.navigate('Index', { monthId })}
              sx={{
                fontFamily: "'Libre Baskerville', serif",
                color: textColor,
                borderColor: secondaryColor,
                borderWidth: 2,
                borderRadius: '4px',
                px: { xs: 4, md: 5 },
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'none',
                boxShadow: `4px 4px 0px ${secondaryColor}40`,
                backdropFilter: 'blur(10px)',
                bgcolor: mode === 'dark' 
                  ? `${secondaryColor}40` 
                  : 'rgba(255, 255, 255, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: textColor,
                  bgcolor: mode === 'dark' 
                    ? `${secondaryColor}66` 
                    : 'rgba(255, 255, 255, 0.6)',
                  transform: 'translate(-2px, -2px)',
                  boxShadow: `6px 6px 0px ${secondaryColor}60`,
                },
              }}
            >
              Read Now
            </Button>

            {/* Second Line - Other Editions and Home */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="text"
                size="large"
                startIcon={<ArchiveIcon />}
                onClick={() => navigation.navigate('Archive')}
                sx={{
                  fontFamily: "'Crimson Text', serif",
                  color: mode === 'dark' ? `${textColor}ee` : `${textColor}dd`,
                  px: 3,
                  py: 1.5,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  letterSpacing: 1,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: mode === 'dark' 
                      ? `${secondaryColor}40` 
                      : `${secondaryColor}33`,
                  },
                }}
              >
                Other Editions
              </Button>
              
              <Button
                variant="text"
                size="large"
                startIcon={<HomeIcon />}
                onClick={() => navigation.navigate('Home')}
                sx={{
                  fontFamily: "'Crimson Text', serif",
                  color: mode === 'dark' ? `${textColor}ee` : `${textColor}dd`,
                  px: 3,
                  py: 1.5,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  letterSpacing: 1,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: mode === 'dark' 
                      ? `${secondaryColor}40` 
                      : `${secondaryColor}33`,
                  },
                }}
              >
                Home
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Fade>
    </Box>
  );
};

const styles = StyleSheet.create({
  // Minimal styles kept for React Native compatibility
});

export default CoverScreen;
