import { Theme } from '@/types/Theme';

const logoIcons = {
  original: 'images/original/logo/original_logo.svg',
  dark: 'images/dark/logo/dark_logo.svg',
};

export const getLogoIcon = (theme: Theme) => {
  return logoIcons[theme];
};
