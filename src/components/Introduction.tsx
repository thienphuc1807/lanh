"use client";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const dancingScript = Dancing_Script({
    weight: "700",
    subsets: ["vietnamese"],
    display: "swap",
});

const Introduction = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="bg-lanhBackground bg-cover bg-lanh_green my-5">
            <div
                className="container mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 py-5 xl:space-x-10 xl:min-h-[600px]"
                data-aos="fade-down"
            >
                <div className="relative lg:block hidden">
                    <Image src={"/productImg5.png"} alt="productimg" fill />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className={dancingScript.className}>
                        <p className="md:text-6xl text-4xl font-bold text-[#4c4c4c] py-5 lg:w-2/3">
                            Sứ mệnh của chúng tôi
                        </p>
                    </h2>
                    <p className="text-white text-justify py-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestiae consectetur adipisci corrupti tempora laborum
                        quam ipsa inventore pariatur sed tenetur repudiandae
                        nemo natus error, optio similique. Voluptate nisi quasi
                        tempore. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Molestiae consectetur adipisci
                        corrupti tempora laborum quam ipsa inventore pariatur
                        sed tenetur repudiandae nemo natus error, optio
                        similique. Voluptate nisi quasi tempore.
                    </p>
                    <div className="py-5">
                        <button className="px-8 text-sm py-4 rounded-full text-white bg-[#7ea31c]">
                            XEM THÊM
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
