import axios from 'axios'
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

export const addToCart = (id,qty) => async(dispatch,getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // saving cart items in local storage 
    // local storage takes key value pairs : cartItems is key 
    // cart is the cartReducer 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) 
}

// getState lets you get any part of the state. Similar to useSelector 

export const removeFromCart = (id) => async(dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) 
}

export const saveShippingAddress = (data) => async(dispatch) => {

    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data)) 
}

export const savePaymentMethod = (data) => async(dispatch) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data)) 
}