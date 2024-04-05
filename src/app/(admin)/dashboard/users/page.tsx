import UserList from "@/components/UserList";
import Link from "next/link";
const getUsers = async () => {
    const res = await fetch(`http://${process.env.DOMAIN}/api/users`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return res.json();
};
const UsersPage = async () => {
    const users = await getUsers();
    return (
        <div className="p-5">
            <div className="pb-5">
                <Link
                    href={"/dashboard/users"}
                    className="py-2 px-4 bg-lanh_green text-white"
                >
                    Add new User
                </Link>
            </div>
            <UserList users={users} />
        </div>
    );
};

export default UsersPage;
