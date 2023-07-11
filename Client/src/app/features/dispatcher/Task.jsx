import {useState} from "react";
import { Select, Flex, Box, Heading, Button } from "@chakra-ui/react";
import { useCreateTaskMutation, useGetAssistantsQuery } from "../../api/taskApi";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";

const Task = () => {

  const params = useParams()
  const orderIdParam = params.orderId.toString()



  const [assistantId,setAssistantId] = useState()

  let assistantName

  const {
    data: assistant,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetAssistantsQuery();
  //  const [order,resOfOrder] = useCreateOrderMutation() 
  const [task,resOfTask] = useCreateTaskMutation()

  let assistantList;
  if (isLoading) {
    assistantList = "Loading";
  } else {
    //assistantName = assistant[0].id
    assistantList = (
      <Heading >
      <Select onChange={handleChange}>
        {assistant.map((a, id) => (
          <option key={id} value={a.id}  >
           {a.firstName}
          </option>
        ))}
        {/* <option value={assistant[0].id}>{assistant[0].firstName}</option> */}
      </Select>
      </Heading>
    );
  }

  function handleChange(e){

    assistantName = e.target.value
    setAssistantId(assistantName)
    console.log(assistantName)
  
  }
 
  async function handleAssignTask(){
  //   console.log(orderIdParam)
    console.log("Cicked")

//console.log(assistantName)
    console.log(assistantId,orderIdParam)
    const assignTask = await task({assistantId,orderIdParam})
    console.log(assignTask)
   // await task(assistantId,orderIdParam)

  }
  return (
    <Flex>
      <Sidebar />
      <Box p={4} flex="1">
        <Heading as="h1" mb={4}>
          Select Assistant
        </Heading>
        {assistantList}
        <Button
          onClick={handleAssignTask}
          colorScheme="teal"
          size="sm"
          variant="outline"
          _hover={{ bg: "teal.500", color: "white" }}
          width={"100%"}
        >
          Assign Task
        </Button>
        {/* <Select>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select> */}
      </Box>
    </Flex>
  );
};

export default Task;
