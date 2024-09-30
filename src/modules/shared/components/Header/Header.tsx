import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import styles from './Header.module.scss';
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import { Icons } from './Icons';

import { ThemeContext } from '@/context/ThemeContext';
import { Theme } from '@/types/Theme';
import { getBurgerIcon } from '../../helpers/getBurgerIcon';
import { OPEN_MENU_CLASS } from '@/constants';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const theme = useContext(ThemeContext);
  const isDarkTheme = theme === Theme.dark;
  const burgerIcon = getBurgerIcon(isMenuOpen, theme);

  const { i18n } = useTranslation();

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ua' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.classList.add(OPEN_MENU_CLASS);
    } else {
      document.body.classList.remove(OPEN_MENU_CLASS);
    }
  };

  return (
    <header
      className={cn(styles.header, {
        [styles.header_dark]: isDarkTheme,
        [styles.menu_open]: isMenuOpen,
      })}
    >
      <div className={styles.header__container}>
        <Logo />
        <NavMenu
          language={i18n.language}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isDarkTheme={isDarkTheme}
        />
        <Icons
          language={i18n.language}
          changeLanguage={changeLanguage}
          setIsMenuOpen={setIsMenuOpen}
        />
        <div className={styles.burger_icon} onClick={toggleMenu}>
          <img src={burgerIcon} alt="Burger icon" />
        </div>
      </div>
    </header>
  );
};
