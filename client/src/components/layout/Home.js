import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Products from '../products/Products'
import Loader from './Loader'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../../actions/product'

const Home = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error,loading,products} = productList

    useEffect(() => {
        dispatch(listProducts())
    },[dispatch])

    return (
        <div>
             <h1>Featured Masks</h1>
             {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
             <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Products product={product} />
                    </Col>
                ))}
            </Row>
            }
        </div>
    )
}

export default Home
