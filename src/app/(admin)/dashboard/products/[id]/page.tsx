import FormProduct from "@/components/FormProduct";
import { Products } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

const getData = async (id: string) => {
    const data = await fetch(
        `http://${process.env.DOMAIN}/api/dashboard/products/${id}`,
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
    title: "Chỉnh sửa sản phẩm",
};

const EditProduct = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const data = await getData(id);
    return <FormProduct product={data} id={id} />;
};

export default EditProduct;
