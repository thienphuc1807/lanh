"use client";
import { handleRemoveProduct } from "@/lib/serveraction";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Swal from "sweetalert2";
import PaginationControl from "./PaginationControl";
import { useEffect, useState } from "react";
import _ from "lodash";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
    products: Products[];
    searchParams: { [key: string]: string | string[] | undefined };
}

const ProductList = (props: Props) => {
    const { products, searchParams } = props;
    const [listProducts, setListProducts] = useState<Products[]>([]);
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("");
    const [openSort, setOpenSort] = useState(false);

    useEffect(() => {
        setListProducts(products);
    }, [products]);

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

    const handleRemove = (id: string | undefined) => {
        Swal.fire({
            title: "Xoá sản phẩm?",
            text: "Sau khi xoá sẽ không thể hoàn tác!",
            showCancelButton: true,
            confirmButtonColor: "#97ba79",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xoá",
        }).then((result) => {
            if (result.isConfirmed) {
                handleRemoveProduct(id);
                Swal.fire({
                    title: "Đã xoá!",
                    text: "Sản phẩm đã bị xoá khỏi dữ liệu.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        });
    };

    const handleSearch = _.debounce((value: string) => {
        if (value) {
            let cloneListProducts = _.cloneDeep(products);
            cloneListProducts = cloneListProducts.filter((product) =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            setListProducts(cloneListProducts);
        } else {
            setListProducts(products);
        }
    }, 1000);

    const handleSort = (sort: any, field: string) => {
        if (sort && field) {
            setSortBy(sort);
            setSortField(field);
            let cloneListProducts = _.cloneDeep(listProducts);
            cloneListProducts = _.orderBy(listProducts, [field], [sort]);
            setListProducts(cloneListProducts);
        }
    };

    const page = searchParams["page"] ?? "1";
    const per_page = searchParams["per_page"] ?? "8";
    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
    const entries = listProducts.slice(start, end);

    return (
        <>
            <div className="flex lg:flex-row flex-col lg:items-center gap-3 pb-3">
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
            {entries.length > 0 ? (
                <>
                    <div className="lg:block hidden border-2 border-gray-200 shadow-md rounded-md bg-white">
                        <h1 className="font-bold p-5">Sản phẩm Lành</h1>
                        <table className="w-full text-center border-separate border-spacing-4">
                            <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Giá</th>
                                    <th>Giảm giá</th>
                                    <th>Hình ảnh</th>
                                    <th>Nguyên liệu</th>
                                    <th>Số lượng</th>
                                    <th>Chỉnh sửa/Xoá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="even:bg-gray-100"
                                    >
                                        <td>{product.name}</td>
                                        <td>
                                            {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(product.price)}
                                        </td>
                                        <td>
                                            {Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(product.salePrice)}
                                        </td>
                                        <td className="flex">
                                            {product.imgs.length > 0 ? (
                                                product.imgs.map((image) => (
                                                    <div
                                                        key={image._id}
                                                        className="relative w-full h-32"
                                                    >
                                                        <Image
                                                            src={image.url}
                                                            alt="product_img"
                                                            className="object-contain"
                                                            fill
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="relative w-full h-32">
                                                    <Image
                                                        src="/defaultImg.png"
                                                        alt="product_img"
                                                        className="object-contain"
                                                        fill
                                                    />
                                                </div>
                                            )}
                                        </td>
                                        <td>{product.ingredient}</td>
                                        <td>{product.inStock}</td>
                                        <td>
                                            <div className="flex gap-4 justify-center">
                                                <Link
                                                    href={`/dashboard/products/${product._id}`}
                                                    className="px-4 py-2 text-white bg-lanh_green rounded-md"
                                                >
                                                    Chỉnh sửa
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleRemove(
                                                            product?._id
                                                        )
                                                    }
                                                    className="px-4 py-2 text-white bg-lanh_green rounded-md"
                                                >
                                                    Xoá
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* tablet and mobile */}
                    <div className="lg:hidden grid grid-cols-1 gap-2">
                        {entries.map((product) => (
                            <div
                                className="p-5 border-2 bg-white rounded-lg shadow-lg overflow-hidden"
                                key={product._id}
                            >
                                <div className="space-y-5">
                                    <div className="flex justify-between">
                                        <div className="relative w-24 h-24">
                                            {product.imgs?.map((image) => (
                                                <div
                                                    className="relative w-28 h-28"
                                                    key={image._id}
                                                >
                                                    <Image
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        src={
                                                            image
                                                                ? image.url
                                                                : "/defaultImg.png"
                                                        }
                                                        className="object-contain"
                                                        alt="product_image"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <Link
                                                href={`/dashboard/products/${product._id}`}
                                            >
                                                <PencilSquareIcon className="w-8 h-8 text-lanh_green" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleRemove(product?._id)
                                                }
                                            >
                                                <TrashIcon className="w-8 h-8 text-lanh_green" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-row flex-col justify-between">
                                        <h1>Name:</h1>
                                        {product.name}
                                    </div>
                                    <div className="flex md:flex-row flex-col justify-between">
                                        <h1>Price:</h1>
                                        <p>{product.price}</p>
                                    </div>
                                    <div className="flex md:flex-row flex-col justify-between">
                                        <h1>Sale Price:</h1>
                                        <p>{product.salePrice}</p>
                                    </div>
                                    <div className="flex md:flex-row flex-col justify-between">
                                        <h1>Ingredient:</h1>
                                        <p>{product.ingredient}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <PaginationControl
                        hasNextPage={end < products.length}
                        hasPrevPage={start > 0}
                        dataLength={products.length}
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

export default ProductList;
