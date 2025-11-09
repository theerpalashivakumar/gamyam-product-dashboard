import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_DATA } from "../../assets/data/productData";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: PRODUCTS_DATA,
    filteredProducts: PRODUCTS_DATA,
  },
  
  reducers: {
    addproduct: (state, action) => {
      state.products.push(action.payload);
      state.filteredProducts = state.products;
    },
    updateproduct: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.filteredProducts = state.products;
      }
    },
    deleteproduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.filteredProducts = state.products;
    },
    filterProducts: (state, action) => {
      const searchLower = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    },
  },
});

export const { addproduct, updateproduct, deleteproduct, filterProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
