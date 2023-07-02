import React from "react";
import njLogo from "./NJ_logo.png";
import "./NavbarStyle.css";
import AddCuisine from "../cuisine/AddCuisine";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const TopBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="logo">
            <img style={imageStyles} src={njLogo} alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Button variant="light">
                <Link
                  to={{ pathname: "/", state: { cuisineStyle: "indian" } }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Indian
                </Link>
              </Button>
            </Nav.Link>

            <Nav.Link>
              <Button variant="light">
                <Link
                  to={{ pathname: "/", state: { cuisineStyle: "american" } }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  American
                </Link>
              </Button>
            </Nav.Link>

            <Nav.Link>
              <Button variant="light">
                <Link
                  to={{ pathname: "/", state: { cuisineStyle: "italian" } }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Italian
                </Link>
              </Button>
            </Nav.Link>

            <Nav.Link>
              <Button variant="dark">
                <Link
                  to="/addCuisine"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Add Cusines
                </Link>
              </Button>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// NavBar css

const imageStyles = {
  width: "2rem",
  marginLeft: "20px",
};

export default TopBar;
