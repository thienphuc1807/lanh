"use client";
import { handleLogin } from "@/lib/serveraction";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

function LoginForm() {
    const [state, formAction] = useFormState(handleLogin, undefined);
    const [show, setShow] = useState(false);
    return (
        <form action={formAction} className="flex flex-col gap-4">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
                type="text"
                className="py-2 px-5 border-2 border-lanh_green rounded-md"
                name="username"
                id="username"
            />
            <label htmlFor="password">Mật khẩu</label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    className="py-2 px-5 border-2 border-lanh_green rounded-md w-full"
                    name="password"
                    id="password"
                />
                <button
                    onClick={() => setShow(!show)}
                    className="absolute right-2 top-1/2 translate-y-[-50%]"
                >
                    {show ? (
                        <EyeIcon className="h-6 w-6" />
                    ) : (
                        <EyeSlashIcon className="w-6 h-6" />
                    )}
                </button>
            </div>
            <span className="text-red-600">{state?.error}</span>
            <button className="p-2 font-bold bg-lanh_green border-2 border-lanh_green rounded-md text-white hover:bg-white hover:text-lanh_green">
                Đăng nhập
            </button>
            <span>
                Bạn chưa có tài khoản ?
                <Link
                    href="/register"
                    className="pl-2 text-lanh_green font-bold hover:underline"
                >
                    Đăng ký
                </Link>
            </span>
        </form>
    );
}

export default LoginForm;
