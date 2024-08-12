import LoginForm from "@/components/LoginForm";
// import { handleEmailLogin } from "@/lib/serveraction";
import Image from "next/image";
const LoginPage = async () => {
    return (
        <div className="md:flex md:justify-center ">
            <div className="border-2 bg-white md:my-10 my-4 shadow-xl lg:min-h-[592px] lg:min-w-[1000px]">
                <div className="grid md:grid-cols-2 grid-cols-1 h-full">
                    <LoginForm />
                    <div className="bg-lanh_green md:block hidden">
                        <div className="relative w-1/2 h-full mx-auto z-20">
                            <Image
                                src="/Logo.png"
                                alt="LanhLogo"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* <p className="font-bold text-lanh_green">
                        Hoặc đăng nhập bằng:
                    </p> */}
                    {/* <form action={handleEmailLogin}>
                        <button className="w-full border-2 rounded-md bg-lanh_green font-bold text-white hover:bg-white hover:text-lanh_green border-lanh_green py-2 px-5">
                            Google
                        </button>
                    </form> */}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
