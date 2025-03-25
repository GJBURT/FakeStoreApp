import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

function ProductDetails() {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(`Failed to fetch product: ${error.message}`);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Spinner animation="border" />;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <Card style={{ width: '24rem', margin: '20px auto' }}>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                    <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProductDetails;
