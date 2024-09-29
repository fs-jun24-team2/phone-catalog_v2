import styles from './ProductDetailsPage.module.scss';

import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Product } from '@/types/Product';
import { ProductsCategory } from '@/types/ProductsCategory';
import { scrollToTop } from '../shared/helpers/scrollToTop';
import { ThemeMethodsContext } from '@/context/ThemeContext';
import { ProductCharacteristics } from './ProductCharacteristics';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductNotFoundPage } from './ProductNotFoundPage';
import { ProductId } from './ProductCharacteristics/ProductId';
import { About } from './About';
import { TechSpecs } from './TechSpecs';
import { AlsoLike } from './AlsoLike';
import { Gallery } from './Gallery';
import { getProduct } from '@/api/products';

export const ProductDetailsPage = () => {
  const { t } = useTranslation();

  const [product, setProduct] = useState<Product | null>(null);
  const [isError, setIsError] = useState(false);

  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  const category = pathParts[1] as ProductsCategory;

  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getProduct(id as string, category)
      .then(product => {
        if (product) {
          setProduct(product);
        } else {
          setIsError(true);
        }
      })
      .catch(() => setIsError(true));
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, id]);

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  if (isError) {
    return <ProductNotFoundPage />;
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <div className={styles['breadcrumbs']}>
        <Breadcrumbs />
      </div>

      <button
        className={styles['product-details-page__button-back']}
        onClick={handleBack}
      >
        <div
          className={cn(styles['product-details-page__button-back-icon'], {
            [styles['product-details-page__button-back-icon-dark']]:
              isDarkTheme,
          })}
        ></div>
        <p
          className={cn(styles['style-small-text'], {
            [styles['style-small-text-dark']]: isDarkTheme,
          })}
        >
          {t('back')}
        </p>
      </button>

      <h1
        className={cn(
          'style-h2',
          styles['product-details-page__product-title'],
          { [styles['product-details-page__product-title-dark']]: isDarkTheme },
        )}
      >
        {product.name}
      </h1>

      <div
        className={cn('grid-container', styles['gallery-and-characteristics'])}
      >
        <Gallery images={product.images} />
        <ProductCharacteristics product={product} category={category} />
        <ProductId id={product.id} />
      </div>

      <div className={cn('grid-container', styles['about'])}>
        <About description={product.description} />
        <TechSpecs specs={product} />
      </div>

      <AlsoLike category={category} currentId={product.id} />

      <div style={{ paddingTop: '80px' }}></div>
    </>
  );
};
