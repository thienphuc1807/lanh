"use client";
import Image from "next/image";
import React from "react";
import BreadCrumbs from "./Breadcrumbs";
import OrderStatus from "./OrderStatus";
import Swal from "sweetalert2";
import { updateStatus } from "@/lib/serveraction";

interface Props {
    orders: Orders[];
}

const OrderDetail = (props: Props) => {
    const { orders } = props;
    const formatISODate = (isoDate: any) => {
        let date = new Date(isoDate);
        return date.toLocaleDateString("en-GB");
    };

    const id = orders.map((item) => item._id);

    const breadcrumbs = [
        {
            name: "Trang chủ",
            path: "/",
        },
        {
            name: "Đơn hàng",
            path: "/orders",
        },
        {
            name: `${id}`,
            path: `/orders/${id}`,
        },
    ];

    const handleUpdateStatus = (id: string, status: string) => {
        console.log(id, status);
        Swal.fire({
            title: "Huỷ đơn hàng?",
            showCancelButton: true,
            confirmButtonColor: "#97ba79",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateStatus(id, status);
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
        <div className="container mx-auto md:py-5 py-2 md:px-5 px-0">
            <div className="pb-4 md:px-0 px-5">
                <BreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            {orders.map((order) => (
                <div key={order._id} className="bg-white p-5 space-y-6">
                    <div className="border-2 rounded-md p-5 space-y-3">
                        <h1 className="text-lg flex md:flex-row flex-col md:gap-2 gap-0">
                            <span>Đơn hàng:</span>
                            <span className="uppercase font-bold text-lanh_green md:overflow-hidden overflow-x-scroll">
                                {order._id}
                            </span>
                        </h1>
                        <OrderStatus status={order.status} />
                        <p className="bg-slate-200 w-fit p-2 rounded-md">
                            Ngày đặt: {formatISODate(order.createdAt)}
                        </p>
                    </div>
                    <div className="flex md:flex-row-reverse flex-col-reverse gap-6">
                        <div className="border-2 rounded-md px-5 py-4 space-y-2">
                            <h1 className="font-bold text-lg text-lanh_green">
                                Thông tin người nhận
                            </h1>
                            <p>Tên: {order.fullName}</p>
                            <p>Email: {order.email}</p>
                            <p>SĐT: {order.phoneNumber}</p>
                            <p>
                                Địa chỉ: {order.address}, {order.ward},{" "}
                                {order.district}, {order.city}
                            </p>
                        </div>
                        <div className="border-2 rounded-md px-5 py-4 space-y-2 flex-1">
                            <h1 className="font-bold text-lg text-lanh_green">
                                Thông tin đơn hàng
                            </h1>
                            {order.orders.map(
                                (item: Products, index: number) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="relative w-28 h-28">
                                            <Image
                                                src={item.imgs[0].url}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-col">
                                                <p className="font-bold text-lg">
                                                    {item.name}
                                                </p>
                                                <p>{item.ingredient}</p>
                                                <p>
                                                    {Intl.NumberFormat(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    ).format(item.salePrice)}
                                                </p>
                                            </div>
                                            <div className="flex gap-4">
                                                <span>
                                                    Kích cỡ: {item.size}
                                                </span>
                                                <span>SL: {item.quantity}</span>
                                                <span className="font-bold">
                                                    {Intl.NumberFormat(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    ).format(
                                                        item.salePrice *
                                                            item.quantity
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                            <div className="text-right flex md:flex-row flex-col-reverse justify-between text-lg border-t-2 md:pt-5 pt-2 md:items-center items-start gap-2">
                                {order.status === "pending" && (
                                    <button
                                        onClick={() =>
                                            handleUpdateStatus(
                                                order._id,
                                                "canceled"
                                            )
                                        }
                                        className="p-2 bg-lanh_green text-white rounded-md text-sm border-2 border-lanh_green hover:bg-white hover:text-lanh_green"
                                    >
                                        Huỷ đơn
                                    </button>
                                )}

                                <div className="flex gap-2">
                                    <p>Tổng:</p>
                                    <b className="text-lanh_green">
                                        {Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(
                                            order.orders
                                                .map(
                                                    (item: Products) =>
                                                        item.salePrice *
                                                        item.quantity
                                                )
                                                .reduce(
                                                    (
                                                        acc: number,
                                                        init: number
                                                    ) => acc + init,
                                                    0
                                                )
                                        )}
                                    </b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderDetail;
