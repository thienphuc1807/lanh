import ProductList from "@/components/ProductList";

const getProducts = async () => {
    const res = await fetch(`http://${process.env.DOMAIN}/api/products`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return res.json();
};

const AdminProducts = async () => {
    const products = await getProducts();
    return (
        <div className="p-5">
            <div className="pb-5">
                <button className="py-2 px-4 bg-lanh_green text-white">
                    Add new Product
                </button>
            </div>
            <ProductList products={products} />
        </div>
    );
};

export default AdminProducts;
