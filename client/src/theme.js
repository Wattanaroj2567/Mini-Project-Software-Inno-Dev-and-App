// client/src/theme.js
import { createTheme } from '@mui/material/styles'

const surface = '#f5f3ea'
const primaryMain = '#1f3640'
const accent = '#d9f24d'
const accentHover = '#c7e23e'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: primaryMain, light: '#2c4a56', dark: '#14242c' },
    secondary: { main: accent, light: accent, dark: accentHover },
    background: {
      default: surface,
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2530',
      secondary: '#5d6470',
    },
    divider: '#e2e1d9',
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Poppins", "Prompt", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          minHeight: '100%',
          margin: 0,
          backgroundColor: surface,
          backgroundImage: 'radial-gradient(circle at top, rgba(217,242,77,0.14), rgba(245,243,234,0.92) 45%, rgba(245,243,234,1) 80%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(90deg, #fdfcf7 0%, #eceadf 100%)',
          boxShadow: '0 14px 36px rgba(31,54,64,0.08)',
          color: '#1f2530',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: 999,
          paddingInline: ownerState.size === 'small' ? 18 : 24,
          ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && ({
            backgroundColor: primaryMain,
            color: '#fdfcf8',
            boxShadow: '0 14px 28px rgba(31,54,64,0.18)',
            '&:hover': { backgroundColor: '#152630' },
          })),
          ...(ownerState.variant === 'contained' && ownerState.color === 'secondary' && ({
            backgroundColor: accent,
            color: '#1f2530',
            boxShadow: '0 16px 30px rgba(217,242,77,0.32)',
            '&:hover': { backgroundColor: accentHover },
          })),
          ...(ownerState.variant === 'outlined' && ({
            borderColor: '#1f3640',
            color: '#1f3640',
            '&:hover': {
              borderColor: '#14242c',
              backgroundColor: 'rgba(31,54,64,0.06)',
            },
          })),
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fdfcf8',
          borderRadius: 18,
          border: '1px solid rgba(31,54,64,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 18,
          boxShadow: '0 18px 40px rgba(31,54,64,0.08)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#e2e1d9' },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#f5b84b',
          gap: 2,
        },
        iconEmpty: {
          color: 'rgba(0,0,0,0.15)',
        },
        iconFilled: {
          margin: '0 1px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 20px 45px rgba(15,23,42,0.08)',
        },
      },
    },
  },
})

export default theme
