import styles from './ColorOptions.module.scss';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { ThemeMethodsContext } from '@/context/ThemeContext';
import { ProductId } from '../ProductId';

type Props = {
  colors: string[];
  onSetColor: (color: string) => void;
  currentColor: string;
  id?: string;
};

export const ColorOptions = ({
  colors,
  onSetColor,
  currentColor,
  id,
}: Props) => {
  const { t } = useTranslation();
  const handleColorClick = (color: string) => {
    onSetColor(color);
  };

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <div
      className={cn(styles['color-options'], {
        [styles['color-options-dark']]: isDarkTheme,
      })}
    >
      <div className={styles['color-options__header']}>
        <div className={cn('style-small-text', styles['color-options__title'])}>
          {t('available_colors')}
        </div>

        {id && <ProductId id={id} />}
      </div>

      <div className={styles['color-options__colors']}>
        {colors.map((color, index) => {
          const isActive = currentColor === color;
          const style = { backgroundColor: color };

          return (
            <button
              key={index}
              className={cn(styles['color-options__color'], {
                [styles['color-options__color--active']]: isActive,
                [styles['color-options-dark__color']]: isDarkTheme,
              })}
              style={style}
              onClick={() => handleColorClick(color)}
            />
          );
        })}
      </div>
    </div>
  );
};
