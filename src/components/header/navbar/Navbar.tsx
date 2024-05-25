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
import { useDispatch, useSelector } from "react-redux";
import { clearItem } from "@/app/Redux/cartSlice";

const links = [
    { name: "Trang chủ", path: "/" },
    { name: "Sản phẩm", path: "/products" },
    { name: "Liên hệ", path: "/contact" },
    { name: "Tin tức", path: "/news" },
];

const NavBar = ({ session }: any) => {
    // console.log("This is session:", session);
    const pathName = usePathname();
    const [open, setOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const dispatch = useDispatch();

    const cart = useSelector((state: { cart: Products[] }) => state.cart);
    const price = cart.map((item: Products) => item.salePrice * item.quantity);

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
                    <div className="relative">
                        <button
                            onClick={() => setOpenCart(!openCart)}
                            className="flex gap-2 px-4 py-2 border-2 border-white rounded-full"
                        >
                            <ShoppingCartIcon className="h-6 w-6"></ShoppingCartIcon>
                            <span>Giỏ hàng: {cart.length}</span>
                        </button>
                        <div
                            className={`absolute ${
                                openCart
                                    ? "visible scale-100 origin-[80%_0%]"
                                    : "invisible scale-0"
                            } md:w-[400px] w-[300px] md:top-14 top-10 right-0 border-[1px] border-lanh_green transition-transform ease-in-out duration-500 `}
                        >
                            <div className="max-h-[215px] overflow-y-scroll">
                                {cart.map((item) => (
                                    <div
                                        className="flex items-start justify-between border-b-2 p-3 bg-white"
                                        key={item._id}
                                    >
                                        <div className="flex gap-2">
                                            <div className="w-20 min-w-20 h-20 min-h-20 relative bg-white">
                                                {item.imgs.length > 0 ? (
                                                    <Image
                                                        src={item.imgs[0].url}
                                                        fill
                                                        alt={item.name}
                                                        className="object-contain"
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/defaultImg.png"
                                                        fill
                                                        alt={item.name}
                                                        className="object-contain"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex flex-col text-lanh_green">
                                                <span className="font-bold line-clamp-1">
                                                    {item.name}
                                                </span>
                                                <span className="text-sm">
                                                    {item.ingredient}
                                                </span>
                                                <span className="font-bold">
                                                    {item.quantity}
                                                    <span className="px-2">
                                                        X
                                                    </span>
                                                    {Intl.NumberFormat(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    ).format(item.salePrice)}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                dispatch(clearItem(item))
                                            }
                                            className=" text-lanh_green  hover:opacity-50 "
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-lanh_green">
                                <p className="p-[15px] flex justify-between text-white">
                                    <strong>Tổng tiền:</strong>
                                    <span className="font-bold">
                                        {Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(
                                            price.reduce(
                                                (acc: number, init: number) =>
                                                    acc + init,
                                                0
                                            )
                                        )}
                                    </span>
                                </p>
                                <div className="flex gap-2 px-[15px] pb-[15px] font-bold text-lanh_green">
                                    <Link
                                        href={"/cart"}
                                        className="p-2 flex-1 bg-white text-center"
                                    >
                                        Giỏ hàng
                                    </Link>

                                    <button className="p-2 flex-1 bg-white">
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
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

                    <div className="relative">
                        <button onClick={() => setOpenCart(!openCart)}>
                            <ShoppingCartIcon className="h-8 w-8 text-white" />
                            <span className="absolute top-[-4px] right-[-4px] px-[5px] text-[11px] rounded-full bg-red-500 text-white">
                                {cart.length}
                            </span>
                        </button>
                        <div
                            className={`absolute ${
                                openCart
                                    ? "visible scale-100 origin-top-right"
                                    : "invisible scale-0"
                            } md:w-[330px] w-[300px] md:top-14 top-10 right-0 border-[1px] border-lanh_green transition-transform ease-in-out duration-500 `}
                        >
                            <div className="max-h-[200px] overflow-scroll">
                                {cart.map((item) => (
                                    <div
                                        className="flex items-start justify-between border-b-2 p-3 bg-white"
                                        key={item._id}
                                    >
                                        <div className="flex gap-2">
                                            <div className="w-20 min-w-20 h-20 min-h-20 relative bg-white">
                                                {item.imgs.length > 0 ? (
                                                    <Image
                                                        src={item.imgs[0].url}
                                                        fill
                                                        alt={item.name}
                                                        className="object-contain"
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/defaultImg.png"
                                                        fill
                                                        alt={item.name}
                                                        className="object-contain"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex flex-col text-lanh_green">
                                                <span className="font-bold line-clamp-1">
                                                    {item.name}
                                                </span>
                                                <span className="text-sm">
                                                    {item.ingredient}
                                                </span>
                                                <span className="font-bold">
                                                    {item.quantity}
                                                    <span className="px-2">
                                                        X
                                                    </span>
                                                    {Intl.NumberFormat(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    ).format(item.salePrice)}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                dispatch(clearItem(item))
                                            }
                                            className=" text-lanh_green  hover:opacity-50 "
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-lanh_green">
                                <p className="p-[15px] flex justify-between text-white">
                                    <strong>Tổng tiền:</strong>
                                    <span className="font-bold">
                                        {Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(
                                            price.reduce(
                                                (acc: number, init: number) =>
                                                    acc + init,
                                                0
                                            )
                                        )}
                                    </span>
                                </p>
                                <div className="flex gap-2 px-[15px] pb-[15px] font-bold text-lanh_green">
                                    <Link
                                        href={"/cart"}
                                        className="p-2 flex-1 bg-white text-center"
                                    >
                                        Giỏ hàng
                                    </Link>

                                    <button className="p-2 flex-1 bg-white">
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
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
