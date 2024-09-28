import { Theme } from '@/types/Theme';

const userIcons = {
  original: 'images/original/icons/original_user.svg',
  dark: 'images/dark/icons/dark_user.svg',
};

export const getUserIcon = (theme: Theme) => {
  return userIcons[theme];
};
