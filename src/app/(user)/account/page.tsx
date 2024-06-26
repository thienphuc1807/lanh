import UserAccount from "@/components/UserAccount";
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/data";

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

    const id = session ? session?.user?.id : "";

    var sampleUser = "";
    if (id) {
        sampleUser = await getUser(id);
    }

    const user = JSON.parse(JSON.stringify(sampleUser));
    return <UserAccount data={data} user={user} />;
};

export default page;
