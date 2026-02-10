import { Order } from './order.model';
import { Product } from './product.model';

export interface OrderItem {
    order_item_id?: number;
    order?: Order;
    order_id?: number; // Optional flat reference
    product?: Product;
    product_id?: number; // Optional flat reference
    product_name?: string; // Optional for flat projection
    quantity: number;
    price: number;
}
