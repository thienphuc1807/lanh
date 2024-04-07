"use client";
import { uploadProduct } from "@/lib/serveraction";
import { useRef, useState } from "react";
import Image from "next/image";
const AddProduct = () => {
    const formRef: any = useRef();
    const [files, setFiles] = useState<Array<File>>([]);
    const [name, setName] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [price, setPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);

    const handlePreview = (e: any) => {
        const file = e.target.files;
        console.log("target file >>>", file);
        const newFile = [...file].filter((file) => {
            if (file.type.startsWith("image/")) {
                return file;
            } else {
                console.log("Only Image");
            }
        });
        setFiles((prev) => [...newFile, ...prev]);
    };
    console.log("state file >>>", files);

    const handleDelete = (index: any) => {
        const newFile = files.filter((_, i) => i !== index);
        setFiles(newFile);
    };

    const handleUpload = async (e: any) => {
        e.preventDefault();
        if (!files.length) return alert("No image are selected");
        if (files.length > 1) return alert("1 image only");

        const formData = new FormData();

        formData.append("name", name);
        formData.append("price", price.toString());
        formData.append("salePrice", salePrice.toString());
        formData.append("ingredient", ingredient);
        files.forEach((file) => {
            formData.append("files", file);
        });

        const res = await uploadProduct(formData);
    };

    return (
        <div className="p-5 flex justify-center">
            <form
                ref={formRef}
                onSubmit={handleUpload}
                className="flex flex-col gap-6 p-10 border-2 border-gray-200 shadow-md rounded-md bg-white"
            >
                <h1 className="text-lanh_green text-center font-bold">
                    ADD NEW PRODUCT
                </h1>
                <div className="flex flex-col gap-4">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        className="px-6 py-4 border-2 border-lanh_green rounded-md"
                        placeholder="Product Name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="px-6 py-4 border-2 border-lanh_green rounded-md"
                        placeholder="Product Price"
                        id="price"
                        onChange={(e) => setPrice(e.target.valueAsNumber)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="salePrice">Sale Price</label>
                    <input
                        type="number"
                        className="px-6 py-4 border-2 border-lanh_green rounded-md"
                        placeholder="Product Sale Price"
                        id="salePrice"
                        onChange={(e) => setSalePrice(e.target.valueAsNumber)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        className="px-6 py-4 border-2 border-lanh_green rounded-md"
                        accept="image/*"
                        id="image"
                        onChange={handlePreview}
                    />
                    <div className="flex flex-wrap gap-4">
                        {files.map((file, index) => (
                            <div key={index} className="items-center">
                                <div className="flex flex-col">
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="PreviewImg"
                                        height={100}
                                        width={100}
                                    />
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-white bg-lanh_green px-2 py-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="ingredient">Ingredient</label>
                    <textarea
                        rows={5}
                        cols={30}
                        className="px-6 py-4 border-2 border-lanh_green rounded-md"
                        placeholder="Ingredient"
                        id="ingredient"
                        onChange={(e) => setIngredient(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="py-4 rounded-md border-2 border-lanh_green bg-lanh_green text-white hover:text-lanh_green hover:bg-white"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
