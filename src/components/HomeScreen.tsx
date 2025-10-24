import React, { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getAvailableMonths, formatMonthDisplay, loadMonthConfig } from '../utils/contentLoader';
import { globalConfig } from '../utils/styleLoader';
import { MonthConfig } from '../types';
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Stack,
  Fade,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useThemeMode } from '../context/ThemeContext';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

interface IssueCard {
  monthId: string;
  config: MonthConfig;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [issues, setIssues] = useState<IssueCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const months = getAvailableMonths();
      const issueData: IssueCard[] = [];
      
      for (const monthId of months) {
        try {
          const config = await loadMonthConfig(monthId);
          issueData.push({ monthId, config });
        } catch (error) {
          console.error(`Failed to load config for ${monthId}:`, error);
        }
      }
      
      setIssues(issueData);
    } catch (error) {
      console.error('Error loading issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueClick = (monthId: string) => {
    navigation.navigate('Cover', { monthId });
  };

  // Paper texture background color
  const paperColor = mode === 'light' ? '#FAF8F3' : '#2A2826';
  const inkColor = mode === 'light' ? '#3B3028' : '#E8DCC8';
  const accentColor = mode === 'light' ? '#8B7355' : '#A4907C';

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: paperColor,
        overflowY: 'auto',
        position: 'relative',
        // Simple paper texture effect using CSS gradient
        backgroundImage: mode === 'light'
          ? 'linear-gradient(45deg, transparent 48%, rgba(139,115,85,0.02) 50%, transparent 52%), linear-gradient(-45deg, transparent 48%, rgba(139,115,85,0.02) 50%, transparent 52%)'
          : 'linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.02) 50%, transparent 52%), linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.02) 50%, transparent 52%)',
        backgroundSize: '4px 4px',
      }}
    >
      {/* Theme Toggle - Floating in corner */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: inkColor,
            bgcolor: mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            boxShadow: mode === 'light' 
              ? '0 2px 12px rgba(0,0,0,0.1)' 
              : '0 2px 12px rgba(0,0,0,0.3)',
            '&:hover': {
              bgcolor: mode === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.5)',
            },
          }}
          aria-label="toggle theme"
        >
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
        <Fade in timeout={1000}>
          <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Decorative book icon */}
            <Box sx={{ mb: 4, opacity: 0.4, display: 'flex', justifyContent: 'center' }}>
              <AutoStoriesIcon 
                sx={{ 
                  fontSize: { xs: 60, md: 80 }, 
                  color: accentColor,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }} 
              />
            </Box>

            {/* Handwritten Title */}
            <Typography
              sx={{
                fontFamily: "'Satisfy', cursive",
                fontSize: { xs: '3.5rem', sm: '4.5rem', md: '6rem' },
                color: inkColor,
                mb: 2,
                textShadow: mode === 'light' 
                  ? '2px 2px 4px rgba(0,0,0,0.1)' 
                  : '2px 2px 6px rgba(0,0,0,0.5)',
                letterSpacing: '0.02em',
                lineHeight: 1.2,
                textAlign: 'center',
                width: '100%',
              }}
            >
              {globalConfig.magazineName}
            </Typography>

            {/* Decorative line */}
            <Box 
              sx={{ 
                width: { xs: 150, md: 200 }, 
                height: 2, 
                bgcolor: accentColor, 
                mx: 'auto', 
                mb: 3,
                opacity: 0.4,
                position: 'relative',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: accentColor,
                  top: '50%',
                  transform: 'translateY(-50%)',
                },
                '&::before': {
                  left: -12,
                },
                '&::after': {
                  right: -12,
                },
              }} 
            />

            {/* Italic Tagline */}
            <Typography
              sx={{
                fontFamily: "'Crimson Text', serif",
                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                fontStyle: 'italic',
                color: accentColor,
                mb: 4,
                fontWeight: 400,
                textAlign: 'center',
                width: '100%',
              }}
            >
              {globalConfig.tagline}
            </Typography>

            {/* Literary Description */}
            <Box
              sx={{
                maxWidth: 600,
                mx: 'auto',
                mb: 5,
                p: { xs: 3, md: 4 },
                borderLeft: `3px solid ${accentColor}`,
                borderRight: `3px solid ${accentColor}`,
                bgcolor: mode === 'light' 
                  ? 'rgba(255,255,255,0.5)' 
                  : 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(5px)',
                position: 'relative',
              }}
            >
              {/* Decorative quote marks */}
              <Typography
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '4rem',
                  color: accentColor,
                  opacity: 0.3,
                  lineHeight: 0,
                  userSelect: 'none',
                }}
              >
                "
              </Typography>
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '4rem',
                  color: accentColor,
                  opacity: 0.3,
                  lineHeight: 0,
                  transform: 'rotate(180deg)',
                  userSelect: 'none',
                }}
              >
                "
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: inkColor,
                  lineHeight: 1.9,
                  textAlign: 'center',
                  mb: 2,
                  px: 2,
                }}
              >
                {globalConfig.about}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  fontStyle: 'italic',
                  color: accentColor,
                  textAlign: 'center',
                  mt: 3,
                }}
              >
                Where stories come alive, one page at a time
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontStyle: 'italic',
                  color: mode === 'light' ? '#6B5847' : '#B8A490',
                  textAlign: 'center',
                  mt: 2,
                  opacity: 0.9,
                }}
              >
                Read diverse perspectives & connect with authors as pen pals
              </Typography>
            </Box>

            {/* Buttons */}
            <Stack spacing={2} alignItems="center" sx={{ mb: 2 }}>
              {/* Primary Button - Open Latest Edition */}
              <Button
                variant="outlined"
                size="large"
                startIcon={<MenuBookIcon />}
                onClick={() => {
                  if (issues.length > 0) {
                    handleIssueClick(issues[0].monthId);
                  }
                }}
                sx={{
                  fontFamily: "'Libre Baskerville', serif",
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  borderRadius: '4px',
                  borderWidth: 2,
                  borderColor: inkColor,
                  color: inkColor,
                  textTransform: 'none',
                  letterSpacing: '0.05em',
                  boxShadow: mode === 'light'
                    ? '4px 4px 0px rgba(0,0,0,0.1)'
                    : '4px 4px 0px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: accentColor,
                    bgcolor: mode === 'light' 
                      ? 'rgba(139,115,85,0.05)' 
                      : 'rgba(164,144,124,0.1)',
                    transform: 'translate(-2px, -2px)',
                    boxShadow: mode === 'light'
                      ? '6px 6px 0px rgba(0,0,0,0.15)'
                      : '6px 6px 0px rgba(0,0,0,0.4)',
                  },
                }}
              >
                Open Latest Edition
              </Button>

              {/* Secondary Button - Browse Archive */}
              <Button
                variant="text"
                size="medium"
                startIcon={<ArchiveIcon />}
                onClick={() => navigation.navigate('Archive')}
                sx={{
                  fontFamily: "'Crimson Text', serif",
                  px: 3,
                  py: 1,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  color: accentColor,
                  textTransform: 'none',
                  letterSpacing: '0.05em',
                  fontStyle: 'italic',
                  '&:hover': {
                    bgcolor: mode === 'light' 
                      ? 'rgba(139,115,85,0.1)' 
                      : 'rgba(164,144,124,0.15)',
                  },
                }}
              >
                Browse Archive
              </Button>
            </Stack>

            {/* Decorative flourish */}
            <Box sx={{ mt: 6, mb: 4, display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  color: accentColor,
                  opacity: 0.3,
                  textAlign: 'center',
                }}
              >
                ❦
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>

      {/* Footer with vintage style */}
      <Box
        sx={{
          borderTop: `1px solid ${mode === 'light' ? 'rgba(139,115,85,0.3)' : 'rgba(164,144,124,0.3)'}`,
          py: 4,
          px: 2,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          bgcolor: mode === 'light' 
            ? 'rgba(255,255,255,0.3)' 
            : 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: "'Crimson Text', serif",
              color: accentColor,
              fontSize: '0.95rem',
            }}
          >
            © 2025 {globalConfig.magazineName}. All rights reserved.
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              fontFamily: "'Crimson Text', serif",
              color: accentColor,
              mt: 1, 
              display: 'block',
              fontStyle: 'italic',
              opacity: 0.8,
            }}
          >
            Crafted with care for readers & writers worldwide
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomeScreen;
