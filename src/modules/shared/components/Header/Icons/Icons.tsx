import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Icons.module.scss';

import { Path } from '@/types/Path';
import { ThemeLanguageToggle } from '../ThemeLanguageToggle';
import { useNavigate } from 'react-router-dom';
import { ThemeContext, ThemeMethodsContext } from '@/context/ThemeContext';
import { useAppSelector } from '@/app/hooks';
import { getCartAmount } from '@/features/cartSlice';
import { getFavouritesAmount } from '@/features/favouritesSlice';
import { getFavouriteIcon } from '@/modules/shared/helpers/getFavouriteIcon';
import { getCartIcon } from '@/modules/shared/helpers/getCartIcon';

type IconsProps = {
  language: string;
  changeLanguage: () => void;
  setIsMenuOpen: (value: boolean) => void;
};

export const Icons: React.FC<IconsProps> = ({
  language,
  changeLanguage,
  setIsMenuOpen,
}) => {
  const theme = useContext(ThemeContext);
  const { toggleTheme } = useContext(ThemeMethodsContext);
  const navigate = useNavigate();
  const cartCount = useAppSelector(getCartAmount);
  const favouritesCount = useAppSelector(getFavouritesAmount);

  const handleCartClick = () => {
    setIsMenuOpen(false);
    navigate(Path.cart);
  };

  return (
    <div className={styles.icons}>
      <ThemeLanguageToggle
        language={language}
        changeLanguage={changeLanguage}
        toggleTheme={toggleTheme}
      />

      <div className={styles.iconWrapper}>
        <Link to={Path.favourites}>
          <img src={getFavouriteIcon(theme)} alt="Favorites logo" />
          {!!favouritesCount && (
            <span className={styles.badge}>{favouritesCount}</span>
          )}
        </Link>
      </div>
      <div className={styles.iconWrapper} onClick={handleCartClick}>
        <Link to={Path.cart}>
          <img src={getCartIcon(theme)} alt="Cart logo" />
          {!!cartCount && <span className={styles.badge}>{cartCount}</span>}
        </Link>
      </div>
    </div>
  );
};
