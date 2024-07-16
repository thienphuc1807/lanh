import BreadCrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";

const breadcrumbs = [
    {
        name: "Trang chủ",
        path: "/",
    },
    {
        name: "Tin tức",
        path: "/news",
    },
];

export const metadata = {
    title: "Tin tức",
};

function News() {
    return (
        <main className="container mx-auto px-5 gap-6">
            <div className="py-4">
                <BreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex gap-5">
                <div className="flex-[80%]">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                        <div className="border-2 p-2">
                            <div className="bg-gray-300 flex justify-center items-center h-52 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href="/" className="hover:text-lanh_green">
                                <h2 className="line-clamp-2 text-justify pt-2 font-bold">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </h2>
                            </Link>

                            <p className="line-clamp-2 pt-2 text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Totam tempore adipisci facere
                                repellat dolor quasi placeat corrupti numquam
                                expedita, alias ratione accusantium magni
                                similique nihil quidem molestias nesciunt quod.
                                Corporis!
                            </p>
                        </div>
                        <div className="border-2 p-2">
                            <div className="bg-gray-300 flex justify-center items-center h-52 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href="/" className="hover:text-lanh_green">
                                <h2 className="line-clamp-2 text-justify pt-2 font-bold">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </h2>
                            </Link>

                            <p className="line-clamp-2 pt-2 text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Totam tempore adipisci facere
                                repellat dolor quasi placeat corrupti numquam
                                expedita, alias ratione accusantium magni
                                similique nihil quidem molestias nesciunt quod.
                                Corporis!
                            </p>
                        </div>
                        <div className="border-2 p-2">
                            <div className="bg-gray-300 flex justify-center items-center h-52 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href="/" className="hover:text-lanh_green">
                                <h2 className="line-clamp-2 text-justify pt-2 font-bold">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </h2>
                            </Link>

                            <p className="line-clamp-2 pt-2 text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Totam tempore adipisci facere
                                repellat dolor quasi placeat corrupti numquam
                                expedita, alias ratione accusantium magni
                                similique nihil quidem molestias nesciunt quod.
                                Corporis!
                            </p>
                        </div>
                        <div className="border-2 p-2">
                            <div className="bg-gray-300 flex justify-center items-center h-52 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href="/" className="hover:text-lanh_green">
                                <h2 className="line-clamp-2 text-justify pt-2 font-bold">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </h2>
                            </Link>

                            <p className="line-clamp-2 pt-2 text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Totam tempore adipisci facere
                                repellat dolor quasi placeat corrupti numquam
                                expedita, alias ratione accusantium magni
                                similique nihil quidem molestias nesciunt quod.
                                Corporis!
                            </p>
                        </div>
                        <div className="border-2 p-2">
                            <div className="bg-gray-300 flex justify-center items-center h-52 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href="/" className="hover:text-lanh_green">
                                <h2 className="line-clamp-2 text-justify pt-2 font-bold">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </h2>
                            </Link>

                            <p className="line-clamp-2 pt-2 text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Totam tempore adipisci facere
                                repellat dolor quasi placeat corrupti numquam
                                expedita, alias ratione accusantium magni
                                similique nihil quidem molestias nesciunt quod.
                                Corporis!
                            </p>
                        </div>
                        <div className="border-2 p-2">
                            <div className="bg-gray-300 flex justify-center items-center h-52 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href="/" className="hover:text-lanh_green">
                                <h2 className="line-clamp-2 text-justify pt-2 font-bold">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </h2>
                            </Link>
                            <p className="line-clamp-2 pt-2 text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Totam tempore adipisci facere
                                repellat dolor quasi placeat corrupti numquam
                                expedita, alias ratione accusantium magni
                                similique nihil quidem molestias nesciunt quod.
                                Corporis!
                            </p>
                        </div>
                        <div className="border-2 p-2">
                            <div className="bg-gray-300 flex justify-center items-center h-52 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href="/" className="hover:text-lanh_green">
                                <h2 className="line-clamp-2 text-justify pt-2 font-bold">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </h2>
                            </Link>
                            <p className="line-clamp-2 pt-2 text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Totam tempore adipisci facere
                                repellat dolor quasi placeat corrupti numquam
                                expedita, alias ratione accusantium magni
                                similique nihil quidem molestias nesciunt quod.
                                Corporis!
                            </p>
                        </div>
                        <div className="border-2 p-2">
                            <div className="bg-gray-300 flex justify-center items-center h-52 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href="/" className="hover:text-lanh_green">
                                <h2 className="line-clamp-2 text-justify pt-2 font-bold">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </h2>
                            </Link>
                            <p className="line-clamp-2 pt-2 text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Totam tempore adipisci facere
                                repellat dolor quasi placeat corrupti numquam
                                expedita, alias ratione accusantium magni
                                similique nihil quidem molestias nesciunt quod.
                                Corporis!
                            </p>
                        </div>
                        <div className="border-2 p-2">
                            <div className="bg-gray-300 flex justify-center items-center h-52 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href="/" className="hover:text-lanh_green">
                                <h2 className="line-clamp-2 text-justify pt-2 font-bold">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </h2>
                            </Link>
                            <p className="line-clamp-2 pt-2 text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Totam tempore adipisci facere
                                repellat dolor quasi placeat corrupti numquam
                                expedita, alias ratione accusantium magni
                                similique nihil quidem molestias nesciunt quod.
                                Corporis!
                            </p>
                        </div>
                    </div>
                </div>
                <aside className="flex-[20%] lg:block hidden">
                    <div className="rounded-md overflow-hidden border-2">
                        <h2 className="bg-lanh_green text-white text-center py-5">
                            Tin tức chung
                        </h2>
                        <nav className="p-4">
                            <ul className="flex flex-col gap-4">
                                <li className="hover:text-lanh_green cursor-pointer">
                                    Thông tin
                                </li>
                                <li className="hover:text-lanh_green cursor-pointer">
                                    Sự kiện
                                </li>
                                <li className="hover:text-lanh_green cursor-pointer">
                                    Tuyển dụng
                                </li>
                                <li className="hover:text-lanh_green cursor-pointer">
                                    Công bố sản phẩm mới
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="rounded-md overflow-hidden border-2 mt-4">
                        <h2 className="bg-lanh_green text-white text-center py-5">
                            Tin mới
                        </h2>
                        <Link
                            href="/"
                            className="grid grid-cols-2 p-4 gap-4 hover:text-lanh_green"
                        >
                            <div className="bg-gray-300 flex justify-center items-center p-2 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <h2 className="line-clamp-3 font-bold">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </h2>
                        </Link>
                        <Link
                            href="/"
                            className="grid grid-cols-2 p-4 gap-4 hover:text-lanh_green"
                        >
                            <div className="bg-gray-300 flex justify-center items-center p-2 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <h2 className="line-clamp-3 font-bold">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </h2>
                        </Link>
                        <Link
                            href="/"
                            className="grid grid-cols-2 p-4 gap-4 hover:text-lanh_green"
                        >
                            <div className="bg-gray-300 flex justify-center items-center p-2 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <h2 className="line-clamp-3 font-bold">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </h2>
                        </Link>
                    </div>
                    <div className="rounded-md overflow-hidden border-2 mt-4">
                        <h2 className="bg-lanh_green text-white text-center py-5">
                            Tin nổi bật
                        </h2>
                        <Link
                            href="/"
                            className="grid grid-cols-2 p-4 gap-4 hover:text-lanh_green"
                        >
                            <div className="bg-gray-300 flex justify-center items-center p-2 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <h2 className="line-clamp-3 font-bold">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </h2>
                        </Link>
                        <Link
                            href="/"
                            className="grid grid-cols-2 p-4 gap-4 hover:text-lanh_green"
                        >
                            <div className="bg-gray-300 flex justify-center items-center p-2 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <h2 className="line-clamp-3 font-bold">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </h2>
                        </Link>
                        <Link
                            href="/"
                            className="grid grid-cols-2 p-4 gap-4 hover:text-lanh_green"
                        >
                            <div className="bg-gray-300 flex justify-center items-center p-2 rounded-xl">
                                <Image
                                    src="/defaultImg.png"
                                    alt="news img"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <h2 className="line-clamp-3 font-bold">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </h2>
                        </Link>
                    </div>
                </aside>
            </div>
        </main>
    );
}

export default News;
