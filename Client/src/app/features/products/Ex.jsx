import { useGetProductsQuery } from "../../api/productApi";
import { useState } from "react";
import { Heading , Text} from '@chakra-ui/react'

const Ex = () => {

    
    const { data : products, isLoading , isSuccess, isError, error } = useGetProductsQuery()
    

    let content;
    if(isLoading){
        content = <p>Loading</p>
    }else if(isSuccess){
        content = products.map((c,id) => <Text key={id} fontSize='6xl'>{c.name}</Text>)
        console.log(products)
    }else if(isError){
        content = {error}
    }

    return (
    <>
    {content}
    </>
    )

}

export default Ex;