/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getProducts } from '../api/products';
import { Product, ProductDictionary } from '../types/Product';
import { ProductsCategory } from '@/types/ProductsCategory';

type ProductsSlice = {
  phones: ProductDictionary;
  tablets: ProductDictionary;
  accessories: ProductDictionary;
  isLoading: boolean;
  isError: boolean;
};

const initialState: ProductsSlice = {
  phones: {},
  tablets: {},
  accessories: {},
  isLoading: false,
  isError: false,
};

export const loadProductsAsync = createAsyncThunk(
  'products/load',
  async (category: ProductsCategory) => {
    const products = await getProducts(category);
    return { category, products };
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadProductsAsync.pending, (state: ProductsSlice) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        loadProductsAsync.fulfilled,
        (
          state: ProductsSlice,
          action: PayloadAction<{
            category: ProductsCategory;
            products: Product[];
          }>,
        ) => {
          const { category, products } = action.payload;
          state.isLoading = false;
          products.forEach(product => {
            state[category][product.id] = product;
          });
        },
      )
      .addCase(loadProductsAsync.rejected, (state: ProductsSlice) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products;
export const selectPhones = (state: RootState) => state.products.phones;
export const selectTablets = (state: RootState) => state.products.tablets;
export const selectProductsLoading = (state: RootState) =>
  state.products.isLoading;
export const selectAccessories = (state: RootState) =>
  state.products.accessories;
