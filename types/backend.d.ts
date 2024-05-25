interface Products {
    _id: string;
    name: string;
    salePrice: number;
    price: number;
    imgs: any[];
    ingredient: string;
    quantity: number;
    inStock: number;
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
    pattern?: string;
}

interface Values {
    name: string;
    ingredient: string;
    price: Number;
    salePrice: Number;
    imgs: File[];
    quantity: Number;
    inStock: Number;
}

interface PaginationControl {
    hasNextPage: boolean;
    hasPrevPage: bolean;
    dataLength: number;
}
