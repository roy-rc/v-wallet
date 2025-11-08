import { colors, spacing, typography, borderRadius, shadows } from './tokens';

// Componentes base reutilizables
export const baseStyles = {
  // Contenedores
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray100,
    padding: spacing.md,
  },

  card: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    boxShadow: shadows.md,
    width: '100%',
    maxWidth: '500px',
  },

  // Dashboard específicos
  dashboardContainer: {
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: colors.gray100,
    paddingBottom: spacing.xl,
  },

  dashboard: {
    display: 'flex',
    gap: spacing.xl,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: spacing.xl,
  },

  mobileDashboard: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto',
  },

  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    boxShadow: shadows.sm,
  },

  mobileContent: {
    backgroundColor: colors.white,
    margin: spacing.md,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    boxShadow: shadows.sm,
  },

  // Tipografía
  heading: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.gray900,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: typography.fontSizes.base,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },

  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    color: colors.gray800,
    fontSize: typography.fontSizes.xl,
  },

  titleIcon: {
    flexShrink: 0,
  },

  // Formularios
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    width: '100%',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  label: {
    marginBottom: spacing.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.gray800,
    fontSize: typography.fontSizes.sm,
  },

  input: {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    border: `1px solid ${colors.gray300}`,
    borderRadius: borderRadius.base,
    fontSize: typography.fontSizes.base,
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    outline: 'none',
    boxSizing: 'border-box',
    
    '&:focus': {
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primary}25`,
    },

    '&:read-only': {
      backgroundColor: colors.gray100,
      cursor: 'not-allowed',
    },
  },

  // Estados de error
  error: {
    color: colors.danger,
    fontSize: typography.fontSizes.xs,
    marginTop: spacing.xs,
    fontWeight: typography.fontWeights.medium,
  },

  // Footer de formularios
  formFooter: {
    textAlign: 'center',
    marginTop: spacing.lg,
    color: colors.gray600,
    fontSize: typography.fontSizes.sm,
  },

  link: {
    color: colors.primary,
    textDecoration: 'none',
    fontWeight: typography.fontWeights.medium,
    
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  // Info boxes
  balanceInfo: {
    backgroundColor: colors.gray200,
    padding: spacing.md,
    borderRadius: borderRadius.base,
    marginBottom: spacing.md,
  },

  sessionInfo: {
    backgroundColor: colors.primary + '15',
    border: `1px solid ${colors.primary}30`,
    padding: spacing.md,
    borderRadius: borderRadius.base,
    marginBottom: spacing.md,
  },

  countdown: {
    color: colors.danger,
    fontWeight: typography.fontWeights.bold,
  },

  noSession: {
    textAlign: 'center',
    padding: spacing.xl,
    color: colors.gray600,
  },
};

// Botones estandarizados
export const buttonStyles = {
  base: {
    padding: `${spacing.sm} ${spacing.lg}`,
    border: 'none',
    borderRadius: borderRadius.base,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.medium,
    cursor: 'pointer',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },

  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
    
    '&:hover:not(:disabled)': {
      backgroundColor: colors.primaryDark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
    
    '&:active:not(:disabled)': {
      transform: 'translateY(0)',
      boxShadow: shadows.sm,
    },
  },

  success: {
    backgroundColor: colors.success,
    color: colors.white,
    
    '&:hover:not(:disabled)': {
      backgroundColor: colors.successDark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
  },

  danger: {
    backgroundColor: colors.danger,
    color: colors.white,
    
    '&:hover:not(:disabled)': {
      backgroundColor: colors.dangerDark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
  },

  secondary: {
    backgroundColor: colors.gray500,
    color: colors.white,
    
    '&:hover:not(:disabled)': {
      backgroundColor: colors.gray600,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
  },

  outline: {
    backgroundColor: 'transparent',
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
    
    '&:hover:not(:disabled)': {
      backgroundColor: colors.primary,
      color: colors.white,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
  },
};

// Componentes de navegación
export const navigationStyles = {
  // Desktop Sidebar
  sidebar: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    boxShadow: shadows.sm,
    height: 'fit-content',
    minWidth: '250px',
  },

  sidebarTitle: {
    marginBottom: spacing.md,
    color: colors.gray800,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
  },

  activeTab: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
    padding: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.primary,
    color: colors.white,
    border: 'none',
    borderRadius: borderRadius.base,
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    position: 'relative',
  },

  inactiveTab: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
    padding: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.gray100,
    color: colors.gray800,
    border: `1px solid ${colors.gray300}`,
    borderRadius: borderRadius.base,
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    position: 'relative',
    transition: 'all 0.2s',
    
    '&:hover': {
      backgroundColor: colors.gray200,
      borderColor: colors.primary,
    },
  },

  tabIcon: {
    fontSize: typography.fontSizes.lg,
  },

  tabLabel: {
    flex: 1,
  },

  tabBadge: {
    backgroundColor: colors.danger,
    color: colors.white,
    borderRadius: borderRadius.full,
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.bold,
  },

  // Mobile Navigation
  mobileNavContainer: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderBottom: `1px solid ${colors.gray300}`,
    position: 'sticky',
    top: '80px',
    zIndex: 100,
  },

  mobileNavButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.primary,
    color: colors.white,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    cursor: 'pointer',
    justifyContent: 'center',
  },

  mobileNavMenu: {
    position: 'fixed',
    top: '140px',
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.xl,
    padding: spacing.sm,
    zIndex: 1000,
    maxHeight: 'calc(100vh - 160px)',
    overflowY: 'auto',
  },

  mobileNavItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
    padding: spacing.md,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: typography.fontSizes.base,
    cursor: 'pointer',
    marginBottom: spacing.xs,
    position: 'relative',
  },

  mobileNavItemActive: {
    backgroundColor: colors.primary,
    color: colors.white,
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
};

// Componentes de alerta
export const alertStyles = {
  base: {
    padding: spacing.md,
    borderRadius: borderRadius.base,
    marginBottom: spacing.md,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  success: {
    backgroundColor: colors.successLight + '40',
    color: colors.successDark,
    border: `1px solid ${colors.successLight}`,
  },

  error: {
    backgroundColor: colors.dangerLight + '40',
    color: colors.dangerDark,
    border: `1px solid ${colors.dangerLight}`,
  },

  warning: {
    backgroundColor: colors.warningLight + '40',
    color: colors.warningDark,
    border: `1px solid ${colors.warningLight}`,
  },

  info: {
    backgroundColor: colors.primaryLight + '40',
    color: colors.primaryDark,
    border: `1px solid ${colors.primaryLight}`,
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  icon: {
    marginRight: spacing.sm,
    fontWeight: typography.fontWeights.bold,
    fontSize: typography.fontSizes.base,
  },

  message: {
    fontSize: typography.fontSizes.sm,
  },

  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: typography.fontSizes.lg,
    cursor: 'pointer',
    padding: '0',
    marginLeft: spacing.md,
    opacity: 0.7,
    
    '&:hover': {
      opacity: 1,
    },
  },
};

// Navbar estilos
export const navbarStyles = {
  navbar: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: `${spacing.md} 0`,
    boxShadow: shadows.sm,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },

  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing.md}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
  },

  brandTitle: {
    margin: 0,
    fontWeight: typography.fontWeights.bold,
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    flexWrap: 'wrap',
  },

  userName: {
    fontWeight: typography.fontWeights.bold,
    fontSize: typography.fontSizes.sm,
    whiteSpace: 'nowrap',
  },

  userBalance: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: borderRadius.full,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    whiteSpace: 'nowrap',
  },

  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: colors.white,
    border: 'none',
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: borderRadius.base,
    cursor: 'pointer',
    fontSize: typography.fontSizes.sm,
    transition: 'background-color 0.2s',
    whiteSpace: 'nowrap',
    
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.3)',
    },
  },
};

// Loading spinner estilos
export const loadingStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },

  spinner: {
    border: `4px solid ${colors.gray300}`,
    borderTop: `4px solid ${colors.primary}`,
    borderRadius: borderRadius.full,
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },

  message: {
    marginTop: spacing.md,
    color: colors.gray600,
    fontSize: typography.fontSizes.sm,
  },
};

// App layout estilos
export const appStyles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  main: {
    flex: 1,
  },

  // Loading screen específico de la app
  appLoading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: colors.gray100,
  },

  appLoadingSpinner: {
    border: `4px solid ${colors.gray300}`,
    borderTop: `4px solid ${colors.primary}`,
    borderRadius: borderRadius.full,
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    marginBottom: spacing.md,
  },

  appLoadingText: {
    color: colors.gray600,
    fontSize: typography.fontSizes.base,
  },

  // 404 Page
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 80px)',
    textAlign: 'center',
    padding: spacing.xl,
  },

  notFoundTitle: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.gray900,
    marginBottom: spacing.md,
  },

  notFoundText: {
    fontSize: typography.fontSizes.lg,
    color: colors.gray600,
    marginBottom: spacing.xl,
  },

  homeLink: {
    display: 'inline-block',
    padding: `${spacing.sm} ${spacing.lg}`,
    backgroundColor: colors.primary,
    color: colors.white,
    textDecoration: 'none',
    borderRadius: borderRadius.base,
    fontWeight: typography.fontWeights.medium,
    transition: 'all 0.2s ease-in-out',
    
    '&:hover': {
      backgroundColor: colors.primaryDark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
  },
};