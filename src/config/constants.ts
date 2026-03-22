const withOpacity = (rgba: string, opacity: number = 1) => {
  const parts = rgba.split(',');
  parts[3] = ` ${opacity})`;
  return parts.join(',');
};

export const BASE_COLORS = {
  black: (opacity: number = 1) => withOpacity('rgba(30, 28, 22, 1)', opacity),
  white: (opacity: number = 1) =>
    withOpacity('rgba(255, 255, 255, 1)', opacity),

  SUI_COLOR_TEXT: '#0C0C0C',
  SUI_COLOR_TEXT_TERTIARY: '#8B92AC',
  SUI_COLOR_WARNING: '#F79009',
} as const;

export const BASE_URL = 'https://delivery-app-api.sakhdev.ru';
export const API_BASE_URL = `${BASE_URL}/api`;
