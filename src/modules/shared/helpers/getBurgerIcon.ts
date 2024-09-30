import { Theme } from '@/types/Theme';

const burgerIcons = {
  original: {
    open: 'images/original/icons/original_burger_open.svg',
    close: 'images/original/icons/original_burger_close.svg',
  },
  dark: {
    open: 'images/dark/icons/dark_burger_open.svg',
    close: 'images/dark/icons/dark_burger_close.svg',
  },
};

export const getBurgerIcon = (isMenuOpen: boolean, theme: Theme) => {
  if (!theme) {
    return burgerIcons.original.open;
  }
  console.log('theme', theme);
  console.log('burgerIcons[theme]', burgerIcons[theme]);
  console.log('burgerIcons[theme].open', burgerIcons[theme].open);
  return isMenuOpen ? burgerIcons[theme].close : burgerIcons[theme].open;
};
