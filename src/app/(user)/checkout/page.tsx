import CheckOut from "@/components/CheckOut";
import { auth } from "@/lib/auth";

const page = async () => {
    const getData = async () => {
        const res = await fetch(
            "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        return res.json();
    };
    const data = await getData();
    const session = await auth();
    return <CheckOut data={data} session={session} />;
};

export default page;
