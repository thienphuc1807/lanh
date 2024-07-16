import OrderDetail from "@/components/OrderDetail";
import { getOrderById } from "@/lib/data";

const getData = async (productID: string) => {
    const data = await getOrderById(productID);
    return data;
};

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const data: Orders[] = await getData(id);
    return (
        <div>
            <OrderDetail orders={JSON.parse(JSON.stringify(data))} />
        </div>
    );
};

export default page;
