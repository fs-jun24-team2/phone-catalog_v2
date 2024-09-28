import { ProductsCategory } from './ProductsCategory';

export interface AggregateProduct {
  id: number;
  category: ProductsCategory;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}
