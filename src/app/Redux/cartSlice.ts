import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Products[] =
    localStorage.getItem("Cart") !== null
        ? JSON.parse(localStorage.getItem("Cart") || "[]")
        : [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart(state, action: PayloadAction<Products>) {
            const existingItem = state.find(
                (item) => item._id === action.payload._id
            );
            if (existingItem) {
                if (existingItem.inStock > existingItem.quantity) {
                    existingItem.quantity += 1;
                }
            } else {
                state.push(action.payload);
            }
            localStorage.setItem("Cart", JSON.stringify(state));
        },
        removeCart(state, action: PayloadAction<Products>) {
            const existingItem = state.find(
                (item) => item._id === action.payload._id
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    const updatedState = state.filter(
                        (item) => item._id !== action.payload._id
                    );
                    localStorage.setItem("Cart", JSON.stringify(updatedState));
                    return updatedState;
                }
            }
            localStorage.setItem("Cart", JSON.stringify(state));
        },
        clearItem(state, action: PayloadAction<{ _id: string }>) {
            const updatedState = state.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem("Cart", JSON.stringify(updatedState));
            return updatedState;
        },
    },
});

export const { addCart, removeCart, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
