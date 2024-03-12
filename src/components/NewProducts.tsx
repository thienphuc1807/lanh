"use client";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";

interface Props {
    products: Products[];
}

const NewProducts = (props: Props) => {
    const { products } = props;
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="container mx-auto px-5" data-aos="fade-up">
            <div className="lg:py-10 py-5">
                <div className="flex justify-center items-center relative">
                    <Image
                        src="/leaf.png"
                        alt="heading_background"
                        width={100}
                        height={100}
                        className="absolute"
                    />
                    <h2 className="md:text-2xl text-xl font-bold">
                        SẢN PHẨM MỚI
                    </h2>
                </div>
                <p className="lg:px-48 px-2 text-center mt-6 md:text-md text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
                    temporibus rem cum. Voluptate molestiae placeat minima
                    corporis! Ipsum facere obcaecati iure, voluptatibus optio
                    nemo, at vel deleniti numquam, neque vero!
                </p>
                <div className="lg:pt-5 pt-2">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 lg:gap-8 md:gap-4 gap-2">
                        {products.map((item) => (
                            <Link
                                href={`products/${item.name}`}
                                key={item.name}
                                className="pt-5 group/item cursor-pointer"
                            >
                                <div className="relative w-full h-64 bg-[#f7f8fa] ">
                                    <Image
                                        src={`/${item.img}`}
                                        fill={true}
                                        className="object-contain"
                                        alt={item.name}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="flex justify-center gap-4 mt-6 items-center">
                                    <span className="text-[#f35a69]">
                                        {Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(item.salePrice)}
                                    </span>
                                    <span className="text-xs text-gray-800 line-through">
                                        {Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(item.price)}
                                    </span>
                                </div>
                                <p className="mt-2 text-center">{item.name}</p>
                                <div className="lg:invisible visible text-center group-hover/item:visible">
                                    <p className="text-sm text-gray-600">
                                        {item.ingredient}
                                    </p>
                                    <button className="bg-[#f35a69] text-white rounded-full py-2 md:px-10 px-5 md:mt-5 mt-2">
                                        Thêm vào giỏ
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProducts;
