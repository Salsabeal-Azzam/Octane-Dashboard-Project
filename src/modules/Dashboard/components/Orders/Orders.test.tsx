// Orders.test.tsx

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { Orders } from "./Orders"; // Adjust the import based on your file structure

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Orders Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("fetches and displays orders", async () => {
    // Arrange: Set up the mock response
    const ordersResponse = [
      { id: "1", customerName: "John Doe", orderDate: "2024-10-01", status: "Pending", totalAmount: 100.0 },
      { id: "2", customerName: "Jane Smith", orderDate: "2024-10-02", status: "Shipped", totalAmount: 150.0 },
    ];
    
    mockedAxios.get.mockResolvedValueOnce({ data: ordersResponse });

    // Act: Render the Orders component
    render(<Orders />);

    // Assert: Check that the orders are displayed
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  test("updates order status", async () => {
    const ordersResponse = [
      { id: "1", customerName: "John Doe", orderDate: "2024-10-01", status: "Pending", totalAmount: 100.0 },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: ordersResponse });
    mockedAxios.patch.mockResolvedValueOnce({ status: 200 });

    render(<Orders />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const select = screen.getByRole("combobox"); // Adjust based on your component's Select implementation
    fireEvent.change(select, { target: { value: "Shipped" } });

    // Check if the patch request was made
    expect(mockedAxios.patch).toHaveBeenCalledWith("http://localhost:3001/orders/1", {
      status: "Shipped",
    });
  });

  test("deletes an order", async () => {
    const ordersResponse = [
      { id: "1", customerName: "John Doe", orderDate: "2024-10-01", status: "Pending", totalAmount: 100.0 },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: ordersResponse });
    mockedAxios.delete.mockResolvedValueOnce({ status: 200 });

    render(<Orders />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const deleteButton = screen.getByText("Delete Order"); // Adjust based on your button text
    fireEvent.click(deleteButton);

    // Check if the delete request was made
    expect(mockedAxios.delete).toHaveBeenCalledWith("http://localhost:3001/orders/1");
  });
});
