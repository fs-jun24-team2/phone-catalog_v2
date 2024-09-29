import cn from 'classnames';

import { useAppSelector } from '@/app/hooks';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

import { selectFavourites } from '@/features/favouritesSlice';
import { FavouritesList } from './components/FavouritesList';

import styles from './FavouritesPage.module.scss';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeMethodsContext } from '@/context/ThemeContext';

export const FavouritesPage = () => {
  const { t } = useTranslation();
  const isDarkTheme = useContext(ThemeMethodsContext);
  const items = useAppSelector(selectFavourites);
  const isEmpty = items.length === 0;

  return (
    <>
      <div className={cn('grid-container')}>
        <div className={styles['favourites-page__breadcrumbs']}>
          <Breadcrumbs />
        </div>

        <div
          className={cn(styles['favourites-page__header'], {
            [styles['favourites-page__header-dark']]: isDarkTheme,
          })}
        >
          <h1 className={cn('style-h1', styles['favourites-page__title'])}>
            {t('favourites')}
          </h1>

          <p
            className={cn(
              'style-buttons-text',
              styles['favourites-page__product-amount'],
            )}
          >
            {items.length} {t('models')}
          </p>
        </div>

        <div
          className={cn(styles['favourites-page__products-list'], {
            [styles['favourites-page--empty']]: isEmpty,
          })}
        >
          <FavouritesList items={items} />
        </div>
      </div>
    </>
  );
};
