"use client";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import {
    Bars3Icon,
    HomeIcon,
    UserGroupIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(true);
    const pathName = usePathname();
    return (
        <div className="relative flex min-h-screen">
            <div
                className={`flex flex-col ${
                    open
                        ? "md:w-[250px] md:relative w-[60%] fixed z-30"
                        : "md:w-[250px] md:relative w-[60%] fixed z-30 ml-[-60%] md:ml-[-250px]"
                } bg-lanh_green min-h-full transition-all py-5`}
            >
                <div className="px-5 fixed md:w-[250px] w-[60%]">
                    <Link href="/dashboard">
                        <div className="relative w-full h-20">
                            <Image
                                src={"/Logo.png"}
                                alt="logo"
                                fill
                                className="object-contain"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </Link>
                    <div className="flex flex-col pt-4">
                        <Link
                            className={` flex gap-2 p-4 rounded-md ${
                                pathName === "/dashboard"
                                    ? "bg-white text-lanh_green"
                                    : "text-white"
                            }`}
                            href="/dashboard"
                        >
                            <HomeIcon className="h-6 w-6 " />
                            <p>Dashboard</p>
                        </Link>
                        <Link
                            className={` flex gap-2 p-4 rounded-md ${
                                pathName === "/dashboard/products"
                                    ? "bg-white text-lanh_green"
                                    : "text-white"
                            }`}
                            href="/dashboard/products"
                        >
                            <CircleStackIcon className="h-6 w-6 " />
                            <p>Products</p>
                        </Link>
                        <Link
                            className={` flex gap-2 p-4 rounded-md ${
                                pathName === "/dashboard/users"
                                    ? "bg-white text-lanh_green"
                                    : "text-white"
                            }`}
                            href="/dashboard/users"
                        >
                            <UserGroupIcon className="h-6 w-6 " />
                            <p>Users</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    open ? "md:hidden block" : "hidden"
                } fixed w-full h-full bg-black opacity-55 text-right z-20`}
            >
                <button
                    className="fixed p-4 top-0 right-0"
                    onClick={() => setOpen(!open)}
                >
                    <XMarkIcon className="h-10 w-10 text-white " />
                </button>
            </div>
            <div className="flex flex-col flex-1">
                <div className="bg-white w-full fixed z-10">
                    <button
                        className="py-2 px-5"
                        onClick={() => setOpen(!open)}
                    >
                        <Bars3Icon className="w-10 h-10 text-gray" />
                    </button>
                </div>
                <div className="mt-14">{children}</div>
            </div>
        </div>
    );
};

export default Sidebar;
