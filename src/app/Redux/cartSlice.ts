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
            const productInCart = state.find(
                (item) => item._id === action.payload._id
            );

            const inStockProduct = productInCart?.inStock
                ? productInCart.inStock
                : 0;

            const totalQuantityProductInCart = state
                .filter((item) => item._id === action.payload._id)
                .reduce((acc, item) => acc + item.quantity, 0);

            const existingItem = state.find(
                (item) =>
                    item.size === action.payload.size &&
                    item._id === action.payload._id
            );

            if (action.payload.size) {
                if (existingItem) {
                    if (
                        totalQuantityProductInCart + action.payload.quantity >
                        inStockProduct
                    ) {
                        alert("Not enough stock to add the requested quantity");
                        return;
                    } else {
                        existingItem.quantity += action.payload.quantity;
                    }
                } else {
                    state.push({ ...action.payload });
                }
            } else {
                alert("Choose Size Required!");
                return;
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
