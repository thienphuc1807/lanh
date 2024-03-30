import Image from "next/image";
import Link from "next/link";
const Sidebar = () => {
    return (
        <div className="flex flex-col gap-5 w-[250px] bg-lanh_green px-6 py-5">
            <Link href="/dashboard">
                <div className="relative w-full h-20">
                    <Image
                        src={"/Logo.png"}
                        alt="logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </Link>
            <Link href="/dashboard">Home</Link>
            <Link href="/dashboard/products">Products</Link>
            <Link href="/dashboard/users">Users</Link>
        </div>
    );
};

export default Sidebar;
