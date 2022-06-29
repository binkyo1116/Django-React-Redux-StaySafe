import React, {useState, useEffect} from 'react'
import '../../App.css'
import { Form, Row, Col, Button } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import FormContainer from '../layout/FormContainer'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {getUserDetails, updateUserProfile} from '../../actions/user'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const Profile = ({history}) => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const dispatch = useDispatch()

    useEffect(() => {
        // if user is not logged in
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user || !user.name || success) {
                dispatch({
                    type: USER_UPDATE_PROFILE_RESET
                })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user, success])

    const submitForm = (e) => {
       e.preventDefault()
       if(password != confirmPassword) {
           setMessage('Passwords do not match')
       } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
       }
      
    }

    return (
        <Row>
             <Col md={3}>
                 <h2>USER PROFILE</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitForm}>
            <Form.Group controlId="name">
                    <Form.Label>Full Name </Form.Label>
                        <Form.Control
                        type="name"
                        name="name"
                        value={name}
                        placeholder="Enter your full name"
                        onChange={(e) => setName(e.target.value)}
                        />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address </Form.Label>
                        <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password </Form.Label>
                        <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your new password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password </Form.Label>
                        <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Re enter your new password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                </Form.Group>
                <Button type='submit' variant='primary' className="mt-3" > 
                	UPDATE
                </Button>
            </Form>
             </Col>
             <Col md={9}>
                 <h2>YOUR ORDERS</h2>
             </Col>
        </Row>
    )
}

export default Profile
