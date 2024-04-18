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
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    img: string;
}

interface Input {
    id: number;
    type: string;
    label: string;
    name: string;
    errorMess?: string;
    placeholder?: string;
    required?: boolean;
    min?: string;
    accept?: string;
}

interface Values {
    name: string;
    ingredient: string;
    price: string;
    salePrice: string;
    images: File[];
}

interface PaginationControl {
    hasNextPage: boolean;
    hasPrevPage: bolean;
    dataLength: number;
}
