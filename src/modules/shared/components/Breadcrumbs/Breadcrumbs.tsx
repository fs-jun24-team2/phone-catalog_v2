import styles from './Breadcrumbs.module.scss';
import breadcrumbs_home from '/images/original/breadcrumbs/home.svg';
import breadcrumbs_dark_home from '/images/original/breadcrumbs/homedark.svg';

import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { ThemeMethodsContext } from '@/context/ThemeContext';
import { Crumb } from './Crumb/Crumb';

export const Breadcrumbs = () => {
  const location = useLocation();

  const { isDarkTheme } = useContext(ThemeMethodsContext);
  const crumbs = location.pathname.split('/').filter(crumb => crumb !== '');

  return (
    <div
      className={cn(styles['breadcrumbs'], {
        [styles['breadcrumbs-dark']]: isDarkTheme,
      })}
    >
      <Link to="/">
        <img
          className={styles['breadcrumbs__icon-home']}
          src={isDarkTheme ? breadcrumbs_dark_home : breadcrumbs_home}
          alt="Home"
        />
      </Link>
      <span className={styles['separator']}></span>
      <Crumb crumbs={crumbs} />
    </div>
  );
};
