"use client";
import { handleRemoveUser } from "@/lib/serveraction";
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
        <div className="border-2 border-gray-200 shadow-md rounded-md bg-white">
            <h1 className="p-5 font-bold">Users</h1>
            <table className="text-center w-full">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Admin/User</th>
                        <th>Edit/Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: Users, index: number) => (
                        <tr key={user._id} className=" even:bg-gray-100">
                            <td className="px-5">{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td className="py-5 flex justify-center">
                                <Image
                                    src={
                                        user.img ? user.img : "/defaultImg.png"
                                    }
                                    alt="user_avatar"
                                    width={100}
                                    height={100}
                                />
                            </td>
                            <td>{user.isAdmin ? "Admin" : "User"}</td>
                            <td>
                                <div className="flex gap-4 justify-center">
                                    <button className="px-4 py-2 text-white bg-lanh_green">
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleRemove(user._id)}
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
    );
};

export default UserList;
