import { Tabs, Image, Title, Flex, Box } from "@mantine/core";
import { FC } from "react";
import { FileIcon } from "../../assets";
import { Orders, UserManagement } from "./components";
import classes from "./Dashboard.module.css";
import { useMediaQuery } from "@mantine/hooks";

export const Dashboard: FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box mt="md" py="lg">
      <Flex align="center" pb="1rem">
        <Image
          maw={240}
          mx="xs"
          width="25"
          height="25"
          radius="md"
          src={FileIcon}
          alt="file image"
        />
        <Title order={3}>Dashboard</Title>
      </Flex>
      <Box py="md" bg="#fff">
        <Tabs
          classNames={{ tab: classes.tab, panel: classes.panel }}
          defaultValue="orders"
          orientation={isMobile ? "horizontal" : "vertical"}
        >
          <Tabs.List>
            <Tabs.Tab value="orders">Orders</Tabs.Tab>
            <Tabs.Tab value="UserManagement">User Management</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="orders">
            <Orders />
          </Tabs.Panel>
          <Tabs.Panel value="UserManagement">
            <UserManagement />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Box>
  );
};
