import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

export const cartReducer = (state={ cartItems:[], shippingAddress: {} }, action) => {

    const {type,payload} = action

    switch(type) {
        case CART_ADD_ITEM:
             // item is the current product
            const item = payload
            // Check if the item exists
            const existItem =  state.cartItems.find(i => i.product ===  item.product) // product is the id (Check cart action for better understanding)

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(i =>
                        i.product === existItem.product ? item : i)
                }
            }
            return {
                ...state,
                cartItems: [...state.cartItems, item]
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                // payload is the id of the product we want to remove , product is the product id 
                cartItems: state.cartItems.filter(i => i.product !== payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: payload
            }

        default:
            return state
    }
}