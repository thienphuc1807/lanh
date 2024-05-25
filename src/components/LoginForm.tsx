"use client";
import { handleLogin } from "@/lib/serveraction";
import Link from "next/link";
import { useFormState } from "react-dom";

function LoginForm() {
    const [state, formAction] = useFormState(handleLogin, undefined);
    return (
        <form action={formAction} className="flex flex-col gap-4">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
                type="text"
                className="py-2 px-5 border-2 border-lanh_green rounded-full"
                placeholder="Username"
                name="username"
                id="username"
            />
            <label htmlFor="password">Mật khẩu</label>
            <input
                type="password"
                placeholder="Password"
                className="py-2 px-5 border-2 border-lanh_green rounded-full"
                name="password"
                id="password"
            />
            <span className="text-red-600">{state?.error}</span>
            <button className="p-2 font-bold bg-lanh_green border-2 border-lanh_green rounded-full text-white hover:bg-white hover:text-lanh_green">
                Đăng nhập
            </button>
            <span>
                Bạn chưa có tài khoản ?
                <Link href="/register" className="pl-2 text-lanh_green font-bold hover:underline">
                    Đăng ký
                </Link>
            </span>
        </form>
    );
}

export default LoginForm;
