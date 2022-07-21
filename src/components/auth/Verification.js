import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../API/AppState";

export default function Verification() {
  const { user } = useAppState();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.emailVerified) {
      navigate("/");
    } else {
      navigate("/verification");
    }
  }, [user]);
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <Card.Title className="display-6 fw-normal text-info">
                Verify your mail
              </Card.Title>
              <Card.Text>
                We have sent you verification email link to your{" "}
                <span className="text-success">{user.email}</span> account.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
