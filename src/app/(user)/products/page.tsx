import UserProducts from "@/components/UserProducts";
import { getFeedbacks } from "@/lib/data";

export const metadata = {
    title: "Sản phẩm",
};

const getData = async () => {
    const timestamp = new Date().getTime();
    const res = await fetch(
        `http://${process.env.DOMAIN}/api/products?timestamp=${timestamp}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Something went wrong");
    }

    return res.json();
};

const Products = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    // Fetch Data with API
    const data = await getData();
    const feedbacks = await getFeedbacks();
    const userFeedbacks = JSON.parse(JSON.stringify(feedbacks));
    return (
        <div className="container mx-auto md:px-5 px-2">
            <UserProducts
                data={data}
                searchParams={searchParams}
                feedbacks={userFeedbacks}
            />
        </div>
    );
};

export default Products;
