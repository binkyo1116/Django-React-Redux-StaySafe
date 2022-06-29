import React from 'react'
import '../../App.css'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../../actions/user'

const Header = () => {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin    
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Stay Safe</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            <LinkContainer to='/cart'>
                                <Nav.Link>Cart</Nav.Link>
                            </LinkContainer>
                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                <Nav.Link>Login</Nav.Link>
                                </LinkContainer>  
                            )}
            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>

    )
}

export default Header
