"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { handleGithubLogout } from "@/lib/serveraction";

const links = [
    { name: "Trang chủ", path: "/" },
    { name: "Sản phẩm", path: "/products" },
    { name: "Liên hệ", path: "/contact" },
    { name: "Tin tức", path: "/news" },
];

const NavBar = ({ session }: any) => {
    const pathName = usePathname();
    const [open, setOpen] = useState(false);
    return (
        <div className="w-full">
            <div className="text-white lg:block hidden">
                <div className="flex justify-between py-5 border-b-[1px] border-white">
                    <div className="flex gap-2">
                        <h1>Tải ứng dụng</h1>
                        <h1>Tiếng việt</h1>
                    </div>
                    <div className="flex gap-4">
                        <h1>Hotline đặt hàng</h1>
                        {session?.user ? (
                            <>
                                <h1>{session.user.name}</h1>
                                <form action={handleGithubLogout}>
                                    <button>LOGOUT</button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href={"/login"}>ĐĂNG NHẬP</Link>
                                <Link href={"/register"}>ĐĂNG KÝ</Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="relative w-28 h-20">
                        <Link href="/">
                            <Image src="/Logo.png" alt="LanhLogo" fill />
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        {links.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={` ${
                                    pathName === item.path
                                        ? "text-black"
                                        : "text-white"
                                } uppercase px-5`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div>
                        <button>Giỏ hàng</button>
                    </div>
                </div>
            </div>
            <div className="lg:hidden block relative">
                <div className="flex items-center md:px-4 md:py-3 px-3 py-2 ">
                    <div>
                        <button onClick={() => setOpen(!open)}>
                            <Bars3Icon className="md:w-10 w-8 text-white" />
                        </button>
                    </div>
                    <div className="relative md:w-28 md:h-20 w-16 h-12 mx-auto">
                        <Image src="/Logo.png" alt="logo" fill />
                    </div>
                </div>
                {open && (
                    <div className="fixed top-0 w-full h-screen flex">
                        <div className="flex flex-col h-screen flex-1 bg-lanh_green md:p-6 p-3">
                            <div className="flex justify-end">
                                <button onClick={() => setOpen(!open)}>
                                    <XMarkIcon className="md:w-10 w-8 text-white" />
                                </button>
                            </div>
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={` ${
                                        pathName === link.path
                                            ? "text-black"
                                            : "text-white"
                                    } uppercase px-5 md:text-lg text-xs flex flex-col gap-5 py-5 text-left `}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {session?.user ? (
                                <>
                                    <h1 className="text-white uppercase px-5 md:text-lg text-xs flex flex-col gap-5 py-5 text-left">
                                        {session.user.name}
                                    </h1>
                                    <form action={handleGithubLogout}>
                                        <button className="text-white uppercase px-5 md:text-lg text-xs flex flex-col gap-5 py-5 text-left">
                                            ĐĂNG XUẤT
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Link
                                        className={` ${
                                            pathName === "/login"
                                                ? "text-black"
                                                : "text-white"
                                        } uppercase px-5 md:text-lg text-sm flex flex-col gap-5 py-5 text-left `}
                                        href={"/login"}
                                    >
                                        ĐĂNG NHẬP
                                    </Link>
                                    <Link
                                        className={` ${
                                            pathName === "/regiter"
                                                ? "text-black"
                                                : "text-white"
                                        } uppercase px-5 md:text-lg text-sm flex flex-col gap-5 py-5 text-left `}
                                        href={"/register"}
                                    >
                                        ĐĂNG KÝ
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="bg-black z-0 h-screen flex-1 opacity-50"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
