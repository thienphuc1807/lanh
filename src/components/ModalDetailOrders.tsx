"use client";
import {
    EllipsisHorizontalCircleIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import OrderStatus from "./OrderStatus";
import Swal from "sweetalert2";
import { updateStatus } from "@/lib/serveraction";

const ordersStatus = [
    {
        id: 1,
        name: "pending",
        title: "Đang chuẩn bị",
        color: "bg-[#f0ad4e]",
    },
    {
        id: 2,
        name: "shipping",
        title: "Đang giao hàng",
        color: "bg-[#5bc0de]",
    },
    {
        id: 3,
        name: "complete",
        title: "Đã giao hàng",
        color: "bg-[#5cb85c]",
    },
    {
        id: 4,
        name: "refunded",
        title: "Hoàn hàng",
        color: "bg-[#d9534f]",
    },
    {
        id: 5,
        name: "canceled",
        title: "Đã huỷ đơn",
        color: "bg-[#5f6661]",
    },
];

const ModalDetailOrders = (props: Orders) => {
    const {
        _id,
        status,
        fullName,
        email,
        phoneNumber,
        city,
        district,
        ward,
        address,
        orders,
        createdAt,
        note,
    } = props;
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const formatISODate = (isoDate: any) => {
        let date = new Date(isoDate);
        return date.toLocaleDateString("en-GB");
    };

    const handleUpdateStatus = (id: string, status: string) => {
        console.log(id, status);
        Swal.fire({
            title: "Cập nhật trạng thái?",
            showCancelButton: true,
            confirmButtonColor: "#97ba79",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cập nhật",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateStatus(id, status);
                setMenuOpen(!menuOpen);
                Swal.fire({
                    title: "Cập nhật thành công!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        });
    };
    return (
        <>
            <button onClick={() => setOpen(!open)}>
                <EllipsisHorizontalCircleIcon className="w-6 h-6" />
            </button>
            <div
                className={`${
                    open ? "block" : "hidden"
                } fixed top-0 right-0 m-5 bg-white z-50 rounded-md overflow-hidden`}
            >
                <div className="p-5 flex justify-between border-b-2 bg-lanh_green text-white ">
                    <h1>Chi tiết đơn hàng</h1>
                    <button onClick={() => setOpen(!open)}>
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-5 border-b-2 flex md:flex-row flex-col-reverse md:items-center justify-between gap-2">
                    <div className="flex font-bold flex-col">
                        <h1>Mã đơn hàng: </h1>
                        <p className="uppercase">#{_id}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="relative">
                            <OrderStatus status={status} />
                            <div
                                className={`absolute ${
                                    menuOpen ? "block" : "hidden"
                                } bg-white z-50 md:right-0 top-[50px] shadow-md min-w-[150px] rounded-md overflow-hidden`}
                            >
                                {ordersStatus.map((item) => (
                                    <button
                                        disabled={
                                            item.name === status ? true : false
                                        }
                                        key={item.id}
                                        onClick={() =>
                                            handleUpdateStatus(_id, item.name)
                                        }
                                        className={`p-2 hover:bg-lanh_green hover:text-white w-full disabled:text-white disabled:bg-lanh_green`}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <PencilIcon className="h-5 w-5 font-bold" />
                        </button>
                    </div>
                </div>
                <div className="p-5">
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-sm">Ngày đặt:</p>{" "}
                            {formatISODate(createdAt)}
                        </div>
                        <div>
                            <p className="text-sm">Họ tên người nhận:</p>
                            {fullName}
                        </div>
                        <div>
                            <p className="text-sm">Số điện thoại:</p>
                            {phoneNumber}
                        </div>
                        <div>
                            <p className="text-sm">Địa chỉ:</p>
                            {address},{ward},{district},{city}
                        </div>
                        <div>
                            <p className="text-sm">Sản phẩm</p>
                            <div>
                                {orders.map((item: Products, index: number) => (
                                    <div
                                        className="flex gap-4 items-center"
                                        key={index}
                                    >
                                        <span>{item.name}</span>
                                        <span>Size: {item.size}</span>
                                        <span>
                                            {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(item.salePrice)}{" "}
                                            x {item.quantity} ={" "}
                                            {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(
                                                item.quantity * item.salePrice
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm">Tổng:</p>
                            <b className="font-bold">
                                {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(
                                    orders
                                        .map(
                                            (item: Products) =>
                                                item.salePrice * item.quantity
                                        )
                                        .reduce(
                                            (acc: number, init: number) =>
                                                acc + init,
                                            0
                                        )
                                )}
                            </b>
                        </div>
                    </div>
                </div>
            </div>
            <div
                onClick={() => setOpen(!open)}
                className={`${
                    open ? "block" : "hidden"
                } bg-black opacity-50 top-0 right-0 bottom-0 left-0 absolute z-40`}
            ></div>
        </>
    );
};

export default ModalDetailOrders;
