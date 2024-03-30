"use client";
import { handleRemoveProduct } from "@/lib/serveraction";
import Image from "next/image";
import Swal from "sweetalert2";

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
            });
        }
    });
};

interface Props {
    products: Products[];
}

const ProductList = (props: Props) => {
    const { products } = props;
    return (
        <div className="border-2 border-gray-200 shadow-md rounded-md bg-white">
            <h1 className="p-5 font-bold">Products</h1>
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Sale Price</th>
                        <th>Image</th>
                        <th>Ingredient</th>
                        <th>Edit/Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: Products, index: number) => (
                        <tr key={product._id} className=" even:bg-gray-100">
                            <td className="px-5">{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.salePrice}</td>
                            <td className="flex justify-center">
                                <Image
                                    src={
                                        product.img
                                            ? `/${product.img}`
                                            : "/defaultImg.png"
                                    }
                                    alt="product_img"
                                    width={100}
                                    height={100}
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
    );
};

export default ProductList;
