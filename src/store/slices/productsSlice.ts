import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localStorageService } from "../../helpers/localStorageService.ts";
import { Product } from "../../types/Product.ts";
import { useFetch } from "../../helpers/customHooks/useFetch.tsx";

export const fetchInitialProducts = createAsyncThunk(
  "products/fetchInitialPosts",
  async () => {
    try {
      const jsonData: Product[] = await useFetch('http://localhost:3001/products');
      const localStorageData: Product[] = localStorageService.getLocalStorageData(key) || [];
      
      const uniqueJsonData = jsonData.filter(jsonProduct => {
        return !localStorageData.find(localPost => localPost.id === jsonProduct.id);
      });
      
      const initialProducts = [...localStorageData, ...uniqueJsonData];
      
      return initialProducts;
    } catch (error) {
      console.error("Error fetching initial products:", error);
      throw error;
    }
  },
);

const key = "products";

interface productsState {
  products: Product[];
  isLoading: boolean,
  hasError: boolean,
}

const initialState: productsState = {
  products: [],
  isLoading: false,
  hasError: false,
};

export const productsSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      state.products.push({
        id: Date.now(),
        ...action.payload
      });

      localStorageService.setLocalStorageData(key, state.products);
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
      localStorageService.setLocalStorageData(key, state.products);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchInitialProducts.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });

    builder.addCase(fetchInitialProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.hasError = false;
    });

    builder.addCase(fetchInitialProducts.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { addNewProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
