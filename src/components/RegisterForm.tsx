"use client";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FormInput from "./FormInput";
import { handleRegister } from "@/lib/serveraction";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
function RegiterForm() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const registerForm: Input[] = [
        {
            id: 1,
            name: "username",
            type: "text",
            label: "Tên đăng nhập",
            placeholder: "Nhập tên đăng nhập",
            errorMess:
                "Tên đăng nhập phải từ 6 đến 16 ký tự và không bao gồm ký tự đặc biệt!",
            required: true,
            pattern: "^[a-zA-Z0-9]{6,16}$",
        },
        {
            id: 2,
            name: "email",
            type: "email",
            label: "Địa chỉ Email",
            placeholder: "Nhập địa chỉ email",
            errorMess: "Email không hợp lệ!",
            required: true,
            pattern:
                "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
        },
        {
            id: 3,
            name: "password",
            type: "password",
            label: "Mật khẩu",
            placeholder: "Nhập mật khẩu",
            errorMess: "Mật khẩu phải từ 6 đến 16 ký tự",
            required: true,
            pattern: "^[a-zA-Z0-9]{6,16}$",
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            label: "Nhập lại mật khẩu",
            placeholder: "Nhập lại mật khẩu",
            errorMess: "Mật khẩu không trùng khớp",
            required: true,
            pattern: values.password,
        },
    ];

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleUpload = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("username", values.username || "");
        formData.append("email", values?.email);
        formData.append("password", values.password || "");

        try {
            const update = await handleRegister(formData);
            if (update.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Đăng ký thành công!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                router.push("/dashboard/users");
                router.refresh();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: update.error,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
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
    };

    return (
        <form
            onSubmit={handleUpload}
            className=" flex flex-col gap-6 md:w-[400px]"
        >
            <div className="w-full h-[140px] relative mx-auto">
                <Image
                    alt="logo_lanh"
                    src="/defaultImg.png"
                    objectFit="contain"
                    fill
                />
            </div>
            {registerForm.map((field) => (
                <div className="flex flex-col gap-2" key={field.name}>
                    <FormInput
                        key={field.id}
                        {...field}
                        onChange={onChange}
                        className="border-2 border-lanh_green rounded-md w-full py-2 px-5 peer"
                    />
                </div>
            ))}
            <button
                type="submit"
                disabled={isLoading}
                className={`flex justify-center ${
                    isLoading ? "bg-slate-400 opacity-50" : "bg-lanh_green"
                }  text-white py-2 px-5 rounded-md border-2 border-lanh_green hover:bg-white hover:text-lanh_green`}
            >
                {isLoading && (
                    <div className="relative w-6 h-6 pr-10">
                        <Image
                            src={"/loading.png"}
                            alt="loadings"
                            fill
                            className="animate-spin object-contain"
                        />
                    </div>
                )}
                <span>Đăng ký</span>
            </button>
            <Link href="/login">
                Bạn đã có tài khoản ?
                <b className="pl-2 text-lanh_green hover:underline">
                    Đăng nhập
                </b>
            </Link>
        </form>
    );
}

export default RegiterForm;
