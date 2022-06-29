import React, { useState } from 'react'
import { Col,Form,Button } from 'react-bootstrap'
import FormContainer from '../layout/FormContainer'
import { useSelector,useDispatch } from 'react-redux'
import { savePaymentMethod } from '../../actions/cart'
import CheckoutSteps from './CheckoutSteps'


const Payment = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address) {
        history.push("/shipping")
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeholder")
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">
                        Select Method
                        <Col>
                        <Form.Check
                        type="radio"
                        label="PayPal or Credit Card"
                        id="paypal"
                        name="paymentMethod"
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        </Col>
                    </Form.Label>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Payment
