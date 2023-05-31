import {
    Container,
    Box,
    Avatar,
    Button,
    HStack,
    VStack,
    Image,
    Input,
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Link,
    MenuDivider,
    useColorModeValue
  } from '@chakra-ui/react';



  const IconButton = ({ children }) => {
    return (
      <Button
        padding="0.4rem"
        width="auto"
        height="auto"
        borderRadius="100%"
        bg="transparent"
        _hover={{ bg: '#f6f6f6' }}

      >
        {children}
      </Button>
    );
  };
  
 const Navbar = () => {
    return (
      <Box
      
        py="5"
        boxShadow="md"
        border="0 solid #e5e7eb"
        position="fixed"
        top="0"
        bg={useColorModeValue('gray.50', 'gray.700')}
        width="100%"
        zIndex="1"
      >
        <Container maxW="1280px" px={4} mx="auto" >
          <HStack spacing={4}>
            {/* <Image
              alt="dev logo"
              w={'auto'}
              h={12}
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            /> */}
            <Input
              maxW="56rem"
              placeholder="Search..."
              borderColor={useColorModeValue('gray.500', 'black')}
              borderRadius="5px"
              d={{ base: 'none', md: 'block' }}
            />
            <Spacer />
            <HStack spacing={3}>
              {/* <Button color="#fff" rounded="md" bg="#3b49df" _hover={{ bg: '#323ebe' }}>
                Create a post
              </Button> */}
              <IconButton>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="shopping-cart"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 3c0 .55.45 1 1 1h1l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.67-1.43c-.16-.35-.52-.57-.9-.57H2c-.55 0-1 .45-1 1zm16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
              </IconButton>
              <Menu isLazy>
                <MenuButton as={Button} size="sm" pl={0} py={0} rounded="full">
                  <Avatar size="md" src={'https://avatars2.githubusercontent.com/u/37842853?v=4'} />
                </MenuButton>
                <MenuList
                  zIndex={5}
                  border="2px solid"
                  borderColor={useColorModeValue('gray.700', 'gray.100')}
                  boxShadow="0px 0px 0"
                >
                  <Link href="https://dev.to/m_ahmad" _hover={{ textDecoration: 'none' }} isExternal>
                    <MenuItem>
                      <VStack justify="start" alignItems="left">
                        <Text fontWeight="500">Muhammad Ahmad</Text>
                        <Text size="sm" color="gray.500" mt="0 !important">
                          @m_ahmad
                        </Text>
                      </VStack>
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem>
                    <Text fontWeight="500">Dashboard</Text>
                  </MenuItem>
                  <MenuItem>
                    <Text fontWeight="500">Create Post</Text>
                  </MenuItem>
                  <MenuItem>
                    <Text fontWeight="500">Reading List</Text>
                  </MenuItem>
                  <MenuItem>
                    <Text fontWeight="500">Settings</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Text fontWeight="500">Sign Out</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
        </Container>
      </Box>
    );
  };
  
  export default Navbar