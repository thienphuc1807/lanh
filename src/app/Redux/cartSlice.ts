import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getLocalStorageItem = (key: string, fallback: any) => {
    if (typeof localStorage !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    }
    return fallback;
};

const setLocalStorageItem = (key: string, value: any) => {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const initialState: Products[] = getLocalStorageItem("Cart", []);
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart(state: Products[], action: PayloadAction<Products>) {
            const productId = action.payload._id;
            const productSize = action.payload.size;
            const productQuantity = action.payload.quantity;

            const productInCart = state.find((item) => item._id === productId);
            const inStockProduct = productInCart?.inStock || 0;

            const totalQuantityProductInCart = state
                .filter((item) => item._id === productId)
                .reduce((acc, item) => acc + item.quantity, 0);

            if (
                productInCart &&
                totalQuantityProductInCart + productQuantity > inStockProduct
            ) {
                return state; // No change if there's not enough stock
            }

            const existingItem = state.find(
                (item) => item._id === productId && item.size === productSize
            );

            if (existingItem) {
                existingItem.quantity += productQuantity;
            } else {
                state.push({ ...action.payload });
            }

            setLocalStorageItem("Cart", state);
        },

        adjustItem(state, action: PayloadAction<number>) {
            const existingItem = state.find(
                (item, index) => index === action.payload
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                }
            }
            localStorage.setItem("Cart", JSON.stringify(state));
        },
        removeItem(state, action: PayloadAction<number>) {
            const updatedState = state.filter(
                (item, index) => index !== action.payload
            );
            setLocalStorageItem("Cart", updatedState);
            return updatedState;
        },
        clearCart() {
            setLocalStorageItem("Cart", []);
            return [];
        },
    },
});

export const { addCart, adjustItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
