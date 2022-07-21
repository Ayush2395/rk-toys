import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { useAppState } from "../API/AppState";
import { db } from "../backend/firebase.config";

export default function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { user } = useAppState();

  const fetchCartItems = async () => {
    const userCartCollection = collection(db, `users/${user.uid}/userCart`);
    try {
      await getDocs(userCartCollection).then((snapShot) => {
        setCartItems(
          snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (err) {
      console.log(err.code);
    }
  };

  const deleteCartItem = async (id) => {
    const userCartCollection = collection(db, `users/${user.uid}/userCart`);
    const cartDoc = doc(userCartCollection, id);
    try {
      await deleteDoc(cartDoc, true).then(() => {
        setMessage({ error: false, msg: "Item deleted successfully" });
      });
    } catch (err) {
      setMessage({ error: true, msg: err.code });
    }
    fetchCartItems();
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  return (
    <>
      <section>
        <div className="main">
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
          <Row>
            {cartItems.map((cartItem) => {
              return (
                <Col
                  key={cartItem.id}
                  className="mb-3"
                  xs="12"
                  sm="12"
                  md="6"
                  lg="3"
                >
                  <Card>
                    <Card.Body>
                      <Card.Img
                        className="mb-3"
                        src={cartItem.image}
                        alt="photos"
                      />
                      <Card.Title>{cartItem.toyName}</Card.Title>
                      <Card.Text>Price : &#8377; {cartItem.price}</Card.Text>
                      <Card.Text>Quantity: {cartItem.quantity}</Card.Text>
                      <Button
                        onClick={() => {
                          deleteCartItem(cartItem.id);
                        }}
                        className="mx-2"
                        variant="outline-danger"
                      >
                        Remove <FontAwesomeIcon icon="fa-solid fa-trash" />
                      </Button>
                      <Button className="mx-2" variant="outline-success">
                        Buy <FontAwesomeIcon icon="fa-solid fa-money-bill" />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </section>
    </>
  );
}
