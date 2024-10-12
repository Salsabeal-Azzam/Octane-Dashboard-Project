import React, { useState, useEffect } from "react";
import { Button, Switch, Text } from "@mantine/core";
import axios from "axios";
import { UserData } from "./types";
import { LoaderCmp, ReusableTable } from "../../../../components";
import { EditUserModal } from "./EditUserModal";
import {
  Column,
  TableAction,
} from "../../../../components/ReusableTable/types";

const API_URL = "http://localhost:3001/users";

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<UserData[]>(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (userId: string) => {
    setEditUserId(userId);
    setIsModalOpen(true);
  };

  const handleSaveUser = (updatedUser: UserData) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsModalOpen(false);
  };

  const toggleActiveStatus = (id: string) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updatedUsers);

    axios.patch(`${API_URL}/${id}`, {
      isActive: !users.find((user) => user.id === id)?.isActive,
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    axios.delete(`${API_URL}/${id}`);
  };

  const columns: Column<UserData>[] = [
    { header: "User ID", accessor: "id" },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    {
      header: "Role",
      accessor: "role",
      render: (user) => <Text>{user.role}</Text>,
    },
    {
      header: "Active Status",
      accessor: "isActive",
      render: (user) => (
        <Switch
          checked={user.isActive}
          onChange={() => toggleActiveStatus(user.id)}
        />
      ),
    },
  ];

  const actions: TableAction<UserData>[] = [
    {
      content: (row) => (
        <Button variant="outline" onClick={() => handleEditUser(row.id)}>
          Edit
        </Button>
      ),
    },
    {
      content: (row) => (
        <Button
          variant="outline"
          onClick={() => handleDeleteUser(row.id)}
          color="red"
        >
          Delete
        </Button>
      ),
    },
  ];

  if (loading) {
    return <LoaderCmp />;
  }

  return (
    <>
      <ReusableTable<UserData>
        data={users}
        columns={columns}
        actions={actions}
      />

      {editUserId && (
        <EditUserModal
          userId={editUserId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </>
  );
};
