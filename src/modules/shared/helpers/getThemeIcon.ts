import { Theme } from '@/types/Theme';

const themeIcons = {
  original: 'images/original/icons/original_moon.svg',
  dark: 'images/dark/icons/dark_sun.svg',
};

export const getThemeIcon = (theme: Theme) => {
  return themeIcons[theme];
};
