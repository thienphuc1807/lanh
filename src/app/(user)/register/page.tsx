import RegiterForm from "@/components/RegisterForm";
import Image from "next/image";

const RegisterPage = async () => {
    return (
        <div className="md:flex md:justify-center">
            <div className="border-2 bg-white md:my-10 my-4 shadow-xl lg:min-w-[1000px]">
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <RegiterForm />
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
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
