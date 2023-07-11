import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    products : []
}

export const productsSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        getProducts : (state) => {
            state.products = ""
        },
        getCategoryId : (state,action) => {
//            state.products.push(action.payload)
              state.products = action.payload ;
        },
        searchProduct : (state,action) => {
            state.products = action.payload ;
        }
    }
})


export const { getProducts , getCategoryId, searchProduct } = productsSlice.actions

export const productsAll =  (state) => state.products.products

export default productsSlice.reducer;