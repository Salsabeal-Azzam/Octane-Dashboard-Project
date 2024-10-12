import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { UserData } from "./types";
import { UserManagement } from "./UserManagement";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("UserManagement component", () => {
  const mockUsers: UserData[] = [
    {
      id: "1",
      username: "user1",
      email: "user1@example.com",
      role: "Admin",
      isActive: true,
    },
    {
      id: "2",
      username: "user2",
      email: "user2@example.com",
      role: "User",
      isActive: false,
    },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    render(<UserManagement />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders user data after fetching", async () => {
    render(<UserManagement />);

    await screen.findByText("user1");
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  test("allows editing a user", async () => {
    render(<UserManagement />);

    await screen.findByText("user1");

    fireEvent.click(screen.getAllByText("Edit")[0]);

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("toggles user active status", async () => {
    render(<UserManagement />);

    await screen.findByText("user1");

    const activeSwitch = screen.getAllByRole("checkbox")[0];
    expect(activeSwitch).toBeChecked();

    fireEvent.click(activeSwitch);

    await waitFor(() =>
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        "http://localhost:3001/users/1",
        { isActive: false }
      )
    );
  });

  test("deletes a user", async () => {
    render(<UserManagement />);

    await screen.findByText("user1");

    fireEvent.click(screen.getAllByText("Delete")[0]);

    await waitFor(() =>
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        "http://localhost:3001/users/1"
      )
    );

    await waitFor(() =>
      expect(screen.queryByText("user1")).not.toBeInTheDocument()
    );
  });
});
