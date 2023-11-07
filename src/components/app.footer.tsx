import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
        <footer className="flex items-end justify-center bg-no-repeat bg-lanhFooter md:bg-[length:100%_100%] bg-[length:150%_100%] h-[490px]">
            <div className="container md:pb-8 pb-5 mx-auto px-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div>
                        <div className="md:flex items-center gap-6">
                            <Link href="/">
                                <Image
                                    src="/images/Icon/Logo.png"
                                    width={120}
                                    height={100}
                                    alt="lanh_Logo"
                                    className="md:w-28 w-24"
                                />
                            </Link>
                            <div className="relative before:absolute before:h-full before:border-[1px] before:border-white">
                                <div className="pl-6">
                                    <h6 className="text-[#4c4c4c] text-justify text-sm leading-5">
                                        Công ty cổ phần Lành Healthycare
                                    </h6>
                                    <p className="text-white text-justify text-xs leading-5">
                                        Cơ sở chính: 26 Tăng Bạt Hổ, Phường 11,
                                        Bình Thạnh, TP.HCM
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex md:justify-start justify-around pt-4 md:pt-5 md:gap-6">
                            <Link href="/" className="w-10 md:w-20">
                                <Image
                                    src="/images/Icon/Facebook (1).png"
                                    width={50}
                                    height={50}
                                    alt="facebook"
                                />
                            </Link>
                            <Link href="/" className="w-10 md:w-20">
                                <Image
                                    src="/images/Icon/Instagram (1).png"
                                    width={50}
                                    height={50}
                                    alt="facebook"
                                />
                            </Link>
                            <Link href="/" className="w-10 md:w-20">
                                <Image
                                    src="/images/Icon/Tweeter.png"
                                    width={50}
                                    height={50}
                                    alt="facebook"
                                />
                            </Link>
                            <Link href="/" className="w-10 md:w-20">
                                <Image
                                    src="/images/Icon/Youtube (1).png"
                                    width={50}
                                    height={50}
                                    alt="facebook"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block md:mx-auto text-white">
                        <h6 className="mb-4">SẢN PHẨM</h6>
                        <ul className="flex flex-col gap-3">
                            <li>Nước ép</li>
                            <li>Sinh tố xanh</li>
                            <li>Salad</li>
                            <li>Bánh ngọt</li>
                            <li>Kem trái cây</li>
                            <li>Thuần chay</li>
                        </ul>
                    </div>
                    <div className="md:pt-0 pt-3">
                        <label
                            htmlFor="email"
                            className="block text-white text-sm md:pb-4 pb-2"
                        >
                            Nhận ưu đãi từ chúng tôi
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-full pl-6 py-3 placeholder:text-sm focus:outline-none                                  "
                                type="email"
                                id="email"
                                placeholder="Nhập email của bạn"
                            />
                            <button className="absolute inset-y-0 right-0 mr-0.5 ">
                                <Image
                                    src="/images/Icon/Button Gửii.png"
                                    width={92}
                                    height={92}
                                    alt="send_button"
                                    className="w-auto h-auto"
                                />
                            </button>
                        </div>
                        <h6 className="md:pt-6 py-2 md:pb-4 text-white text-sm">
                            Tải ứng dụng
                        </h6>
                        <div className="flex md:flex-col gap-4">
                            <div className="w-auto h-auto">
                                <Image
                                    src="/images/Icon/CHPlay.png"
                                    alt="AppStore"
                                    width={80}
                                    height={80}
                                    className="w-auto h-auto"
                                />
                            </div>

                            <div className="w-auto h-auto">
                                <Image
                                    src="/images/Icon/App Store.png"
                                    alt="AppStore"
                                    width={80}
                                    height={80}
                                    className="w-auto h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
