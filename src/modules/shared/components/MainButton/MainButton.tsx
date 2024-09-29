import React, { useContext } from 'react';
import styles from './MainButton.module.scss';
import cn from 'classnames';
import { ThemeMethodsContext } from '@/context/ThemeContext';

type Props = {
  isAdded?: boolean;
  handleOnClick: (event: React.MouseEvent<HTMLElement>) => void;
  buttonText: string;
  isDisibled?: boolean;
};

export const MainButton: React.FC<Props> = ({
  isAdded = false,
  handleOnClick,
  buttonText,
  isDisibled = false,
}) => {
  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <button
      className={cn(styles['main-button'], {
        [styles['main-button__added']]: isAdded,
        [styles['main-button-dark']]: isDarkTheme,
      })}
      onClick={event => handleOnClick(event)}
      disabled={isDisibled}
    >
      {buttonText}
    </button>
  );
};
