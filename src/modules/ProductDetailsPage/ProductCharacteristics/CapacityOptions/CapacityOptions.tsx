import styles from './CapacityOptions.module.scss';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { formatValueWithUnit } from '@/utils/formatValueWithUnit';
import { ProductsCategory } from '@/types/ProductsCategory';
import { ThemeMethodsContext } from '@/context/ThemeContext';

type Props = {
  capacities: string[];
  category: ProductsCategory;
  onSetCapacity: (capacity: string) => void;
  currentCapacity: string;
};

export const CapacityOptions = ({
  capacities,
  category,
  onSetCapacity,
  currentCapacity,
}: Props) => {
  const { t } = useTranslation();

  const handleCapacityClick = (capacity: string) => {
    onSetCapacity(capacity);
  };

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <div
      className={cn(styles['capacity-options'], {
        [styles['capacity-options-dark']]: isDarkTheme,
      })}
    >
      <div className={cn('style-small-text', styles['capacity-options__text'])}>
        {t('select_capacity')}
      </div>

      <div className={styles['capacity-options__capacities']}>
        {capacities.map((capacity, index) => {
          const formatCurrentCapacity =
            category === ProductsCategory.accessories
              ? currentCapacity
              : currentCapacity.toUpperCase();

          const isActive = formatCurrentCapacity === capacity;
          const text = formatValueWithUnit(capacity);

          return (
            <button
              key={index}
              className={cn(
                'style-buttons-text',
                styles['capacity-options__capacity'],
                {
                  [styles['capacity-options__capacity--active']]: isActive,
                },
              )}
              onClick={() => handleCapacityClick(capacity)}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
