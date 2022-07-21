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
// import logo from "../../assets/Logo.svg";
import { FcGoogle } from "react-icons/fc";
import { onAuthStateChanged } from "firebase/auth";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { registerNewUser, googleSingIn, user } = useAppState();

  const navigate = useNavigate();

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    setMessage("");

    if (email === "" || password === "" || confirmPassword === "")
      return setMessage({ error: true, msg: "Missing fields" });

    if (
      confirmPassword.length !== password.length ||
      confirmPassword !== password
    )
      return setMessage({ error: true, msg: "You password doesn't match" });

    try {
      await registerNewUser(email, password);
      navigate("/verification");
    } catch (err) {
      setMessage({ error: true, msg: "User not found" });
    }

    setPassword("");
    setConfirmPassword("");
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSingIn();
      navigate("/");
    } catch (error) {
      console.log(error.code);
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
                    Signup
                  </Card.Title>
                  <hr />
                  <Form onSubmit={handleRegisterUser}>
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
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="confpassword">
                        Confirm password
                      </Form.Label>
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
                          id="confpassword"
                          placeholder="your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Button className="w-100 btn-info" type="submit">
                      Register
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="mt-3">
                <Card.Body>
                  <Card.Text>
                    Already have an account?{" "}
                    <Link className="text-success" to="/login">
                      Login here
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
              <div className="social_login mt-3 w-100 d-flex justify-content-around align-items-center">
                <FcGoogle onClick={handleGoogleSignIn} size={50} />
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
