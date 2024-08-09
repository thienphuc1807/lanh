import DashBoard from "@/components/DashBoard";
import { getOrders, getProducts, getUsers } from "@/lib/data";

const Dashboard = async () => {
    const [users, products, orders] = await Promise.all([
        getUsers(),
        getProducts(),
        getOrders(),
    ]);
    return (
        <div className="md:p-5">
            <DashBoard
                users={JSON.parse(JSON.stringify(users))}
                products={JSON.parse(JSON.stringify(products))}
                orders={JSON.parse(JSON.stringify(orders.reverse()))}
            />
        </div>
    );
};

export default Dashboard;
