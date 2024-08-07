"use client";
import { updateProduct, uploadProduct } from "@/lib/serveraction";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import FormInput from "@/components/FormInput";
import { useRouter } from "next/navigation";

interface Props {
    product?: Products;
    id?: string;
}

const FormProduct = (props: Props) => {
    const { product, id } = props;
    const initialProductState: Values = {
        name: "",
        salePrice: 0,
        price: 0,
        ingredient: "",
        imgs: [],
        inStock: 0,
        quantity: 1,
        size: [],
    };

    const [values, setValues] = useState(product || initialProductState);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const inputs: Input[] = [
        {
            id: 1,
            type: "text",
            label: "Tên sản phẩm",
            name: "name",
            errorMess: "Tên sản phẩm không được để trống!",
            placeholder: "Nhập tên sản phẩm",
            required: true,
        },
        {
            id: 2,
            type: "number",
            label: "Giá gốc",
            name: "price",
            min: "1",
            errorMess: "Giá gốc không được để trống và phải lớn hơn 1!",
            placeholder: "Giá gốc sản phẩm",
            required: true,
        },
        {
            id: 3,
            type: "number",
            label: "Giá giảm",
            name: "salePrice",
            min: "1",
            errorMess: "Giá giảm phải lớn hơn 1!",
            placeholder: "Giá giảm sản phẩm",
        },
        {
            id: 4,
            type: "file",
            label: "Hình ảnh sản phẩm",
            name: "imgs",
            accept: "image/*",
        },
        {
            id: 5,
            type: "text",
            label: "Nguyên liệu",
            name: "ingredient",
            errorMess: "Nguyên liệu sản phẩm không được để trống!",
            placeholder: "Nguyên liệu sản phẩm",
            required: true,
        },
        {
            id: 6,
            type: "number",
            label: "Số lượng sản phẩm",
            name: "inStock",
            errorMess: "Số lượng sản phẩm không được để trống!",
            placeholder: "Số lượng sản phẩm",
            required: true,
        },
        {
            id: 7,
            type: "text",
            label: "Kích cỡ sản phẩm",
            name: "size",
            errorMess: "Kích cỡ sản phẩm không được để trống!",
            placeholder: "VD: S,M,L",
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
                [e.target.name]: [...values.imgs, ...newFile],
            });
        } else if (e.target.name === "size") {
            const sizes = e.target.value.toUpperCase().trim().split(",");
            setValues({
                ...values,
                [e.target.name]: sizes,
            });
        } else {
            setValues({
                ...values,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleDelete = (index: number): void => {
        const newFile = values?.imgs.filter((_, i) => i !== index);
        setValues({
            ...values,
            imgs: [...newFile],
        });
    };

    const handleUpload = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        if (values.imgs.length > 3) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Up to 3 images!",
                showConfirmButton: false,
                timer: 1500,
            });
            setIsLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append("name", values?.name);
        formData.append("price", values?.price.toString());
        formData.append("salePrice", values?.salePrice.toString());
        formData.append("ingredient", values?.ingredient);
        formData.append(
            "inStock",
            values?.inStock ? values?.inStock.toString() : "0"
        );
        formData.append("quantity", values?.quantity.toString());
        values.size.forEach((item: any) => {
            formData.append("size", item);
        });
        values?.imgs.forEach((img) => {
            formData.append("files", img);
        });
        if (id) {
            try {
                const update = await updateProduct(formData, id);
                if (!update) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thêm sản phẩm thành công!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    router.push("/dashboard/products");
                    router.refresh();
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Lỗi cập nhật!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Tên sản phẩm đã tồn tại!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            const upload = await uploadProduct(formData);
            try {
                if (!upload) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thêm sản phẩm thành công",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    router.push("/dashboard/products");
                    router.refresh();
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Trùng tên sản phẩm!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Có lỗi xảy ra!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <div className="md:py-6 md:px-0 md:flex md:justify-center container mx-auto">
            <form
                onSubmit={handleUpload}
                className="lg:min-w-[600px] space-y-5 md:p-10 md:items-stretch items-center p-4 border-2 border-gray-200 shadow-md rounded-md bg-white"
            >
                <h1 className="text-lanh_green text-center font-bold">
                    {product ? "CHỈNH SỬA SẢN PHẨM" : "THÊM SẢN PHẨM MỚI"}
                </h1>
                {inputs.map((input) => (
                    <div key={input.id} className="flex flex-col gap-4">
                        <FormInput
                            key={input.id}
                            onChange={onChangeValues}
                            value={
                                input.type !== "file"
                                    ? values[input.name as keyof Values]
                                    : undefined
                            }
                            {...input}
                            className="md:px-6 px-3 w-full md:py-4 py-2 border-2 border-lanh_green rounded-md peer"
                        />

                        {input.type === "file" && (
                            <div className="flex flex-wrap gap-4">
                                {values.imgs?.map((file, index) => (
                                    <div key={index} className="items-center">
                                        <div className="flex flex-col">
                                            <Image
                                                src={
                                                    file.url
                                                        ? file.url
                                                        : URL.createObjectURL(
                                                              file
                                                          )
                                                }
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
                        )}
                    </div>
                ))}
                <div className="flex">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="gap-2 py-4 w-full disabled:bg-slate-200 disabled:border-slate-200 rounded-md border-2 border-lanh_green bg-lanh_green text-white hover:text-lanh_green hover:bg-white"
                    >
                        {isLoading ? (
                            <div className="relative w-6 h-6 pr-10 mx-auto">
                                <Image
                                    src={"/loading.png"}
                                    alt="loadings"
                                    fill
                                    className="animate-spin object-contain"
                                />
                            </div>
                        ) : (
                            <span>Lưu</span>
                        )}
                    </button>
                    
                </div>
            </form>
        </div>
    );
};

export default FormProduct;
