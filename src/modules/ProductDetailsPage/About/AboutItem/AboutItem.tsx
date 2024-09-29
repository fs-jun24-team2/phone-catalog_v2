import styles from './AboutItem.module.scss';

import React, { useContext } from 'react';
import cn from 'classnames';
import { ThemeMethodsContext } from '@/context/ThemeContext';
import { PhoneDescription } from '@/types/Product';
import { AboutText } from '../AboutText';

interface AboutItemProps {
  item: PhoneDescription;
}

export const AboutItem: React.FC<AboutItemProps> = ({ item }) => {
  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <div className={styles.text_container}>
      <h3
        className={cn(styles['text_title'], {
          [styles['text_title-dark']]: isDarkTheme,
        })}
      >
        {item.title}
      </h3>
      <AboutText text={item.text} />
    </div>
  );
};
