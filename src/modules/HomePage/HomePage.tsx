import styles from './HomePage.module.scss';
import { useAppSelector } from '@/app/hooks';
import { useTranslation } from 'react-i18next';
import { PictureSlider } from './components/PictureSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import cn from 'classnames';

import {
  getHotPriceProduct,
  getNewBrandProduct,
} from '@/features/aggregateSlice';
import { AggregateProduct } from '@/types/AggregateProduct';
import { useContext } from 'react';
import { ThemeMethodsContext } from '@/context/ThemeContext';

export const HomePage = () => {
  const { t } = useTranslation();
  const hotPriceProducts = useAppSelector(getHotPriceProduct);
  const newBrandProduct = useAppSelector(getNewBrandProduct);
  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <>
      <h1
        className={cn('style-h1', styles['home-page__title'], {
          [styles['home-page__title-dark']]: isDarkTheme,
        })}
      >
        {t('home__title')}
      </h1>

      <div className={styles['home-page__content-container']}>
        <PictureSlider />

        <ProductsSlider<AggregateProduct>
          title={t('brand_new_models')}
          products={newBrandProduct}
        />

        <ShopByCategory />

        <ProductsSlider<AggregateProduct>
          title={t('hot_prices')}
          products={hotPriceProducts}
        />
      </div>
    </>
  );
};
