"use client";
import { addCart, removeCart, clearItem } from "@/app/Redux/cartSlice";
import BreadCrumbs from "@/components/Breadcrumbs";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Cart = () => {
    const breadcrumbs = [
        { name: "Trang chủ", path: "/" },
        { name: "Giỏ hàng", path: "/cart" },
    ];
    const dispatch = useDispatch();
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

    const handleRemoveItem = (item: Products) => {
        Swal.fire({
            title: "Xoá sản phẩm ?",
            showDenyButton: true,
            confirmButtonText: "Xoá",
            confirmButtonColor: "#97ba79",
            denyButtonText: `Huỷ`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(clearItem(item));
            }
        });
    };

    return (
        <div className="container mx-auto my-5 gap-4">
            <div className="px-5">
                <BreadCrumbs breadcrumbs={breadcrumbs} />
            </div>

            {cart.length > 0 ? (
                <div className="md:px-5 px-0 rounded-xl">
                    {/* PC,Laptop cart */}
                    <div className="md:block hidden ">
                        <table className="bg-white rounded-xl w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="py-5">Hình ảnh</th>
                                    <th className="py-5">Tên sản phẩm</th>
                                    <th className="py-5">Giá</th>
                                    <th className="py-5">Số lượng</th>
                                    <th className="py-5">Tổng</th>
                                    <th className="py-5"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item: Products) => (
                                    <tr
                                        key={item._id}
                                        className="text-center border-t-2"
                                    >
                                        <td className="relative w-28 h-28">
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
                                        </td>
                                        <td>{item.name}</td>
                                        <td>
                                            {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(item.salePrice)}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2 justify-center">
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            removeCart(item)
                                                        )
                                                    }
                                                    className="rounded-full bg-lanh_green text-white"
                                                >
                                                    <MinusIcon className="h-6 w-6" />
                                                </button>
                                                <span className="border-2 px-5">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            addCart({
                                                                ...item,
                                                                quantity: 1,
                                                            })
                                                        )
                                                    }
                                                    className="rounded-full bg-lanh_green text-white"
                                                >
                                                    <PlusIcon className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(
                                                item.salePrice * item.quantity
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleRemoveItem(item)
                                                }
                                                className="  text-lanh_green  hover:opacity-50 "
                                            >
                                                <XMarkIcon className="w-6 h-6" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Mobile cart */}
                    <div className="md:hidden block">
                        {cart.map((item) => (
                            <div className="bg-white p-4" key={item._id}>
                                <div className="relative h-20 mx-auto w-full border-t-2">
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
                                <div className="border-t-2 py-2 flex justify-between font-bold">
                                    <span>Tên sản phẩm</span>
                                    <span>{item.name}</span>
                                </div>
                                <div className="border-t-2 py-2 flex justify-between font-bold">
                                    <span>Giá</span>
                                    {Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(item.salePrice)}
                                </div>
                                <div className="border-t-2 py-2 flex justify-between font-bold">
                                    <span>Số lượng</span>
                                    <div className="flex items-center gap-2 justify-center">
                                        <button
                                            onClick={() =>
                                                dispatch(removeCart(item))
                                            }
                                            className="rounded-full bg-lanh_green text-white"
                                        >
                                            <MinusIcon className="h-6 w-6" />
                                        </button>
                                        <span className="border-2 px-5">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    addCart({
                                                        ...item,
                                                        quantity: 1,
                                                    })
                                                )
                                            }
                                            className="rounded-full bg-lanh_green text-white"
                                        >
                                            <PlusIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                                <div className="border-t-2 py-2 flex justify-between font-bold">
                                    <span>Tổng</span>
                                    <span>
                                        {Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(
                                            item.salePrice * item.quantity
                                        )}
                                    </span>
                                </div>
                                <div className="border-t-2 py-2 flex justify-between font-bold">
                                    <span></span>
                                    <button
                                        onClick={() =>
                                            dispatch(clearItem(item))
                                        }
                                        className="  text-lanh_green  hover:opacity-50 "
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white lg:w-2/6 w-full h-fit rounded-xl my-5">
                        <div className="flex flex-col">
                            <div className="px-5 space-y-2">
                                <h1 className="font-bold text-lanh_green border-b-2 py-4">
                                    Giỏ hàng
                                </h1>
                                <div className="flex gap-8 justify-between">
                                    <span>Tổng sản phẩm: </span>
                                    {cart.length}
                                </div>
                                <div className="flex gap-8 justify-between items-center py-2 border-t-2">
                                    <span>Tổng tiền:</span>
                                    <span className="font-bold text-lanh_green">
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
                            <button className="text-white w-1/2 border-2 border-lanh_green bg-lanh_green mx-5 my-5 py-2 rounded-lg hover:text-lanh_green hover:bg-white">
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-full flex-1 gap-2 min-h-screen">
                    <span>Giỏ hàng của bạn đang trống</span>
                    <Link
                        href={"/products"}
                        className="border-2 border-lanh_green px-4 py-2 rounded-full bg-lanh_green hover:bg-white text-white hover:text-lanh_green"
                    >
                        Tới trang sản phẩm
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
