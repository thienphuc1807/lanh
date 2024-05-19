
import DetailProduct from "@/components/DetailProduct";

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
    const data = await getData(name);
    return <DetailProduct data={data} />;
}

export default ProductDetail;
