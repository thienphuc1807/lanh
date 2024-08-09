"use client";
import { handleLogin } from "@/lib/serveraction";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

function LoginForm() {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errMess, setErrMess] = useState("");
    const [values, setValues] = useState({ username: "", password: "" });

    const onChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
        setErrMess("");
    };

    const router = useRouter();

    const handleLoginUser = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);
        try {
            const login = await handleLogin(formData);
            if (!login) {
                setErrMess("");
            } else {
                setErrMess(login.error || "");
            }
        } catch (error) {
            setErrMess("Đã có lỗi xảy ra vui lòng thử lại sau!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleLoginUser} className="flex flex-col gap-4">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
                type="text"
                className="py-2 px-3 border-2 border-lanh_green rounded-md"
                name="username"
                id="username"
                onChange={onChangeValues}
                required
            />
            <label htmlFor="password">Mật khẩu</label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    className="py-2 px-3 border-2 border-lanh_green rounded-md w-full"
                    name="password"
                    id="password"
                    onChange={onChangeValues}
                    required
                />
                <button
                    onMouseDown={() => setShow(!show)}
                    className="absolute right-2 top-1/2 translate-y-[-50%]"
                >
                    {show ? (
                        <EyeIcon className="h-6 w-6" />
                    ) : (
                        <EyeSlashIcon className="w-6 h-6" />
                    )}
                </button>
            </div>
            <button
                disabled={isLoading}
                type="submit"
                className="disabled:opacity-50 flex justify-center p-2 font-bold bg-lanh_green border-2 border-lanh_green rounded-md text-white hover:bg-white hover:text-lanh_green"
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
                <span>Đăng nhập</span>
            </button>
            <p className="text-red-500">{errMess}</p>
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
