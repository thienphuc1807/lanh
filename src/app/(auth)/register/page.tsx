import RegiterForm from "@/components/RegisterForm";

const RegisterPage = async () => {
    return (
        <div className="xl:px-0 px-6 md:flex md:justify-center">
            <div className="border-2 rounded-xl border-lanh_green my-10 p-6 shadow-xl">
                <RegiterForm />
            </div>
        </div>
    );
};

export default RegisterPage;
