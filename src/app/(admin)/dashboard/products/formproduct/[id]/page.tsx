"use client";
import { uploadProduct } from "@/lib/serveraction";
import { ReactElement, useState, ChangeEvent } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import FormInput from "@/components/FormInput";
const getData = async (id: string) => {
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

const EditProduct = ({ params }: { params: { id: string } }) => {
    const [values, setValues] = useState<Values>({
        name: "",
        ingredient: "",
        price: "",
        salePrice: "",
        images: [],
    });

    const inputs: Input[] = [
        {
            id: 1,
            type: "text",
            label: "Product name",
            name: "name",
            errorMess: "Product Name is required!",
            placeholder: "Product name",
            required: true,
        },
        {
            id: 2,
            type: "number",
            label: "Price",
            name: "price",
            min: "1",
            errorMess: "The price is required and must be greater than 1",
            placeholder: "Product Price",
            required: true,
        },
        {
            id: 3,
            type: "number",
            label: "Sale price",
            name: "salePrice",
            min: "1",
            errorMess: "The price is required and must be greater than 1",
            placeholder: "Product Sale price",
            required: true,
        },
        {
            id: 4,
            type: "file",
            label: "Images",
            name: "images",
            errorMess: " ",
            accept: "image/*",
        },
        {
            id: 5,
            type: "text",
            label: "Ingredient",
            name: "ingredient",
            errorMess: "Ingredient is required!",
            placeholder: "Product ingredient",
            required: true,
        },
    ];

    const onChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "file") {
            const files = Array.from(e.target.files || []);
            const newFile = files.filter((file) => {
                if (file?.type.startsWith("image/")) {
                    return file;
                } else {
                    console.log("Only Image");
                }
            });
            setValues({
                ...values,
                [e.target.name]: [...values.images, ...newFile],
            });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const handleDelete = (index: number): void => {
        const newFile = values.images.filter((_, i) => i !== index);
        setValues({
            ...values,
            images: [...newFile],
        });
    };

    console.log(values);

    const handleUpload = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        if (values.images.length > 1) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "1 image only!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price.toString());
        formData.append("salePrice", values.salePrice.toString());
        formData.append("ingredient", values.ingredient);
        values.images.forEach((img) => {
            formData.append("files", img);
        });
        await uploadProduct(formData);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className="md:py-6 md:px-0 md:flex md:justify-center container  mx-auto">
            <form
                onSubmit={handleUpload}
                className="space-y-5 md:p-10 md:items-stretch items-center p-4 border-2 border-gray-200 shadow-md rounded-md bg-white"
            >
                <h1 className="text-lanh_green text-center font-bold">
                    ADD NEW PRODUCT
                </h1>
                {inputs.map((input) => (
                    <div key={input.id} className="flex flex-col gap-4">
                        <FormInput
                            key={input.id}
                            onChange={onChangeValues}
                            {...input}
                        />
                        {input.type === "file" && (
                            <>
                                <div className="flex flex-wrap gap-4">
                                    {values.images.map((file, index) => (
                                        <div
                                            key={index}
                                            className="items-center"
                                        >
                                            <div className="flex flex-col">
                                                <Image
                                                    src={URL.createObjectURL(
                                                        file
                                                    )}
                                                    alt="PreviewImg"
                                                    className="w-28 h-28 object-contain"
                                                    height={100}
                                                    width={100}
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleDelete(index)
                                                    }
                                                    className="text-white bg-lanh_green px-2 py-2"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    className="py-4 w-full rounded-md border-2 border-lanh_green bg-lanh_green text-white hover:text-lanh_green hover:bg-white"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
