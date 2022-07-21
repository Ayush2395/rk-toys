import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppState } from "../API/AppState";
import logo from "../assets/Logo.svg";

export default function NavMenu() {
  const { user, logOutUser, searchTerm, handleSearch } = useAppState();
  const navigate = useNavigate();

  const handleLogOutUser = async () => {
    try {
      await logOutUser();
      navigate("/");
    } catch (err) {
      console.log(err.code);
    }
  };

  return (
    <>
      <Navbar
        className="mb-3"
        fixed="top"
        bg="light"
        expand="false"
        id="header"
      >
        <Container fluid="sm">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="logo" width={50} />
          </Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Quick search"
              className="me-2"
              aria-label="Search"
              onChange={handleSearch}
              value={searchTerm}
            />
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-false"
            aria-labelledby="offcanvasNavbarLabel-expand-false"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                <img src={logo} alt="logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Container>
                <div className="w-100">
                  <h5>Welcome, {user ? user.displayName : "User"}</h5>
                </div>
                <Nav className="ms-auto">
                  <Nav.Link as={NavLink} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/products">
                    Shop
                  </Nav.Link>
                  <Nav.Link
                    disabled={user ? false : true}
                    as={NavLink}
                    to="/cart"
                  >
                    Your cart
                  </Nav.Link>
                  <Nav.Link
                    disabled={user ? false : true}
                    as={NavLink}
                    to="/order"
                  >
                    Your order
                  </Nav.Link>
                  <Nav.Link
                    disabled={user ? false : true}
                    as={NavLink}
                    to="/account"
                  >
                    My Account
                  </Nav.Link>
                </Nav>
                {user ? (
                  <Button
                    onClick={handleLogOutUser}
                    className="w-100"
                    variant="outline-danger"
                  >
                    Log Out
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button variant="outline-success" className="w-100">
                      Login
                    </Button>
                  </Link>
                )}
              </Container>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
