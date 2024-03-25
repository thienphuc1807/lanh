"use client";
import { handleLogin } from "@/lib/serveraction";
import { useFormState } from "react-dom";

function LoginForm() {
    const [state, formAction] = useFormState(handleLogin, undefined);
    return (
        <form action={formAction} className="flex flex-col gap-6">
            <input
                type="text"
                className="py-2 px-5 border-2 border-lanh_green rounded-full"
                placeholder="Username"
                name="username"
            />
            <input
                type="password"
                placeholder="Password"
                className="py-2 px-5 border-2 border-lanh_green rounded-full"
                name="password"
            />
            {state?.error}
            <button className="p-2 font-bold bg-lanh_green border-2 border-lanh_green rounded-full text-white hover:bg-white hover:text-lanh_green">
                Đăng nhập
            </button>
        </form>
    );
}

export default LoginForm;
