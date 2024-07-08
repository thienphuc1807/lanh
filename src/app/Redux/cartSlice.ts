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
        addCart(state, action: PayloadAction<Products>) {
            const existingItem = state.find(
                (item) => item._id === action.payload._id
            );
            if (existingItem) {
                // Check if there's enough stock to add the requested quantity
                if (
                    existingItem.inStock &&
                    existingItem.inStock >=
                        existingItem.quantity + action.payload.quantity
                ) {
                    existingItem.quantity += action.payload.quantity;
                } else {
                    // Optionally handle the case where there's not enough stock
                    console.warn(
                        "Not enough stock to add the requested quantity"
                    );
                }
            } else {
                // Only add the new item if there's enough stock
                if (
                    action.payload.inStock &&
                    action.payload.quantity <= action.payload.inStock
                ) {
                    state.push({ ...action.payload });
                } else {
                    // Optionally handle the case where there's not enough stock
                    console.warn(
                        "Not enough stock to add the item to the cart"
                    );
                }
            }
            setLocalStorageItem("Cart", state);
        },
        adjustItem(state, action: PayloadAction<Products>) {
            const existingItem = state.find(
                (item) => item._id === action.payload._id
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                }
            }
            localStorage.setItem("Cart", JSON.stringify(state));
        },
        removeItem(state, action: PayloadAction<{ _id: string }>) {
            const updatedState = state.filter(
                (item) => item._id !== action.payload._id
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
