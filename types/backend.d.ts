interface Products {
    _id: string;
    name: string;
    salePrice: number;
    price: number;
    img: string;
    ingredient: string;
    slug: string;
}

interface News {
    _id: string;
    title: string;
    desc: string;
    img: string;
    slug: string;
    createdAt: Date;
}

interface Users {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    img: string
}