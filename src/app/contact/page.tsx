import BreadCrumbs from "@/components/app.breadcrumbs";

const breadcrumbs = [
    {
        name: "Trang chủ",
        path: "/",
    },
    {
        name: "Liên hệ",
        path: "/contact",
    },
];

function Contact() {
    return (
        <main className="container mx-auto px-5 gap-6 lg:pt-[200px] pt-[100px] lg:mb-10">
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <section>
                    <h1 className="text-3xl font-bold mb-2 text-lanh_green">
                        Thông tin liên hệ
                    </h1>
                    <p className="text-justify">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Est dolor nihil delectus ullam totam consequuntur
                        voluptatem rem sequi quos!
                    </p>
                    <h3 className="font-bold my-2 text-lanh_green">
                        Trụ sở chính
                    </h3>
                    <ul className="ml-10 list-disc">
                        <li>
                            28E Tăng Bạt Hổ, Phường 11, Quận Bình Thạnh, Thành
                            phố Hồ Chí Minh
                        </li>
                        <li>(01)23456789</li>
                        <li>richbee@gmail.com</li>
                    </ul>
                    <h3 className="font-bold my-2 text-lanh_green">
                        Chi nhánh
                    </h3>
                    <ul className="ml-10 list-disc">
                        <li>
                            28E Tăng Bạt Hổ, Phường 11, Quận Bình Thạnh, Thành
                            phố Hồ Chí Minh
                        </li>
                        <li>(01)23456789</li>
                        <li>richbee@gmail.com</li>
                    </ul>
                </section>
                <section className="border-2 border-lanh_green shadow-xl py-5 px-3 rounded-md">
                    <div className="flex flex-col gap-2">
                        <label className="text-lanh_green font-bold">
                            Họ và tên
                        </label>
                        <input
                            className="border-2 rounded-md p-2"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <label className="text-lanh_green font-bold">
                            Email
                        </label>
                        <input
                            className="border-2 rounded-md p-2"
                            type="email"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <label className="text-lanh_green font-bold">
                            Nội dung liên hệ
                        </label>
                        <textarea
                            rows={5}
                            cols={50}
                            className="border-2 rounded-md p-2"
                        />
                    </div>
                    <button className="mt-5 bg-white text-lanh_green font-bold outline-2 border-2 rounded-md px-4 py-2 hover:bg-lanh_green hover:text-white">
                        Gửi đi
                    </button>
                </section>
            </div>
        </main>
    );
}

export default Contact;
