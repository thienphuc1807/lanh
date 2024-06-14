import Cart from "@/components/Cart";
import React from "react";
import { auth } from "@/lib/auth";

const page = async () => {
    const session = await auth();

    return <Cart session={session} />;
};

export default page;
