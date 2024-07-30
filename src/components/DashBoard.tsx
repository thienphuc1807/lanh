import Image from "next/image";
import ModalDetailOrders from "./ModalDetailOrders";

interface Props {
    users: Users[];
    products: Products[];
    orders: Orders[];
}

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

const DashBoard = ({ users, products, orders }: Props) => {
    const allOrders = orders.map((item) => item.orders);
    const order = allOrders.flat();
    const total = order
        .map((item: Products) => item.quantity * item.salePrice)
        .reduce((acc, init) => acc + init, 0);
    const client = users.filter((user) => user.isAdmin === false);
    return (
        <>
            <div className="bg-white shadow-md rounded-md p-5 mb-5">
                <h1 className="text-xl mb-5 font-bold">Thống kê</h1>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="rounded-md bg-lanh_green text-white w-full p-4">
                        <span className="text-2xl font-bold">
                            {client.length}
                        </span>
                        <h1>Khách hàng</h1>
                    </div>
                    <div className="rounded-md bg-lanh_green text-white w-full p-4">
                        <span className="text-2xl font-bold">
                            {products.length}
                        </span>
                        <h1>Sản phẩm</h1>
                    </div>
                    <div className=" rounded-md bg-lanh_green text-white w-full p-4">
                        <span className="text-2xl font-bold">
                            {orders.length}
                        </span>
                        <h1>Đơn hàng</h1>
                    </div>
                    <div className="rounded-md bg-lanh_green text-white w-full p-4">
                        <span className="text-2xl font-bold">
                            {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(total)}
                        </span>
                        <h1>Doanh thu</h1>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-md ">
                <h1 className="text-xl font-bold p-5 border-b-2">
                    Đơn hàng gần đây
                </h1>
                {orders.map((item) => (
                    <div className="p-5 border-b-2" key={item._id}>
                        <div className="flex justify-between items-center">
                            <h1 className="text-lanh_green uppercase font-bold mb-2 flex justify-between">
                                #{item._id}
                            </h1>
                            <ModalDetailOrders {...item} />
                        </div>

                        <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-4">
                            <div className="flex basis-1/4 flex-col">
                                {item.orders.map(
                                    (product: Products, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="relative w-20 h-20">
                                                <Image
                                                    src={product.imgs[0].url}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <span className="font-bold">
                                                    {product.name}
                                                </span>
                                                <div className="flex gap-2">
                                                    <span>
                                                        SL: {product.quantity}
                                                    </span>
                                                    <span>
                                                        Size: {product.size}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <span className="basis-1/2">
                                <p className="font-bold">{item.fullName}</p>
                                <p>{item.phoneNumber}</p>
                                {item.address}, {item.ward}, {item.district},{" "}
                                {item.city}
                            </span>
                            <span className="font-bold basis-1/4 lg:text-center">
                                {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(
                                    item.orders
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
                            </span>
                            <div className="basis-1/4 flex gap-2">
                                {ordersStatus.map((status) => (
                                    <p
                                        key={status.id}
                                        className={`${
                                            status.name === item.status
                                                ? `block ${status.color}`
                                                : "hidden"
                                        } font-bold 
                                        text-white
                                        p-2 rounded-md w-fit `}
                                    >
                                        {item.status === status.name &&
                                            status.title}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DashBoard;
