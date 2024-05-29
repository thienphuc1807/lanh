"use client";

import Image from "next/image";
import BreadCrumbs from "@/components/Breadcrumbs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "@/app/Redux/cartSlice";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

interface Props {
    data: Products;
}

const DetailProduct = (props: Props) => {
    const { data } = props;
    const breadcrumbs = [
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm", path: "/products" },
        { name: `${data.name}`, path: `/products/${data.name}` },
    ];
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    return (
        <div className="container mx-auto lg:px-5 px-0">
            <div className="lg:px-0 px-3">
                <BreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 bg-white rounded-lg lg:p-0 p-5">
                <div className="relative lg:w-auto lg:h-[400px] h-72 w-full border-2 lg:m-5">
                    <Image
                        src={data.imgs[0].url}
                        alt={data.name}
                        fill={true}
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="my-5">
                    <h1 className="mb-5 font-bold text-xl">{data.name}</h1>
                    <p className="text-2xl font-bold text-lanh_green">
                        {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(data.salePrice)}
                    </p>
                    <p className="my-5">Nguyên liệu: {data.ingredient}</p>
                    <label htmlFor="quantity">Số lượng: </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="border-2 px-3"
                        min="1"
                        max={data.inStock}
                        inputMode="numeric"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <div className="flex flex-wrap gap-5 mt-5">
                        <button
                            className="bg-lanh_green text-white lg:text-base text-sm px-4 py-2 rounded-md hover:opacity-80 flex gap-2 items-center"
                            onClick={() =>
                                dispatch(addCart({ ...data, quantity }))
                            }
                        >
                            <ShoppingCartIcon className="h-6 w-6" />
                            <span>Thêm vào giỏ</span>
                        </button>
                        <button className="bg-lanh_green text-white lg:text-base text-sm px-4 py-2 rounded-md hover:opacity-80">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
