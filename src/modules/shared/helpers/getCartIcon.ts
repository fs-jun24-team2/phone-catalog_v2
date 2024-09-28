import { Theme } from '@/types/Theme';

const cartIcons = {
  original: 'images/original/icons/original_cart.svg',
  dark: 'images/dark/icons/dark_cart.svg',
};

export const getCartIcon = (theme: Theme) => {
  return cartIcons[theme];
};
