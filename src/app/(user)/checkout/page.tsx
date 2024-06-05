import CheckOut from "@/components/CheckOut";


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

    console.log(data);

    return <CheckOut data={data} />;
};

export default page;
