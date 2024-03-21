import NavBar from "./navbar/Navbar";
import { auth } from "@/lib/auth";

export default async function Header() {
    const session = await auth();
    return (
        <div className="relative z-10 bg-lanhHeader w-full bg-[length:100%_100%] sm:bg-cotain xl:h-[250px] lg:h-[220px] md:h-[130px] h-[80px] bg-no-repeat">
            <div className="lg:container lg:mx-auto xl:px-0 lg:px-6">
                <NavBar session={session} />
            </div>
        </div>
    );
}
