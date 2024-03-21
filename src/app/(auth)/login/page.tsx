import { handleGithubLogin } from "@/lib/serveraction";
import Image from "next/image";
import { handleLogin } from "@/lib/serveraction";
const LoginPage = async () => {
    return (
        <div className="xl:px-0 px-6 md:flex md:justify-center">
            <div className="border-2 rounded-xl border-lanh_green my-10 p-6 shadow-xl">
                <div className="flex flex-col gap-5">
                    <div className="w-full h-[140px] relative mx-auto">
                        <Image
                            alt="logo_lanh"
                            src="/defaultImg.png"
                            objectFit="contain"
                            fill
                        />
                    </div>
                    <form action={handleLogin} className="flex flex-col gap-6">
                        <input
                            type="text"
                            className="py-2 px-5 border-2 border-lanh_green rounded-full"
                            placeholder="Tên đăng nhập"
                            name="username"
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="py-2 px-5 border-2 border-lanh_green rounded-full"
                            name="password"
                        />
                        <button className="p-2 font-bold bg-lanh_green border-2 border-lanh_green rounded-full text-white hover:bg-white hover:text-lanh_green">
                            Đăng nhập
                        </button>
                    </form>
                    <p className="font-bold text-lanh_green">
                        Hoặc đăng nhập bằng:
                    </p>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                        <form action={handleGithubLogin}>
                            <button className="w-full border-2 rounded-full bg-lanh_green font-bold text-white hover:bg-white hover:text-lanh_green border-lanh_green py-2 px-5">
                                Github
                            </button>
                        </form>
                        <form action={handleGithubLogin}>
                            <button className="w-full border-2 rounded-full bg-lanh_green font-bold text-white hover:bg-white hover:text-lanh_green border-lanh_green py-2 px-5">
                                Google
                            </button>
                        </form>
                        <form action={handleGithubLogin}>
                            <button className="w-full border-2 rounded-full bg-lanh_green font-bold text-white hover:bg-white hover:text-lanh_green border-lanh_green py-2 px-5">
                                Facebook
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
