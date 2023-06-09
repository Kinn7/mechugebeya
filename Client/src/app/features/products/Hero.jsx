import * as React from 'react';
import { Container, Heading, Stack, HStack, Text, Button, Image } from '@chakra-ui/react';

const companiesImages = [
//  'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
  'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
  'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
  'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
  'https://images.unsplash.com/photo-1611162617263-4ec3060a058e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80'
];

const Hero = () => {
  return (
    <Container maxW="98%" p={4} color="black" backgroundColor="gray.50" mt="100px" boxShadow="lg">
      <Stack direction="column" spacing={6} alignItems="center" mt={8} mb={16}>
        <Heading as="h1" fontSize="4xl" fontWeight="bold" textAlign="center" maxW="600px">
          We're on a mission to make <br /> online shopping more accessible
        </Heading>
        <Text maxW="500px" fontSize="lg" textAlign="center" color="gray.500">
          Our mission is to facilitate supermakret purchases anywhere anytime 
        </Text>
        <HStack spacing={5}>
          <Button colorScheme="teal" variant="solid" rounded="md" size="lg">
            Get Started
          </Button>
        </HStack>
      </Stack>
      <Stack spacing={5} alignItems="center" mb={8}>
        <HStack
          spacing={{ base: 0, md: 10 }}
          justifyContent="center"
          maxW={{ base: '500px', md: '100%' }}
          flexWrap="wrap"
        >
          {companiesImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="company logo"
              w={{ base: '8rem', md: '5rem' }}
              p={{ base: 5, md: 0 }}
            />
          ))}
        </HStack>
        <Text maxW="500px" fontSize="md" textAlign="center" color="gray.500">
          Connect with us with our social media handles
        </Text>
      </Stack>
    </Container>
  );
};

export default Hero;