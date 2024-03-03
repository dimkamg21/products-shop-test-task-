import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageService } from "../../helpers/localStorageService.ts";
import { Product } from "../../types/Product.ts";
import { useFetch } from "../../helpers/customHooks/useFetch.tsx";

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

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async (newProduct: Omit<Product, 'id'>, thunkAPI) => {
    try {
      const productWithId = { id: Date.now().toString(), ...newProduct };

      const response = await axios.post('http://localhost:3001/products', productWithId);
      
      return response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (productId: string, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/products/${productId}`);

      return productId;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (updateProduct: Product, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3001/products/${updateProduct.id}`, updateProduct);

      console.log(response.data);
      

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        throw error;
      }
    }
  }
);

export const productsSlice = createSlice({
  name: key,
  initialState,
  reducers: {},
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

    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      localStorageService.setLocalStorageData(key, state.products);
    });

    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
      localStorageService.setLocalStorageData(key, state.products);
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        localStorageService.setLocalStorageData(key, state.products);
      }
    })
  },
});

export default productsSlice.reducer;
