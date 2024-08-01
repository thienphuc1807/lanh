import Image from "next/image";
import Link from "next/link";
import BreadCrumbs from "./Breadcrumbs";
import OrderStatus from "./OrderStatus";

const Orders = (props: { orders: Orders[] }) => {
    const { orders } = props;
    const formatISODate = (isoDate: any) => {
        let date = new Date(isoDate);
        return date.toLocaleDateString("en-GB");
    };
    const breadcrumbs = [
        {
            name: "Trang chủ",
            path: "/",
        },
        {
            name: "Đơn hàng",
            path: "/orders",
        },
    ];
    return (
        <div className="container mx-auto md:py-5 py-2 md:px-5 px-0 ">
            <div className="rounded-md overflow-hidden">
                <div className="md:px-0 px-5">
                    <BreadCrumbs breadcrumbs={breadcrumbs} />
                </div>
                {orders.length > 0 ? (
                    orders.map((item: Orders) => (
                        <div
                            key={item._id}
                            className="p-4 border-b-2 w-full bg-white my-4 shadow-lg"
                        >
                            <div className="w-full">
                                <div>
                                    <div className="flex md:flex-row flex-col-reverse justify-between md:items-center">
                                        <div className="flex md:flex-row flex-col md:items-center gap-2">
                                            <span className="border-2 rounded-full bg-gray-100 font-bold p-3">
                                                <span>Đơn hàng: </span>
                                                <b className="uppercase text-lanh_green">
                                                    {item._id}
                                                </b>
                                            </span>
                                            <p className="pl-2">
                                                Ngày đặt:{" "}
                                                {formatISODate(item.createdAt)}
                                            </p>
                                        </div>
                                        <div className="pl-2 md:pb-0 pb-3 font-bold text-lanh_green">
                                            <OrderStatus status={item.status} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col mt-4">
                                        {item.orders.map(
                                            (item: Products, index: number) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-2"
                                                >
                                                    <div className="relative w-28 h-28">
                                                        <Image
                                                            src={
                                                                item.imgs[0].url
                                                            }
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
                                                            <p>
                                                                {
                                                                    item.ingredient
                                                                }
                                                            </p>
                                                            <p>
                                                                {Intl.NumberFormat(
                                                                    "vi-VN",
                                                                    {
                                                                        style: "currency",
                                                                        currency:
                                                                            "VND",
                                                                    }
                                                                ).format(
                                                                    item.salePrice
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <span>
                                                                Kích cỡ:{" "}
                                                                {item.size}
                                                            </span>
                                                            <span>
                                                                SL:{" "}
                                                                {item.quantity}
                                                            </span>
                                                            <span className="font-bold">
                                                                {Intl.NumberFormat(
                                                                    "vi-VN",
                                                                    {
                                                                        style: "currency",
                                                                        currency:
                                                                            "VND",
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
                                    </div>

                                    <div className="flex justify-between border-t-2 mt-2 pt-4">
                                        <Link
                                            href={`/orders/${item._id}`}
                                            className="px-4 py-2 bg-lanh_green text-white rounded-full border-2 border-lanh_green hover:bg-white hover:text-lanh_green"
                                        >
                                            Chi tiết
                                        </Link>
                                        <div className="flex gap-2 text-xl items-center">
                                            <p>Tổng:</p>
                                            <b className="text-lanh_green">
                                                {Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(
                                                    item.orders
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
                    ))
                ) : (
                    <div className="min-h-screen flex justify-center items-center">
                        Chưa có đơn hàng nào
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
