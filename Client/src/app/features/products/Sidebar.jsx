import { Box, Card, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { FaHome, FaUsers, FaCog } from "react-icons/fa";
import { useGetCategoryQuery,useGetProductsByCategoryQuery } from "../../api/productApi";
import { useDispatch } from "react-redux";
import { getCategoryId } from "./productsSlice";

export default function Sidebar() {

  const dispatch = useDispatch()

  function handleClick(arg){
    dispatch(getCategoryId({
      id : arg
    }))
  }

  const { data: categories, isLoading, isSuccess, isError, error} = useGetCategoryQuery()
  let listCategory;
  if(isLoading){
    listCategory = <Text>Loading</Text>
  }else if(isSuccess){
    listCategory = categories.map((category,id) => {
      return (
        <Box  onClick={() => {handleClick(category.id ? category.id : 0)}} key={id} py="0" _hover={{ bg: "gray.200" }} borderRadius="md">
        <Flex align="center">
          <Text ml="2" >{category.name}</Text>
        </Flex>
      </Box>
      )
    })
  }

  return (
    <>
    <Box h="50vh" w="200px" bg="gray.100" ml={10} mt={70} mb={150} mr={50} position="sticky" top="20%" zIndex={1} overflow="auto">
      <Flex align="center" h="50px" px="4">
        <Text fontSize="lg" fontWeight="bold">
          Categories
        </Text>
        <Spacer />
      </Flex>
      <VStack spacing="4" align="stretch" mt="4" px="4">
        <Box py="2" bg="gray.200" borderRadius="md">
          <Text fontSize="md" fontWeight="semibold">
            Navigation
          </Text>
        </Box>

        {listCategory}


{/* 

        <Box py="0" _hover={{ bg: "gray.200" }} borderRadius="md">
          <Flex align="center">
            <FaUsers />
            <Text ml="2">Users</Text>
          </Flex>
        </Box>
        <Box py="0" _hover={{ bg: "gray.200" }} borderRadius="md">
          <Flex align="center">
            <FaCog />
            <Text ml="2">Settings</Text>
          </Flex>
        </Box> */}
      </VStack>
    </Box>

</>
  );
}
