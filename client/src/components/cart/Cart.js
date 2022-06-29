import React,{ useEffect } from 'react'
import {Row, Col, Image, ListGroup, Form, Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cart'
import Message from '../layout/Message'


const Cart = ({match,location,history}) => {
    const productId = match.params.id 
    console.log(location)
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log('CartItems' , cartItems) 

    useEffect(() => {
        if(productId){
        dispatch(addToCart(productId, qty))
        }
    },[dispatch,productId,qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    

    return (
        <Row>
            <Col md={8}>
                <h1>SHOPPING CART</h1>
                {cartItems.length === 0 ? (
                    <Message variant='primary'>
                        Your cart is empty! Please add some products to your cart.
                        <br />
                        <Link to='/'>Shop Products</Link>

                    </Message>
                ) : (
                    	<ListGroup variant='flush'>
                            {cartItems.map(item => (
                                // product is the id of the product
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>

                                        <Col md={3}>
                                            <Link to={`product/${item.product}`}
                                            className="link"
                                            style={{fontSize:'1.2rem'}}>{item.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            <p className="text-white"
                                            style={{fontSize:'1.2rem'}}>Rs {item.price}</p>
                                        </Col>

                                        <Col md={3}>
                                        <Form.Control 
                                        as="select"
                                        value={item.qty}
                                        className="mb-3"
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {
                                                // if there are 4 products in stock then this will be [0,1,2,3]
                                                [...Array(item.countInStock).keys()].map((i) => (
                                                    <option key={i+1} value={i + 1}>
                                                        {i + 1}
                                                   </option>
                                                ))
                                            }
                                        </Form.Control>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='primary'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}

                        </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>SUB TOTAL ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) ITEMS </h2>
                            <h2>Rs {cartItems.reduce((acc,item) => acc + item.qty * item.price, 0 )}</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                            type="button"
                            className="btn-block"
                            variant="dark"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                            >
                                PROCEED TO CHECKOUT 
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

    )
}

export default Cart
