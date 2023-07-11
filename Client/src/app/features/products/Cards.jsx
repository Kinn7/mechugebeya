/* eslint-disable react/prop-types */
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
// import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { productsAll } from "./productsSlice";
import { productsAll2 } from "./productsSlice2";
import { cartAllId, getProductId, getCartItems, cartAll } from "../cart/cartSlice";
import { getCartItems2 } from "../cart/cartSlice2";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../cart/CartItem";
import { useState } from "react";
import {
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery
} from "../../api/productApi";
import { useEffect } from "react";

let num = 0

const data = {
  isNew: false,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};


function ListProducts({ products, isloading, isuccess, error}) {
 
  const dispatch = useDispatch()
  const [changeItem,setChangedItem] = useState(0)
  
  function handleCart(productId){
    num = productId
    setChangedItem(productId)
   // console.log(changeItem)
    console.log("cart clicked")
      dispatch(getProductId({
        cartId : productId
      }))  
  }

  if (isloading) {
    return <Text>Loading</Text>;
  } else if (isuccess) {
    return products.map((product, id) => {

      return (
        <Flex
          p={50}
          w="full"
          alignItems="center"
          justifyContent="center"
          key={id}
        >
          <Box
            // bg={useColorModeValue("white", "gray.800")}
            maxW="sm"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative"
          >
            {data.isNew && (
              <Circle
                size="10px"
                position="absolute"
                top={2}
                right={2}
                bg="red.200"
              />
            )}

<Link to={`product_details/${product.id}`}>
            <Image
              src={`/images/${product.image}`}
              alt={`Picture of ${product.name}`}
              roundedTop="lg"
              objectFit="cover"
              boxSize="100%"
              height="250px"
              width="350px"
            />
            </Link >

            <Box p="6">
              <Box d="flex" alignItems="baseline">
                {data.isNew && (
                  <Badge
                    rounded="full"
                    px="2"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    New
                  </Badge>
                )}
              </Box>
              <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="lg"
                  fontWeight="semibold"
                  as="h3"
                  lineHeight="tight"
                  isTruncated
                >
                  {product.name}
                </Box>
                <Box >
                <Tooltip
                
                  label="Add to cart"
                  bg="white"
                  placement={"top"}
                  color={"gray.800"}
                  fontSize={"1.2em"}
                >
                  <chakra.a   display={"flex"}>
                    <Icon
                    
                      onClick={() => {handleCart(product.id)}}
                      as={FiShoppingCart}
                      h={7}
                      w={7}
                      alignSelf={"center"}
                    />
                  </chakra.a>
                </Tooltip>
                </Box>
              </Flex>

              <Flex justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="2xl"
                  //   color={useColorModeValue("gray.800", "white")}
                >
                  <Box as="span" color={"gray.600"} fontSize="lg">
                    ETB
                  </Box>
                  &nbsp;{product.price}
                  {/* {//data.price.toFixed(2)} */}
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      );
    });
  } else {
    console.log(error);
    return null;
  }
}


function Cards() {
  const [selectItem,setSelectItems] = useState({
    id : 0,
    name : "",
    price : "",
    expiry_date : "",
    quantity : "",
    image : ""
  })
  

  let categorySelector = useSelector(productsAll);
  let searchSelector = useSelector(productsAll2);
  let productIdSelector = useSelector(cartAllId).cartId
  let cartSelector = useSelector(cartAll)
  const dispatch = useDispatch()
  

  let { data: productName, isLoading: isLoadingProductId, isSuccess:isSuccessProductId } = useGetProductByIdQuery( productIdSelector || 120)

  useEffect(() => {
    if (isLoadingProductId) {
      console.log("loading");
    } else if(isSuccessProductId){
      setSelectItems(productName);
      dispatch(getCartItems({
        cart : productName
      }))
      //console.log(productName)
      //console.log(productName)

    }
  }, [isLoadingProductId, productName]);


  let {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsByCategoryQuery(
    categorySelector.id ? categorySelector.id : 2
  ); //== 0 ? 1 : categoryId)
//console.log(categorySelector)
  let {
    data: products2,
    isLoading: isLoading2,
    isError: isErrorProduct,
    error: error2,
  } = useSearchProductsQuery(searchSelector.id);
  if (isLoading2) {
    products2 = [];
  }
  let p
  if(products2.length === 0){
    p = products
  }else {
    p = products2
  }
  



// dispatch(getCartItems({
//   cart : selectItem
// }))



  return (
    <>
      <HStack w="70%" top="50%" position="absolute" ml="25%" spacing="1px">
        <SimpleGrid columns={[2, null, 4]}>
          <ListProducts
            products={p}//products2.length === 0 ? products : products2
            isloading={isLoading}
            isuccess={isSuccess}
            error={error}
          />
        </SimpleGrid>
      </HStack>
    </>
  );
}

export default Cards;
