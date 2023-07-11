import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import Navbar from "../products/Navbar";
import Sidebar from "./Sidebar";
import { useOrderListQuery } from "../../api/orderApi";
import { Link } from "react-router-dom";

const data = [
  { id: 1, status: "Pending", customer: "John Doe" },
  { id: 2, status: "Completed", customer: "Jane Smith" },
  { id: 3, status: "Processing", customer: "Mike Johnson" },
];
function Orders() {
  const {
    data: orderList,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useOrderListQuery();
  const [orLists, setorLists] = useState("");

  let orderListTable;
  if (isLoading) {
    orderListTable = <Text>Loading</Text>;
  } else {
    console.log(orderList.length);
    orderListTable = (
      <Table variant="simple" colorScheme="teal" mt="1%" ml="2%">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>E-Mail</Th>
            <Th>Order Status</Th>
            <Th>Payment Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderList.map((row) => (
            <Tr key={row.id}>
              <Td>{row.id}</Td>
              <Td>{row.customer.firstName}</Td>
              <Td>{row.customer.lastName}</Td>
              <Td>{row.customer.email}</Td>
              <Td>{row.status}</Td>
              <Td>{row.payment_status}</Td>
              <Td>
                <Link to={`tasks/${row.id}`}>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    variant="outline"
                    _hover={{ bg: "teal.500", color: "white" }}
                  >
                    Dispatch
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }

  return (
    <Flex>
      <Sidebar />
      <Box p={4} flex="1">
        <Heading as="h1" mb={4}>
          Orders
        </Heading>
        {orderListTable}
      </Box>
    </Flex>
  );
}

export default Orders;
