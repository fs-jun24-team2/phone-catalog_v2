import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './NavMenu.module.scss';
import { menuLinks } from '@/types/ProductsCategory';

type NavMenuProps = {
  language: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isDarkTheme: boolean;
};

export const NavMenu: React.FC<NavMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  isDarkTheme,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.menu__link, { [styles.is_active]: isActive });

  return (
    <nav
      className={cn(styles.menu, {
        [styles.menu__open]: isMenuOpen,
        [styles.dark]: isDarkTheme,
      })}
    >
      <ul className={styles.menu__list}>
        {menuLinks.map(({ path, label }) => (
          <li className={styles.menu__item} key={label}>
            <NavLink
              to={path}
              className={getNavClass}
              onClick={handleLinkClick}
            >
              {t(label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
