"use client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CheckOut = () => {
    const cart = useSelector((state: { cart: Products[] }) => state.cart);
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        // Prevent rendering on the server side
        return null;
    }
    const price = cart.map((item: Products) => item.salePrice * item.quantity);
    return (
        <div className="container mx-auto flex lg:flex-row md:flex-row-reverse flex-col-reverse md:gap-10 gap-5 xl:my-10 my-2 xl:px-0 px-5">
            <div className="lg:flex-[60%] flex-1">
                <h1 className="font-bold lg:text-2xl text-xl text-lanh_green pb-4">
                    Thông tin giao hàng
                </h1>
                <div>
                    <form className="flex flex-col gap-2">
                        <div className="relative">
                            <label htmlFor="full_name">
                                <span>Họ Tên</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                id="full_name"
                                className="p-2 w-full border-2 rounded-md"
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label htmlFor="email">
                                    <span>Email</span>
                                </label>
                                <input
                                    type="text"
                                    className="p-2 border-2 rounded-md w-full"
                                    id="email"
                                    name="email"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="phoneNumber">
                                    <span>Số điện thoại</span>
                                </label>
                                <input
                                    type="text"
                                    className="p-2 border-2 rounded-md w-full"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label htmlFor="city">
                                    <span>Tỉnh/Thành Phố</span>
                                </label>
                                <input
                                    type="text"
                                    className="p-2 w-full border-2 rounded-md"
                                    id="city"
                                    name="city"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="address">
                                    <span>Quận/Huyện</span>
                                </label>
                                <input
                                    type="text"
                                    className="p-2 w-full border-2 rounded-md"
                                    id="district"
                                    name="district"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address">
                                <span>Địa chỉ</span>
                            </label>
                            <input
                                type="text"
                                className="p-2 w-full border-2 rounded-md"
                                id="address"
                                name="address"
                            />
                        </div>
                    </form>
                </div>
                <div className="flex md:flex-row flex-col-reverse gap-4 justify-between py-5 md:items-center">
                    <Link href={"/cart"} className="text-lanh_green hover:text-green-600 flex items-center gap-2">
                        <ArrowLongLeftIcon className="w-8 h-8" />
                        Trở lại giỏ hàng
                    </Link>
                    <button className="bg-lanh_green hover:bg-green-600 text-white px-4 py-2 rounded-md">
                        Đặt hàng
                    </button>
                </div>
            </div>
            <div className="lg:flex-[40%] flex-1">
                {cart.length > 0 ? (
                    <div>
                        <h1>Sản phẩm:</h1>
                        {cart.map((item) => (
                            <div
                                className="flex justify-between gap-6 py-2"
                                key={item._id}
                            >
                                <div className="flex gap-6">
                                    <div className="relative xl:h-28 md:h-20 h-16 xl:min-w-28 md:min-w-20 min-w-16 border-2 rounded-md">
                                        <Image
                                            src={item.imgs[0].url}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                        <span className="absolute right-[-10px] top-[-10px] w-[25px] h-[25px] text-center px-[5px] bg-lanh_green text-white rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <h1>{item.name}</h1>
                                </div>
                                <span>
                                    {Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(item.salePrice * item.quantity)}
                                </span>
                            </div>
                        ))}
                        <div className="border-t-2 py-5 flex justify-between">
                            <b>Tổng cộng: </b>
                            <span className="font-bold text-2xl">
                                {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(
                                    price.reduce(
                                        (acc: number, init: number) =>
                                            acc + init,
                                        0
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div>No item in cart</div>
                )}
            </div>
        </div>
    );
};

export default CheckOut;