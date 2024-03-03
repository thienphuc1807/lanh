"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Phone from "/public/Phone.png";
import Location from "/public/location.png";
import Shipper from "/public/Shipper.png";
import bannerImage from "/public/Banner.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// const slider = [
//     {
//         name: "Nước ép",
//         url: "/juice.png",
//     },
//     {
//         name: "Sinh tố xanh",
//         url: "/smoothie.png",
//     },
//     {
//         name: "Salad",
//         url: "/Salad.png",
//     },
//     {
//         name: "Bánh ngọt",
//         url: "/Bánh ngọt.png",
//     },
//     {
//         name: "Kem trái cây",
//         url: "/Kem.png",
//     },
//     {
//         name: "Thuần chay",
//         url: "/Thuần chay.png",
//     },
//     {
//         name: "Lành",
//         url: "/Lành.png",
//     },
// ];

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
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <main>
            <div className="relative z-0 xl:mt-[-250px] lg:mt-[-180px] md:mt-[-130px] mt-[-60px]">
                <Image src={bannerImage} alt="banner_lanh" />
            </div>
            <div className="lg:mt-10 mt-8 container mx-auto px-5">
                <div data-aos="fade-down">
                    <div className="flex justify-center items-center">
                        <Image
                            src="/leaf.png"
                            alt="heading_background"
                            width={70}
                            height={70}
                            className="absolute w-auto h-auto"
                        />
                        <h2 className="md:text-2xl text-xl font-bold">
                            SẢN PHẨM
                        </h2>
                    </div>
                    {/* <div className="pt-10">
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
                                        src="/Before.png"
                                        width={40}
                                        height={40}
                                        alt="next_btn"
                                    />
                                </button>
                                <button className="next-button">
                                    <Image
                                        src="/Next (6).png"
                                        width={40}
                                        height={40}
                                        alt="next_btn"
                                    />
                                </button>
                            </div>
                        </Swiper>
                    </div> */}
                </div>
                <div data-aos="fade-up">
                    <div className="lg:py-10 py-5">
                        <div className="flex justify-center items-center">
                            <Image
                                src="/leaf.png"
                                alt="heading_background"
                                width={70}
                                height={70}
                                className="absolute w-auto h-auto"
                            />
                            <h2 className="md:text-2xl text-xl font-bold">
                                SẢN PHẨM MỚI
                            </h2>
                        </div>
                        <p className="lg:px-48 px-2 text-center mt-6 md:text-xl text-sm">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Id temporibus rem cum. Voluptate molestiae
                            placeat minima corporis! Ipsum facere obcaecati
                            iure, voluptatibus optio nemo, at vel deleniti
                            numquam, neque vero!
                        </p>
                        <div className="lg:pt-5 pt-2">
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 lg:gap-8 md:gap-4 gap-2">
                                {/* {product.map((item) => (
                                    <div
                                        key={item.name}
                                        className="pt-5 group/item cursor-pointer"
                                    >
                                        <div className="relative w-full h-64 bg-[#f7f8fa] ">
                                            <Image
                                                src={item.url}
                                                fill={true}
                                                className="object-contain"
                                                alt={item.name}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className="flex justify-center gap-4 mt-6 items-center">
                                            <span className="text-[#f35a69]">
                                                {item.sale_price}
                                            </span>
                                            <span className="text-xs text-gray-800 line-through">
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
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:py-10" data-aos="fade-left">
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
        </main>
    );
}

export default Home;
