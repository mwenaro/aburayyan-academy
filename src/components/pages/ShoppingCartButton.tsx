"use client";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { ShoppingCart } from "./ShoppingCart";

export function ShoppingCartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const shoppingCart = useSelector(
    (state: RootState) => state.cart.shoppingCart
  );
  return (
    <div>
      <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shopping-bag h-6 w-6 text-primary"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <span className="absolute -top-2 -right-2 font-bold bg-accent text-foreground rounded-full px-2 py-0.5 text-xs">
          {shoppingCart.length || 0}
        </span>
      </Button>
      <ShoppingCart isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
