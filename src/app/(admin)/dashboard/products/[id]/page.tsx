import FormProduct from "@/components/FormProduct";
import { getProductByID } from "@/lib/data";

// const getData = async (id: string) => {
//     const data = await fetch(
//         `http://${process.env.DOMAIN}/api/dashboard/products/${id}`,
//         {
//             cache: "no-store",
//         }
//     );
//     if (!data.ok) {
//         throw new Error("Something went wrong");
//     }
//     return data.json();
// };

export const metadata = {
    title: "Chỉnh sửa sản phẩm",
};

const EditProduct = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const data = await getProductByID(id);
    return <FormProduct product={JSON.parse(JSON.stringify(data))} id={id} />;
};

export default EditProduct;
