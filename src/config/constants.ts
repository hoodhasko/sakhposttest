const withOpacity = (rgba: string, opacity: number = 1) => {
  const parts = rgba.split(',');
  parts[3] = ` ${opacity})`;
  return parts.join(',');
};

export const BASE_COLORS = {
  error: (opacity: number = 1) => withOpacity('rgba(236, 0, 0, 1)', opacity),
  black: (opacity: number = 1) => withOpacity('rgba(30, 28, 22, 1)', opacity),
  green: (opacity: number = 1) => withOpacity('rgba(11, 157, 15, 1)', opacity),
  orange: (opacity: number = 1) => withOpacity('rgba(255, 81, 2, 1)', opacity),
  blueLight: (opacity: number = 1) =>
    withOpacity('rgba(5, 81, 250, 1)', opacity),
  blueDark: (opacity: number = 1) =>
    withOpacity('rgba(3, 55, 169, 1)', opacity),
  peach: (opacity: number = 1) =>
    withOpacity('rgba(255, 179, 124, 1)', opacity),
  white: (opacity: number = 1) =>
    withOpacity('rgba(255, 255, 255, 1)', opacity),
} as const;

export const BASE_URL = 'https://delivery-app-api.sakhdev.ru';
export const API_BASE_URL = `${BASE_URL}/api`;
