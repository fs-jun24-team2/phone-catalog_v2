import styles from './AboutText.module.scss';
import React, { useContext } from 'react';
import cn from 'classnames';
import { ThemeMethodsContext } from '@/context/ThemeContext';

interface AboutTextProps {
  text: string[];
}

export const AboutText: React.FC<AboutTextProps> = ({ text }) => {
  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <>
      {text.map((paragraph, idx) => (
        <div key={idx}>
          <p
            className={cn(styles['text'], {
              [styles['text-dark']]: isDarkTheme,
            })}
          >
            {paragraph}
          </p>
          <br />
        </div>
      ))}
    </>
  );
};
