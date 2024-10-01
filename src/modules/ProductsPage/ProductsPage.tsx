import original_notFound from '/images/original/notFound/original-notFound.png';
import styles from './ProductsPage.module.scss';

import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import {
  selectProducts,
  selectProductsLoading,
} from '@/features/productsSlice';
import { selectAggregateLoading } from '@/features/aggregateSlice';
import { useAppSelector } from '@/app/hooks';
import { ThemeMethodsContext } from '@/context/ThemeContext';

import { useFilteredProducts } from '@/hooks/useFilteredProduct';
import { ProductsCategory } from '@/types/ProductsCategory';
import { SearchParamsType } from '@/types/SearchParamsType';

import { getProductPageTitle } from './helpers/getProductPageTitle';
import { scrollToTop } from '../shared/helpers/scrollToTop';

import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { SortAndPaginationPanel } from './SortAndPagination/SortAndPagination';
import { Pagination } from '../shared/components/Pagination';
import { ProductsList } from './ProductsList';
import { VirtualAssistant } from '../VirtualAssistant';
import { ProductPageSkeleton } from '../shared/components/Skeletons/ProductPageSkeleton';

export const ProductsPage = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const productsCategory = location.pathname.slice(1) as ProductsCategory;

  const query = new URLSearchParams(location.search);
  const searchQuery = query.get(SearchParamsType.query);

  const savedPage = Number(localStorage.getItem('currentPage'));

  const [title, setTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(savedPage);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const products = useAppSelector(selectProducts);
  const isProductsLoading = useAppSelector(selectProductsLoading);
  const isAggregatesLoading = useAppSelector(selectAggregateLoading);
  const isLoading = isProductsLoading || isAggregatesLoading;

  const productList = Object.values(products[productsCategory]);
  const totalItems = productList.length;

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  useEffect(() => {
    setIsDelayedLoading(true);
    const timer = setTimeout(() => {
      setIsDelayedLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [productsCategory, currentPage]);

  useEffect(() => {
    const newTitle = getProductPageTitle(productsCategory);

    setTitle(t(newTitle));
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, t]);

  useEffect(() => {
    const newSearchTerm = searchQuery ? searchQuery : '';
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page.toString());
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    localStorage.setItem('currentPage', '1');
  };

  const filteredProducts = useFilteredProducts(productList, { searchTerm });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  if (isDelayedLoading || isLoading) {
    return <ProductPageSkeleton productsLength={filteredProducts.length} />;
  }

  return (
    <>
      <div className={styles['product-page__breadcrumbs']}>
        <Breadcrumbs />
      </div>
      <div className={styles['product-page__header']}>
        <h1
          className={cn('style-h1', styles['product-page__title'], {
            [styles['product-page__title-dark']]: isDarkTheme,
          })}
        >
          {title}
        </h1>
        <p
          className={cn(
            'style-buttons-text',
            styles['product-page__product-amount'],
          )}
        >
          {totalItems} {t('models')}
        </p>
      </div>
      <div className={styles['product-page__sort-panel']}>
        <SortAndPaginationPanel
          onHandleItemPerPage={handleItemsPerPageChange}
          totalItems={totalItems}
        />
      </div>
      {!!filteredProducts.length && (
        <div className={styles['product-page__products-list']}>
          <ProductsList
            products={paginatedProducts}
            category={productsCategory}
          />

          {totalPages > 1 && (
            <Pagination
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
      {!filteredProducts.length && !isLoading && (
        <div className={styles.notfound}>
          <img src={original_notFound} alt="Product not found" />
        </div>
      )}

      <VirtualAssistant onSearch={setSearchTerm} />
    </>
  );
};
