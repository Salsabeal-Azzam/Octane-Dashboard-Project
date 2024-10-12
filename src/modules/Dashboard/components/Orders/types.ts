export enum OrderStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export type OrderData = {
  id: string;
  customerName: string;
  orderDate: Date;
  status: OrderStatus;
  totalAmount: number;
};

export type OrderDetailsResponse = {
  id: string;
  customerName: string;
  items: Array<{ itemName: string; quantity: number; price: number }>;
  shippingAddress: string;
  orderDate: Date;
  status: OrderStatus;
  totalAmount: number;
};

export type UpdateStatusResponse = {
  success: boolean;
  id: string;
  newStatus: OrderStatus;
};

export type DeleteOrderResponse = {
  success: boolean;
  id: string;
};

export type OrderTableState = {
  selectedOrder?: OrderDetailsResponse | undefined;
  orders: OrderData[];
  isModalOpen: boolean;
};
