import React from "react";
import { Carousel } from "react-bootstrap";

export default function HomeSlides() {
  return (
    <>
      <Carousel className="mt-3">
        <Carousel.Item>
          <img className="d-block w-100"
            src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="product photos"
            width={800}
            height={400}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100"
            src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="product photos"
            width={800}
            height={400}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100"
            src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="product photos"
            width={800}
            height={400}
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}
