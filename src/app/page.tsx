"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Phone from "../../public/images/Icon/Phone.png";
import Location from "../../public/images/Icon/Chi nhánh.png";
import Shipper from "../../public/images/Icon/Shipper.png";
import bannerImage from "../../public/images/banner/Banner.png";

const slider = [
    {
        name: "Nước ép",
        url: "/images/Icon/Nước ép.png",
    },
    {
        name: "Sinh tố xanh",
        url: "/images/Icon/Sinh tố.png",
    },
    {
        name: "Salad",
        url: "/images/Icon/Salad.png",
    },
    {
        name: "Bánh ngọt",
        url: "/images/Icon/Bánh ngọt.png",
    },
    {
        name: "Kem trái cây",
        url: "/images/Icon/Kem.png",
    },
    {
        name: "Thuần chay",
        url: "/images/Icon/Thuần chay.png",
    },
    {
        name: "Lành",
        url: "/images/banner/Lành.png",
    },
];

const product = [
    {
        name: "Nước ép thơm",
        sale_price: "35,000đ",
        price: "55,000đ",
        ingredient: "Dứa, đường, chanh, muối",
        url: "/images/banner/Sản phẩm 1.png",
    },
    {
        name: "Sinh tố dâu mix hạt chia",
        sale_price: "35,000đ",
        price: "55,000đ",
        ingredient: "Bơ yến mạch, hạt chia, chuối, cải bina",
        url: "/images/banner/Sản phẩm 2.png",
    },
    {
        name: "Salad tổng hợp",
        sale_price: "35,000đ",
        price: "55,000đ",
        ingredient: "Rau củ, trái cây, thịt cá, trứng, ngũ cốc",
        url: "/images/banner/Sản phẩm 3.png",
    },
    {
        name: "Salad hoa quả",
        sale_price: "35,000đ",
        price: "55,000đ",
        ingredient: "Nho, dâu, xoài, kiwi",
        url: "/images/banner/Sản phẩm 11.png",
    },
];

function Home() {
    return (
        <>
            <div className="z-0 md:mt-0 pt-10">
                <Image src={bannerImage} alt="banner_lanh" />
            </div>
            <div className="lg:mt-10 mt-8 container mx-auto px-5">
                <div className="flex justify-center items-center">
                    <Image
                        src="/images/Icon/Bông.png"
                        alt="heading_background"
                        width={80}
                        height={80}
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
                                                objectFit="contain"
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
                                    src="/images/Icon/Before.png"
                                    width={40}
                                    height={40}
                                    alt="next_btn"
                                />
                            </button>
                            <button className="next-button">
                                <Image
                                    src="/images/Icon/Next (6).png"
                                    width={40}
                                    height={40}
                                    alt="next_btn"
                                />
                            </button>
                        </div>
                    </Swiper>
                </div>
                <div className="lg:py-10 py-5">
                    <div className="flex justify-center items-center">
                        <Image
                            src="/images/Icon/Bông.png"
                            alt="heading_background"
                            width={80}
                            height={80}
                            className="absolute"
                        />
                        <h2 className="md:text-2xl text-xl font-bold">
                            SẢN PHẨM MỚI
                        </h2>
                    </div>
                    <p className="lg:px-48 px-2 text-center mt-6 md:text-xl text-sm">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Id temporibus rem cum. Voluptate molestiae placeat
                        minima corporis! Ipsum facere obcaecati iure,
                        voluptatibus optio nemo, at vel deleniti numquam, neque
                        vero!
                    </p>
                    <div className="lg:pt-5 pt-2">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 lg:gap-8 md:gap-4 gap-2">
                            {product.map((item) => (
                                <div
                                    key={item.name}
                                    className="pt-5 group/item cursor-pointer"
                                >
                                    <div className="relative w-full h-64 bg-[#f7f8fa] ">
                                        <Image
                                            src={item.url}
                                            fill={true}
                                            objectFit="contain"
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className="flex justify-center gap-4 mt-6 items-center">
                                        <span className="text-[#f35a69]">
                                            {item.sale_price}
                                        </span>
                                        <span className="text-xs text-gray-600 line-through">
                                            {item.price}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-center">
                                        {item.name}
                                    </p>
                                    <div className="lg:invisible visible text-center group-hover/item:visible">
                                        <p className="text-sm text-gray-600">
                                            {item.ingredient}
                                        </p>
                                        <button className="bg-[#f35a69] text-white rounded-full py-2 md:px-10 px-5 md:mt-5 mt-2">
                                            Thêm vào giỏ
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:py-10">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                        <div className="bg-[#f7f8fa] h-56 py-10">
                            <h2 className="text-center font-semibold pb-10">
                                HOTLINE ĐẶT HÀNG
                            </h2>
                            <p className="flex justify-center items-center gap-4">
                                <Image
                                    src={Phone}
                                    alt="phone_icon"
                                    className="w-10"
                                />
                                <span className="text-[#97ba79] font-semibold">
                                    1900 0126
                                </span>
                            </p>
                        </div>
                        <div className="bg-[#f7f8fa] py-10 h-56">
                            <h2 className="font-semibold text-center pb-10">
                                CHI NHÁNH
                            </h2>
                            <p className="flex items-center justify-center">
                                <Image
                                    src={Location}
                                    alt="Location_icon"
                                    className="w-20"
                                />
                            </p>
                        </div>
                        <div className="bg-[#f7f8fa] py-10 h-56">
                            <h2 className="font-semibold text-center">
                                GIAO HÀNG MIỄN PHÍ
                            </h2>
                            <p className="flex items-center justify-center">
                                <Image
                                    src={Shipper}
                                    alt="shipper_icon"
                                    className="w-36"
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
