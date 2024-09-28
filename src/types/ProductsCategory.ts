import { Path } from './Path';

export enum ProductsCategory {
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
}

export const menuLinks = [
  { path: Path.main, label: 'home' },
  { path: Path.phones, label: ProductsCategory.phones },
  { path: Path.tablets, label: ProductsCategory.tablets },
  { path: Path.accessories, label: ProductsCategory.accessories },
];
