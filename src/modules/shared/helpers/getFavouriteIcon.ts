import { Theme } from '@/types/Theme';

const favouriteIcons = {
  original: 'images/original/icons/original_favorites.svg',
  dark: 'images/dark/icons/dark_favorites.svg',
};

export const getFavouriteIcon = (theme: Theme) => {
  return favouriteIcons[theme];
};
