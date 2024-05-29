import Image from "next/image";
import { useDispatch } from "react-redux";
import { clearItem } from "@/app/Redux/cartSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
interface Props {
    cart: Products[];
    className: string;
}
const ModalCart = (props: Props) => {
    const { cart, className } = props;
    const dispatch = useDispatch();
    const price = cart.map((item: Products) => item.salePrice * item.quantity);
    return (
        <div className={className}>
            {cart.length > 0 ? (
                <div>
                    <div className="max-h-[220px] overflow-y-scroll">
                        {cart.map((item) => (
                            <div
                                className="flex items-start justify-between border-b-2 p-3 bg-lanh_green"
                                key={item._id}
                            >
                                <div className="flex gap-2 group/item">
                                    <Link
                                        href={`/products/${item.name}`}
                                        className="w-20 min-w-20 h-20 min-h-20 relative bg-white"
                                    >
                                        {item.imgs.length > 0 ? (
                                            <Image
                                                src={item.imgs[0].url}
                                                fill
                                                alt={item.name}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <Image
                                                src="/defaultImg.png"
                                                fill
                                                alt={item.name}
                                                className="object-contain"
                                            />
                                        )}
                                    </Link>
                                    <div className="flex flex-col gap-2 justify-center text-white">
                                        <Link
                                            href={`/products/${item.name}`}
                                            className="font-bold line-clamp-1 group-hover/item:text-black"
                                        >
                                            {item.name}
                                        </Link>
                                        <span className="text-sm">
                                            {item.ingredient}
                                        </span>
                                        <span className="font-bold">
                                            {item.quantity}
                                            <span className="px-2">x</span>
                                            {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(item.salePrice)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => dispatch(clearItem(item))}
                                    className=" text-white  hover:opacity-50 "
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-lanh_green">
                        <p className="p-3 flex justify-between text-white">
                            <strong>Tổng tiền:</strong>
                            <span className="font-bold">
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
                        </p>
                        <div className="flex gap-2 px-[15px] pb-[15px] font-bold text-lanh_green">
                            <Link
                                href={"/cart"}
                                className="p-2 flex-1 bg-white text-center"
                            >
                                Giỏ hàng
                            </Link>

                            <button className="p-2 flex-1 bg-white">
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white border-2 h-[100px] flex items-center justify-center border-lanh_green text-lanh_green text-center">
                    Giỏ hàng của bạn đang trống
                </div>
            )}
        </div>
    );
};

export default ModalCart;
