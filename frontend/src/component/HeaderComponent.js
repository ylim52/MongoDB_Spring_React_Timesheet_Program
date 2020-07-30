import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


class HeaderComponent extends Component {
    render(){
        return (<div>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="/summary">Employee Timesheet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/summary">Summary</Nav.Link>
                        <Nav.Link href="/timesheet">Timesheet</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/auth">Login</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* <NavLink to="/summary">Summary</NavLink><br/>
            <NavLink to="/timesheet">Timesheet</NavLink><br/>
            <NavLink to="/profile">Profile</NavLink><br/>
            <NavLink to="/auth">Login</NavLink><br/>
            <NavLink to="/logout">Logout</NavLink> */}
        </div>)
    }
}

export default HeaderComponent;