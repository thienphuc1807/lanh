import { handleRegister } from "@/lib/serveraction";

const RegisterPage = async () => {
    return (
        <div className="xl:px-0 px-6 md:flex md:justify-center">
            <div className="border-2 rounded-xl border-lanh_green my-10 p-6 shadow-xl">
                <form action={handleRegister} className="flex flex-col gap-10">
                    <input
                        className="border-2 border-lanh_green rounded-full py-2 px-5"
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                    <input
                        className="border-2 border-lanh_green rounded-full py-2 px-5"
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                    <input
                        className="border-2 border-lanh_green rounded-full py-2 px-5"
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <input
                        className="border-2 border-lanh_green rounded-full py-2 px-5"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                    />
                    <button className="bg-lanh_green text-white py-2 px-5 rounded-full">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
