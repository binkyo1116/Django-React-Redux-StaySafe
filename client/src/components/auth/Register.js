import React, {useState, useEffect} from 'react'
import '../../App.css'
import { Form, Row, Col, Button } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import FormContainer from '../layout/FormContainer'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {register} from '../../actions/user'

const Register = ({location, history}) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const {name,email,password,confirmPassword} = form

    const [message, setMessage] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister

    const dispatch = useDispatch()

    // if user is already logged in
    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const submitForm = (e) => {
       e.preventDefault()
       if(password != confirmPassword) {
           setMessage('Passwords do not match')
       } else {
        dispatch(register(name,email,password))
       }
      
    }

    return (
        <FormContainer>
            <h1> Sign Up </h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitForm}>
            <Form.Group controlId="name">
                    <Form.Label>Full Name </Form.Label>
                        <Form.Control
                        required
                        type="name"
                        name="name"
                        value={name}
                        placeholder="Enter your full name"
                        onChange={handleChange}
                        />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address </Form.Label>
                        <Form.Control
                        required
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email address"
                        onChange={handleChange}
                        />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password </Form.Label>
                        <Form.Control
                        required
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                        />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password </Form.Label>
                        <Form.Control
                        required
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Re enter your password"
                        onChange={handleChange}
                        />
                </Form.Group>
                <Button type='submit' variant='primary' className="mt-3" > 
                Sign Up
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Already have an account?
                <Link 
                className='link'
                to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    {''} Login
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Register
