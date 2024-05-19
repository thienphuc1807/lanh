import ProductList from "@/components/ProductList";
import Link from "next/link";

const getProducts = async () => {
    const res = await fetch(`http://${process.env.DOMAIN}/api/products`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return res.json();
};

const AdminProducts = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const products = await getProducts();

    return (
        <div className="p-5">
            <div className="pb-5">
                <Link
                    href={"/dashboard/products/formproduct"}
                    className="py-2 px-5 bg-lanh_green text-white rounded-md"
                >
                    Thêm sản phẩm mới
                </Link>
            </div>

            <ProductList searchParams={searchParams} products={products} />
        </div>
    );
};

export default AdminProducts;
