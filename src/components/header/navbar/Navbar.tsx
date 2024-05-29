"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import {
    Bars3Icon,
    ShoppingCartIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { handleGithubLogout } from "@/lib/serveraction";
import { useSelector } from "react-redux";
import ModalCart from "@/components/ModalCart";

const links = [
    { name: "Trang chủ", path: "/" },
    { name: "Sản phẩm", path: "/products" },
    { name: "Liên hệ", path: "/contact" },
    { name: "Tin tức", path: "/news" },
];

const NavBar = ({ session }: any) => {
    const pathName = usePathname();
    const [open, setOpen] = useState(false);
    const cart = useSelector((state: { cart: Products[] }) => state.cart);
    return (
        <div className="w-full">
            {/* PC,Laptop navbar */}
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
                                <h1>Xin chào, {session.user.name}!</h1>
                                <form action={handleGithubLogout}>
                                    <button>ĐĂNG XUẤT</button>
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
                    <Link href="/">
                        <div className="relative w-28 h-20">
                            <Image
                                src="/Logo.png"
                                alt="LanhLogo"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </Link>
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
                    <div className="relative group/cart ">
                        <button className="flex gap-2 px-4 py-2 border-2 border-white rounded-full">
                            <ShoppingCartIcon className="h-6 w-6"></ShoppingCartIcon>
                            <span>Giỏ hàng: {cart.length}</span>
                        </button>
                        <ModalCart
                            className="absolute group-hover/cart:visible origin-[80%_0%] group-hover/cart:scale-100 scale-0 group-hover/cart:opacity-100 invisible opacity-0 md:w-[330px] w-[300px] md:top-11 top-10 right-0 border-[1px] border-lanh_green transition-all duration-500"
                            cart={cart}
                        />
                    </div>
                </div>
            </div>
            {/* Mobile navbar */}
            <div className="lg:hidden block relative">
                <div className="flex items-center md:px-4 md:py-3 px-3 py-2 ">
                    <div>
                        <button onClick={() => setOpen(!open)}>
                            <Bars3Icon className="md:w-10 w-8 text-white" />
                        </button>
                    </div>
                    <div className="relative md:w-28 md:h-20 w-16 h-12 mx-auto">
                        <Image
                            src="/Logo.png"
                            alt="logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    <div className="relative group/cart">
                        <button>
                            <ShoppingCartIcon className="h-8 w-8 text-white" />
                            <span className="absolute top-[-4px] right-[-4px] px-[5px] text-[11px] rounded-full bg-red-500 text-white">
                                {cart.length}
                            </span>
                        </button>
                        <ModalCart
                            className="absolute group-hover/cart:visible group-hover/cart:scale-100 group-hover/cart:origin-top-right invisible scale-0 md:w-[330px] w-[300px] md:top-14 top-10 right-0 border-[1px] border-lanh_green transition-transform ease-in-out duration-500"
                            cart={cart}
                        />
                    </div>
                </div>

                <div className="flex">
                    <div
                        className={`flex flex-col md:w-[250px] top-0 bottom-0 w-[60%] fixed z-20 ${
                            !open && "ml-[-60%] md:ml-[-250px]"
                        } bg-lanh_green min-h-screen transition-all py-5`}
                    >
                        <div className="flex flex-col h-screen bg-lanh_green md:p-6 p-3">
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
                                    } uppercase px-5 md:text-lg flex flex-col gap-5 py-5 text-left `}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {session?.user ? (
                                <>
                                    <h1 className="text-white uppercase px-5 md:text-lg flex flex-col gap-5 py-5 text-left">
                                        {session.user.name}
                                    </h1>
                                    <form action={handleGithubLogout}>
                                        <button className="text-white uppercase px-5 md:text-lg flex flex-col gap-5 py-5 text-left">
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
                                        } uppercase px-5 md:text-lg flex flex-col gap-5 py-5 text-left `}
                                        href={"/login"}
                                    >
                                        ĐĂNG NHẬP
                                    </Link>
                                    <Link
                                        className={` ${
                                            pathName === "/register"
                                                ? "text-black"
                                                : "text-white"
                                        } uppercase px-5 md:text-lg flex flex-col gap-5 py-5 text-left `}
                                        href={"/register"}
                                    >
                                        ĐĂNG KÝ
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div
                        className={`${
                            open ? "lg:hidden block" : "hidden"
                        } fixed w-full min-h-screen top-0 bg-black opacity-55 text-right z-10`}
                        onClick={() => setOpen(!open)}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
