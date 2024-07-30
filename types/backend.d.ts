interface Products {
    _id: string;
    name: string;
    salePrice: number;
    price: number;
    imgs: any[];
    ingredient: string;
    quantity: number;
    inStock?: number;
    category: string;
    size: any;
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
    _id?: string;
    username?: string;
    fullName: string;
    email: string;
    isAdmin: boolean;
    password?: string;
    phoneNumber?: string;
    city?: string;
    ward?: string;
    district?: string;
    address?: string;
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
    size: string[];
}

interface PaginationControl {
    hasNextPage: boolean;
    hasPrevPage: bolean;
    dataLength: number;
}

interface Orders {
    _id: string;
    userID: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    city: string;
    district: string;
    ward: string;
    address: string;
    orders: any[];
    createdAt: date;
    status: string;
    note: string;
}

interface Feedbacks {
    _id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    fullName: string;
}
