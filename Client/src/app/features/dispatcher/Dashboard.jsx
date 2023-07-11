import React from "react";
import {
  Button,
  Box,
  Flex,
  Text,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Icon,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiHome,
  FiUsers,
  FiShoppingCart,
  FiActivity,
  FiBell,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import Sidebar from "./Sidebar";
import {
  useGetNumberOfCustomersQuery,
  useGetNumberOfOrdersQuery,
  useGetNumberOfProductsQuery
} from "../../api/taskApi";

function Dashboard() {
  
  const { data: noOfCustomer, isLoading: isLoadingCustomer} = useGetNumberOfCustomersQuery();
  const { data: noOfOrder, isLoading: isLoadingOrder} = useGetNumberOfOrdersQuery();
  const { data: noOfProduct, isLoading: isLoadingProduct} = useGetNumberOfProductsQuery();

  return (
    <Flex>
      <Sidebar />

      <Box p={4} flex="1">
        <Heading as="h1" mb={4}>
          Dashboard
        </Heading>

        <Flex justifyContent="space-between" mb={4}>
          <Box p={4} bg="gray.200" borderRadius="md" flex="1" mr={2}>
            <Stat>
              <StatLabel>Users</StatLabel>
              <StatNumber>{isLoadingCustomer ? <Text>Loading</Text> : noOfCustomer.msg}</StatNumber>
            </Stat>
          </Box>

          <Box p={4} bg="gray.200" borderRadius="md" flex="1" ml={2}>
            <Stat>
              <StatLabel>Orders</StatLabel>
              <StatNumber>{isLoadingOrder ? <Text>Loading</Text> : noOfOrder.msg}</StatNumber>
            </Stat>
          </Box>

          <Box p={4} bg="gray.200" borderRadius="md" flex="1" ml={2}>
            <Stat>
              <StatLabel>Products</StatLabel>
              <StatNumber>{isLoadingProduct ? <Text>Loading</Text> : noOfProduct.msg}</StatNumber>
            </Stat>
          </Box>
        </Flex>

        <Stack spacing={4}>
          <Box p={4} bg="gray.200" borderRadius="md">
            <Text fontWeight="bold">Recent Activity</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Box>

          <Box p={4} bg="gray.200" borderRadius="md">
            <Text fontWeight="bold">Notifications</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Dashboard;
