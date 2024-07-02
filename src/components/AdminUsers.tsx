"use client";
import { handleRemoveUser } from "@/lib/serveraction";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

interface Props {
    users: Users[];
}

const handleRemove = (id: string) => {
    Swal.fire({
        title: "Xoá khỏi dữ liệu?",
        text: "Sau khi xoá sẽ không thể hoàn tác!",
        showCancelButton: true,
        confirmButtonColor: "#97ba79",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xoá",
        cancelButtonText: "Huỷ",
    }).then((result) => {
        if (result.isConfirmed) {
            handleRemoveUser(id);
            Swal.fire({
                title: "Đã xoá!",
                text: "Đã xoá khỏi dữ liệu",
                icon: "success",
            });
        }
    });
};
const UserList = (props: Props) => {
    const { users } = props;

    return (
        <>
            <div className="lg:block hidden border-2 border-gray-200 shadow-md rounded-md bg-white">
                <h1 className="p-5 font-bold">Admin/User</h1>
                <table className="w-full text-center border-separate border-spacing-4">
                    <thead>
                        <tr>
                            <th>Tên đăng nhập</th>
                            <th>Địa chỉ email</th>
                            <th>Admin/User</th>
                            <th>Xoá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: Users) => (
                            <tr key={user._id} className="even:bg-gray-100">
                                <td>{user.username}</td>
                                <td className="lg:max-w-24 overflow-x-auto">
                                    {user.email}
                                </td>

                                <td>{user.isAdmin ? "Admin" : "User"}</td>
                                <td className="py-4">
                                    <button
                                        onClick={() => handleRemove(user._id)}
                                        className="px-4 py-2 text-white bg-lanh_green rounded-md "
                                    >
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="lg:hidden grid grid-cols-1 gap-2">
                {users.map((user) => (
                    <div
                        className="p-5 border-2 bg-white rounded-lg shadow-lg overflow-hidden"
                        key={user._id}
                    >
                        <div className="space-y-5">
                            <div className="flex justify-between">
                                <div className="space-x-4">
                                    <button>
                                        <PencilSquareIcon className="w-6 h-6 text-lanh_green" />
                                    </button>
                                    <button
                                        onClick={() => handleRemove(user._id)}
                                    >
                                        <TrashIcon className="w-6 h-6 text-lanh_green" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col justify-between">
                                <h1>Username:</h1>
                                {user.username}
                            </div>
                            <div className="flex md:flex-row flex-col justify-between">
                                <h1>Email:</h1>
                                <p className="truncate">{user.email}</p>
                            </div>
                            <div className="flex md:flex-row flex-col justify-between">
                                <h1>Admin:</h1>
                                {user.isAdmin ? (
                                    <div>True</div>
                                ) : (
                                    <div>False</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserList;
