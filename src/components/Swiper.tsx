"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const slider = [
    {
        name: "Nước ép",
        url: "/juice.png",
    },
    {
        name: "Sinh tố xanh",
        url: "/smoothie.png",
    },
    {
        name: "Salad",
        url: "/Salad.png",
    },
    {
        name: "Bánh ngọt",
        url: "/cake.png",
    },
    {
        name: "Kem trái cây",
        url: "/icecream.png",
    },
    {
        name: "Thuần chay",
        url: "/vegeterian.png",
    },
    {
        name: "Lành",
        url: "/defaultImg.png",
    },
];

const ProductsSwiper = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="container mx-auto px-5" data-aos="fade-right">
            <div className="flex justify-center items-center relative">
                <Image
                    src="/leaf.png"
                    alt="heading_background"
                    width={100}
                    height={100}
                    className="absolute"
                />
                <h2 className="md:text-2xl text-xl font-bold">SẢN PHẨM</h2>
            </div>
            <div className="pt-10">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={10}
                    slidesPerView={2}
                    loop={true}
                    navigation={{
                        nextEl: ".next-button",
                        prevEl: ".prev-button",
                    }}
                    autoplay={{
                        delay: 2000,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 30,
                        },
                    }}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {slider.map((item) => (
                        <SwiperSlide key={item.name}>
                            <Link href="/" className="block my-1 mx-1">
                                <div className="flex flex-col justify-center items-center rounded-3xl shadow-[1px_1px_6px_2px_rgba(151,186,121,0.3)] py-4">
                                    <div className="relative w-24 h-24">
                                        <Image
                                            src={item.url}
                                            alt={item.name}
                                            fill={true}
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <p className="mt-2">{item.name}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                    <div className="flex justify-end gap-6 mt-8">
                        <button className="prev-button">
                            <Image
                                src="/previous.png"
                                width={40}
                                height={40}
                                alt="next_btn"
                            />
                        </button>
                        <button className="next-button">
                            <Image
                                src="/Next.png"
                                width={40}
                                height={40}
                                alt="next_btn"
                            />
                        </button>
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default ProductsSwiper;
