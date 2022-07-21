import React from "react";
import { Carousel } from "react-bootstrap";

export default function Slides({ imageURL }) {
  return (
    <>
      <Carousel className="mt-3">
        <Carousel.Item>{imageURL[0]}</Carousel.Item>
        <Carousel.Item>{imageURL[1]}</Carousel.Item>
        <Carousel.Item>{imageURL[2]}</Carousel.Item>
      </Carousel>
    </>
  );
}
