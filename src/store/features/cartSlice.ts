// features/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: any;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  shoppingCart: CartItem[];
}

const initialState: CartState = {
  shoppingCart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.shoppingCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.shoppingCart.push({ ...item, quantity: 1 });
      }
    },
    reduceFromCart: (state, action: PayloadAction<string|any>) => {
      const productId = action.payload;
      const existingItem = state.shoppingCart.find(
        (cartItem) => cartItem._id === productId
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.shoppingCart = state.shoppingCart.filter(
          (cartItem) => cartItem._id !== productId
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<string|any>) => {
      const productId = action.payload;
      state.shoppingCart = state.shoppingCart.filter(
        (cartItem) => cartItem._id !== productId
      );
    },
  },
});

export const { addToCart, reduceFromCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
