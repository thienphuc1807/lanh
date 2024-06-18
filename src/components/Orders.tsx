const Orders = (props: { orders: Orders[] }) => {
    const { orders } = props;
    var total = 0;
    return (
        <div className="container mx-auto md:py-5 py-2 md:px-5 px-0 ">
            <div className="bg-white rounded-md overflow-hidden">
                <h1 className="font-bold text-lanh_green p-4 border-b-2 text-xl">
                    Đơn hàng của bạn
                </h1>
                {orders.length > 0 ? (
                    orders.map((item: Orders, index: number) => (
                        <div key={item._id} className="p-4 border-b-2 w-full">
                            <div className="w-full">
                                <div>
                                    <p className="flex md:flex-row flex-col-reverse justify-between">
                                        <span>
                                            Mã đơn hàng: <b>{item._id}</b>
                                        </span>
                                        <span className="text-lanh_green font-bold">
                                            {item.status}
                                        </span>
                                    </p>
                                    <p>
                                        Tên người nhận: <b>{item.fullName}</b>
                                    </p>
                                    <p>
                                        Số điện thoại: <b>{item.phoneNumber}</b>
                                    </p>
                                    <p>
                                        Địa chỉ: <b>{item.address}</b>,{" "}
                                        <b>{item.district}</b>,<b> </b>
                                        <b>{item.ward}</b>, <b>{item.city}</b>
                                    </p>
                                    <p>
                                        Số lượng: <b>{item.orders.length}</b>
                                    </p>
                                    <div className="flex flex-col">
                                        {item.orders.map((item: Products) => (
                                            <div
                                                key={item._id}
                                                className="flex gap-2 font-bold"
                                            >
                                                <p>{item.quantity}x </p>
                                                <p>{item.name}</p>
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
                                        ))}
                                    </div>
                                    <p className="text-xl border-t-2 mt-2 pt-2">
                                        Tổng cộng:
                                        <b className="pl-2 text-lanh_green">
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
                                    </p>
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
