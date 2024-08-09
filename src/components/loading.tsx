import Image from "next/image";

function Loading() {
    return (
        <div className="min-h-screen flex justify-center items-center gap-2">
            <Image
                src={"/defaultImg.png"}
                alt="LanhLogo"
                width={100}
                height={100}
            />
            <div className="loader"></div>
        </div>
    );
}

export default Loading;
