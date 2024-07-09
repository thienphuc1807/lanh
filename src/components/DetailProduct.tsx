"use client";

import Image from "next/image";
import BreadCrumbs from "@/components/Breadcrumbs";
import { useState } from "react";
import { useDispatch } from "react-redux";
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
    session: any;
    feedbacks: Feedbacks[];
    averageRating: number;
    relatedProducts: Products[];
}

const DetailProduct = (props: Props) => {
    const { data, session, feedbacks, averageRating, relatedProducts } = props;
    const breadcrumbs = [
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm", path: "/products" },
        { name: `${data.name}`, path: `/products/${data.name}` },
    ];
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const router = useRouter();

    const handleChangeQuantity = (math: string, quantity: number) => {
        if (math === "plus") {
            if (data.inStock && quantity < data.inStock) {
                setQuantity((quantity += 1));
            }
        } else {
            if (quantity > 1) {
                setQuantity((quantity -= 1));
            }
        }
    };

    const handleSubmitFeedback = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("rating", rating.toString());
        formData.append("comment", comment);
        const userFeedback = await handleUserFeedback(
            formData,
            session.user.id,
            data._id,
            session.user.fullName
        );
        if (!userFeedback) {
            alert("Success!");
            router.refresh();
        } else {
            alert("Fail!");
        }
    };

    return (
        <div className="container mx-auto lg:px-5 px-0">
            {/* BreadCrumbs */}
            <div className="lg:px-0 px-3">
                <BreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="bg-white rounded-lg p-5">
                {/* Detail Product */}
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
                        <h1 className="font-bold text-xl">{data.name}</h1>
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
                        <p className="my-5">Nguyên liệu: {data.ingredient}</p>
                        <label htmlFor="quantity">Số lượng: </label>
                        {data.inStock === 0 ? (
                            <p className="text-red-500 font-bold">Hết hàng</p>
                        ) : (
                            <div className="flex pt-4">
                                <button
                                    onClick={() =>
                                        handleChangeQuantity("minus", quantity)
                                    }
                                    className={`px-2 ${
                                        quantity === 1
                                            ? "bg-gray-400"
                                            : " bg-lanh_green"
                                    }  text-white rounded-l-md`}
                                    disabled={quantity === 1 ? true : false}
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
                                        handleChangeQuantity("plus", quantity)
                                    }
                                    className={`px-2 ${
                                        quantity === data.inStock
                                            ? "bg-gray-400"
                                            : "bg-lanh_green"
                                    }  text-white rounded-r-md`}
                                    disabled={
                                        quantity === data.inStock ? true : false
                                    }
                                >
                                    <PlusIcon className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-5 mt-5">
                            <button
                                disabled={data.inStock === 0 ? true : false}
                                className="bg-lanh_green disabled:bg-slate-400 disabled:opacity-50 text-white lg:text-base text-sm px-4 py-2 rounded-md hover:opacity-80 flex gap-2 items-center"
                                onClick={() =>
                                    dispatch(addCart({ ...data, quantity }))
                                }
                            >
                                <ShoppingCartIcon className="h-6 w-6" />
                                <span>Thêm vào giỏ</span>
                            </button>
                            <button
                                disabled={data.inStock === 0 ? true : false}
                                className="bg-lanh_green disabled:bg-slate-400 disabled:opacity-50 text-white lg:text-base text-sm px-4 py-2 rounded-md hover:opacity-80"
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
                {/* User Feedback */}
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-0">
                    {session && (
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
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                            ></textarea>
                            <button
                                type="submit"
                                className="rounded-md w-full bg-lanh_green text-white px-2 py-2"
                            >
                                Gửi
                            </button>
                        </form>
                    )}
                    <div className="mt-4 w-full">
                        <h1 className="font-bold pb-2">
                            Phản hồi của khách hàng:
                        </h1>
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
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <StarIcon
                                                        key={star}
                                                        className={`w-6 h-6 ${
                                                            star <= feed.rating
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
                {/* Related Products */}
                <RelatedProducts relatedProducts={relatedProducts} />
            </div>
        </div>
    );
};

export default DetailProduct;
