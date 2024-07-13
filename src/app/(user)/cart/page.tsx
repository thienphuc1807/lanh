import Cart from "@/components/Cart";
import React from "react";
import { auth } from "@/lib/auth";

const page = async () => {
    const session = await auth();

    return (
        <div className="min-h-screen">
            <Cart session={session} />
        </div>
    );
};

export default page;
