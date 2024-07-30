import FormUser from "@/components/FromUser";

const getData = async (id: string) => {
    const data = await fetch(
        `http://${process.env.DOMAIN}/api/dashboard/users/${id}`,
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
    title: "Chỉnh sửa thông tin tài khoản",
};

const EditProduct = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const data = await getData(id);
    return <FormUser user={data} id={id} />;
};

export default EditProduct;
