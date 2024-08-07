import LoginForm from "@/components/LoginForm";
import { handleEmailLogin } from "@/lib/serveraction";
import Image from "next/image";
const LoginPage = async () => {
    return (
        <div className="xl:px-0 px-6 md:flex md:justify-center">
            <div className="border-2 rounded-md border-lanh_green my-10 p-6 shadow-xl md:min-w-[400px]">
                <div className="flex flex-col gap-5">
                    <div className="w-full h-[140px] relative mx-auto">
                        <Image
                            alt="logo_lanh"
                            src="/defaultImg.png"
                            objectFit="contain"
                            fill
                        />
                    </div>
                    <LoginForm />
                    <p className="font-bold text-lanh_green">
                        Hoặc đăng nhập bằng:
                    </p>
                    <form action={handleEmailLogin}>
                        <button className="w-full border-2 rounded-md bg-lanh_green font-bold text-white hover:bg-white hover:text-lanh_green border-lanh_green py-2 px-5">
                            Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
