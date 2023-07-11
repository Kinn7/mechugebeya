import React from "react";

import {
  Accordion,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Box,
  Text,
  Button,
  Heading,
  Center
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import Navbar from "../products/Navbar";
import { useGetAllTasksQuery } from "../../api/taskApi";

function Assistant() {
  const {data: taskList, isSuccess, isLoading, isError, error } = useGetAllTasksQuery()
  let tasks
  if(isLoading){
    tasks = "loading"
  }else{
    if(taskList.data.length === 0){
      tasks =     <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
       No Assigned Task ...
      </Heading>
      <Text color={'gray.500'}>
        No assigned Task For Now You Will See A Task List Once the Dispatcher Has Assigned A Task.
      </Text>
    </Box>
      return tasks;
    }
    tasks = (
      <AccordionPanel pb={4} mb="1%">
        {
          taskList.data[0].order.order_item.map((task) => (
            <Text mr="5%" textAlign="center" >{task.quantity} {task.product.name} </Text>
          ))
        }
      {/* <Text mr="5%" textAlign="center"> 3 Onions</Text>
      <Text mr="5%" textAlign="center"> 2 Cheese</Text> */}
    </AccordionPanel>
    )
    // console.log(tasks.data[0].order.order_item[1].quantity)
    // console.log(tasks.data[0].order.order_item[1].product.name)
  }

 // console.log(tasks.data[0].order_item[0].quantity)
//  console.log(tasks.data[0].order_item[0].product.name)

  return (
    <>
      <Navbar  page="cart" />
      <Accordion allowMultiple mt="5%" mx="10%">
      <AccordionItem>
          <h2>
            <AccordionButton _hover={{ bg: "teal.500", color: "white" }}>
              <Box as="span" flex="1" textAlign="center">
                Task 1
              </Box>      <Button backgroundColor="red.500" color="white">Dismiss</Button>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {tasks}
          {/* <AccordionPanel pb={4} mb="1%">
            <Text mr="5%" textAlign="center"> 3 Onions</Text>
            <Text mr="5%" textAlign="center"> 2 Cheese</Text>
          </AccordionPanel> */}
        </AccordionItem>
        {/* <AccordionItem>
          <h2>
            <AccordionButton _hover={{ bg: "teal.500", color: "white" }}>
              <Box as="span" flex="1" textAlign="center">
                Task 1
              </Box>      <Button backgroundColor="red.500" color="white">Dismiss</Button>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} mb="1%">
            <Text textAlign="center"> 3 Onions</Text>
            <Text textAlign="center"> 2 Cheese</Text>
          </AccordionPanel>
        </AccordionItem> */}

      </Accordion>

    </>
  );
}

export default Assistant;
