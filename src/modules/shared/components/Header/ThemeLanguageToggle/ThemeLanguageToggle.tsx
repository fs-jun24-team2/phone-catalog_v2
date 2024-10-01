import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ThemeLanguageToggle.module.scss';
import original_ua from '/images/original/icons/original_ua.svg';
import original_gb from '/images/original/icons/original_gb.svg';
import { ThemeContext } from '@/context/ThemeContext';
import cn from 'classnames';

import user from '/images/users/Vitalii.jpeg';
import { Theme } from '@/types/Theme';
import { getThemeIcon } from '@/modules/shared/helpers/getThemeIcon';
import { getUserIcon } from '@/modules/shared/helpers/getUserIcon';
import { Path } from '@/types/Path';

type ThemeLanguageToggleProps = {
  language: string;
  changeLanguage: () => void;
  toggleTheme: () => void;
};

export const ThemeLanguageToggle: React.FC<ThemeLanguageToggleProps> = ({
  language,
  changeLanguage,
  toggleTheme,
}) => {
  const [isUserIconActive, setIsUserIconActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useContext(ThemeContext);
  const isDarkTheme = theme === Theme.dark;

  const isDashboardPage = location.pathname === Path.dashboard;
  const handleUserIconCLick = () => {
    if (location.pathname === Path.register) {
      setIsUserIconActive(false);
      navigate(-1);
    } else {
      setIsUserIconActive(true);
      navigate(Path.register);
    }
  };
  return (
    <div
      className={cn(styles.theme_language_toggle, {
        [styles.dark]: isDarkTheme,
      })}
    >
      <button className={styles.theme_toggle} onClick={changeLanguage}>
        <img
          className={styles.flags}
          src={language === 'en' ? original_ua : original_gb}
          alt="Switch Language"
        />
      </button>
      <button className={styles.theme_toggle} onClick={toggleTheme}>
        <img
          className={styles.sunMoon}
          src={getThemeIcon(theme)}
          alt="Switch Theme"
        />
      </button>
      <button onClick={handleUserIconCLick} className={styles.theme_toggle}>
        <img
          className={styles.user_logo}
          src={isDashboardPage ? user : getUserIcon(theme, isUserIconActive)}
          alt="User"
        />
      </button>
    </div>
  );
};
