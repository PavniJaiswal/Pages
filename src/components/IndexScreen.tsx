import React, { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { loadMonthConfig, loadMonthTheme, formatMonthDisplay } from '../utils/contentLoader';
import { globalStyles, mergeStyles } from '../utils/styleLoader';
import { MonthConfig, Column } from '../types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Container,
  IconButton,
  Chip,
  Fade,
  Divider,
  Stack,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import ArchiveIcon from '@mui/icons-material/Archive';
import ThemeToggleButton from './ThemeToggleButton';
import { useThemeMode } from '../context/ThemeContext';

type IndexScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Index'>;
  route: { params: { monthId: string } };
};

const IndexScreen: React.FC<IndexScreenProps> = ({ navigation, route }) => {
  const { monthId } = route.params;
  const [config, setConfig] = useState<MonthConfig | null>(null);
  const [styles, setStyles] = useState<any>(globalStyles);
  const [editorNoteExpanded, setEditorNoteExpanded] = useState(false);
  const { mode } = useThemeMode();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    loadContent();
  }, [monthId]);

  const loadContent = async () => {
    try {
      const monthConfig = await loadMonthConfig(monthId);
      const monthTheme = await loadMonthTheme(monthId);
      setConfig(monthConfig);
      
      if (monthTheme) {
        setStyles(mergeStyles(monthTheme));
      }
    } catch (error) {
      console.error('Error loading index content:', error);
    }
  };

  const handleColumnPress = (column: Column) => {
    navigation.navigate('Column', { 
      monthId, 
      columnId: column.id,
      columnTitle: column.title 
    });
  };

  if (!config) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  const sortedColumns = [...config.columns].sort((a, b) => a.order - b.order);
  const isNovember = monthId === '2025-11';
  
  // Better contrast colors for November
  let primaryColor, backgroundColor, cardBackground, textPrimary, textSecondary;
  
  if (isNovember) {
    if (mode === 'dark') {
      primaryColor = '#5A6B4A'; // Brighter sage for header
      backgroundColor = '#1A1F17'; // Very dark background
      cardBackground = '#2C3428'; // Dark sage cards
      textPrimary = '#E8F0DC'; // Light text
      textSecondary = '#C5D4B0'; // Medium light text
    } else {
      primaryColor = '#8A9D6F'; // Medium sage for header
      backgroundColor = '#F5F8F0'; // Very light background
      cardBackground = '#FFFFFF'; // White cards
      textPrimary = '#3A4234'; // Very dark text
      textSecondary = '#5A6245'; // Dark text
    }
  } else {
    primaryColor = styles.colors.primary;
    backgroundColor = mode === 'dark' ? '#121212' : '#F5F5F5';
    cardBackground = mode === 'dark' ? '#1E1E1E' : '#FFFFFF';
    textPrimary = mode === 'dark' ? '#E0E0E0' : '#333333';
    textSecondary = mode === 'dark' ? '#B0B0B0' : '#555555';
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: backgroundColor, overflowY: 'auto' }}>
      {/* Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
          color: isNovember ? (mode === 'dark' ? '#FFFFFF' : '#FFFFFF') : 'white',
          py: 4,
          px: 3,
          boxShadow: isNovember 
            ? (mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.15)')
            : '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <IconButton
              onClick={() => navigation.goBack()}
              sx={{ color: 'white' }}
              aria-label="go back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 'bold', flex: 1 }}>
              Table of Contents
            </Typography>
            <ThemeToggleButton color="white" />
          </Stack>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, ml: 6 }}>
            {formatMonthDisplay(monthId)}
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Editor's Note */}
        {config.editorNote && (
          <Fade in timeout={200}>
            <Card
              elevation={3}
              sx={{
                mb: 4,
                borderLeft: `4px solid ${primaryColor}`,
                bgcolor: cardBackground,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: primaryColor,
                    }}
                  />
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      color: primaryColor,
                    }}
                  >
                    Editor's Note
                  </Typography>
                </Stack>
                <Box sx={{ pl: 3 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: textSecondary,
                      lineHeight: 1.8,
                      fontStyle: 'italic',
                      ...(!editorNoteExpanded && {
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }),
                    }}
                  >
                    {config.editorNote}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setEditorNoteExpanded(!editorNoteExpanded)}
                    sx={{
                      mt: 1,
                      color: primaryColor,
                      textTransform: 'none',
                      fontStyle: 'italic',
                      fontSize: '0.875rem',
                      p: 0,
                      minWidth: 'auto',
                      '&:hover': {
                        bgcolor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {editorNoteExpanded ? 'Read less' : 'Read more'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
          {sortedColumns.map((column, index) => (
            <Box 
              key={column.id} 
              sx={{ 
                width: { xs: '100%', md: 'calc(33.333% - 16px)' },
                display: 'flex',
              }}
            >
              <Fade in timeout={300 + index * 100} style={{ width: '100%', display: 'flex' }}>
                <Card
                  elevation={2}
                  sx={{
                    bgcolor: mode === 'light'
                      ? (column.theme?.backgroundColor?.light || cardBackground)
                      : (column.theme?.backgroundColor?.dark || cardBackground),
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: isNovember 
                        ? (mode === 'dark' 
                            ? '0 8px 24px rgba(90,107,74,0.3)' 
                            : '0 8px 24px rgba(138,157,111,0.2)')
                        : column.theme?.backgroundColor
                          ? `0 8px 24px ${column.theme.primaryColor}40`
                          : '0 8px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleColumnPress(column)}
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Number Badge - uses column theme if available */}
                      <Box
                        sx={{
                          width: isLargeScreen ? 60 : 50,
                          height: isLargeScreen ? 60 : 50,
                          borderRadius: '12px',
                          bgcolor: column.theme?.primaryColor || primaryColor,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: isLargeScreen ? '1.5rem' : '1.2rem',
                          boxShadow: `0 4px 12px ${column.theme?.primaryColor || primaryColor}40`,
                          mb: 2,
                          mx: isLargeScreen ? 'auto' : 0,
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </Box>

                      {/* Content */}
                      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: isLargeScreen ? 'center' : 'left' }}>
                        <Typography
                          variant={isLargeScreen ? 'h5' : 'h6'}
                          sx={{
                            fontWeight: 600,
                            mb: 1.5,
                            color: mode === 'light'
                              ? (column.theme?.contentTextColor?.light || textPrimary)
                              : (column.theme?.contentTextColor?.dark || textPrimary),
                          }}
                        >
                          {column.title}
                        </Typography>

                        <Stack 
                          direction="row" 
                          spacing={1} 
                          alignItems="center" 
                          mb={1.5}
                          sx={{ justifyContent: isLargeScreen ? 'center' : 'flex-start' }}
                        >
                          <PersonIcon sx={{ 
                            fontSize: 18, 
                            color: mode === 'light'
                              ? (column.theme?.contentTextColor?.light || textSecondary)
                              : (column.theme?.contentTextColor?.dark || textSecondary)
                          }} />
                          <Typography variant="body2" sx={{ 
                            color: mode === 'light'
                              ? (column.theme?.contentTextColor?.light || textSecondary)
                              : (column.theme?.contentTextColor?.dark || textSecondary),
                          }}>
                            {column.author.name}
                          </Typography>
                        </Stack>

                        <Typography
                          variant="body2"
                          sx={{
                            color: mode === 'light'
                              ? (column.theme?.contentTextColor?.light || textSecondary)
                              : (column.theme?.contentTextColor?.dark || textSecondary),
                            fontStyle: column.theme?.fontStyle || 'italic',
                            lineHeight: 1.6,
                            fontFamily: column.theme?.fontFamily || 'inherit',
                            mb: 1.5,
                          }}
                        >
                          {column.excerpt || '\u00A0'}
                        </Typography>

                        {/* Column Theme Indicator */}
                        {column.theme && (
                          <Stack 
                            direction="row" 
                            spacing={0.5} 
                            sx={{ 
                              mt: 'auto',
                              justifyContent: isLargeScreen ? 'center' : 'flex-start'
                            }}
                          >
                            <Chip
                              label={column.theme.categoryLabel || column.theme.headerStyle || 'custom'}
                              size="small"
                              sx={{
                                fontSize: '0.7rem',
                                height: 20,
                                bgcolor: `${column.theme.primaryColor}20`,
                                color: column.theme.primaryColor,
                                textTransform: 'capitalize',
                              }}
                            />
                          </Stack>
                        )}
                      </Box>

                      {/* Arrow - only show on mobile */}
                      {!isLargeScreen && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                          <ArrowForwardIcon
                            sx={{
                              color: column.theme?.primaryColor || primaryColor,
                              fontSize: 28,
                            }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Fade>
            </Box>
          ))}
        </Box>

        {/* Archive Link */}
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Chip
            icon={<ArchiveIcon />}
            label="Browse Archive"
            onClick={() => navigation.navigate('Archive')}
            sx={{
              fontSize: '1rem',
              py: 3,
              px: 2,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                '& .MuiChip-icon': {
                  color: 'white',
                },
              },
              transition: 'all 0.3s ease',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default IndexScreen;
