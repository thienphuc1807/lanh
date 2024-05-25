import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
        <footer className="flex items-end justify-center bg-lanh_green">
            <div className="lg:container lg:mx-auto xl:px-0 md:px-6 md:py-10 py-6 px-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div>
                        <div className="md:flex items-center gap-6">
                            <Link href="/">
                                <Image
                                    src="/Logo.png"
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
                                    src="/facebookicon.png"
                                    width={50}
                                    height={50}
                                    alt="facebook"
                                />
                            </Link>
                            <Link href="/" className="w-10 md:w-20">
                                <Image
                                    src="/Instagram.png"
                                    width={50}
                                    height={50}
                                    alt="instagram"
                                />
                            </Link>
                            <Link href="/" className="w-10 md:w-20">
                                <Image
                                    src="/Tweeter.png"
                                    width={50}
                                    height={50}
                                    alt="tweeter"
                                />
                            </Link>
                            <Link href="/" className="w-10 md:w-20">
                                <Image
                                    src="/YouTube.png"
                                    width={50}
                                    height={50}
                                    alt="youtube"
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
                            className="block text-white md:pb-4 pb-2"
                        >
                            Nhận ưu đãi từ chúng tôi
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-full pl-6 py-4 focus:outline-none                                  "
                                type="email"
                                id="email"
                                placeholder="Email của bạn"
                            />
                            <button className="absolute inset-y-1 right-0 mr-1 lg:w-28 md:w-20 w-28">
                                <Image
                                    src="/send.png"
                                    fill
                                    alt="send_button"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </button>
                        </div>
                        <h6 className="md:pt-6 py-2 md:pb-4 text-white">
                            Tải ứng dụng
                        </h6>
                        <div className="flex gap-2">
                            <button className="relative w-32 h-10">
                                <Image
                                    fill
                                    src="/CHPlay.png"
                                    alt="CHPlay"
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </button>
                            <button className="relative w-32 h-10">
                                <Image
                                    fill
                                    src="/AppStore.png"
                                    alt="AppStore"
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
