import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ProductDetails() {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    //Gets product details from the API
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                //Log fetched data to debug updating product details
                console.log("Fetched Updated Data:", response.data);
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(`Failed to fetch product: ${error.message}`);
                setLoading(false);
            });
    }, [id]);

    //Product Deletion Handling
    const handleDelete = () => {
        axios.delete(`https://fakestoreapi.com/products/${id}`)
            .then(()=>{
                setShowModal(false);
                // Redirects user back to the Product Listings page after deletion
                navigate('/ProductListing');
            })
            .catch(error=>{
                setError(`Failed to delete product: ${error.message}`)
            })
    }

    if (loading) return <Spinner animation="border" />;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            {/* Product Card */}
            <Card style={{ width: '24rem', margin: '20px auto' }}>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                    <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
                    <Button>Add to Cart</Button>
                    <Button variant="warning" as={Link} to={`/EditProduct/${id}`}>Edit Product</Button>
                    <Button variant="danger" onClick={()=> setShowModal(true)}>Delete Product</Button>
                </Card.Body>
            </Card>
            
            {/* Modal for Deletion of Product */}
            <Modal show={showModal} onHide={()=> setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete <strong>{product.title}</strong>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Confirm Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ProductDetails;
