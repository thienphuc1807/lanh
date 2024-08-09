import DetailProduct from "@/components/DetailProduct";
import { auth } from "@/lib/auth";
import { getFeedbacks, getUser, getProducts } from "@/lib/data";

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

    const products = await getProducts();

    const relatedProducts = JSON.parse(
        JSON.stringify(
            products.filter((item: Products) => item.category === data.category)
        )
    );
    const user = session?.user?.id ? await getUser(session?.user?.id) : "";

    return (
        <DetailProduct
            data={data}
            session={session}
            user={JSON.parse(JSON.stringify(user))}
            feedbacks={productsfeedbacks.reverse()}
            averageRating={averageRating}
            relatedProducts={relatedProducts}
        />
    );
}

export default ProductDetail;
