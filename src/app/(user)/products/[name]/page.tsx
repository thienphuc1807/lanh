import Image from "next/image";
import BreadCrumbs from "@/components/Breadcrumbs";

// Fetch Data With AN API

const getData = async (name: string) => {
    const data = await fetch(
        `http://${process.env.DOMAIN}/api/products/${name}`,
        {
            cache: "no-store",
        }
    );
    if (!data.ok) {
        throw new Error("Something went wrong");
    }
    return data.json();
};

export const metadata = {
    title: "Sản phẩm",
};

async function ProductDetail({ params }: { params: { name: string } }) {
    const { name } = params;
    const data = await getData(name);

    const breadcrumbs = [
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm", path: "/products" },
        { name: `${data.name}`, path: `/products/${data.name}` },
    ];

    return (
        <div className="container mx-auto md:px-5 px-6">
            <BreadCrumbs breadcrumbs={breadcrumbs} />

            <div className="grid lg:grid-cols-2 grid-cols-1 bg-white rounded-lg">
                <div className="relative lg:w-auto lg:h-[400px] h-72 w-full">
                    <Image
                        src={data.img}
                        alt={data.name}
                        fill={true}
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="lg:mx-0 mx-auto p-10">
                    <h1 className="text-3xl mb-5">{data.name}</h1>
                    <div className="flex items-end py-2 gap-4">
                        <p className="line-through text-gray-600 text-md ">
                            {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(data.price)}
                        </p>
                        <p className="text-2xl font-bold text-lanh_green">
                            {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(data.salePrice)}
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
