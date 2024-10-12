import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextInput,
  Select,
  Switch,
  Group,
  Text,
  Loader,
  Flex,
} from "@mantine/core";
import axios from "axios";
import { UserData } from "../types";

interface EditUserModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: UserData) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  userId,
  isOpen,
  onClose,
  onSave,
}) => {
  const [userDetails, setUserDetails] = useState<UserData>({
    id: "",
    username: "",
    email: "",
    role: "User",
    isActive: true,          
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/users/${userId}`)
        .then((response) => {
          setUserDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user details:", error);
          setLoading(false);
        });
    }
  }, [userId]);

  const handleSave = async () => {
    if (userDetails) {
      setSaving(true);
      try {
        await axios.patch(
          `http://localhost:3001/users/${userDetails.id}`,
          userDetails
        );
        onSave(userDetails);
      } catch (error) {
        console.error("Failed to update user details:", error);
      } finally {
        setSaving(false);
        onClose();
      }
    }
  };

  if (loading || !userDetails) {
    return (
      <Modal
        opened={isOpen}
        onClose={onClose}
        title="Edit User Details"
        centered
      >
        <Flex justify="center" align="center">
          <Loader size="lg" variant="bars" />
        </Flex>
        <Text align="center" mt="md">
          Loading user details...
        </Text>
      </Modal>
    );
  }

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Text size="xl" weight={500} align="center">
          Edit User Details
        </Text>
      }
      size="lg"
      centered
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label="User ID"
          value={userDetails.id}
          disabled
          mb="md"
        />
        <TextInput
          label="Username"
          value={userDetails?.username || ""}
          onChange={(e) =>{
            setUserDetails((prev) => ({
              ...prev,
              username: e?.target?.value,
            }))}
          }
          mb="md"
        />
        <TextInput
          label="Email"
          value={userDetails?.email || ""}
          onChange={(e) =>
            setUserDetails((prev) => ({
              ...prev,
              email: e?.target?.value,
            }))
          }
          mb="md"
        />
        <Select
          label="Role"
          value={userDetails.role}
          data={["Admin", "User", "Guest"]}
          onChange={(value) =>
            setUserDetails((prev) => ({
              ...prev,
              role: value as "Admin" | "User" | "Guest",
            }))
          }
          mb="md"
        />
        <Switch
          label={userDetails.isActive ? "Active" : "Inactive"}
          checked={userDetails.isActive}
          onChange={() =>
            setUserDetails((prev) => ({ ...prev, isActive: !prev?.isActive }))
          }
          mb="sm"
        />
        <Group position="apart" style={{ marginTop: 20 }}>
          <Button variant="outline" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="blue"
            loading={saving}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
