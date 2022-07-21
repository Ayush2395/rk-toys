import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "react-bootstrap";

export default function PageError() {
  return (
    <>
      <section>
        <div className="main">
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <div className="w-100">
              <h1 className="text-danger fw-normal display-3 text-center">
                Ooops!... Page not found
              </h1>
              <FontAwesomeIcon className="text-center w-100 mt-3 text-warning" size="8x" icon="fa-solid fa-triangle-exclamation" />
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
