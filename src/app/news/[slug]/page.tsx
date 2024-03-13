import Image from "next/image";
import Link from "next/link";
import BreadCrumbs from "@/components/Breadcrumbs";

const getNews = async (slug: string) => {
    const data = await fetch(`http://${process.env.DOMAIN}/api/news/${slug}`, {
        cache: "no-store",
    });
    if (!data.ok) {
        throw new Error("Something went wrong");
    }
    return data.json();
};

async function NewsDetail({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const data = await getNews(slug);
    console.log(data);

    const breadcrumbs = [
        { name: "Trang chủ", path: "/" },
        { name: "Tin tức", path: "/news" },
        { name: `${data.title}`, path: `/products/${data.title}` },
    ];

    return (
        <div className="container mx-auto md:px-5 px-6 pb-6">
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <div className="flex gap-4">
                <div className="flex-[80%] space-y-5">
                    <h1 className="md:text-4xl text-2xl">{data.title}</h1>
                    <p>Ngày đăng: {data.createdAt.slice(0, 10)}</p>
                    <div className="mx-auto w-full relative h-[400px]">
                        {data.img ? (
                            <Image
                                src={`/${data.img}`}
                                alt="News Image"
                                fill
                                style={{ objectFit: "contain" }}
                            />
                        ) : (
                            <Image
                                src="/defaultImg.png"
                                alt="News Image"
                                fill
                                style={{ objectFit: "contain" }}
                            />
                        )}
                    </div>
                    <p className="text-justify">{data.desc}</p>
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
                                    src="/Logo.png"
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
                                    src="/Logo.png"
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
                                    src="/Logo.png"
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
                                    src="/Logo.png"
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
                                    src="/Logo.png"
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
                                    src="/Logo.png"
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
        </div>
    );
}

export default NewsDetail;
