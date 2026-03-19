export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  images: string[];
  specifications: {
    ram: string;
    storage: string;
    display: string;
    camera: string;
    battery: string;
  };
  stock: number;
  category: string;
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
    name: string;
  }>;
  total: number;
  status: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

// NextAuth extended types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}