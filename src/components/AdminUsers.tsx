"use client";
import { handleRemoveUser } from "@/lib/serveraction";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import _ from "lodash";
import { FunnelIcon } from "@heroicons/react/24/outline";
import PaginationControl from "./PaginationControl";
import Link from "next/link";

interface Props {
    users: Users[];
    searchParams: { [key: string]: string | string[] | undefined };
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
                showConfirmButton: false,
                timer: 2000,
            });
        }
    });
};
const UserList = (props: Props) => {
    const { users, searchParams } = props;
    const [listUsers, setListUsers] = useState<Users[]>([]);
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("");
    const [openSort, setOpenSort] = useState(false);

    useEffect(() => {
        setListUsers(users);
    }, [users]);

    const sortList = [
        {
            name: "Tên từ A-Z",
            sort: "asc",
            field: "fullName",
        },
        {
            name: "Tên từ Z-A",
            sort: "desc",
            field: "fullName",
        },
        {
            name: "User-Admin",
            sort: "asc",
            field: "isAdmin",
        },
        {
            name: "Admin-User",
            sort: "desc",
            field: "isAdmin",
        },
    ];

    const handleSearch = _.debounce((value: string) => {
        if (value) {
            let cloneListUsers = _.cloneDeep(users);
            cloneListUsers = cloneListUsers.filter((user) =>
                user.fullName.toLowerCase().includes(value.toLowerCase())
            );
            setListUsers(cloneListUsers);
        } else {
            setListUsers(users);
        }
    }, 1000);

    const handleSort = (sort: any, field: string) => {
        if (sort && field) {
            setSortBy(sort);
            setSortField(field);
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = _.orderBy(listUsers, [field], [sort]);
            setListUsers(cloneListUsers);
        }
    };

    const page = searchParams["page"] ?? "1";
    const per_page = searchParams["per_page"] ?? "8";
    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);
    const entries = listUsers.slice(start, end);

    return (
        <>
            <div className="flex lg:flex-row flex-col lg:items-center gap-3 pb-3">
                <label htmlFor="search">Tìm kiếm:</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Tìm kiếm theo tên"
                    className="border-2 border-lanh_green py-2 px-4 rounded-md"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="relative">
                    <button
                        className="flex gap-2 bg-lanh_green py-2 px-5 rounded-md border-2 border-lanh_green text-white"
                        onClick={() => setOpenSort(!openSort)}
                    >
                        <FunnelIcon className="h-6 w-6" />
                        <span>Sắp xếp theo :</span>
                    </button>
                    {openSort && (
                        <div className="absolute flex flex-col z-10 rounded-md bg-white shadow-[1px_1px_6px_2px_rgba(151,186,121,0.3)] mt-2 lg:right-0 left-0 overflow-hidden">
                            {sortList.map((sort) => (
                                <button
                                    key={sort.name}
                                    className="py-2 px-5 hover:bg-lanh_green hover:text-white"
                                    onClick={() => {
                                        setOpenSort(!openSort);
                                        handleSort(sort.sort, sort.field);
                                    }}
                                >
                                    {sort.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {entries.length > 0 ? (
                <>
                    <div className="lg:block hidden border-2 border-gray-200 shadow-md rounded-md bg-white">
                        <h1 className="p-5 font-bold">Admin/User</h1>
                        <table className="w-full border-separate">
                            <thead>
                                <tr className="text-left">
                                    <th></th>
                                    <th className="pl-4">Tên đầy đủ</th>
                                    <th className="pl-4">Địa chỉ email</th>
                                    <th className="pl-4">Vai trò</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((user: Users) => (
                                    <tr
                                        key={user._id}
                                        className="even:bg-gray-100"
                                    >
                                        <td>
                                            <Link
                                                href={`/dashboard/users/${user._id}`}
                                                className="flex justify-center"
                                            >
                                                <PencilSquareIcon className="w-6 h-6 text-lanh_green" />
                                            </Link>
                                        </td>
                                        <td className="pl-4">
                                            {user.fullName}
                                        </td>
                                        <td className="overflow-x-auto pl-4">
                                            {user.email}
                                        </td>

                                        <td className="pl-4">
                                            {user.isAdmin ? "Admin" : "User"}
                                        </td>
                                        <td className="py-4 text-center">
                                            <button
                                                onClick={() =>
                                                    handleRemove(user._id || "")
                                                }
                                            >
                                                <TrashIcon className="h-6 w-6 text-lanh_green" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="lg:hidden grid grid-cols-1 gap-2">
                        {entries.map((user) => (
                            <div
                                className="p-5 border-2 bg-white rounded-lg shadow-lg overflow-hidden"
                                key={user._id}
                            >
                                <div className="space-y-5">
                                    <div className="flex justify-between">
                                        <div className="space-x-4 flex items-center">
                                            <Link
                                                href={`/dashboard/users/${user._id}`}
                                            >
                                                <PencilSquareIcon className="w-6 h-6 text-lanh_green" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleRemove(user._id || "")
                                                }
                                            >
                                                <TrashIcon className="w-6 h-6 text-lanh_green" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-row flex-col justify-between">
                                        <h1>Họ tên:</h1>
                                        <b>{user.fullName}</b>
                                    </div>
                                    <div className="flex md:flex-row flex-col justify-between">
                                        <h1>Email:</h1>
                                        <p className="truncate font-bold">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="flex md:flex-row flex-col justify-between">
                                        <h1>Vai trò:</h1>
                                        {user.isAdmin ? (
                                            <b>Admin</b>
                                        ) : (
                                            <b>User</b>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <PaginationControl
                        hasNextPage={end < users.length}
                        hasPrevPage={start > 0}
                        dataLength={users.length}
                    />
                </>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    Không tìm thấy dữ liệu
                </div>
            )}
        </>
    );
};

export default UserList;
