"use client";
import { handleRemoveProduct } from "@/lib/serveraction";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Swal from "sweetalert2";
import PaginationControl from "./PaginationControl";

const handleRemove = (id: string) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            handleRemoveProduct(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
            });
        }
    });
};

interface Props {
    products: Products[];
    searchParams: { [key: string]: string | string[] | undefined };
}

const handleEdit = async (id: string) => {
    const data = await fetch(
        `http://${process.env.DOMAIN}/api/products/${id}`,
        {
            cache: "no-store",
        }
    );
    if (!data.ok) {
        throw new Error("Something went wrong");
    }
    return data.json();
};

const ProductList = (props: Props) => {
    const { products, searchParams } = props;
    const page = searchParams["page"] ?? "1";
    const per_page = searchParams["per_page"] ?? "8";
    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
    const entries = products.slice(start, end);
    return (
        <>
            <div className="lg:block hidden border-2 border-gray-200 shadow-md rounded-md bg-white">
                <h1 className="font-bold p-5">Products</h1>
                <table className="w-full text-center border-separate border-spacing-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Sale Price</th>
                            <th>Image</th>
                            <th>Ingredient</th>
                            <th>Edit/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((product: Products) => (
                            <tr key={product._id} className="even:bg-gray-100">
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.salePrice}</td>
                                <td className="relative w-28 h-28">
                                    <Image
                                        src={
                                            product.img
                                                ? product.img
                                                : "/defaultImg.png"
                                        }
                                        alt="product_img"
                                        className="object-contain"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </td>
                                <td>{product.ingredient}</td>
                                <td>
                                    <div className="flex gap-4 justify-center">
                                        <button className="px-4 py-2 text-white bg-lanh_green">
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleRemove(product._id)
                                            }
                                            className="px-4 py-2 text-white bg-lanh_green"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="lg:hidden grid grid-cols-1 gap-2">
                {entries.map((product) => (
                    <div
                        className="p-5 border-2 bg-white rounded-lg shadow-lg overflow-hidden"
                        key={product._id}
                    >
                        <div className="space-y-5">
                            <div className="flex justify-between">
                                <div className="relative w-24 h-24">
                                    <Image
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        src={
                                            product.img
                                                ? product.img
                                                : "/defaultImg.png"
                                        }
                                        className="object-contain"
                                        alt="product_image"
                                    />
                                </div>
                                <div className="space-x-4">
                                    <button>
                                        <PencilSquareIcon className="w-6 h-6 text-lanh_green" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleRemove(product._id)
                                        }
                                    >
                                        <TrashIcon className="w-6 h-6 text-lanh_green" />
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
    );
};

export default ProductList;
