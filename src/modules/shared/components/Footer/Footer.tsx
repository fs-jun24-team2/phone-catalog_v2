import styles from './Footer.module.scss';
import footer_logo from '/images/original/footer/logo.svg';
import footer_dark_logo from '/images/original/footer/logoblack.svg';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import { ThemeMethodsContext } from '@/context/ThemeContext';
import { scrollToTop } from '../../helpers/scrollToTop';
import { useFooterLinks } from '@/hooks/useFooterLinks';

export const Footer = () => {
  const { t } = useTranslation();
  const links = useFooterLinks();

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <footer>
      <div
        className={cn(styles['footer'], {
          [styles['footer-dark']]: isDarkTheme,
        })}
      >
        <img src={isDarkTheme ? footer_dark_logo : footer_logo} alt="Logo" />
        <div className={styles['footer__link']}>
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={
                link.href.startsWith('http') ? 'noopener noreferrer' : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className={styles['footer__go-back-btn']} onClick={scrollToTop}>
          <div>{t('back_to_top')}</div>
          <div className={styles['footer__go-back-btn__icon']}></div>
        </div>
      </div>
    </footer>
  );
};
