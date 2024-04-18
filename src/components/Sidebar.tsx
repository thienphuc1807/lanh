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

const Sidebar = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(true);
    return (
        <div className="flex min-h-screen">
            <div
                className={`flex flex-col ${
                    open
                        ? "md:w-[250px] md:relative w-[60%] absolute z-20"
                        : "md:w-[250px] md:relative w-[60%] absolute z-20 ml-[-60%] md:ml-[-250px]"
                } bg-lanh_green min-h-full transition-all py-5`}
            >
                <div className="fixed">
                    <Link href="/dashboard">
                        <div className="relative w-full h-20 px-5">
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
                    <div className="flex flex-col gap-5 px-10 py-5">
                        <Link
                            className="text-white flex gap-2"
                            href="/dashboard"
                        >
                            <HomeIcon className="h-6 w-6 " />
                            <p>Home</p>
                        </Link>
                        <Link
                            className="text-white flex gap-2"
                            href="/dashboard/products"
                        >
                            <CircleStackIcon className="h-6 w-6 " />
                            <p>Products</p>
                        </Link>
                        <Link
                            className="text-white flex gap-2"
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
                } absolute w-full h-full bg-black opacity-55 text-right z-10`}
            >
                <button
                    className="fixed p-4 top-0 right-0"
                    onClick={() => setOpen(!open)}
                >
                    <XMarkIcon className="h-10 w-10 text-white " />
                </button>
            </div>
            <div className="flex flex-col flex-1">
                <div className="bg-white w-full ">
                    <button
                        className="py-2 px-5"
                        onClick={() => setOpen(!open)}
                    >
                        <Bars3Icon className="w-10 h-10 text-gray" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Sidebar;
