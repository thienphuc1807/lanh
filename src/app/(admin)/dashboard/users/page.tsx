import UserList from "@/components/AdminUsers";
import { getUsers } from "@/lib/data";
import Link from "next/link";
// const getUsers = async () => {
//     const res = await fetch(
//         `http://${process.env.DOMAIN}/api/dashboard/users`,
//         {
//             cache: "no-store",
//         }
//     );
//     if (!res.ok) {
//         throw new Error("Something went wrong");
//     }
//     return res.json();
// };
const UsersPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const users = await getUsers();
    return (
        <div className="p-5">
            <div className="pb-5">
                <Link
                    href={"/dashboard/users/formuser"}
                    className="bg-lanh_green py-2 px-5 rounded-md border-2 border-lanh_green text-white"
                >
                    Thêm tài khoản mới
                </Link>
            </div>
            <UserList
                users={JSON.parse(JSON.stringify(users))}
                searchParams={searchParams}
            />
        </div>
    );
};

export default UsersPage;
