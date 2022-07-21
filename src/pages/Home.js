// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Badge } from "react-bootstrap";
import HomeSlides from "../components/HomeSlides";
import ProductsCard from "../components/ProductsCard";
// import { useAppState } from "../API/AppState";

export default function Home() {
  return (
    <section>
      <div className="main">
        <HomeSlides />
        <h3 className="mt-5 fw-bold">
          Recents products <Badge className="fs-5 bg-secondary">New</Badge>
        </h3>
        <ProductsCard />
      </div>
    </section>
  );
}
