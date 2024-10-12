import React, { useState, useEffect } from "react";
import {
  OrderData,
  OrderStatus,
  OrderDetailsResponse,
  OrderTableState,
} from "./types";
import { Button, Select } from "@mantine/core";
import axios from "axios";
import {
  Column,
  TableAction,
} from "../../../../components/ReusableTable/types";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { LoaderCmp, ReusableTable } from "../../../../components";

const API_URL = "http://localhost:3001/orders";

export const Orders = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<OrderTableState>({
    orders: [],
    isModalOpen: false,
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get<OrderData[]>(API_URL);
      setState((prev) => ({ ...prev, orders: response.data }));
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getOrderDetails = async (id: string): Promise<OrderDetailsResponse> => {
    const response = await axios.get<OrderDetailsResponse>(`${API_URL}/${id}`);
    return response.data;
  };

  const updateOrderStatus = async (id: string, newStatus: OrderStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        status: newStatus,
      });
      if (response.status === 200) {
        setState((prev) => ({
          ...prev,
          orders: prev.orders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response.status === 200) {
        setState((prev) => ({
          ...prev,
          orders: prev.orders.filter((order) => order.id !== id),
        }));
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const columns: Column<OrderData>[] = [
    { accessor: "id", header: "Order ID" },
    { accessor: "customerName", header: "Customer Name" },
    {
      accessor: "orderDate",
      header: "Order Date",
      render: (row) => new Date(row.orderDate).toLocaleDateString(),
    },
    { accessor: "status", header: "Status" },
    {
      accessor: "totalAmount",
      header: "Total Amount",
      render: (row) => `$${row.totalAmount.toFixed(2)}`,
    },
  ];

  const actions: TableAction<OrderData>[] = [
    {
      content: (row) => (
        <Button
          size="xs"
          variant="outline"
          onClick={async () => {
            const details = await getOrderDetails(row.id);
            setState((prev) => ({
              ...prev,
              selectedOrder: details,
              isModalOpen: true,
            }));
          }}
        >
          View Details
        </Button>
      ),
    },
    {
      content: (row) => (
        <Button
          size="xs"
          color="red"
          variant="outline"
          onClick={() => deleteOrder(row.id)}
        >
          Delete Order
        </Button>
      ),
    },
    {
      content: (row) => (
        <Select
          data={Object.values(OrderStatus)}
          value={row.status}
          onChange={(newStatus) => {
            if (newStatus) {
              updateOrderStatus(row.id, newStatus as OrderStatus);
            }
          }}
        />
      ),
    },
  ];

  if (loading) {
    return <LoaderCmp />;
  }
  
  return (
    <div>
      <ReusableTable<OrderData>
        data={state.orders}
        columns={columns}
        actions={actions}
      />

      <OrderDetailsModal
        order={state.selectedOrder}
        isOpen={state.isModalOpen}
        onClose={() => setState((prev) => ({ ...prev, isModalOpen: false }))}
      />
    </div>
  );
};
