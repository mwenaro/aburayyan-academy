"use client"

import { filterProducts } from "@/store/features/productSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { SubCategorySection } from "./SubCategorySection";


export default function CategorySection() {
  const dispatch = useDispatch();
  const { activeCategory,productCategories} = useSelector(
    (state: RootState) => state.products
  );
  const handleFilter = (category: string) => {
    dispatch(filterProducts(category));
  };
  const categories = productCategories
  console.log({ categories })
  

  return (
    <>
    <div className="w-ful  container px-4 block overflow-x-scroll">
        <h2 className="text-xl md:text-2xl font-bold py-2">Shop by Category</h2>

      <div className="w-full px-2 md:p-5  flex justify-between flex-wrap md:justify-start overflow-hidden items-center">
        {categories.map((category: string) => {
          // if (category === "all")
          //   return (
          //     <Button
          //       onClick={() => dispatch(resetFilter())}
          //       className={cn(
          //         activeCategory === category ? "bg-red-600 text-white" : "",
          //         "capitalize bg-slate-200"
          //       )}
          //     >
          //       All
          //     </Button>
          //   );
          return (
            <Button
              key={category}
              onClick={() => handleFilter(category)}
              className={cn(
                "capitalize bg-slate-200 text-blue-600 w-5/12 sm:w-fit m-2",
                activeCategory == category ? "bg-red-600 text-white" : ""
              )}
            >
              {category}
            </Button>
          );
        })}
      </div>

    </div>
    <SubCategorySection />
    </>
  );
}
