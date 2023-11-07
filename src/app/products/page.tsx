"use client";
import Link from "next/link";
import BreadCrumbs from "@/components/app.breadcrumbs";
import useSWR from "swr";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

const productCategory = [
    {
        name: "Nước ép",
        id: "juice",
    },
    {
        name: "Sinh tố xanh",
        id: "smoothie",
    },
    {
        name: "Salad",
        id: "salad",
    },
    {
        name: "Kem trái cây",
        id: "icecream",
    },
    {
        name: "Thuần chay",
        id: "vegan",
    },
];
const breadcrumbs = [
    { name: "Trang chủ", path: "/" },
    { name: "Sản phẩm", path: "/products" },
];

function Products() {
    const [page, setPage] = useState(1);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/product?_page=${page}&_limit=8`,
        fetcher
    );
    if (isLoading)
        return (
            <div className="pt-[300px] container mx-auto text-center">
                Loading...
            </div>
        );
    console.log(data);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <main className="bg-lanhBackground bg-no-repeat bg-cover">
            <div className="container mx-auto px-5 gap-6 lg:pt-[200px] pt-[100px]">
                <div className="flex">
                    <BreadCrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className="lg:flex lg:flex-nowrap flex-wrap gap-10">
                    <aside className="md:flex-[20%] lg:block hidden">
                        <h2 className="bg-lanh_green text-center py-3 px-2 text-white">
                            DANH MỤC SẢN PHẨM
                        </h2>
                        <ul>
                            {productCategory.map((category) => (
                                <li
                                    key={category.id}
                                    className=" border-x-[1px] border-b-[1px] bg-white hover:bg-lanh_green hover:text-white"
                                >
                                    <Link href="/" className="block px-5 py-2">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <section className="flex-[80%]">
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                            {data.map(
                                (item: {
                                    id: number;
                                    name: string;
                                    url: string;
                                    price: string;
                                    sale_price: string;
                                }) => (
                                    <Link
                                        href={item.name}
                                        key={item.id}
                                        className="bg-white border-[1px]"
                                    >
                                        <div className="relative mt-5 w-auto h-52">
                                            <Image
                                                fill={true}
                                                src={item.url}
                                                alt={item.name}
                                                className="object-contain"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className="text-center py-4">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="border-y-2 flex gap-2">
                                                <p className="font-bold">
                                                    {item.sale_price}
                                                </p>
                                                <p className="text-[red] font-bold text-sm line-through">
                                                    {item.price}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="py-4 text-center">
                                            <button className="py-2 px-2 text-white bg-lanh_green hover:opacity-60">
                                                Thêm vào giỏ hàng
                                            </button>
                                        </div>
                                    </Link>
                                )
                            )}
                        </div>
                        <div className="flex justify-center py-10">
                            <Pagination
                                count={2}
                                page={page}
                                onChange={handleChange}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Products;
