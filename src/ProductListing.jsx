// https://fakestoreapi.com/products

import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function ProductListing() {
    const [products, setProducts] = useState([]);     // State to fake store products
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);    // Error state

useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
        .then(response => {
        setUsers(response.data);
        setLoading(false);
        })
        .catch(error => {
        setError(`Failed to fetch products: ${error.message}`);
        setLoading(false);
        });

    }, []); // Empty dependency array ensures this runs only once

    if (loading) {
        return (
          <Container>
            <h3>
              <Spinner
                animation="border"
                variant="info"
                style={{ marginRight: '15px' }}
                role="status"
              />
              Loading Products...
            </h3>
          </Container>
        )
      }

      if (error) return <p>{error}</p>;

      return (
        <Container>
          <h3>Products List</h3>
          <Row>
            {products.map(products => (
              <Col key={products.id} className="mt-4">
                <Card style={{ width: '18rem' }} >
                  <Card.Img variant="top" src={products.image} />
                  <Card.Body>
                    <Card.Title>{products.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">👤 {products.username}</Card.Subtitle>
                    <Card.Text className="mt-3">📞 {user.phone}</Card.Text>
                    <Card.Link href={`mailto:${user.email}`} className="mb-3 d-block text-decoration-none" >
                      ✉️ {user.email}
                    </Card.Link>
                    <Button href={`/user-todos/${user.id}`}>Todo List</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
    }