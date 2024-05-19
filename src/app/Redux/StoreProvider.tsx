"use client";
import { ReactNode } from "react";
import store from "./store";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
