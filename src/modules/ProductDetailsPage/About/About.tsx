import React, { useContext } from 'react';
import styles from './About.module.scss';
import { PhoneDescription } from '@/types/Product';
import { AboutItem } from './AboutItem';
import { useTranslation } from 'react-i18next';
import { ThemeMethodsContext } from '@/context/ThemeContext';

interface AboutProps {
  description: PhoneDescription[];
}

export const About: React.FC<AboutProps> = ({ description }) => {
  const { t } = useTranslation();
  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <section
      className={`${styles['about']} ${isDarkTheme ? styles['about-dark'] : ''}`}
    >
      <h2 className={styles['about__title']}>{t('about')}</h2>
      {description.map((item, index) => (
        <AboutItem key={index} item={item} />
      ))}
    </section>
  );
};
