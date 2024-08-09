"use client";
import { handleEditUser, handleRegister } from "@/lib/serveraction";
import { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import FormInput from "@/components/FormInput";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
    user?: Users;
    id?: string;
}

const FormUser = (props: Props) => {
    const { user, id } = props;
    const initialUserState: Users = {
        username: "",
        fullName: "",
        email: "",
        isAdmin: false,
        password: "",
        phoneNumber: "",
        city: "",
        ward: "",
        district: "",
        address: "",
    };

    const [values, setValues] = useState(user || initialUserState);
    console.log(values);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const inputs: Input[] = [
        {
            id: 1,
            type: "text",
            label: "Tên người dùng (username)",
            name: "username",
            errorMess: "Tên người dùng không được để trống!",
            placeholder: "Nhập tên người dùng",
            required: true,
        },
        {
            id: 2,
            type: "text",
            label: "Họ và tên",
            name: "fullName",
            errorMess: "Họ và tên không được để trống",
            placeholder: "Nhập họ và tên",
            required: true,
        },
        {
            id: 3,
            type: "email",
            label: "Email",
            name: "email",
            placeholder: "Nhập email",
        },
        {
            id: 4,
            type: "password",
            label: "Mật khẩu",
            name: "password",
            errorMess: "Mật khẩu không được để trống",
            placeholder: "Nhập mật khẩu",
        },
        {
            id: 5,
            type: "text",
            label: "Số điện thoại",
            name: "phoneNumber",
            placeholder: "Nhập số điện thoại",
        },
    ];

    const adminUser = [
        {
            id: 1,
            name: "User",
            value: false,
        },
        {
            id: 2,
            name: "Admin",
            value: true,
        },
    ];

    const onChangeValues = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpload = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("username", values.username || "");
        formData.append("fullName", values?.fullName);
        formData.append("email", values?.email);
        formData.append("isAdmin", values?.isAdmin.toString());
        formData.append("password", values.password || "");
        formData.append("phoneNumber", values.phoneNumber || "");
        formData.append("city", values.city || "");
        formData.append("district", values.district || "");
        formData.append("address", values.address || "");
        formData.append("ward", values.ward || "");
        if (id) {
            try {
                const update = await handleEditUser(formData, id);
                if (update?.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thêm sản phẩm thành công!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    router.push("/dashboard/users");
                    router.refresh();
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: update?.error,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Đã có lỗi xảy ra!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            const upload = await handleRegister(formData);
            if (upload.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thêm thành công",
                    showConfirmButton: false,
                    timer: 1500,
                });
                router.push("/dashboard/users");
                router.refresh();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: upload.error,
                    showConfirmButton: false,
                    timer: 1500,
                });
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
                    {user ? "CHỈNH SỬA THÔNG TIN USER" : "THÊM USER MỚI"}
                </h1>
                {inputs.map((input) => (
                    <div
                        key={input.id}
                        className={`${
                            id && input.name === "password" ? "hidden" : "block"
                        } flex flex-col gap-4`}
                    >
                        <FormInput
                            key={input.id}
                            onChange={onChangeValues}
                            value={values[input.name as keyof Users]}
                            {...input}
                            className={`md:px-6 px-3 w-full md:py-4 py-2 border-2 border-lanh_green rounded-md peer`}
                        />
                    </div>
                ))}
                <div className="flex flex-col gap-4">
                    <label htmlFor="isAdmin">Vai trò</label>
                    <select
                        name="isAdmin"
                        id="isAdmin"
                        onChange={onChangeValues}
                        className=" px-3 w-fit  py-2 border-2 border-lanh_green rounded-md"
                    >
                        {adminUser.map((item) => (
                            <option
                                key={item.id}
                                value={item.value.toString()}
                                selected={values.isAdmin}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
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
            </form>
        </div>
    );
};

export default FormUser;
