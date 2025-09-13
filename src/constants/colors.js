// Color palette extracted from App.css
// This file contains all color definitions used throughout the application

export const colors = {
  // Primary Colors
  primary: '#7462F6',
  secondary: '#8B7CF6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Background Colors (Light Mode)
  background: {
    primary: '#FAFAFA',
    secondary: '#F8FAFC',
    tertiary: '#F1F5F9',
    card: '#FFFFFF',
    cardHover: '#FEFEFE',
  },

  // Background Colors (Dark Mode)
  backgroundDark: {
    primary: '#0F172A',
    secondary: '#1E293B',
    tertiary: '#334155',
    card: '#1E293B',
    cardHover: '#334155',
  },

  // Border Colors (Light Mode)
  border: {
    color: '#E2E8F0',
    light: '#F1F5F9',
    dark: '#CBD5E1',
  },

  // Border Colors (Dark Mode)
  borderDark: {
    color: '#334155',
    light: '#475569',
    dark: '#1E293B',
  },

  // Text Colors (Light Mode)
  text: {
    primary: '#1E293B',
    secondary: '#475569',
    muted: '#64748B',
    inverse: '#FFFFFF',
  },

  // Text Colors (Dark Mode)
  textDark: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    muted: '#94A3B8',
    inverse: '#1E293B',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #7462F6 0%, #8B7CF6 100%)',
    secondary: 'linear-gradient(135deg, #6051D5 0%, #7462F6 100%)',
    accent: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
    background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
    backgroundDark: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(116, 98, 246, 0.3)',
    glowDark: '0 0 20px rgba(139, 124, 246, 0.4)',
  },

  // Dark Mode Shadows
  shadowsDark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  },

  // Special Colors for Product Types
  productTypes: {
    normal: {
      primary: '#7462F6', // Primary blue
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
      border: 'rgba(59, 130, 246, 0.2)',
      shadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    auction: {
      primary: '#10B981', // Success green
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
      border: 'rgba(34, 197, 94, 0.2)',
      shadow: '0 0 20px rgba(34, 197, 94, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)',
    },
  },

  // Status Colors
  status: {
    completed: '#10B981',
    pending: '#F59E0B',
    cancelled: '#EF4444',
    active: '#3B82F6',
  },

  // Interactive Colors
  interactive: {
    hover: {
      primary: 'rgba(116, 98, 246, 0.1)',
      success: 'rgba(16, 185, 129, 0.1)',
      warning: 'rgba(245, 158, 11, 0.1)',
      error: 'rgba(239, 68, 68, 0.1)',
    },
    focus: {
      primary: 'rgba(116, 98, 246, 0.2)',
      success: 'rgba(16, 185, 129, 0.2)',
      warning: 'rgba(245, 158, 11, 0.2)',
      error: 'rgba(239, 68, 68, 0.2)',
    },
  },

  // Glass Effect Colors
  glass: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },

  // Glass Effect Colors (Dark Mode)
  glassDark: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: 'rgba(51, 65, 85, 0.3)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
  },
};

// Helper function to get colors based on theme
export const getThemeColors = (isDark = false) => {
  return {
    ...colors,
    background: isDark ? colors.backgroundDark : colors.background,
    border: isDark ? colors.borderDark : colors.border,
    text: isDark ? colors.textDark : colors.text,
    shadows: isDark ? colors.shadowsDark : colors.shadows,
    glass: isDark ? colors.glassDark : colors.glass,
  };
};

// CSS Custom Properties (for use in styled-components or CSS-in-JS)
export const cssVariables = {
  // Primary Colors
  '--primary-color': colors.primary,
  '--secondary-color': colors.secondary,
  '--success-color': colors.success,
  '--warning-color': colors.warning,
  '--error-color': colors.error,
  '--info-color': colors.info,

  // Background Colors
  '--background-primary': colors.background.primary,
  '--background-secondary': colors.background.secondary,
  '--background-tertiary': colors.background.tertiary,
  '--card-background': colors.background.card,
  '--card-hover': colors.background.cardHover,

  // Border Colors
  '--border-color': colors.border.color,
  '--border-light': colors.border.light,
  '--border-dark': colors.border.dark,

  // Text Colors
  '--text-primary': colors.text.primary,
  '--text-secondary': colors.text.secondary,
  '--text-muted': colors.text.muted,
  '--text-inverse': colors.text.inverse,

  // Gradients
  '--gradient-primary': colors.gradients.primary,
  '--gradient-secondary': colors.gradients.secondary,
  '--gradient-accent': colors.gradients.accent,
  '--gradient-bg': colors.gradients.background,

  // Shadows
  '--shadow-sm': colors.shadows.sm,
  '--shadow-md': colors.shadows.md,
  '--shadow-lg': colors.shadows.lg,
  '--shadow-xl': colors.shadows.xl,
  '--shadow-glow': colors.shadows.glow,
};

export default colors;
