import UserProducts from "@/components/UserProducts";

export const metadata = {
    title: "Sản phẩm",
};

const getData = async () => {
    const res = await fetch(`http://${process.env.DOMAIN}/api/products`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Something went wrong");
    }

    return res.json();
};

const Products = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    // Fetch Data with API
    const data = await getData();
    return (
        <div className="container mx-auto md:px-5 px-2">
            <UserProducts data={data} searchParams={searchParams} />
        </div>
    );
};

export default Products;
