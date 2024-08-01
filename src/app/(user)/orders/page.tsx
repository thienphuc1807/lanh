import Orders from "@/components/Orders";
import { auth } from "@/lib/auth";
import { getOrdersByUserID } from "@/lib/data";

const OrdersPage = async () => {
    const session = await auth();
    const id = session ? session?.user?.id : "";
    var orders;
    if (id) {
        orders = await getOrdersByUserID(id);
    }
    const userOrders = JSON.parse(JSON.stringify(orders));
    return <Orders orders={userOrders.reverse()} />;
};

export default OrdersPage;
