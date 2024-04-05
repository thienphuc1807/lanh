import Image from "next/image";
import Link from "next/link";

interface Props {
    news: News[];
}

const FeaturedNews = (props: Props) => {
    const { news } = props;
    return (
        <div className="container mx-auto px-5" data-aos="fade-up">
            <div className="lg:py-6 py-4">
                <div className="flex justify-center items-center relative h-24">
                    <Image
                        src="/leaf.png"
                        alt="heading_background"
                        fill
                        className="object-contain"
                    />
                    <h2 className="md:text-2xl text-xl font-bold">
                        TIN NỔI BẬT
                    </h2>
                </div>
                <div className="lg:pt-10 pt-8">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 gap-2 ">
                        {news?.map((item) => (
                            <Link href={`news/${item.slug}`} key={item._id}>
                                <div className="rounded-lg overflow-hidden shadow-[1px_1px_6px_2px_rgba(151,186,121,0.3)]">
                                    <div className="w-full h-64 relative text-center border-2 border-[#f7f8fa]">
                                        {item.img ? (
                                            <Image
                                                src={`/${item.img}`}
                                                alt="News Image"
                                                fill
                                            />
                                        ) : (
                                            <Image
                                                src="/defaultImg.png"
                                                alt="News Image"
                                                fill
                                            />
                                        )}
                                    </div>
                                    <div className="bg-white py-6 px-4 flex flex-col gap-2">
                                        <p className="text-[#999999] text-sm">
                                            Ngày đăng:
                                            <br />
                                            {item.createdAt
                                                .toString()
                                                .slice(0, 10)}
                                        </p>
                                        <h1 className="text-[#4c4c4c] text-sm font-bold line-clamp-3 hover:text-lanh_green">
                                            {item.title}
                                        </h1>
                                        <p className="text-[#4c4c4c] text-xs line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedNews;
