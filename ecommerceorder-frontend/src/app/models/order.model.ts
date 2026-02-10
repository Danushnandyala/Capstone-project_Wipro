import { User } from './user.model';
import { Product } from './product.model';

export interface Order {
    order_id?: number;
    user: User;
    status: string;
    orderDate?: string;
}

export interface OrderItem {
    order_item_id?: number;
    order: Order;
    product: Product;
    quantity: number;
    price: number;
}
