import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../../API/AppState";
import logo from "../../assets/Logo.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { loginUser, user } = useAppState();

  const navigate = useNavigate();

  const handleLoginUser = async (event) => {
    event.preventDefault();
    setMessage("");

    if (email === "" || password === "")
      return setMessage({ error: true, msg: "Missing fields" });

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found")
        setMessage({ error: true, msg: "User not found" });
    }
  };
  useEffect(() => {
    // onAuthStateChanged()
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <section>
        <div className="main">
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <img src={logo} alt="logo" className="w-50 mb-3" />
              {message?.msg && (
                <Alert
                  variant={message?.error ? "danger" : "success"}
                  dismissible
                  onClose={() => {
                    setMessage("");
                  }}
                >
                  {message?.msg}
                </Alert>
              )}
              <Card>
                <Card.Body>
                  <Card.Title className="text-center w-100 display-6 fw-normal">
                    Login
                  </Card.Title>
                  <hr />
                  <Form onSubmit={handleLoginUser}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="email">Email</Form.Label>
                      <Form.Control
                        id="email"
                        placeholder="Enter your registered email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="password">Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text
                          onClick={() => {
                            showPassword === false
                              ? setShowPassword(true)
                              : setShowPassword(false);
                          }}
                        >
                          {showPassword ? (
                            <FontAwesomeIcon icon="fa-solid fa-eye" />
                          ) : (
                            <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                          )}
                        </InputGroup.Text>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Button className="w-100 btn-info" type="submit">
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="mt-3">
                <Card.Body>
                  <Card.Text>
                    Don't have an account?{" "}
                    <Link className="text-success" to="/register">
                      Register here
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
