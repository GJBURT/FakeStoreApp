import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function NavBar() {
    return(
        <Navbar bg="info" variant="dark" expand="lg" className="p-3 mb-4">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Fake Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/AddProduct" activeclassname="active">
                            Add Product
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/ProductListing" activeclassname="active">
                            View Products
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;