import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import Navbar from "../products/Navbar";

const data = [
    { id: 1, status: "Pending", customer: "John Doe" },
    { id: 2, status: "Completed", customer: "Jane Smith" },
    { id: 3, status: "Processing", customer: "Mike Johnson" },
  ];
function Dispatcher(){
    return (
      <>

        <Table variant="simple" colorScheme="teal" mt="7%" ml="2%">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Status</Th>
              <Th>Customer</Th>
              <Th>Dispatch</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => (
              <Tr key={row.id}>
                <Td>{row.id}</Td>
                <Td>{row.status}</Td>
                <Td>{row.customer}</Td>
                <Td>
                  <Button  colorScheme="teal"
                size="sm"
                variant="outline"
                _hover={{ bg: "teal.500", color: "white" }}>
                    Dispatch
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        </>
      );
}

export default Dispatcher

