"use client";
import { handleRemoveUser } from "@/lib/serveraction";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Swal from "sweetalert2";

interface Props {
    users: Users[];
}

const handleRemove = (id: string) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            handleRemoveUser(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
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
                <h1 className="p-5 font-bold">Users</h1>
                <table className="w-full text-center px-5">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>User Avatar</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Admin/User</th>
                            <th>Edit/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: Users, index: number) => (
                            <tr key={user._id} className="even:bg-gray-100">
                                <td>{index + 1}</td>
                                <td className="relative w-24 h-24">
                                    <Image
                                        src={
                                            user.img
                                                ? user.img
                                                : "/defaultImg.png"
                                        }
                                        alt="user_avatar"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </td>
                                <td>{user.username}</td>
                                <td className="lg:max-w-24 overflow-x-auto">
                                    {user.email}
                                </td>

                                <td>{user.isAdmin ? "Admin" : "User"}</td>
                                <td>
                                    <div className="flex gap-4 justify-center">
                                        <button className="px-4 py-2 text-white bg-lanh_green">
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleRemove(user._id)
                                            }
                                            className="px-4 py-2 text-white bg-lanh_green"
                                        >
                                            Remove
                                        </button>
                                    </div>
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
                                <div className="relative w-12 h-12">
                                    <Image
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        src={
                                            user.img
                                                ? user.img
                                                : "/defaultImg.png"
                                        }
                                        alt="user_avatar"
                                    />
                                </div>
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
