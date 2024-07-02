"use client";
import { clearCart } from "@/app/Redux/cartSlice";
import { handleUploadOrders } from "@/lib/serveraction";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const CheckOut = (props: { data: any; session: any }) => {
    const { data, session } = props;
    const [cities, setCities] = useState(data);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const cart = useSelector((state: { cart: Products[] }) => state.cart);
    const [isMounted, setIsMounted] = useState(false);
    console.log(session);

    const dispatch = useDispatch();

    const [values, setValues] = useState({
        userId: session.user.id,
        fullName: session.user.fullName,
        email: session.user.email,
        phoneNumber: session.user.phoneNumber,
        city: "",
        district: "",
        ward: "",
        address: "",
        orders: cart,
    });
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();

    if (!isMounted) {
        // Prevent rendering on the server side
        return null;
    }

    console.log(values);

    const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const cityName = e.target.options[e.target.selectedIndex].value;
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
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleUpload = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userID", values?.userId);
        formData.append("fullName", values?.fullName);
        formData.append("email", values?.email);
        formData.append("phoneNumber", values?.phoneNumber);
        formData.append("city", values?.city);
        formData.append("district", values?.district);
        formData.append("address", values?.address);
        formData.append("ward", values?.ward);
        values?.orders.forEach((item: Products) => {
            formData.append("orders", JSON.stringify(item));
        });
        const uploadOrders = await handleUploadOrders(formData);
        if (!uploadOrders) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Đặt hàng thành công!",
                showConfirmButton: false,
                timer: 1500,
            });
            router.push("/");
            router.refresh();
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Lỗi đặt hàng không thành công",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    var price = cart.map((item: Products) => item.salePrice * item.quantity);

    return (
        <div className="container mx-auto flex lg:flex-row md:flex-row-reverse flex-col-reverse md:gap-10 gap-5 xl:my-10 my-2 xl:px-0 px-5">
            <form onSubmit={handleUpload} className="lg:flex-[60%] flex-1">
                <h1 className="font-bold lg:text-2xl text-xl text-lanh_green pb-4">
                    Thông tin giao hàng
                </h1>
                <div>
                    <div className="flex flex-col gap-2">
                        <div className="relative space-y-2">
                            <label htmlFor="full_name">
                                <span>Họ Tên</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                id="full_name"
                                className="p-2 w-full border-2 rounded-md"
                                onChange={onChangeValues}
                                required
                                value={values.fullName}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 space-y-2">
                                <label htmlFor="email">
                                    <span>Email</span>
                                </label>
                                <input
                                    type="text"
                                    className="p-2 border-2 rounded-md w-full"
                                    id="email"
                                    name="email"
                                    onChange={onChangeValues}
                                    value={values.email}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label htmlFor="phoneNumber">
                                    <span>Số điện thoại</span>
                                </label>
                                <input
                                    type="text"
                                    className="p-2 border-2 rounded-md w-full"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    onChange={onChangeValues}
                                    required
                                    value={values.phoneNumber}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="address">
                                <span>Địa chỉ</span>
                            </label>
                            <div className="flex lg:flex-row flex-col gap-2">
                                <select
                                    className="flex-1 border-2 rounded-md p-2"
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
                                    className="flex-1 border-2 rounded-md p-2"
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
                                    className="flex-1 border-2 rounded-md p-2"
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
                            </div>
                            <label>Số nhà, tên đường</label>
                            <input
                                type="text"
                                className="p-2 w-full border-2 rounded-md"
                                id="address"
                                name="address"
                                onChange={onChangeValues}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col-reverse gap-4 justify-between py-5 md:items-center">
                    <Link
                        href={"/cart"}
                        className="text-lanh_green hover:underline flex items-center gap-2"
                    >
                        <ArrowLongLeftIcon className="w-8 h-8" />
                        Trở lại giỏ hàng
                    </Link>
                    <button
                        type="submit"
                        className="bg-lanh_green hover:bg-white hover:text-lanh_green border-2 border-lanh_green text-white px-4 py-2 rounded-md"
                    >
                        Đặt hàng
                    </button>
                </div>
            </form>
            <div className="lg:flex-[40%] flex-1">
                {cart.length > 0 ? (
                    <div>
                        <h1>Sản phẩm:</h1>
                        {cart.map((item) => (
                            <div
                                className="flex justify-between gap-6 py-2"
                                key={item._id}
                            >
                                <div className="flex gap-6">
                                    <div className="relative xl:h-28 md:h-20 h-16 xl:min-w-28 md:min-w-20 min-w-16 border-2 rounded-md">
                                        <Image
                                            src={item.imgs[0].url}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                        <span className="absolute right-[-10px] top-[-10px] w-[25px] h-[25px] text-center px-[5px] bg-lanh_green text-white rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <h1>{item.name}</h1>
                                </div>
                                <span>
                                    {Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(item.salePrice * item.quantity)}
                                </span>
                            </div>
                        ))}
                        <div className="border-t-2 py-5 flex justify-between">
                            <b>Tổng cộng: </b>
                            <span className="font-bold text-2xl">
                                {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(
                                    price.reduce(
                                        (acc: number, init: number) =>
                                            acc + init,
                                        0
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div>No item in cart</div>
                )}
            </div>
        </div>
    );
};

export default CheckOut;
