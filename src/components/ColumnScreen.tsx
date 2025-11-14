import React, { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { loadMonthConfig, loadColumnContent } from '../utils/contentLoader';
import { Column } from '../types';
import {
  Box,
  Typography,
  Container,
  IconButton,
  Paper,
  Divider,
  Stack,
  Avatar,
  Chip,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { usePenFriends } from '../context/PenFriendContext';
import { useThemeMode } from '../context/ThemeContext';
import ThemeToggleButton from './ThemeToggleButton';

type ColumnScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Column'>;
  route: { params: { monthId: string; columnId: string; columnTitle: string } };
};

const ColumnScreen: React.FC<ColumnScreenProps> = ({ navigation, route }) => {
  const { monthId, columnId } = route.params;
  const [column, setColumn] = useState<Column | null>(null);
  const [content, setContent] = useState<string>('');
  const { isPenFriend, addPenFriend, removePenFriend } = usePenFriends();
  const { mode } = useThemeMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadContent();
  }, [monthId, columnId]);

  const loadContent = async () => {
    try {
      const config = await loadMonthConfig(monthId);
      const columnData = config.columns.find(c => c.id === columnId);
      const columnContent = await loadColumnContent(monthId, columnId);
      
      setColumn(columnData || null);
      setContent(columnContent);
    } catch (error) {
      console.error('Error loading column content:', error);
    }
  };

  // Enhanced markdown renderer with column theme
  const renderContent = (text: string, primaryColor: string, fontFamily: string, textColor: string, fontStyle: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        elements.push(
          <Typography key={index} variant="h3" sx={{ fontWeight: 'bold', mt: 4, mb: 2, color: primaryColor, fontFamily: fontFamily, fontStyle: fontStyle }}>
            {line.substring(2)}
          </Typography>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <Typography key={index} variant="h4" sx={{ fontWeight: 600, mt: 3, mb: 1.5, color: primaryColor, fontFamily: fontFamily, fontStyle: fontStyle }}>
            {line.substring(3)}
          </Typography>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <Typography key={index} variant="h5" sx={{ fontWeight: 600, mt: 2, mb: 1, color: textColor, fontFamily: fontFamily, fontStyle: fontStyle }}>
            {line.substring(4)}
          </Typography>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <Typography key={index} sx={{ fontWeight: 'bold', my: 1, color: textColor, fontFamily: fontFamily, fontStyle: fontStyle }}>
            {line.substring(2, line.length - 2)}
          </Typography>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <Box key={index} sx={{ display: 'flex', my: 0.5, pl: 2 }}>
            <Typography sx={{ mr: 1, color: primaryColor, fontWeight: 'bold' }}>•</Typography>
            <Typography sx={{ flex: 1, lineHeight: 1.8 }}>{line.substring(2)}</Typography>
          </Box>
        );
      } else if (line.match(/^\d+\. /)) {
        const match = line.match(/^(\d+)\. (.+)/);
        if (match) {
          elements.push(
            <Box key={index} sx={{ display: 'flex', my: 0.5, pl: 2 }}>
              <Typography sx={{ mr: 1, color: primaryColor, fontWeight: 'bold' }}>
                {match[1]}.
              </Typography>
              <Typography sx={{ flex: 1, lineHeight: 1.8 }}>{match[2]}</Typography>
            </Box>
          );
        }
      } else if (line.startsWith('---')) {
        elements.push(<Divider key={index} sx={{ my: 3, borderColor: primaryColor, opacity: 0.3 }} />);
      } else if (line.trim() === '') {
        elements.push(<Box key={index} sx={{ height: 16 }} />);
      } else {
        elements.push(
          <Typography key={index} sx={{ lineHeight: 1.8, mb: 1, color: textColor, fontFamily: fontFamily, fontStyle: fontStyle }}>
            {line}
          </Typography>
        );
      }
    });
    
    return elements;
  };

  // Get column theme or use defaults
  const getHeaderStyle = () => {
    const headerStyle = column?.theme?.headerStyle || 'gradient';
    const primaryColor = column?.theme?.primaryColor || '#2C3E50';
    const secondaryColor = column?.theme?.secondaryColor || '#3498DB';

    switch (headerStyle) {
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        };
      case 'solid':
        return {
          background: primaryColor,
        };
      case 'minimal':
        return {
          background: '#FFFFFF',
          borderBottom: `4px solid ${primaryColor}`,
        };
      case 'artistic':
        return {
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${primaryColor} 100%)`,
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 6s ease infinite',
        };
      default:
        return {
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        };
    }
  };

  if (!column) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  const primaryColor = column.theme?.primaryColor || '#2C3E50';
  const textColor = column.theme?.textColor || '#FFFFFF';
  const fontFamily = column.theme?.fontFamily || "'Roboto', sans-serif";
  const fontStyle = column.theme?.fontStyle || 'normal';
  const headerFont = column.theme?.headerFont || undefined;
  const headerStyle = getHeaderStyle();
  const isMinimal = column.theme?.headerStyle === 'minimal';
  
  // Get theme-specific background and text colors
  const contentBgColor = mode === 'light' 
    ? (column.theme?.backgroundColor?.light || 'background.paper')
    : (column.theme?.backgroundColor?.dark || 'background.paper');
  
  const contentTextColor = mode === 'light'
    ? (column.theme?.contentTextColor?.light || 'text.primary')
    : (column.theme?.contentTextColor?.dark || 'text.primary');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: contentBgColor, overflowY: 'auto', overflowX: 'hidden' }}>
      {/* Custom Column Header */}
      <Box
        sx={{
          ...headerStyle,
          color: isMinimal ? primaryColor : textColor,
          py: 5,
          px: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
          '@keyframes gradient-shift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      >
        <Container maxWidth="md">
          {/* Back Button and Theme Toggle */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <IconButton
              onClick={() => navigation.goBack()}
              sx={{
                color: isMinimal ? primaryColor : textColor,
                '&:hover': {
                  bgcolor: isMinimal ? 'action.hover' : 'rgba(255,255,255,0.1)',
                },
              }}
              aria-label="go back"
            >
              <ArrowBackIcon />
            </IconButton>
            <ThemeToggleButton color={isMinimal ? primaryColor : textColor} />
          </Stack>

          {/* Column Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              textShadow: isMinimal 
                ? 'none' 
                : textColor === '#FFFFFF' || textColor === 'white'
                  ? '0 2px 10px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)'
                  : '0 1px 3px rgba(255,255,255,0.5)',
              WebkitTextStroke: isMinimal ? 'none' : '0.3px rgba(255,255,255,0.3)',
              fontFamily: headerFont || 'inherit',
            }}
          >
            {column.title}
          </Typography>

          {/* Category Label */}
          {column.theme?.categoryLabel && (
            <Chip
              label={column.theme.categoryLabel}
              size="small"
              sx={{
                mb: 2,
                bgcolor: isMinimal ? `${primaryColor}20` : 'rgba(255,255,255,0.2)',
                color: isMinimal ? primaryColor : textColor,
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            />
          )}

          {/* Author Info with Pen Friend Button */}
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: isMobile ? 2 : 0 }}>
              <Avatar
                sx={{
                  bgcolor: isMinimal ? primaryColor : 'rgba(255,255,255,0.2)',
                  color: isMinimal ? '#FFFFFF' : textColor,
                }}
              >
                <PersonIcon />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {column.author.name}
                </Typography>
                {column.author.bio && (
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {column.author.bio}
                  </Typography>
                )}
              </Box>
              {/* Hide button for columns 7 and 9 (anamnisi and papaya-rules) */}
              {!isMobile && column.author.email && (
                <Button
                  variant={column.author.email ? 'contained' : (isPenFriend(column.author.name) ? 'outlined' : 'contained')}
                  startIcon={
                    column.author.email ? <PersonAddIcon /> : (isPenFriend(column.author.name) ? <PersonRemoveIcon /> : <PersonAddIcon />)
                  }
                  onClick={() => {
                    if (column.author.email) {
                      // Open email client
                      window.location.href = `mailto:${column.author.email}?subject=Connecting from Pages Magazine`;
                    } else {
                      if (isPenFriend(column.author.name)) {
                        removePenFriend(column.author.name);
                      } else {
                        addPenFriend(column.author.name);
                      }
                    }
                  }}
                  sx={{
                    bgcolor: column.author.email 
                      ? (isMinimal ? primaryColor : 'rgba(255,255,255,0.2)')
                      : (isPenFriend(column.author.name)
                        ? 'transparent'
                        : isMinimal
                        ? primaryColor
                        : 'rgba(255,255,255,0.2)'),
                    color: isMinimal && !isPenFriend(column.author.name) ? '#FFFFFF' : textColor,
                    borderColor: isPenFriend(column.author.name) && !column.author.email ? textColor : 'transparent',
                    '&:hover': {
                      bgcolor: column.author.email
                        ? (isMinimal ? `${primaryColor}dd` : 'rgba(255,255,255,0.3)')
                        : (isPenFriend(column.author.name)
                          ? 'rgba(255,255,255,0.1)'
                          : isMinimal
                          ? `${primaryColor}dd`
                          : 'rgba(255,255,255,0.3)'),
                    },
                  }}
                >
                  {column.author.email 
                    ? 'Add Pen Pal' 
                    : ''
                  }
                </Button>
              )}
            </Stack>
            
            {/* Mobile button - full width, right aligned */}
            {isMobile && column.id !== 'anamnisi' && column.id !== 'papaya-rules' && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant={column.author.email ? 'contained' : (isPenFriend(column.author.name) ? 'outlined' : 'contained')}
                  startIcon={
                    column.author.email ? <PersonAddIcon /> : (isPenFriend(column.author.name) ? <PersonRemoveIcon /> : <PersonAddIcon />)
                  }
                  onClick={() => {
                    if (column.author.email) {
                      // Open email client
                      window.location.href = `mailto:${column.author.email}?subject=Connecting from Pages Magazine`;
                    } else {
                      if (isPenFriend(column.author.name)) {
                        removePenFriend(column.author.name);
                      } else {
                        addPenFriend(column.author.name);
                      }
                    }
                  }}
                  sx={{
                    bgcolor: column.author.email 
                      ? (isMinimal ? primaryColor : 'rgba(255,255,255,0.2)')
                      : (isPenFriend(column.author.name)
                        ? 'transparent'
                        : isMinimal
                        ? primaryColor
                        : 'rgba(255,255,255,0.2)'),
                    color: isMinimal && !isPenFriend(column.author.name) ? '#FFFFFF' : textColor,
                    borderColor: isPenFriend(column.author.name) && !column.author.email ? textColor : 'transparent',
                    '&:hover': {
                      bgcolor: column.author.email
                        ? (isMinimal ? `${primaryColor}dd` : 'rgba(255,255,255,0.3)')
                        : (isPenFriend(column.author.name)
                          ? 'rgba(255,255,255,0.1)'
                          : isMinimal
                          ? `${primaryColor}dd`
                          : 'rgba(255,255,255,0.3)'),
                    },
                  }}
                >
                  {column.author.email 
                    ? 'Add Pen Pal' 
                    : (isPenFriend(column.author.name) ? 'Remove Pen Friend' : 'Make Pen Friend')
                  }
                </Button>
              </Box>
            )}
          </Box>

        </Container>
      </Box>

      {/* Article Content with Column Theme */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            bgcolor: contentBgColor,
            borderRadius: 2,
            borderTop: `4px solid ${primaryColor}`,
            color: contentTextColor,
          }}
        >
          {renderContent(content, primaryColor, fontFamily, contentTextColor, fontStyle)}
        </Paper>
      </Container>
    </Box>
  );
};

export default ColumnScreen;
