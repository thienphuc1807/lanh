"use client";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import OrderStatus from "./OrderStatus";

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
    const formatISODate = (isoDate: any) => {
        let date = new Date(isoDate);
        return date.toLocaleDateString("en-GB");
    };
    return (
        <>
            <button onClick={() => setOpen(!open)}>
                <EllipsisHorizontalCircleIcon className="w-6 h-6" />
            </button>
            <div
                className={`${
                    open ? "block" : "hidden"
                } fixed top-0 right-0 m-5 bg-white z-50 min-w-[500px] rounded-md overflow-hidden`}
            >
                <div className="p-5 flex justify-between border-b-2 bg-lanh_green text-white ">
                    <h1>Chi tiết đơn hàng</h1>
                    <button onClick={() => setOpen(!open)}>
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-5 border-b-2">
                    <div className="flex justify-between items-center">
                        <p className="uppercase">#{_id}</p>
                        <OrderStatus status={status} />
                    </div>
                    <div className="flex font-bold">
                        {fullName}({phoneNumber})
                    </div>
                </div>
                <div className="p-5">
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-sm">Ngày đặt:</p>{" "}
                            {formatISODate(createdAt)}
                        </div>
                        <div>
                            <p className="text-sm">Địa chỉ:</p>
                            {address},{ward},{district},{city}
                        </div>
                        <div>
                            <p className="text-sm">Sản phẩm</p>
                            <div>
                                {orders.map((item: Products) => (
                                    <div
                                        className="flex gap-4 items-center"
                                        key={item._id}
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
