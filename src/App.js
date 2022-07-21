// React Library and modules
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

// Components
import Home from "./pages/Home";
import NavMenu from "./components/NavMenu";
import ProductsCard from "./components/ProductsCard";
import ProductView from "./components/ProductView";
import PageError from "./components/PageError";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Verification from "./components/auth/Verification";
import UserCart from "./components/UserCart";

// icons  fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCartPlus,
  faMagnifyingGlass,
  faPersonDigging,
  faTriangleExclamation,
  faEye,
  faEyeSlash,
  faMoneyBill,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faPersonDigging,
  faMagnifyingGlass,
  faTriangleExclamation,
  faCartPlus,
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faMoneyBill,
  faTrash
);

export default function App() {
  const handleHeaderShadow = () => {
    const header = document.getElementById("header");
    const scrollY = window.pageYOffset;
    if (scrollY >= 80) {
      header.classList.add("header");
    } else {
      header.classList.remove("header");
    }
  };

  useEffect(() => {
    handleHeaderShadow();
  }, []);
  return (
    <>
      <NavMenu />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/products" element={<ProductsCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<Verification />} />
          <Route path=":productId/:id" element={<ProductView />} />
          <Route path="*" element={<PageError />} />
        </Routes>
      </Container>
    </>
  );
}
