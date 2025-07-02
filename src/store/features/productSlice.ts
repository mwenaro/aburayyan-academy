// features/productSlice.ts
import { ICategory } from "@/models/Category";
import { IProduct } from "@/models/Product";
import { ISubCategory } from "@/models/SubCategory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: IProduct[];
  filteredProducts: IProduct[];
  activeCategory: string;
  activeSubCategory: string;
  productCategories: string[];
  productSubCategories: string[];
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  activeCategory: "all",
  activeSubCategory: "all",
  productCategories: [],
  productSubCategories: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.productCategories = []
      state.productCategories = Array.from(
        new Set([
          "all",
          ...state.products
            .map((p: any) => p?.category?.name)
            .filter((category) => category),
        ])
      );
    },
    
    filterProducts: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      state.activeCategory = category;
      state.activeSubCategory = "all"; // Reset subcategory when category changes
      
      if (category === "all") {
        state.productSubCategories = []
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => (product?.category as ICategory)?.name === category
        );
        
        // Set subCategories dynamically
        state.productSubCategories = Array.from(
          new Set([
            "all",
            ...state.filteredProducts
              .map((p: any) => p?.subCategory?.name)
              .filter((subCategory) => subCategory),
          ])
        );
      }
    },

    filterBySubCategory: (state, action: PayloadAction<string>) => {
      const subCategory = action.payload;
      state.activeSubCategory = subCategory;

      if (state.activeCategory === "all") {
        state.productCategories = []
        state.filteredProducts = state.products;
      } else if (state.activeSubCategory === "all") {
        // If only category is active, ignore subcategory
        state.filteredProducts = state.products.filter(
          (product) => (product?.category as ICategory)?.name === state.activeCategory
        );
      } else {
        // Filter by both category and subcategory
        state.filteredProducts = state.products.filter(
          (product) =>
            (product?.category as ICategory)?.name === state.activeCategory &&
            (product?.subCategory as ISubCategory)?.name === subCategory
        );
      }
    },

    resetFilter: (state) => {
      state.filteredProducts = [];
      state.activeCategory = "all";
      state.activeSubCategory = "all";
    },

    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    
    setActiveSubCategory: (state, action: PayloadAction<string>) => {
      state.activeSubCategory = action.payload;
    },
  },
});

export const { filterProducts, filterBySubCategory, resetFilter, setProducts, setActiveCategory, setActiveSubCategory } = productSlice.actions;
export default productSlice.reducer;
