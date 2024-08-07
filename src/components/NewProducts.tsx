"use client";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addCart } from "@/app/Redux/cartSlice";

interface Props {
    products: Products[];
}

const NewProducts = (props: Props) => {
    const { products } = props;
    const data = products.slice(0, 8);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        AOS.init();
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    console.log(isLoading);

    return (
        <div className="container mx-auto px-5" data-aos="fade-up">
            <div className="lg:py-6 py-4">
                <div className="flex justify-center items-center relative h-24">
                    <Image
                        src="/leaf.png"
                        alt="heading_background"
                        fill
                        className="object-contain"
                    />
                    <h2 className="md:text-2xl text-xl font-bold">
                        SẢN PHẨM MỚI
                    </h2>
                </div>
                <p className="lg:px-48 px-2 text-center md:mt-6 mt-2 md:text-md text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
                    temporibus rem cum. Voluptate molestiae placeat minima
                    corporis! Ipsum facere obcaecati iure, voluptatibus optio
                    nemo, at vel deleniti numquam, neque vero!
                </p>
                <div className="lg:pt-5 pt-2">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-4 gap-2">
                        {data.map((item) => (
                            <div
                                key={item._id}
                                className="group/item cursor-pointer bg-white rounded-lg overflow-hidden shadow-[1px_1px_6px_2px_rgba(151,186,121,0.3)]"
                            >
                                {isLoading ? (
                                    <div className="animate-pulse">
                                        <div className="relative w-full md:h-64 h-80 bg-white overflow-hidden px-4">
                                            <div className="bg-slate-200 rounded-md h-60 mx-auto mt-4"></div>
                                        </div>
                                        <div className="bg-white md:p-4 p-2">
                                            <div className="flex flex-col gap-2 md:items-center items-start">
                                                <div className="bg-slate-200 h-4 w-full mx-auto mt-3"></div>
                                                <div className="bg-slate-200 h-4 w-full mx-auto mt-3"></div>
                                                <div className="bg-slate-200 h-4 w-full mx-auto mt-3"></div>
                                                <div className="h-5 w-full mx-auto mt-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="relative w-full md:h-64 h-80 bg-white overflow-hidden">
                                            {item?.imgs ? (
                                                <Link
                                                    href={`products/${item.name}`}
                                                >
                                                    <Image
                                                        key={item.imgs[0]?._id}
                                                        src={item.imgs[0]?.url}
                                                        fill={true}
                                                        className={`object-contain ${
                                                            item.inStock === 0
                                                                ? "opacity-50"
                                                                : "opacity-100"
                                                        }`}
                                                        alt={item.name}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`products/${item.name}`}
                                                >
                                                    <Image
                                                        src="/defaultImg.png"
                                                        alt="product_img"
                                                        className={`object-contain ${
                                                            item.inStock === 0
                                                                ? "opacity-50"
                                                                : "opacity-100"
                                                        }`}
                                                        fill
                                                    />
                                                </Link>
                                            )}
                                            {item.inStock === 0 ? (
                                                <Image
                                                    src="/outofstock.png"
                                                    alt="sale"
                                                    className="relative top-[-15px] left-[-15px] object-contain z-10"
                                                    width={100}
                                                    height={100}
                                                />
                                            ) : (
                                                <Image
                                                    src="/sale.png"
                                                    alt="sale"
                                                    className="object-contain"
                                                    width={100}
                                                    height={100}
                                                />
                                            )}
                                        </div>

                                        <div className="bg-white md:p-5 p-4">
                                            <div className="flex flex-col gap-2 md:items-center items-start">
                                                <span className="text-[#f35a69] font-bold">
                                                    {Intl.NumberFormat(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    ).format(item.salePrice)}
                                                </span>
                                                <span className="text-xs text-gray-800 line-through">
                                                    {Intl.NumberFormat(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    ).format(item.price)}
                                                </span>

                                                <Link
                                                    href={`products/${item.name}`}
                                                    className="text-center font-bold"
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div className="md:block hidden lg:invisible text-center group-hover/item:visible">
                                                <p className="text-sm text-gray-600">
                                                    {item.ingredient}
                                                </p>
                                                <div className="md:mt-5 mt-2">
                                                    <Link
                                                        href={`products/${item.name}`}
                                                        className="bg-[#f35a69] hover:bg-white hover:text-[#f35a69] border-2 border-[#f35a69] disabled:bg-gray-400 text-white md:rounded-full py-2 md:px-10 px-5 "
                                                        onClick={() =>
                                                            dispatch(
                                                                addCart(item)
                                                            )
                                                        }
                                                    >
                                                        {item.inStock === 0
                                                            ? "Hết hàng"
                                                            : "Chi tiết"}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProducts;
