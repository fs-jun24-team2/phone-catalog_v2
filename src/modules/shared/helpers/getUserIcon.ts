import { Theme } from '@/types/Theme';

const userIcons = {
  normal: {
    original: 'images/original/icons/original_user.svg',
    dark: 'images/dark/icons/dark_user.svg',
  },
  active: {
    original: 'images/original/icons/original_user_active.svg',
    dark: 'images/dark/icons/dark_user_active.svg',
  },
};

export const getUserIcon = (theme: Theme, isActive: boolean) => {
  return isActive ? userIcons.active[theme] : userIcons.normal[theme];
};
