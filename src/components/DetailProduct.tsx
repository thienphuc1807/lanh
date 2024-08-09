"use client";

import Image from "next/image";
import BreadCrumbs from "@/components/Breadcrumbs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "@/app/Redux/cartSlice";
import {
    MinusIcon,
    ShoppingCartIcon,
    PlusIcon,
    StarIcon,
} from "@heroicons/react/24/solid";
import { handleUserFeedback } from "@/lib/serveraction";
import { useRouter } from "next/navigation";
import RatingStar from "./RatingStar";
import RelatedProducts from "./RelatedProducts";

interface Props {
    data: Products;
    user: Users;
    feedbacks: Feedbacks[];
    averageRating: number;
    relatedProducts: Products[];
    session: any;
}

const DetailProduct = (props: Props) => {
    const { data, user, feedbacks, averageRating, relatedProducts, session } =
        props;

    const breadcrumbs = [
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm", path: "/products" },
        { name: `${data.name}`, path: `/products/${data.name}` },
    ];
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [size, setSize] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const router = useRouter();
    const [mess, setMess] = useState<{
        type: "error" | "success" | "clear";
        text: string;
    } | null>(null);
    const cart = useSelector((state: { cart: Products[] }) => state.cart);

    const handleChangeQuantity = (math: string, quantity: number) => {
        if (math === "plus") {
            if (data.inStock && quantity < data.inStock) {
                setQuantity((quantity += 1));
                setMess({ type: "clear", text: "" });
            }
        } else {
            if (quantity > 1) {
                setQuantity((quantity -= 1));
                setMess({ type: "clear", text: "" });
            }
        }
    };

    const handleSubmitFeedback = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("rating", rating.toString());
        formData.append("comment", comment);
        const userFeedback = await handleUserFeedback(
            formData,
            user._id || "",
            data._id,
            user.fullName
        );
        try {
            if (!userFeedback) {
                router.refresh();
                setRating(1);
                setComment("");
            }
        } catch (error) {
            alert("Có lỗi xảy ra!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCart = (data: Products, quantity: number, size: string) => {
        const productID = data._id;

        if (!size) {
            setMess({ type: "error", text: "Vui lòng chọn kích cỡ sản phẩm!" });
            return;
        }

        const productInCart = cart.find((item) => item._id === productID);
        const productInStock = productInCart?.inStock || 0;

        const totalQuantityProductInCart = cart
            .filter((item) => item._id === productID)
            .reduce((acc, init) => acc + init.quantity, 0);

        if (
            productInCart &&
            totalQuantityProductInCart + quantity > productInStock
        ) {
            setMess({
                type: "error",
                text: "Đã đạt giới hạn số lượng sản phẩm!",
            });
            return;
        }

        const add = dispatch(addCart({ ...data, quantity, size }));
        if (add) {
            setMess({ type: "success", text: "Đã thêm sản phẩm vào giỏ" });
        } else {
            setMess({ type: "error", text: "Lỗi" });
        }
    };
    console.log(isLoading);

    return (
        <div className="container mx-auto lg:px-5 px-0">
            {/* BreadCrumbs */}
            <div className="lg:px-0 px-3 py-5">
                <BreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="bg-white rounded-lg p-5">
                {loading ? (
                    <>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
                            {/* Product Image */}
                            <div className="relative lg:w-auto lg:h-[400px] h-72 w-full border-2 rounded-md">
                                <div className="animate-pulse bg-slate-200 w-full h-full"></div>
                            </div>
                            {/* Product Info */}
                            <div>
                                <div className="animate-pulse bg-slate-200 w-full h-full"></div>
                            </div>
                        </div>
                        <div className="animate-pulse bg-slate-200 w-full h-32 mt-2"></div>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-0 mt-2">
                            <div className="animate-pulse bg-slate-200 w-full h-40"></div>
                            <div className="animate-pulse bg-slate-200 w-full h-40"></div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
                            {/* Product Image */}
                            <div className="relative lg:w-auto lg:h-[400px] h-72 w-full border-2 rounded-md">
                                <Image
                                    src={data.imgs[0].url}
                                    alt={data.name}
                                    fill={true}
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            {/* Product Info */}
                            <div>
                                <h1 className="font-bold text-xl">
                                    {data.name}
                                </h1>
                                <div className="flex items-center">
                                    <RatingStar rating={averageRating} />
                                    <span className="pl-2">
                                        ({feedbacks.length} đánh giá)
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-lanh_green">
                                    {Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(data.salePrice)}
                                </p>
                                <p className="my-5">
                                    Nguyên liệu: {data.ingredient}
                                </p>
                                <label htmlFor="quantity">Số lượng: </label>
                                {data.inStock === 0 ? (
                                    <p className="text-red-500 font-bold">
                                        Hết hàng
                                    </p>
                                ) : (
                                    <div className="flex pt-2">
                                        <button
                                            onClick={() =>
                                                handleChangeQuantity(
                                                    "minus",
                                                    quantity
                                                )
                                            }
                                            className={`px-2 ${
                                                quantity === 1
                                                    ? "bg-gray-400"
                                                    : " bg-lanh_green"
                                            }  text-white rounded-l-md`}
                                            disabled={
                                                quantity === 1 ? true : false
                                            }
                                        >
                                            <MinusIcon className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            className=" border-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            min="1"
                                            max={data.inStock}
                                            inputMode="numeric"
                                            value={quantity}
                                            readOnly
                                        />
                                        <button
                                            onClick={() =>
                                                handleChangeQuantity(
                                                    "plus",
                                                    quantity
                                                )
                                            }
                                            className={`px-2 ${
                                                quantity === data.inStock
                                                    ? "bg-gray-400"
                                                    : "bg-lanh_green"
                                            }  text-white rounded-r-md`}
                                            disabled={
                                                quantity === data.inStock
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <PlusIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                <div className="mt-5">
                                    <h1 className="mb-2">Kích cỡ:</h1>
                                    {data.size.map((item: any) => (
                                        <button
                                            key={item}
                                            className={`border-2 border-lanh_green ${
                                                size === item
                                                    ? "bg-lanh_green text-white"
                                                    : "bg-white text-black"
                                            } px-4 rounded-md mr-4 hover:bg-lanh_green hover:text-white`}
                                            onClick={() => setSize(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-5">
                                    {mess && (
                                        <div
                                            className={`${
                                                mess.type === "error"
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                            } mb-2`}
                                        >
                                            {mess.text}
                                        </div>
                                    )}
                                    <button
                                        disabled={
                                            data.inStock === 0 ? true : false
                                        }
                                        className="bg-lanh_green disabled:bg-slate-400 disabled:opacity-50 text-white lg:text-base text-sm px-4 py-2 rounded-md hover:opacity-80 flex gap-2 items-center"
                                        onClick={() =>
                                            handleAddCart(data, quantity, size)
                                        }
                                    >
                                        {isLoading ? (
                                            <div className="relative w-5 h-5">
                                                <Image
                                                    src={"/loading.png"}
                                                    alt="loadings"
                                                    fill
                                                    className="animate-spin object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <ShoppingCartIcon className="h-6 w-6" />
                                        )}

                                        <span>Thêm vào giỏ</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <RelatedProducts relatedProducts={relatedProducts} />
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-0">
                            {session ? (
                                <form
                                    onSubmit={handleSubmitFeedback}
                                    className="mt-4 w-full"
                                >
                                    <h1 className="font-bold">Đánh giá:</h1>
                                    <p className="flex pb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon
                                                key={star}
                                                className={`w-8 h-8 ${
                                                    star <= rating
                                                        ? "text-yellow-300"
                                                        : "text-gray-400"
                                                } cursor-pointer`}
                                                onClick={() => setRating(star)}
                                            />
                                        ))}
                                    </p>
                                    <h1 className="font-bold">Bình luận:</h1>
                                    <textarea
                                        rows={2}
                                        className="w-full border-2 rounded-md p-2"
                                        name="comment"
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        value={comment}
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className={`rounded-md w-fit ${
                                            isLoading
                                                ? "bg-slate-400 opacity-50"
                                                : "bg-lanh_green"
                                        }  text-white px-2 py-2 flex justify-center items-center`}
                                    >
                                        {isLoading && (
                                            <div className="relative w-4 h-4 mr-2">
                                                <Image
                                                    src={"/loading.png"}
                                                    alt="loadings"
                                                    fill
                                                    className="animate-spin object-contain"
                                                />
                                            </div>
                                        )}
                                        <span>Gửi</span>
                                    </button>
                                </form>
                            ) : (
                                <div className="w-full text-center">
                                    <button className="md:w-2/3 w-full h-fit bg-lanh_green mt-4 p-2 rounded-md text-white">
                                        Đăng nhập để lại đánh giá
                                    </button>
                                </div>
                            )}
                            <div className="mt-4 w-full">
                                <h1 className="font-bold pb-2">
                                    Phản hồi của khách hàng:
                                </h1>
                                <div className="max-h-52 overflow-y-scroll">
                                    <div className="border-t-2">
                                        {feedbacks.length > 0 ? (
                                            feedbacks.map((feed) => (
                                                <div
                                                    className="border-b-2 py-2"
                                                    key={feed._id}
                                                >
                                                    <div className="flex justify-between">
                                                        <p className="font-bold">
                                                            {feed.fullName}
                                                        </p>
                                                        <p className="flex">
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                            ].map((star) => (
                                                                <StarIcon
                                                                    key={star}
                                                                    className={`w-6 h-6 ${
                                                                        star <=
                                                                        feed.rating
                                                                            ? "text-yellow-300"
                                                                            : "text-gray-400"
                                                                    }`}
                                                                />
                                                            ))}
                                                        </p>
                                                    </div>
                                                    <p className="italic">
                                                        {feed.comment
                                                            ? feed.comment
                                                            : "Người dùng không để lại bình luận"}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-2">
                                                Chưa có đánh giá từ khách hàng
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DetailProduct;
