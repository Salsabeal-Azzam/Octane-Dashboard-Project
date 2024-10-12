import React from "react";
import {
  Modal,
  Card,
  Text,
  Group,
  Button,
  Divider,
  Table,
  Badge,
} from "@mantine/core";
import {
  OrderDetailsResponse,
  OrderStatus,
} from "../types";

interface OrderDetailsModalProps {
  order: OrderDetailsResponse | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  const renderColor = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return "yellow";
      case "Delivered":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "blue";
    }
  };
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size="lg"
      padding="lg"
      centered
      radius="md"
      withCloseButton={false} 
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{
          backgroundColor: "#f5f5f5",
          marginBottom: "20px",
        }}
      >
        <Group position="apart">
          <Text weight={700} size="xl" color="blue">
            Order ID: {order.id}
          </Text>
          <Badge size="lg" variant="filled" color={renderColor(order.status)}>
            {order.status}
          </Badge>
        </Group>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" mb="md">
        <Text weight={600} size="lg" mb="md">
          Customer Details
        </Text>
        <Group position="apart">
          <div>
            <Text weight={500}>Customer Name</Text>
            <Text>{order.customerName}</Text>
          </div>
          <div>
            <Text weight={500}>Order Date</Text>
            <Text>{new Date(order.orderDate).toLocaleDateString()}</Text>
          </div>
        </Group>
        <Divider my="md" />
        <Text weight={500}>Shipping Address</Text>
        <Text>{order.shippingAddress}</Text>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" mb="md">
        <Text weight={600} size="lg" mb="md">
          Order Items
        </Text>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Group position="right">
        <Text weight={700} size="lg">
          Total Amount: ${order.totalAmount.toFixed(2)}
        </Text>
      </Group>

      <Divider my="md" />
      <Group position="right">
        <Button variant="light" onClick={onClose} color="gray">
          Close
        </Button>
        <Button
          variant="filled"
          onClick={() => alert("Updating order")}
          color="blue"
        >
          Update Order
        </Button>
      </Group>
    </Modal>
  );
};

