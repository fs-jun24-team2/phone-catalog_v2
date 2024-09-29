import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import cn from 'classnames';
import styles from './ShopByCategory.module.scss';
import { useAppSelector } from '@/app/hooks';
import { selectProducts } from '@/features/productsSlice';
import { useCategoriesData } from '@/hooks/useCategoriesData';
import { ThemeMethodsContext } from '@/context/ThemeContext';

export const ShopByCategory = () => {
  const { t } = useTranslation();
  const products = useAppSelector(selectProducts);
  const phoneAmount = Object.keys(products.phones).length;
  const tabletsAmount = Object.values(products.tablets).length;
  const accessoriesAmount = Object.values(products.accessories).length;

  const categories = useCategoriesData({
    phoneAmount,
    tabletsAmount,
    accessoriesAmount,
  });

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <div className={cn({ [styles['category-dark']]: isDarkTheme })}>
      <h2 className={cn(styles['style-h2'], styles['category-high-title'])}>
        {t('shop_by_category')}
      </h2>

      <section className={styles['all-categories']}>
        {categories.map((category, ind) => (
          <div className={styles['category']} key={ind}>
            <Link to={category.path}>
              <img
                src={category.img}
                className={styles['all-categories__picture']}
              />
              <div
                className={cn(
                  styles['style-h4'],
                  styles['all-categories__title'],
                )}
              >
                {category.title}
              </div>
            </Link>

            <div
              className={cn(
                styles['body-text'],
                styles['all-categories__amount'],
              )}
            >
              {category.amount} {t('models')}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
