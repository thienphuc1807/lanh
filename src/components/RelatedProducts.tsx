import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
interface Props {
    relatedProducts: Products[];
}
const RelatedProducts = (props: Props) => {
    const { relatedProducts } = props;
    return (
        <div>
            <h1 className="py-4 font-bold text-xl text-lanh_green">
                Sản phẩm liên quan
            </h1>

            <Swiper
                modules={[Navigation]}
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
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
            >
                {relatedProducts.map((item) => (
                    <SwiperSlide key={item.name}>
                        <Link
                            href={`${item.name}`}
                            className="border-2 rounded-md shadow-md flex flex-col items-center p-2"
                        >
                            <div className="relative w-28 h-28 text-center">
                                <Image
                                    src={item.imgs[0].url}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h1>{item.name}</h1>
                            <p className="font-bold text-lanh_green">
                                {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(item.salePrice)}
                            </p>
                        </Link>
                    </SwiperSlide>
                ))}
                <div className="flex justify-end gap-2 md:mt-4 mt-0">
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
    );
};

export default RelatedProducts;
