"use client";
import { handleRegister } from "@/lib/serveraction";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FormInput from "./FormInput";
function RegiterForm() {
    const [state, formAction] = useFormState(handleRegister, undefined);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success, router]);

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

    return (
        <form action={formAction} className=" flex flex-col gap-6 md:w-[400px]">
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
                        className="border-2 border-lanh_green rounded-full py-2 px-5 peer"
                    />
                </div>
            ))}
            <button className="bg-lanh_green text-white py-2 px-5 rounded-full border-2 border-lanh_green hover:bg-white hover:text-lanh_green">
                Đăng ký
            </button>
            <span className="text-red-600">{state?.error}</span>
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
