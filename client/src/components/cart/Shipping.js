import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'
import FormContainer from '../layout/FormContainer'
import {useSelector,useDispatch} from 'react-redux'
import {saveShippingAddress} from '../../actions/cart'
import CheckoutSteps from './CheckoutSteps'

const Shipping = ({history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [form,setForm] = useState({
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country
    })
    const {address,city,postalCode,country} = form

    const handleChange = (e) => {
        const {name,value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address,city,postalCode, country }))
        history.push('/payment')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2  />
        <h1> Shipping Details </h1>
        <Form onSubmit={submitForm}>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                    <Form.Control
                    required
                    type="text"
                    name="address"
                    value={address ? address : ''}
                    placeholder="Enter address"
                    onChange={handleChange}
                    />
            </Form.Group>

            <Form.Group controlId="city">
                <Form.Label>City </Form.Label>
                    <Form.Control
                    required
                    type="text"
                    name="city"
                    value={city ? city : ''}
                    placeholder="Enter city"
                    onChange={handleChange}
                    />
            </Form.Group>
            <Form.Group controlId="postalCode">
                <Form.Label>Postal Code </Form.Label>
                    <Form.Control
                    required
                    type="text"
                    name="postalCode"
                    value={postalCode ? postalCode : ''}
                    placeholder="Enter postal code"
                    onChange={handleChange}
                    />
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country </Form.Label>
                    <Form.Control
                    required
                    type="text"
                    name="country"
                    value={country ? country : ''}
                    placeholder="Enter country"
                    onChange={handleChange}
                    />
            </Form.Group>
            <Button type='submit' variant='primary' className="mt-3">
            Submit
            </Button>
        </Form>
    </FormContainer>
    )
}

export default Shipping
