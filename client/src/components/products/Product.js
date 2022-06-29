import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import products from '../../utils/products'
import Rating from './Rating'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import { listProductDetails } from '../../actions/product'


const Product = ({ match, history }) => {

    const [qty,setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails

    useEffect(() => {
      dispatch(listProductDetails(match.params.id))
    },[dispatch,match])

    const addToCartHandler = () => {
       history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    

    return (
        <div> 
             <Link to='/' className='btn btn-primary my-3'>
                 Go Back
            </Link>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
            (
                <div>
             <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>


                <Col md={3}>
                    <ListGroup variant="flush">

                    <ListGroup.Item className="text-white">
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item className="text-white">
                        <Rating 
                        value={product.rating} 
                        text={` ${product.numReviews} reviews`} 
                        color={'#f8e825'} />
                    </ListGroup.Item>

                    <ListGroup.Item className="text-white">
                        Description: {product.description}
                    </ListGroup.Item>

                    <ListGroup.Item className="text-white">
                        Usecase: {product.usecase}
                    </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>

                        
                        <ListGroup.Item className="text-white">
                                <Row>
                                    <Col>Category:</Col>
                                    <Col>
                                        {product.category}
                                    </Col>
                                </Row>
                        </ListGroup.Item>

                        <ListGroup.Item className="text-white">
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>Rs {product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item className="text-white">
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroup.Item className="text-white">
                                <Row>
                                    <Col>Qty</Col>
                                    <Col xs='auto' className='my-1'>
                                        <Form.Control 
                                        as="select"
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                        >
                                            {
                                                // if there are 4 products in stock then this will be [0,1,2,3]
                                                [...Array(product.countInStock).keys()].map((i) => (
                                                    <option key={i+1} value={i + 1}>
                                                        {i + 1}
                                                   </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <Button type="button" className="btn btn-success"
                        disabled={product.countInStock == 0}
                        onClick={addToCartHandler}>ADD TO CART </Button>
                                
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </div>
            )}
        </div>
    )
}

export default Product;
