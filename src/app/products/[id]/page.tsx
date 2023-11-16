"use client";
import Image from "next/image";
import useSWR, { Fetcher } from "swr";
import BreadCrumbs from "@/components/app.breadcrumbs";

function ProductDetail({ params }: { params: { id: number } }) {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/product/${params.id}`,
        fetcher
    );

    if (isLoading) {
        return <div className="my-4">Loading ...</div>;
    }

    const breadcrumbs = [
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm", path: "/products" },
        { name: `${data.name}`, path: `/products/${params.id}` },
    ];

    return (
        <div className="container mx-auto lg:pt-[200px] pt-[120px] md:px-5 px-6">
            <BreadCrumbs breadcrumbs={breadcrumbs} />

            <div className="grid lg:grid-cols-2 grid-cols-1">
                <div className="relative lg:w-auto lg:h-[400px] h-72 w-full">
                    <Image
                        src={data.url}
                        alt={data.name}
                        fill={true}
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="lg:mx-0 mx-auto">
                    <h1 className="text-3xl mb-5">{data.name}</h1>
                    <div className="flex items-end py-2 gap-4">
                        <p className="line-through text-gray-600 text-md ">
                            {data.price}
                        </p>
                        <p className="text-2xl font-bold text-lanh_green">
                            {data.sale_price}
                        </p>
                    </div>
                    <p className="my-5">Nguyên liệu: {data.ingredient}</p>
                    <label htmlFor="quantity">Số lượng: </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="border-2 px-3"
                        min="1"
                        max="10"
                        inputMode="numeric"
                    />
                    <div className="flex md:flex-row flex-col gap-5 mt-10">
                        <button className="bg-lanh_green text-white px-5 py-2 rounded-full hover:opacity-80">
                            MUA NGAY
                        </button>
                        <button className="bg-lanh_green text-white px-5 py-2 rounded-full hover:opacity-80">
                            THÊM VÀO GIỎ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
