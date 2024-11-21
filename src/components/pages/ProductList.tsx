"use client";
// ProductList.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { RootState } from './store';
// import { filterProducts, resetFilter } from './store/features/productSlice';
import { RootState } from "@/store/store";
import { addToCart } from "@/store/features/cartSlice";
import {
  filterProducts,
  resetFilter,
  setProducts,
  setActiveCategory,
} from "@/store/features/productSlice";
import { IProduct } from "@/models/Product";
import { ProductCard } from "./ProductCard";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
// import { addToCart } from './features/cartSlice';
interface ProductListProps {
  defaultProducts?: IProduct[];
  sectionTitle?: string;
  children?: React.ReactNode;
}

export const ProductList: React.FC<ProductListProps> = ({
  defaultProducts = [],
  sectionTitle,
}) => {
  const dispatch = useDispatch();
  const { activeCategory, products, filteredProducts } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!products.length) dispatch(setProducts(defaultProducts));
  }, []);

  useEffect(() => {}, [setActiveCategory]);
  // const handleSetActiveCategory = (category: string) => {
  //   dispatch(setActiveCategory(category));
  // };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    // console.log({ product });
  };
  filteredProducts;
  
  ;
  return (
    <div className="w-full">
          
      <h2 className="text-2xl font-bold py-4">{sectionTitle? sectionTitle : 'Featured Products'}</h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
        {(filteredProducts.length > 0 ? filteredProducts : products).map(
          (prod: IProduct, index) => (
            <ProductCard
              onClick={() => handleAddToCart(prod)}
              key={index}
              image={prod.imgUrl}
              name={prod.name}
              price={prod.price}
              description={prod.description!}
            />
          )
        )}
      </div>
    </div>
  );
};
