const OrderStatus = ({ status }: { status: string }) => {
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
    return (
        <div>
            {ordersStatus.map((item) => (
                <p
                    key={item.id}
                    className={`${
                        item.name === status ? `block ${item.color}` : "hidden"
                    } font-bold text-sm 
                    text-white
                    p-2 rounded-md w-fit `}
                >
                    {status === item.name && item.title}
                </p>
            ))}
        </div>
    );
};

export default OrderStatus;
