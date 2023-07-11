import React from 'react';
import {
  Button,
  Box,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import { FiHome, FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate()

  return (
    <Box
      bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
      w="64"
      minH="100vh"
      borderRight="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={4}
    >
      <VStack spacing={4} align="stretch">

        <Button
          mt="25%"
          variant="ghost"
          leftIcon={<FiHome />}
          onClick={() => {navigate('/dashboard')}}
        >
          Home
        </Button>

        <Button
          variant="ghost"
          leftIcon={<FiShoppingCart />}
          onClick={() => {navigate('/orders')}}
        >
          Orders
        </Button>
      
       

      </VStack>
    </Box>
  );
}