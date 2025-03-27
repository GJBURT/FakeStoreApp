import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({ title: '', image: '', price: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    //Pulls the product information for selected product to have set as starting product details to be edited.
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

    //Sets the users changes made to the product categories of Product 
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    //Form submission to update the product
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://fakestoreapi.com/products/${id}`, product)
            .then(response => {
                // Log the changes through PUT Request
                console.log("PUT Response:", response.data);
                setSuccess(true);
                //Redirecting to the updated product details
                setTimeout(() => navigate(`/ProductDetails/${id}`, {replace: true}), 2000);
            })
            .catch(error => {
                setError(`Failed to update product: ${error.message}`);
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <h2>Edit Product</h2>
            {success && <Alert variant="success">Product updated!</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Product
                </Button>
            </Form>
        </Container>
    );
}

export default EditProduct;
