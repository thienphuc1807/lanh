"use client";
import Link from "next/link";
import BreadCrumbs from "@/components/app.breadcrumbs";
import useSWR from "swr";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
    AdjustmentsHorizontalIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";

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

const LanhSlider = styled(Slider)({
    color: "#97ba79",
});

function Products() {
    const [page, setPage] = useState(1);
    const [value, setValue] = useState<number[]>([20, 80]);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/product?_page=${page}&_limit=8`,
        fetcher
    );
    console.log(data);

    if (isLoading)
        return (
            <div className="pt-[300px] container mx-auto text-center">
                Loading...
            </div>
        );

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const handleChangeSlider = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <main className="bg-lanhBackground bg-no-repeat bg-cover">
            <div className="container mx-auto px-5 gap-6 lg:pt-[200px] pt-[100px]">
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <div className="flex gap-8">
                    <Disclosure>
                        <aside className="md:flex-[20%] lg:block hidden">
                            <div className="rounded-lg overflow-hidden border-2 mb-5">
                                <h2 className="bg-lanh_green text-center py-6 text-white">
                                    DANH MỤC SẢN PHẨM
                                </h2>
                                <ul>
                                    {productCategory.map((category) => (
                                        <li
                                            key={category.id}
                                            className=" bg-white hover:bg-lanh_green hover:text-white"
                                        >
                                            <Link
                                                href="/"
                                                className="block px-5 py-2"
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-lg overflow-hidden border-2 mb-5">
                                <h2 className="bg-lanh_green text-center py-6 text-white">
                                    LỌC THEO GIÁ
                                </h2>
                                <Box className="mx-6 py-4">
                                    <LanhSlider
                                        value={value}
                                        onChange={handleChangeSlider}
                                    />
                                    <p className="pt-2">
                                        Giá: {value[0]} - {value[1]}.000VND
                                    </p>
                                    <button className="bg-lanh_green text-white text-sm px-4 py-2 mt-2 rounded-md font-bold">
                                        LỌC
                                    </button>
                                </Box>
                            </div>
                        </aside>
                        <section className="flex-[80%]">
                            <div className="bg-lanh_green mb-5 py-3 lg:px-2 px-4 flex justify-end rounded-md">
                                <Disclosure.Button className="lg:hidden block pr-4 text-white">
                                    <AdjustmentsHorizontalIcon className="w-10" />
                                </Disclosure.Button>

                                <Disclosure.Panel className="text-gray-500 fixed left-0 md:w-[50%] w-full inset-y-0 bg-lanh_green z-20 px-5 py-10">
                                    <Disclosure.Button className="text-white pb-5">
                                        <XMarkIcon className="w-10" />
                                    </Disclosure.Button>
                                    <div className="rounded-lg overflow-hidden border-2 mb-5">
                                        <h2 className="bg-lanh_green text-center py-6 text-white">
                                            DANH MỤC SẢN PHẨM
                                        </h2>
                                        <ul>
                                            {productCategory.map((category) => (
                                                <li
                                                    key={category.id}
                                                    className=" bg-white hover:bg-lanh_green hover:text-white"
                                                >
                                                    <Link
                                                        href="/"
                                                        className="block px-5 py-2"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="rounded-lg overflow-hidden border-2 mb-5">
                                        <h2 className="bg-lanh_green text-center py-6 text-white">
                                            LỌC THEO GIÁ
                                        </h2>
                                        <Box className="px-6 py-4 bg-white">
                                            <LanhSlider
                                                value={value}
                                                onChange={handleChangeSlider}
                                            />
                                            <button className="bg-lanh_green text-white text-sm px-4 py-2 mt-2 rounded-md font-bold">
                                                LỌC
                                            </button>
                                            <p className="pt-2">
                                                Giá: {value[0]} - {value[1]}
                                                .000VND
                                            </p>
                                        </Box>
                                    </div>
                                </Disclosure.Panel>
                                <select
                                    id="sort"
                                    className="py-3 px-2 rounded-md lg:w-1/3 w-full"
                                >
                                    <option value="">Mặc định</option>
                                    <option value="popularity">Phổ biến</option>
                                    <option value="latest">Mới nhất</option>
                                    <option value="asc">
                                        Sắp xếp giá: Từ thấp đến cao
                                    </option>
                                    <option value="desc">
                                        Sắp xếp giá: Từ cao đến thấp
                                    </option>
                                </select>
                            </div>
                            <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                                {data.map((item: Products) => (
                                    <Link
                                        href={`products/${item.id}`}
                                        key={item.id}
                                        className="bg-white border-[1px] px-2"
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
                                            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                {item.name}
                                            </p>
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
                                            <button className="py-2 px-2 text-white bg-lanh_green hover:opacity-60 rounded-md">
                                                Thêm vào giỏ hàng
                                            </button>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="flex justify-center py-10">
                                <Pagination
                                    count={2}
                                    page={page}
                                    onChange={handleChange}
                                />
                            </div>
                        </section>
                    </Disclosure>
                </div>
            </div>
        </main>
    );
}

export default Products;
