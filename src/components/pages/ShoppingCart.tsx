import React, { useEffect, useState } from "react";
import {
  addToCart,
  reduceFromCart,
  removeFromCart,
} from "@/store/features/cartSlice";
import { Modal } from "../ui/modal";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { CheckoutDetails } from "./CheckoutDetails";

interface ShippingCartProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}
export function ShoppingCart({ isOpen, setIsOpen }: ShippingCartProps) {
  const [total, setTotal] = useState(0);
  const [checkedOut, setCheckOut] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.shoppingCart);

  // Correctly calculate the total amount
  const getTotalAmount = () =>
    cartItems.reduce((a, val) => a + val.price * val.quantity, 0);

  // Handle item increase
  const handleIncrease = (id: string) => {
    const item = cartItems.find((i) => i._id === id);
    if (item) {
      dispatch(addToCart(item));
    }
  };

  // Update total whenever cartItems changes
  useEffect(() => {
    setTotal(getTotalAmount());
  }, [cartItems, checkedOut]);

  // Handle item decrease
  const handleDecrease = (id: string) => {
    dispatch(reduceFromCart(id));
  };

  // Handle item removal
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const shoppingCart = useSelector(
    (state: RootState) => state.cart.shoppingCart
  );

  const cartContainer = shoppingCart.length ? (
    <>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item._id} className="flex items-center py-4">
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                <span className="font-medium">{item.name}</span>
                <span className="ml-2 text-gray-500">
                  - Ksh {+item.price.toFixed(2)} x {item.quantity}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleIncrease(item._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleDecrease(item._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="p-5">
        <h3 className="font-semibold text-lg">
          Total Amount: Ksh {total.toFixed(2)}
        </h3>
      </div>
    </>
  ) : (
    <p>Your cart is empty.</p>
  );

  return (
    <Modal
      title="Shopping Cart"
      description="Your selected items are listed below"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      {!checkedOut ? cartContainer : ""}
      {/* checkout Deatils */}
      {!checkedOut || (!checkedOut && shoppingCart.length > 1) ? (
        <Button onClick={() => setCheckOut(true)}>Proced to Checkout</Button>
      ) : (
        ""
      )}
      {checkedOut ? <CheckoutDetails cart={shoppingCart} /> : ""}
    </Modal>
  );
}
