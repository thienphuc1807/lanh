import Image from "next/image";
import Phone from "/public/Phone.png";
import Location from "/public/location.png";
import Shipper from "/public/Shipper.png";
import bannerImage from "/public/Banner.png";
import ProductsSwiper from "@/components/Swiper";
import NewProducts from "@/components/NewProducts";
import Introduction from "@/components/Introduction";

const getData = async () => {
    const res = await fetch(`http://${process.env.DOMAIN}/api/products`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return res.json();
};

async function Home() {
    const data = await getData();
    console.log(data);

    return (
        <main>
            <div className="relative z-0 xl:mt-[-250px] lg:mt-[-180px] md:mt-[-130px] mt-[-60px]">
                <Image src={bannerImage} alt="banner_lanh" />
            </div>
            <div className="lg:mt-10 mt-8 ">
                <ProductsSwiper />
                <Introduction />
                <NewProducts products={data} />
                <div
                    className="lg:py-10 container mx-auto px-5"
                    data-aos="fade-left"
                >
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
