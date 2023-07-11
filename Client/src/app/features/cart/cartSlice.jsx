import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : [],
    cartId : 0
}

export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        getProductId : (state,action) => {
            state.cartId = action.payload
        },
        getCartItems : (state,action) => {
            state.cart.push(action.payload)
        },
        removeCartItem : (state,action) => {
           // state.cart.pop(action.payload)
           state.cart = []
           state.cartId = 0
        }
    }
})


export const { getCartItems , removeCartItem, getProductId } = cartSlice.actions

export const cartAllId =  (state) => state.cart.cartId
export const cartAll = (state) => state.cart.cart
export default cartSlice.reducer;