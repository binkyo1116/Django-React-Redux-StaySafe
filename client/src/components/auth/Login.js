import React, {useState, useEffect} from 'react'
import '../../App.css'
import { Form, Row, Col, Button } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import FormContainer from '../layout/FormContainer'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {login} from '../../actions/user'

const Login = ({location, history}) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const {email,password} = form
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLogin

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
       dispatch(login(email,password))
    }

    return (
        <FormContainer>
            <h1> Sign In </h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitForm}>
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
                <Button type='submit' variant='primary' className="mt-3">
                Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Don't have an account?
                <Link 
                className='link'
                to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    {''} Register
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login
