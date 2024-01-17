import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/data";

export const metadata = {
    title: "Sản phẩm",
};

const getData = async () => {
    const data = await fetch("http://localhost:3000/api/products", {
        cache: "no-store",
    });
    if (!data.ok) {
        throw new Error("Something went wrong");
    }
    return data.json();
};

const Products = async () => {
    // Fetch Data Without API
    // const data = await getProducts();

    // Fetch Data with API
    const data = await getData();
    return (
        <main className="bg-lanhBackground bg-no-repeat bg-cover">
            <div className="container mx-auto px-5 gap-6 lg:pt-[200px] pt-[100px]">
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                    {data.map((item: Products) => (
                        <Link
                            href={`products/${item._id}`}
                            key={item._id}
                            className="bg-white border-[1px] px-2"
                        >
                            <div className="relative mt-5 w-auto h-52">
                                <Image
                                    fill={true}
                                    src={item.img}
                                    alt={item.name}
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="text-center py-4">
                                <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {item.name}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <div className="border-y-2 flex gap-2">
                                    <p className="font-bold">
                                        {item.salePrice}
                                    </p>
                                    <p className="text-[red] font-bold text-sm line-through">
                                        {item.price}
                                    </p>
                                </div>
                            </div>
                            <div className="py-4 text-center">
                                <button className="py-2 px-2 text-white bg-lanh_green hover:opacity-60 rounded-md">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Products;
