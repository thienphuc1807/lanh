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
            console.log(action.payload);

            const existingItem = state.find(
                (item) => item._id === action.payload._id
            );
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.push(action.payload);
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
        },
    },
});

export const { addCart, adjustItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
