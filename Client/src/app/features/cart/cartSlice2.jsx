import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart2 : [],
}

export const cartSlice2 = createSlice({
    name : 'cart2',
    initialState,
    reducers : {

        getCartItems2 : (state,action) => {
            state.cart2.push(action.payload)
        },
        removeCartItem : (state,action) => {
            state.cart2.pop(action.payload)
        }
    }
})


export const { getCartItems2 , removeCartItem2 } = cartSlice2.actions

export const cartAll2 = (state) => state.cart2.cart2
export default cartSlice2.reducer;