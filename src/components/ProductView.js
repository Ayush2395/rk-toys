import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppState } from "../API/AppState";
import { db } from "../backend/firebase.config";
import productsService from "../backend/products.service";
import Slides from "./Slides";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [aboutItem, setAboutItem] = useState([]);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [keyValue, setKeyValue] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { user } = useAppState();

  async function productViewDetails() {
    try {
      await productsService.getProductDetails(id).then((snapShots) => {
        if (snapShots.exists()) {
          setProduct(snapShots.data());
          setKeyValue(snapShots.id);
        } else {
          setProduct("No data available");
        }
      });
    } catch (err) {
      console.log(err.code);
    }
  }

  useEffect(() => {
    productViewDetails();
    async function getAboutThisItem() {
      const aboutItemsSnapShot = await productsService.getProductDetails(id);
      setKeyValue(aboutItemsSnapShot.id);
      setAboutItem(aboutItemsSnapShot.data().aboutThisItem);
    }
    async function getImages() {
      const getImages = await productsService.getProductDetails(id);
      setKeyValue(getImages.id);
      setImages(getImages.data().images);
    }
    getAboutThisItem();
    getImages();
  }, []);

  const increaseQuantity = () => {
    if (product.inStock <= quantity) return alert("You select all purchase");
    else setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity === 1) return alert("Can't set below 1 value");
    else setQuantity(quantity - 1);
  };

  const handleUserCart = async (event) => {
    event.preventDefault();
    setMessage("");
    const userCartCollection = collection(db, `users/${user.uid}/userCart`);

    const cartItems = {
      toyName: product.toyName,
      price: product.price * quantity,
      quantity: quantity,
      image: product.images[0],
      timeStamp: serverTimestamp(),
    };

    try {
      await addDoc(userCartCollection, cartItems);
      setMessage({
        error: false,
        msg: "Item is added to cart, check your cart",
      });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  return (
    <>
      <section>
        <div className="main">
          {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
            >
              {message?.msg}
            </Alert>
          )}
          <Row>
            <Col className="mb-3" xs="12" sm="12" md="12" lg="6">
              <Slides
                imageURL={images.map((item) => {
                  return (
                    <img
                      key={keyValue}
                      className="slides_img"
                      src={item}
                      alt="product photos"
                      width={800}
                      height={400}
                    />
                  );
                })}
              />
            </Col>
            <Col className="mb-3" xs="12" sm="12" md="12" lg="6">
              <Card>
                <Card.Body>
                  <Card.Title className="display-6 fw-normal text-dark">
                    {product.toyName}
                  </Card.Title>
                  <Card.Text className="fw-bold text-info mb-2">
                    About this product
                  </Card.Text>
                  <ul type="square">
                    {aboutItem.map((item) => {
                      return <li>{item}</li>;
                    })}
                  </ul>
                  <p>Quantity:</p>
                  <button
                    className="mx-2 btn btn-secondary"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  {quantity}
                  <button
                    className="mx-2 btn btn-secondary"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                  <p className="text-success fw-bold fs-5">
                    Price: &#8377; {product.price * quantity}
                  </p>
                  <p className="text-info fw-bold">
                    Stocks: {product.inStock - quantity + 1}
                  </p>
                  <button
                    onClick={handleUserCart}
                    disabled={user ? false : true}
                    className="btn btn-success w-100"
                  >
                    Add to cart <FontAwesomeIcon icon="fa-solid fa-cart-plus" />
                  </button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}
