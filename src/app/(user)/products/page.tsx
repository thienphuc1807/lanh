import Link from "next/link";
import Image from "next/image";
import BreadCrumbs from "@/components/Breadcrumbs";
import PaginationControl from "@/components/PaginationControl";

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

const breadcrumbs = [
    { name: "Trang chủ", path: "/" },
    { name: "Sản phẩm", path: "/products" },
];

const Products = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    // Fetch Data with API
    const data = await getData();

    // PaginationControl
    const page = searchParams["page"] ?? "1";
    const per_page = searchParams["per_page"] ?? "8";
    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
    const entries = data.slice(start, end);

    return (
        <div className="container mx-auto md:px-5 px-2">
            <BreadCrumbs breadcrumbs={breadcrumbs} />

            <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                {entries.map((item: Products) => (
                    <Link
                        href={`products/${item.name}`}
                        key={item.name}
                        className="bg-white rounded-lg shadow-[1px_1px_6px_2px_rgba(151,186,121,0.3)] border-[1px] px-2"
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

                        <div className="flex md:flex-row flex-col gap-2 items-center justify-center">
                            <p className="font-bold">
                                {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(item.salePrice)}
                            </p>
                            <p className="text-[red] font-bold text-xs line-through">
                                {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(item.price)}
                            </p>
                        </div>

                        <div className="py-4 text-center">
                            <button className="py-2 px-2 text-white bg-lanh_green hover:opacity-60 rounded-md">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
            <PaginationControl
                hasNextPage={end < data.length}
                hasPrevPage={start > 0}
                dataLength={data.length}
            />
        </div>
    );
};

export default Products;
