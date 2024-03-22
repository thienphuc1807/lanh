"use client"
import { handleRegister } from "@/lib/serveraction";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
function RegiterForm() {
    const [state, formAction] = useFormState(handleRegister, undefined);
    const router = useRouter();
    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success, router]);

    return (
        <form action={formAction} className="flex flex-col gap-10">
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
            {state?.error}
            <Link href="/login">
                Have an account ? <b>Login</b>
            </Link>
        </form>
    );
}

export default RegiterForm;
