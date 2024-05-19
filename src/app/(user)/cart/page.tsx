"use client";
import { addCart, removeCart, clearItem } from "@/app/Redux/cartSlice";
import {
    HeartIcon,
    MinusIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
    const cart = useSelector((state: { cart: Products[] }) => state.cart);
    const dispatch = useDispatch();
    const price = cart.map((item: Products) => item.salePrice * item.quantity);
    return (
        <div className="container mx-auto flex lg:flex-row flex-col my-5 gap-4 xl:px-0 px-5 min-h-screen">
            {cart.length > 0 ? (
                <div className=" bg-white rounded-xl flex flex-1 flex-col h-fit">
                    <h1 className="text-xl font-bold md:px-10 px-4 py-5 text-lanh_green">
                        Giỏ hàng
                    </h1>
                    {cart.map((item: Products) => (
                        <div
                            className="border-t-2 md:px-10 px-4 py-5"
                            key={item._id}
                        >
                            <div className="flex md:gap-10 gap-4">
                                <div className="flex md:flex-row flex-col-reverse gap-2 items-center">
                                    <div>
                                        <button
                                            onClick={() =>
                                                dispatch(clearItem(item))
                                            }
                                            className="p-2 bg-lanh_green border-2 border-lanh_green text-white hover:bg-white hover:text-lanh_green rounded-lg"
                                        >
                                            <TrashIcon className="w-5 h-5 " />
                                        </button>
                                    </div>
                                    <div className="relative w-28 h-28 border-2 rounded-xl">
                                        {item.imgs?.length > 0 ? (
                                            <Image
                                                src={item.imgs[0].url}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                            />
                                        ) : (
                                            <Image
                                                src="/defaultImg.png"
                                                alt="product_img"
                                                className="object-contain"
                                                fill
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-1 justify-between md:flex-row flex-col md:items-center md:gap-8 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <span>{item.name}</span>
                                        <span className="text-sm text-gray-500">
                                            {item.ingredient}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            className="p-2 rounded-lg bg-lanh_green border-2 border-lanh_green text-white hover:bg-white hover:text-lanh_green disabled:bg-gray-500 disabled:border-gray-500 disabled:opacity-50"
                                            disabled={
                                                item.inStock > item.quantity
                                                    ? false
                                                    : true
                                            }
                                            onClick={() =>
                                                dispatch(addCart(item))
                                            }
                                        >
                                            <PlusIcon className="h-5 w-5 " />
                                        </button>

                                        <span className="px-4">
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="p-2 rounded-lg bg-lanh_green border-2 border-lanh_green text-white hover:bg-white hover:text-lanh_green"
                                            onClick={() =>
                                                dispatch(removeCart(item))
                                            }
                                        >
                                            <MinusIcon className="h-5 w-5 " />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(
                                            item.salePrice * item.quantity
                                        )}
                                        <span className="text-sm">
                                            {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(item.salePrice)}
                                            / sản phẩm
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center min-h-screen flex-1 gap-2 bg-white">
                    <span>Giỏ hàng của bạn đang trống</span>
                    <Link
                        href={"/products"}
                        className="border-2 border-lanh_green px-4 py-2 rounded-full bg-lanh_green hover:bg-white text-white hover:text-lanh_green"
                    >
                        Tới trang sản phẩm
                    </Link>
                </div>
            )}
            <div className="bg-white h-fit rounded-xl">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold px-10 py-5 text-lanh_green">
                        Đơn hàng
                    </h1>
                    <div className="pb-5 border-t-2 px-10 py-5 space-y-4">
                        <div className="flex gap-8 justify-between">
                            <span>Tổng sản phẩm: </span>
                            {cart.length}
                        </div>
                        <div className="flex gap-8 justify-between items-center">
                            <span>Tổng tiền:</span>
                            <span className="font-bold text-xl text-lanh_green">
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
                    <button className="text-white border-2 border-lanh_green bg-lanh_green mx-10 mb-5 py-2 rounded-lg hover:text-lanh_green hover:bg-white">
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
