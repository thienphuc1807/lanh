"use client";
import Link from "next/link";
import Image from "next/image";
import BreadCrumbs from "@/components/Breadcrumbs";
import PaginationControl from "@/components/PaginationControl";
import _ from "lodash";
import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
interface Props {
    data: Products[];
    searchParams: { [key: string]: string | string[] | undefined };
}
const UserProducts = (props: Props) => {
    const { data, searchParams } = props;
    const [listProducts, setListProducts] = useState<Products[]>(data);
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("");
    const [openSort, setOpenSort] = useState(false);

    const breadcrumbs = [
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm", path: "/products" },
    ];

    const handleSearch = _.debounce((value: string) => {
        if (value) {
            let cloneListProducts = _.cloneDeep(data);
            cloneListProducts = cloneListProducts.filter((product) =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            setListProducts(cloneListProducts);
        } else {
            setListProducts(data);
        }
    }, 1000);

    const sortList = [
        {
            name: "Giá tăng dần",
            sort: "asc",
            field: "salePrice",
        },
        {
            name: "Giá giảm dần",
            sort: "desc",
            field: "salePrice",
        },
        {
            name: "Tên từ A-Z",
            sort: "asc",
            field: "name",
        },
        {
            name: "Tên từ Z-A",
            sort: "desc",
            field: "name",
        },
    ];

    const handleSort = (sort: any, field: string) => {
        if (sort && field) {
            setSortBy(sort);
            setSortField(field);
            let cloneListProducts = _.cloneDeep(listProducts);
            cloneListProducts = _.orderBy(listProducts, [field], [sort]);
            setListProducts(cloneListProducts);
        }
    };

    // PaginationControl
    const page = searchParams["page"] ?? "1";
    const per_page = searchParams["per_page"] ?? "8";
    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
    const entries = listProducts.slice(start, end);
    return (
        <>
            <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-2 lg:pb-0 pb-5">
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <div className="flex lg:flex-row flex-col lg:items-center gap-3">
                    <label htmlFor="search">Tìm kiếm:</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Tìm kiếm theo tên"
                        className="border-2 border-lanh_green py-2 px-4 rounded-md"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div className="relative">
                        <button
                            className="flex gap-2 bg-lanh_green py-2 px-5 rounded-md border-2 border-lanh_green text-white"
                            onClick={() => setOpenSort(!openSort)}
                        >
                            <FunnelIcon className="h-6 w-6" />
                            <span>Sắp xếp theo :</span>
                        </button>
                        {openSort && (
                            <div className="absolute flex flex-col z-10 rounded-md bg-white shadow-[1px_1px_6px_2px_rgba(151,186,121,0.3)] mt-2 lg:right-0 left-0 overflow-hidden">
                                {sortList.map((sort) => (
                                    <button
                                        key={sort.name}
                                        className="py-2 px-5 hover:bg-lanh_green hover:text-white"
                                        onClick={() => {
                                            setOpenSort(!openSort);
                                            handleSort(sort.sort, sort.field);
                                        }}
                                    >
                                        {sort.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {entries.length > 0 ? (
                <>
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                        {entries.map((item: Products) => (
                            <Link
                                href={`products/${item.name}`}
                                key={item.name}
                                className="bg-white rounded-lg shadow-[1px_1px_6px_2px_rgba(151,186,121,0.3)] border-[1px] px-2"
                            >
                                <div className="relative mt-5 w-auto h-52">
                                    <Image
                                        fill={true}
                                        src={item.img}
                                        alt={item.name}
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="text-center py-4">
                                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                                        {item.name}
                                    </p>
                                </div>

                                <div className="flex md:flex-row flex-col gap-2 items-center justify-center">
                                    <p className="font-bold">
                                        {Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(item.salePrice)}
                                    </p>
                                    <p className="text-[red] font-bold text-xs line-through">
                                        {Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(item.price)}
                                    </p>
                                </div>

                                <div className="py-4 text-center">
                                    <button className="py-2 px-2 text-white bg-lanh_green hover:opacity-60 rounded-md">
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <PaginationControl
                        hasNextPage={end < listProducts.length}
                        hasPrevPage={start > 0}
                        dataLength={listProducts.length}
                    />
                </>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    Không tìm thấy sản phẩm
                </div>
            )}
        </>
    );
};

export default UserProducts;
