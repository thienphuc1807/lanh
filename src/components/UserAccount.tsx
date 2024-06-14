"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { handleEditUser } from "@/lib/serveraction";

const UserAccount = (props: { data: any; user: any }) => {
    const { data, user } = props;
    const [cities, setCities] = useState(data);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [values, setValues] = useState({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        city: user.city,
        district: user.district,
        ward: user.ward,
        address: user.address,
    });

    const router = useRouter();

    const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const cityName = user.city
            ? user.city
            : e.target.options[e.target.selectedIndex].value;
        setValues({ ...values, city: cityName });
        setDistricts([]);
        setWards([]);
        const selectedCityData: any = cities.find(
            (city: any) => city.Name === cityName
        );
        if (selectedCityData) {
            setDistricts(selectedCityData.Districts);
        }
    };

    const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const districtName = e.target.options[e.target.selectedIndex].value;
        setValues({ ...values, district: districtName });
        setWards([]);
        const selectedCityData: any = cities.find(
            (city: any) => city.Name === values.city
        );
        if (selectedCityData) {
            const selectedDistrictData = selectedCityData.Districts.find(
                (district: any) => district.Name === districtName
            );
            if (selectedDistrictData) {
                setWards(selectedDistrictData.Wards);
            }
        }
    };
    const handleWardChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const wardName = e.target.options[e.target.selectedIndex].value;
        setValues({ ...values, ward: wardName });
    };

    const onChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
        if (isEdit) {
            setValues({ ...values, [e.target.name]: e.target.value });
        } else {
        }
    };

    const handleUpdateInfo = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", values?.fullName);
        formData.append("email", values?.email);
        formData.append("phoneNumber", values?.phoneNumber);
        formData.append("city", values?.city);
        formData.append("district", values?.district);
        formData.append("address", values?.address);
        formData.append("ward", values?.ward);
        const editUser = await handleEditUser(formData, user.username);
        if (!editUser) {
            router.refresh();
            setIsEdit(false);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cập nhật thành công!",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Cập nhật không thành công",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleCancel = () => {
        Swal.fire({
            title: "Các thay đổi sẽ không được lưu?",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ",
            confirmButtonColor: "#97ba79",
        }).then((result) => {
            if (result.isConfirmed) {
                setIsEdit(false);
                location.reload();
            }
        });
    };
    return (
        <div className="container mx-auto flex md:flex-row flex-col md:py-10 py-2 gap-4 md:px-4 px-0">
            <form className="md:flex-[30%] flex-1 flex flex-col gap-4 bg-white p-6 items-center rounded-md h-fit">
                <h1 className="font-bold text-lanh_green text-xl">
                    Ảnh đại diện
                </h1>
                <label
                    htmlFor="userAvatar"
                    className="flexx flex-col items-center"
                >
                    <div className="relative h-32 w-32 hover:bg-gray hover:opacity-50 rounded-full overflow-hidden">
                        <Image
                            src={"/defaultImg.png"}
                            alt="User Avatar"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <input type="file" id="userAvatar" className="hidden" />
                </label>
                <button
                    type="submit"
                    className="p-2 text-sm rounded-lg w-fit border-2 border-lanh_green bg-lanh_green text-white hover:bg-white hover:text-lanh_green"
                >
                    Cập nhật ảnh đại diện
                </button>
            </form>
            <form
                onSubmit={handleUpdateInfo}
                className="md:flex-[70%] flex-1 flex flex-col gap-4 bg-white p-6 rounded-md"
            >
                <h1 className="font-bold text-lanh_green text-xl">
                    Thông tin cá nhân
                </h1>
                <label htmlFor="fullName">Họ tên:</label>
                {isEdit ? (
                    <input
                        className="border-2 border-lanh_green rounded-md p-3"
                        type="text"
                        id="fullName"
                        name="fullName"
                        onChange={onChangeValues}
                        value={values.fullName}
                    />
                ) : (
                    <p>{user.fullName}</p>
                )}
                <label htmlFor="email">Địa chỉ email:</label>
                {isEdit ? (
                    <input
                        className="border-2 border-lanh_green rounded-md p-3"
                        type="email"
                        id="email"
                        name="email"
                        onChange={onChangeValues}
                        value={values.email}
                    />
                ) : (
                    <p>{user.email}</p>
                )}
                <label htmlFor="phoneNumber">Số điện thoại:</label>
                {isEdit ? (
                    <input
                        className="border-2 border-lanh_green rounded-md p-3"
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={onChangeValues}
                        value={values.phoneNumber}
                    />
                ) : (
                    <p>{user.phoneNumber}</p>
                )}
                <label htmlFor="address">Địa chỉ:</label>
                {isEdit ? (
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="border-2 border-lanh_green rounded-md p-3"
                        onChange={onChangeValues}
                        value={values.address}
                    />
                ) : (
                    <p>{user.address}</p>
                )}
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                    {isEdit ? (
                        <>
                            <select
                                className="flex-1 border-2 border-lanh_green rounded-md p-2 w-full"
                                id="city"
                                onChange={handleCityChange}
                                name="city"
                                required
                            >
                                <option value="">Chọn Tỉnh/Thành</option>
                                {cities.map((city: any) => (
                                    <option
                                        key={city.Id}
                                        value={city.Name}
                                        data-id={city.Id}
                                    >
                                        {city.Name}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="flex-1 border-2 border-lanh_green rounded-md p-2 w-full"
                                id="district"
                                onChange={handleDistrictChange}
                                required
                            >
                                <option value="">Chọn Quận/Huyện</option>
                                {districts.map((district: any) => (
                                    <option
                                        key={district.Id}
                                        value={district.Name}
                                        data-id={district.Id}
                                    >
                                        {district.Name}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="flex-1 border-2 border-lanh_green rounded-md p-2 w-full"
                                id="ward"
                                onChange={handleWardChange}
                                required
                            >
                                <option value="">Chọn Phường/Xã</option>
                                {wards.map((ward: any) => (
                                    <option
                                        key={ward.Id}
                                        value={ward.Name}
                                        data-id={ward.Id}
                                    >
                                        {ward.Name}
                                    </option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <>
                            <p>{user.city}</p>
                            <p>{user.district}</p>
                            <p>{user.ward}</p>
                        </>
                    )}
                </div>

                {isEdit ? (
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-lanh_green w-fit md:p-3 p-2 hover:bg-white hover:text-lanh_green text-white border-2 border-lanh_green rounded-md"
                        >
                            Lưu thay đổi
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-lanh_green w-fit md:p-3 p-2 hover:bg-white hover:text-lanh_green text-white border-2 border-lanh_green rounded-md"
                        >
                            Huỷ
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="bg-lanh_green w-fit md:p-3 p-2 hover:bg-white hover:text-lanh_green text-white border-2 border-lanh_green rounded-md"
                    >
                        Chỉnh sửa
                    </button>
                )}
            </form>
        </div>
    );
};

export default UserAccount;
