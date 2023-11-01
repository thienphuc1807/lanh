"use client";
import { Disclosure } from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    { name: "TRANG CHỦ", href: "/" },
    { name: "MENU", href: "/products" },
    { name: "CÂU CHUYỆN THƯƠNG HIỆU", href: "/brand" },
    { name: "TIN TỨC", href: "/news" },
];

export default function Example() {
    const pathname = usePathname();
    return (
        <header className="relative">
            <Disclosure
                as="nav"
                className="absolute inset-0 bg-lanhHeader bg-no-repeat lg:bg-[length:100%_100%] bg-[length:140%_100%] h-[100px] md:h-[120px] lg:h-[200px] z-20"
            >
                {({ open }) => (
                    <>
                        <div className="container mx-auto px-5">
                            <div className="absolute md:top-5 md:left-5 left-2 top-2 lg:hidden">
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    {open ? (
                                        <XMarkIcon className="md:w-10 w-8" />
                                    ) : (
                                        <Bars3Icon className="md:w-10 w-8" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            <div className="hidden lg:flex items-center justify-between gap-10 py-5 text-sm text-white border-b-[1px] border-b-white">
                                <div className="flex gap-5">
                                    <Disclosure as="div" className="relative">
                                        <Disclosure.Button>
                                            <p className="flex h-5">
                                                Tải ứng dụng <ChevronDownIcon />
                                            </p>
                                        </Disclosure.Button>

                                        <Disclosure.Panel>
                                            <div className="absolute top-7 w-full text-center text-lanh_green bg-lanh_green z-20">
                                                <ul>
                                                    <li className="py-1">
                                                        <Link href="/">
                                                            <Image
                                                                src="/images/Icon/CHPlay.png"
                                                                alt="AppStore"
                                                                width={130}
                                                                height={0}
                                                            />
                                                        </Link>
                                                    </li>
                                                    <li className="py-1">
                                                        <Link href="/">
                                                            <Image
                                                                src="/images/Icon/App Store.png"
                                                                alt="AppStore"
                                                                width={130}
                                                                height={0}
                                                            />
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Disclosure.Panel>
                                    </Disclosure>
                                    <Disclosure as="div" className="relative">
                                        <Disclosure.Button>
                                            <p className="flex h-5">
                                                Tiếng Việt <ChevronDownIcon />
                                            </p>
                                        </Disclosure.Button>
                                        <Disclosure.Panel>
                                            <div className="absolute top-7 w-full text-center text-lanh_green bg-white">
                                                <ul className="cursor-pointer">
                                                    <li className="hover:bg-lanh_green hover:text-white py-4">
                                                        Tiếng Việt
                                                    </li>
                                                    <li className="hover:bg-lanh_green hover:text-white py-4">
                                                        Tiếng Anh
                                                    </li>
                                                </ul>
                                            </div>
                                        </Disclosure.Panel>
                                    </Disclosure>
                                </div>
                                <div className="flex gap-7">
                                    <div className="flex gap-2">
                                        <p>Hotline đặt hàng</p>
                                        <PhoneIcon className="h-5" />
                                        <p>1900 0126</p>
                                    </div>
                                    <ul className="flex gap-7">
                                        <li>
                                            <Link href="/login">ĐĂNG NHẬP</Link>
                                        </li>
                                        <li>
                                            <Link href="/register">
                                                ĐĂNG KÝ
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center lg:justify-between justify-center font-semibold lg:pt-0 md:pt-2">
                                <div className="relative md:w-32 md:h-20 w-20 h-20 z-0">
                                    <Image
                                        src="/images/Icon/Logo.png"
                                        alt="Lanh Logo"
                                        fill={true}
                                        objectFit="contain"
                                    />
                                </div>
                                <div className="hidden lg:block">
                                    <div className="flex gap-6 text-sm">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                className={`link ${
                                                    pathname === `${item.href}`
                                                        ? "text-[#4c4c4c]"
                                                        : "text-white hover:text-[#4c4c4c]"
                                                }`}
                                                href={item.href}
                                                scroll={false}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <button className="hidden lg:block border-2 py-2 px-3 rounded-full text-white ">
                                    <div className="flex h-5">
                                        <MagnifyingGlassIcon className="w-10" />
                                        <ShoppingBagIcon className="w-10" />
                                        <p className="text-sm w-full">
                                            GIỎ HÀNG
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <Disclosure.Panel className="lg:hidden">
                            <div className="mt-[-20px] space-y-2 px-2 py-4 bg-lanh_green ">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={`link ${
                                            pathname === `${item.href}`
                                                ? "text-[#4c4c4c] block rounded-md px-3 py-2 text-base font-medium"
                                                : "text-white hover:text-[#4c4c4c] block rounded-md px-3 py-2 text-base font-medium"
                                        }`}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </header>
    );
}
