"use client";

import {
  filterBySubCategory,
  filterProducts,
} from "@/store/features/productSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function SubCategorySection() {
  const dispatch = useDispatch();
  const {
    activeCategory,
    activeSubCategory,
    productSubCategories,
  } = useSelector((state: RootState) => state.products);

  const handleFilter = (subCategory: string) => {
    dispatch(filterBySubCategory(subCategory));
  };

  // Do not display subcategories if there is only one (likely "all")
  if (productSubCategories.length < 2) return null;

  return (
    <div className="w-ful container px-4 block overflow-x-scroll">
      <h2 className="text-xl md:text-2xl font-bold py-2">Filter by SubCategory</h2>

      <div className="w-full px-2 md:p-5 flex justify-between flex-wrap md:justify-start overflow-hidden items-center">
        {productSubCategories.map((subCategory: string) => (
          <Button
            key={subCategory}
            onClick={() => handleFilter(subCategory)}
            className={cn(
              "capitalize bg-slate-200 text-blue-600 w-5/12 sm:w-fit m-2",
              activeSubCategory === subCategory ? "bg-red-600 text-white" : ""
            )}
          >
            {subCategory} {/* Display subCategory instead of activeSubCategory */}
          </Button>
        ))}
      </div>
    </div>
  );
}
