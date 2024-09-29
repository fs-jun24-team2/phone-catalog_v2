import styles from './AddToFavourites.module.scss';

import { useContext, useState } from 'react';
import cn from 'classnames';

import { Product } from '@/types/Product';
import { ProductsCategory } from '@/types/ProductsCategory';
import { AggregateProduct } from '@/types/AggregateProduct';

import { ThemeMethodsContext } from '@/context/ThemeContext';
import { useAppDispatch } from '@/app/hooks';
import { toggleFavourite } from '@/features/favouritesSlice';
import { hasFavouritesProduct } from '@/utils/hasFavouritesProduct';

type Props = {
  product: Product | AggregateProduct;
  category: ProductsCategory;
  id: string;
  className?: string;
};

export const AddToFavourites = ({
  className,
  product,
  id,
  category,
}: Props) => {
  const dispatch = useAppDispatch();
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(
    hasFavouritesProduct(id),
  );

  const handleAddFavourites = () => {
    dispatch(toggleFavourite({ product, category }));
    setIsAddedToFavourites(prev => !prev);
  };

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <button
      className={cn(styles['btn-favourites'], className, {
        [styles['btn-favourites--added']]: isAddedToFavourites,
        [styles['btn-favourites-dark']]: isDarkTheme,
      })}
      onClick={handleAddFavourites}
    ></button>
  );
};
