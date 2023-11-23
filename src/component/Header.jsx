import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import useLogout from '../Hooks/useLogout';
import { NavItem } from 'react-bootstrap';
import heartpulse from '../assets/heart-pulse-solid.svg';

function Header() {

    let logout=useLogout()
    let user = JSON.parse(sessionStorage.getItem('user'))
  return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary">
       <Container>
        <Navbar.Brand >
          <img src={heartpulse} alt="heartpulse" width="24px" height="24px"/>
          &nbsp;
          Fitness Logger
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="me-auto">
            <Nav.Link href='/dashboard'> Dashboard </Nav.Link>
            <Nav.Link  href='/history'>History</Nav.Link>
            <NavDropdown title="Excercise" id="basic-nav-dropdown">
              <NavDropdown.Item href='/cardio'>Cardio</NavDropdown.Item>
              <NavDropdown.Item href='/resistance'> Resistance</NavDropdown.Item> 
            </NavDropdown>
            <Nav.Link  href='/fitness-overview'>Fitness Overview</Nav.Link>
          </Nav>
           <Nav >
               <NavItem><h4>{`${user.name}`}</h4></NavItem>
               &nbsp;
               &nbsp;
               <Button  className="btn btn-primary" onClick={logout}>Logout</Button>
            </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
      
      </>
    
  )
}

export default Header