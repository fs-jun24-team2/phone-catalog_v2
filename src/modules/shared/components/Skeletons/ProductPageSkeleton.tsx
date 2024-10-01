import styles from '../../../ProductsPage/ProductsPage.module.scss';
import cn from 'classnames';
import { BreadcrumbsSkeleton } from './BreadcrumbsSkeleton';
import { PaginationSkeleton } from './PaginationSkeleton';
import { ProductListSkeleton } from './ProductListSkeleton';
import { SortPanelSkeleton } from './SortPanelSkeleton';
import { TitleSkeleton } from './TitleSkeleton';
import React from 'react';

type Props = {
  productsLength: number;
};

export const ProductPageSkeleton: React.FC<Props> = ({ productsLength }) => {
  return (
    <>
      <div className={styles['product-page__breadcrumbs']}>
        <BreadcrumbsSkeleton />
      </div>

      <div className={styles['product-page__header']}>
        <TitleSkeleton />
      </div>

      <div className={styles['product-page__sort-panel']}>
        <SortPanelSkeleton />
      </div>

      {!!productsLength && (
        <div className={styles['product-page__products-list']}>
          <div className={cn('grid-container', [styles['products-list']])}>
            <ProductListSkeleton />
          </div>
          <PaginationSkeleton />
        </div>
      )}
    </>
  );
};
