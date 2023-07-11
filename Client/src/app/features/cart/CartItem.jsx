import {
  Box,
  Image,
  Text,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../products/Navbar";
import { FaArrowRight } from "react-icons/fa";
import { cartData } from "./_data";
import { useSelector } from "react-redux";
import { cartAll, cartAllId, removeCartItem } from "./cartSlice";
import { cartAll2 } from "./cartSlice2";
import { getCartItems } from "./cartSlice";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCreateOrderMutation , useMakePaymentMutation, useVerifyPaymentQuery } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";

const OrderSummaryItem = (props) => {

  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium">{label}</Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

const QuantitySelect = (props) => {
  return (
    <Select maxW="64px" aria-label="Select quantity" {...props}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};


function CartItem() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [order,resOfOrder] = useCreateOrderMutation() 
  const [makePayment,resOfPayment] = useMakePaymentMutation()

  const [items,setItems] = useState({
    products : [

    ]
  })
  // const [order,setOrder] = useState([])
  let items2 = {
    products : [

    ]
  }

  const [cost,setTotalCost] = useState(0)
  let totalAmount = 0
  let cartSelector2 = useSelector(cartAll);
  let count = 0;
  let count2 = 0;

  let objs = []


  let products
  let pr

    products = cartSelector2.map((c, id) => {

      if(c.cart.length < 1 ){
        return 
      }



     //totalAmount += parseInt(c.cart[0].price)
     count++;

//     console.log(c.cart[0]);
     objs.push(c.cart[0]);
    //  console.log(count);
    //  console.log(totalAmount)
 
   });
   let ob = objs.filter((item, index, self) => index === self.findIndex(obj => obj.id === item.id && obj.name === item.name))

   pr = ob.map((c,id) => {
    totalAmount += parseInt(c.price)
    count2++
    return (
      <Flex
        key={id}
        direction={{
          base: "column",
          md: "row",
        }}
        justify="space-between"
        align="center"
      >
        {/* <CartProductMeta
    name={name}
    description={description}
    image={imageUrl}
    isGiftWrapping={isGiftWrapping}
  /> */}

        <Stack direction="row" spacing="5" width="full">
          <Image
            rounded="lg"
            width="120px"
            height="120px"
            fit="cover"
            src={`/images/${c.image}`}
            alt={name}
            draggable="false"
            loading="lazy"
          />
          <Box pt="4">
            <Stack spacing="0.5">
              <Text fontWeight="medium">{c.name}</Text>
              <Text fontSize="sm">item.description</Text>
            </Stack>
            {/* {isGiftWrapping && (
<HStack spacing="1" mt="3" color={mode('gray.600', 'gray.400')}>
  <Icon as={FiGift} boxSize="4" />
  <Link fontSize="sm" textDecoration="underline">
    Add gift wrapping
  </Link>
</HStack>
)} */}
          </Box>
        </Stack>

        {/* Desktop */}
        <Flex
          width="full"
          justify="space-between"
          display={{
            base: "none",
            md: "flex",
          }}
        >
          <QuantitySelect
            value={c.quantity}
            onChange={(e) => {
              // onChangeQuantity?.(+e.currentTarget.value)
            }}
          />
          {c.price} ETB
          <CloseButton aria-label={`Delete ${name} from cart`} />
        </Flex>

        {/* Mobile */}
        <Flex
          mt="4"
          align="center"
          width="full"
          justify="space-between"
          display={{
            base: "flex",
            md: "none",
          }}
        >
          <Link fontSize="sm" textDecor="underline">
            Delete
          </Link>
          <QuantitySelect
            value={c.quantity}
            onChange={(e) => {
              // onChangeQuantity?.(+e.currentTarget.value)
            }}
          />
          {c.price} item.currency
        </Flex>
      </Flex>
    );
   }) 
  

useEffect(() => {
  setTotalCost(totalAmount)
  
},[])
//  console.log(objs.filter((item, index, self) => index === self.findIndex(obj => obj.id === item.id && obj.name === item.name)))
const modifiedObjects = ob.map(obj => ({

  id : obj.id,
  quantity : 1,
  price : parseInt(obj.price)
}))
//const ol = modifiedObjects

 async function  handleCheckout(){
  console.log("checkout")
  const resp = await order(modifiedObjects)
  const payment = await makePayment(resp.data.total)
//  const pays = await pay(resp.data.orderID)
console.log(payment.data.response.tx_ref)
  window.open(payment.data.response.data.checkout_url)
  dispatch(removeCartItem())
  navigate('/')
  
  
}

//console.log(order)
  return (
    <>
      <Navbar page="cart" />
      <Box
        maxW={{
          base: "3xl",
          lg: "7xl",
        }}
        mt="5%"
        mx="auto"
        px={{
          base: "4",
          md: "8",
          lg: "12",
        }}
        py={{
          base: "6",
          md: "8",
          lg: "12",
        }}
      >
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            lg: "flex-start",
          }}
          spacing={{
            base: "8",
            md: "16",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              md: "10",
            }}
            flex="2"
          >
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart ({count2} items)
            </Heading>

            <Stack spacing="6">{pr}</Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            {/* <CartOrderSummary /> */}
            <Stack
              spacing="8"
              borderWidth="1px"
              rounded="lg"
              padding="8"
              width="full"
            >
              <Heading size="md">Order Summary</Heading>

              <Stack spacing="6">

                <Flex justify="space-between">
                  <Text fontSize="lg" fontWeight="semibold">
                    Total
                  </Text>

                  <Text fontSize="xl" fontWeight="extrabold">{cost}</Text>
                </Flex>
                
                
              </Stack>
              <Button
                colorScheme="blue"
                size="lg"
                fontSize="md"
                rightIcon={<FaArrowRight />}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Stack>
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link>Continue shopping</Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </>
  );
}
export default CartItem;
