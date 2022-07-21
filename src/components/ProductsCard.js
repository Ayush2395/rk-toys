import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppState } from "../API/AppState";
import productsService from "../backend/products.service";

export default function ProductsCard() {
  const [product, setProduct] = useState([]);
  const { searchTerm } = useAppState();

  async function productsList() {
    try {
      await productsService.getProduct().then((data) => {
        setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } catch (err) {
      console.log(err.code);
    }
  }

  useEffect(() => {
    productsList();
  }, []);

  return (
    <>
      <div className="main">
        <Row>
          {product
            .filter((toyName) => {
              return toyName.toyName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            })
            .map((item) => {
              return (
                <Col
                  key={item.id}
                  className="mb-3"
                  xs="12"
                  sm="12"
                  md="6"
                  lg="4"
                >
                  <Card>
                    <Card.Body>
                      <Card.Img
                        src={item.images[2]}
                        alt="photo"
                        width={120}
                        height={180}
                      />
                      <Card.Text className="fs-4 fw-bold mb-3">
                        {item.toyName}
                      </Card.Text>
                      <Card.Text>Price: &#8377; {item.price}</Card.Text>
                      <Link to={`/${item.slug}/${item.id}`}>
                        <Button className="w-100 mb-3">View</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
}
