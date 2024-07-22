import Orders from "@/components/Orders";
import { auth } from "@/lib/auth";
import { getOrdersByUserEmail } from "@/lib/data";

const OrdersPage = async () => {
    const session = await auth();
    const email = session ? session?.user?.email : "";
    var orders;
    if (email) {
        orders = await getOrdersByUserEmail(email);
    }
    const userOrders = JSON.parse(JSON.stringify(orders));
    return <Orders orders={userOrders.reverse()} />;
};

export default OrdersPage;
