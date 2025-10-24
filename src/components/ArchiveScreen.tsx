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
  Card,
  CardContent,
  CardActionArea,
  Chip,
  CircularProgress,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import ArticleIcon from '@mui/icons-material/Article';
import { useThemeMode } from '../context/ThemeContext';

type ArchiveScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Archive'>;
};

interface ArchiveItem {
  monthId: string;
  config: MonthConfig;
}

const ArchiveScreen: React.FC<ArchiveScreenProps> = ({ navigation }) => {
  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { mode, toggleTheme } = useThemeMode();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  useEffect(() => {
    loadArchives();
  }, []);

  const loadArchives = async () => {
    try {
      const months = getAvailableMonths();
      const archiveData: ArchiveItem[] = [];
      
      for (const monthId of months) {
        try {
          const config = await loadMonthConfig(monthId);
          archiveData.push({ monthId, config });
        } catch (error) {
          console.error(`Failed to load config for ${monthId}:`, error);
        }
      }
      
      setArchives(archiveData);
    } catch (error) {
      console.error('Error loading archives:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArchivePress = (monthId: string) => {
    navigation.navigate('Cover', { monthId });
  };

  // Paper texture background color (same as home page)
  const paperColor = mode === 'light' ? '#FAF8F3' : '#2A2826';
  const inkColor = mode === 'light' ? '#3B3028' : '#E8DCC8';
  const accentColor = mode === 'light' ? '#8B7355' : '#A4907C';

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: paperColor,
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        // Same paper texture as home page
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

      {/* Home Button - Next to theme toggle */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 80,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={() => navigation.navigate('Home')}
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
          aria-label="go home"
        >
          <HomeIcon />
        </IconButton>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
        <Fade in timeout={1000}>
          <Box sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
            {/* Decorative book icon */}
            <Box sx={{ mb: 3, opacity: 0.4 }}>
              <CalendarTodayIcon 
                sx={{ 
                  fontSize: { xs: 50, md: 70 }, 
                  color: accentColor,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }} 
              />
            </Box>

            {/* Handwritten Title */}
            <Typography
              sx={{
                fontFamily: "'Satisfy', cursive",
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                color: inkColor,
                mb: 2,
                textShadow: mode === 'light' 
                  ? '2px 2px 4px rgba(0,0,0,0.1)' 
                  : '2px 2px 6px rgba(0,0,0,0.5)',
                letterSpacing: '0.02em',
                lineHeight: 1.2,
              }}
            >
              Archive
            </Typography>

            {/* Decorative line */}
            <Box 
              sx={{ 
                width: { xs: 100, md: 150 }, 
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

            {/* Subtitle */}
            <Typography
              sx={{
                fontFamily: "'Crimson Text', serif",
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                fontStyle: 'italic',
                color: accentColor,
                mb: 5,
                fontWeight: 400,
              }}
            >
              Journey through past editions
            </Typography>

            {/* Content */}
            {loading ? (
              <Box sx={{ py: 8 }}>
                <CircularProgress sx={{ color: accentColor }} />
              </Box>
            ) : archives.length === 0 ? (
              <Box
                sx={{
                  maxWidth: 400,
                  mx: 'auto',
                  p: 4,
                  borderLeft: `3px solid ${accentColor}`,
                  borderRight: `3px solid ${accentColor}`,
                  bgcolor: mode === 'light' 
                    ? 'rgba(255,255,255,0.5)' 
                    : 'rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(5px)',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: '1rem',
                    color: inkColor,
                    fontStyle: 'italic',
                  }}
                >
                  No editions yet. Stay tuned for upcoming releases!
                </Typography>
              </Box>
            ) : (
              <Stack spacing={3} sx={{ maxWidth: 900, mx: 'auto' }}>
                {archives.map((item, index) => (
                  <Fade in timeout={300 + index * 100} key={item.monthId}>
                    <Card
                      elevation={0}
                      sx={{
                        position: 'relative',
                        bgcolor: mode === 'light' 
                          ? 'rgba(255,255,255,0.7)' 
                          : 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${mode === 'light' ? 'rgba(139,115,85,0.2)' : 'rgba(164,144,124,0.2)'}`,
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: accentColor,
                          transform: 'translateY(-4px)',
                          boxShadow: mode === 'light'
                            ? '6px 6px 0px rgba(139,115,85,0.15)'
                            : '6px 6px 0px rgba(164,144,124,0.15)',
                        },
                      }}
                    >
                      {index === 0 && (
                        <Chip
                          icon={<FiberNewIcon />}
                          label="CURRENT"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            zIndex: 1,
                            fontWeight: 'bold',
                            fontFamily: "'Libre Baskerville', serif",
                            bgcolor: accentColor,
                            color: '#FFFFFF',
                            fontSize: '0.7rem',
                          }}
                        />
                      )}

                      <CardActionArea onClick={() => handleArchivePress(item.monthId)}>
                        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                          <Stack 
                            direction={{ xs: 'column', sm: 'row' }} 
                            spacing={3} 
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                          >
                            {/* Icon/Color indicator */}
                            <Box
                              sx={{
                                width: { xs: '100%', sm: 100 },
                                height: 100,
                                borderRadius: '8px',
                                background: `linear-gradient(135deg, ${item.config.coverColor || accentColor} 0%, ${item.config.coverColor || accentColor}dd 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                flexShrink: 0,
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                                },
                              }}
                            >
                              <AutoStoriesIcon
                                sx={{
                                  fontSize: 48,
                                  color: 'rgba(255,255,255,0.7)',
                                  position: 'relative',
                                  zIndex: 1,
                                }}
                              />
                            </Box>

                            {/* Content */}
                            <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                              <Typography
                                sx={{
                                  fontFamily: "'Crimson Text', serif",
                                  fontSize: { xs: '0.9rem', md: '1rem' },
                                  color: accentColor,
                                  fontWeight: 600,
                                  letterSpacing: 2,
                                  textTransform: 'uppercase',
                                  mb: 1,
                                }}
                              >
                                {formatMonthDisplay(item.monthId)}
                              </Typography>

                              <Typography
                                sx={{
                                  fontFamily: "'Satisfy', cursive",
                                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                                  fontWeight: 400,
                                  mb: 1,
                                  color: inkColor,
                                }}
                              >
                                {item.config.themeTitleLine2 || item.config.subtitle || item.config.title}
                              </Typography>

                              {(item.config.themeTitleLine1 || item.config.coverDescription) && (
                                <Typography
                                  sx={{
                                    fontFamily: "'Libre Baskerville', serif",
                                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                                    color: mode === 'light' ? `${inkColor}cc` : `${inkColor}dd`,
                                    fontStyle: 'italic',
                                    mb: 2,
                                  }}
                                >
                                  {item.config.coverDescription || item.config.themeTitleLine1}
                                </Typography>
                              )}

                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                sx={{
                                  pt: 2,
                                  borderTop: `1px solid ${mode === 'light' ? 'rgba(139,115,85,0.2)' : 'rgba(164,144,124,0.2)'}`,
                                }}
                              >
                                <ArticleIcon sx={{ fontSize: 18, color: accentColor }} />
                                <Typography 
                                  sx={{
                                    fontFamily: "'Crimson Text', serif",
                                    fontSize: '0.95rem',
                                    color: accentColor,
                                  }}
                                >
                                  {item.config.columns.length}{' '}
                                  {item.config.columns.length === 1 ? 'article' : 'articles'}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Fade>
                ))}
              </Stack>
            )}

            {/* Decorative flourish */}
            <Box sx={{ mt: 6, mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  color: accentColor,
                  opacity: 0.3,
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
            sx={{
              fontFamily: "'Crimson Text', serif",
              color: accentColor,
              fontSize: '0.95rem',
            }}
          >
            © 2025 {globalConfig.magazineName}. All rights reserved.
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Crimson Text', serif",
              color: accentColor,
              mt: 1,
              fontSize: '0.85rem',
              fontStyle: 'italic',
              opacity: 0.8,
            }}
          >
            Preserving stories, one edition at a time
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ArchiveScreen;
