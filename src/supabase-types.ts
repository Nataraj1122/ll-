export interface CategoryTable {
  id: string;
  name: string;
  image_url: string;
  created_at?: string;
}

export interface ProductTable {
  id: string;
  name: string;
  price: number;
  category_id: string;
  category: string;
  image_url: string;
  description: string;
  stock_quantity: number;
  sizes: string[];
  is_trending: boolean;
  is_new_arrival: boolean;
  is_active: boolean;
  product_code?: string;
  created_at: string;
}

export interface CartTable {
  id: string;
  user_id: string;
  cart_item_id: string;
  product_id: string;
  name: string;
  price: number;
  image_url: string;
  size: string;
  quantity: number;
  created_at?: string;
}

export interface WishlistTable {
  id: string;
  user_id: string;
  product_id: string;
  created_at?: string;
  products?: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

export interface ProfileTable {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  avatar_url: string;
  created_at: string;
}

export interface OrderTable {
  id: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  phone_number: string;
  shipping_address: string;
  zip_code: string;
  payment_method: string;
  total_price: number;
  status: string;
  items: any[]; // Or define OrderItemTable
  created_at: string;
  cancelled_at?: string;
  cancelled_by?: string;
  cancellation_reason?: string;
}
