import Image from "next/image";

const Introduction = () => {
    return (
        <div className="bg-lanhBackground bg-cover bg-lanh_green my-5">
            <div className="container mx-auto px-5 flex lg:flex-row flex-col items-center py-5">
                <div className="relative flex-1">
                    <Image
                        src={"/productImg5.png"}
                        alt="productimg"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="flex flex-col justify-center flex-1">
                    <h2 className="text-5xl text-[#4c4c4c] py-5">
                        Sứ mệnh của chúng tôi
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
