// https://fakestoreapi.com/products

import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ProductDetails from './ProductDetails';
import {Link} from 'react-router-dom'

function ProductListing() {
    const [product, setProduct] = useState([]);     // State to fake store products
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);    // Error state

useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
        .then(response => {
        setProduct(response.data);
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
          <h3>Products</h3>
          <Row>
            {product.map(product => (
              <Col key={product.id} className="mt-4">
                <Card style={{ width: '18rem' }} >
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">👤 {product.category}</Card.Subtitle>
                    <Card.Text className="mt-3">${product.price}</Card.Text>
                    
                    <Link to={`/ProductDetails/${product.id}`} className="btn btn-primary">Product Details</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
    }

export default ProductListing;