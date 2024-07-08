import DetailProduct from "@/components/DetailProduct";
import { auth } from "@/lib/auth";
import { getFeedbacks } from "@/lib/data";

// Fetch Data With AN API

const getData = async (name: string) => {
    const data = await fetch(
        `http://${process.env.DOMAIN}/api/products/${name}`,
        {
            cache: "no-store",
        }
    );
    if (!data.ok) {
        throw new Error("Something went wrong");
    }
    return data.json();
};

export const metadata = {
    title: "Sản phẩm",
};

async function ProductDetail({ params }: { params: { name: string } }) {
    const { name } = params;
    const data: Products = await getData(name);
    const session = await auth();
    const feedbacks = await getFeedbacks();
    const productsfeedbacks = JSON.parse(
        JSON.stringify(
            feedbacks.filter(
                (feedback: Feedbacks) => feedback.productId === data._id
            )
        )
    );

    const totalRating = feedbacks
        .filter((feedback: Feedbacks) => feedback.productId === data._id)
        .map((item: Feedbacks) => Number(item.rating))
        .reduce((acc, init) => acc + init, 0);

    const totalFeedbacks = feedbacks.filter(
        (feedback: Feedbacks) => feedback.productId === data._id
    ).length;

    const averageRating = totalRating / totalFeedbacks;

    console.log(averageRating);

    return (
        <DetailProduct
            data={data}
            session={session}
            feedbacks={productsfeedbacks}
            averageRating={averageRating}
        />
    );
}

export default ProductDetail;
