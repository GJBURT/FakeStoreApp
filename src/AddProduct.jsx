import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({ title: '', category: '', price: (0), description: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)

    // Getting categories from API for dropdown menu
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(response => {
                setCategories(response.data);
                setLoading(false); })
            .catch(error => {
                setError(`Failed to load categories: ${error.message}`);
                setLoading(false);
            }); 
    }, []);

    //Sets the users changes made to the product 
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    //Form submission to update the product
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setSuccess(false);
        

        // Validate the product data before sending it to the API
        if (!product.title || !product.category || !product.price || !product.description) {
            setError('All fields are required!');
            setLoading(false);
            return;
        }
        if (product.price <= 0) {
            setError('Price must be greater than 0!');
            setLoading(false);
            return;
        }
        if (product.description.length < 10) {
            setError('Description must be at least 10 characters long!');
            setLoading(false);
            return;
        }
        if (product.title.length < 3) {
            setError('Title must be at least 3 characters long!');
            setLoading(false);
            return;
        }
        if (product.category.length < 3) {
            setError('Category must be at least 3 characters long!');
            setLoading(false);
            return;
        }

        // Add a placeholder image if none is provided
        const productWithImage = {
            ...product,
            image: product.image || 'https://via.placeholder.com/150'
        };

        // Reset error state if validation passes
        setError(null);
        setSuccess(false);
        // Reset loading state
        setLoading(true);
        // Reset success state
        setSuccess(false);
        // Reset error state
        setError(null);
        // Reset loading state
        setLoading(true);
        // Reset success state
        setSuccess(false);
        // Reset error state
        setError(null); 
        
        // POST request to add a new product
        axios.post(`https://fakestoreapi.com/products`, productWithImage)
            .then(response => {
                // Log the changes through POST Request
                console.log("POST Response:", response.data);
                setSuccess(true);
                //Redirecting to the updated product details
                setTimeout(() => navigate(`/ProductDetails/${response.data.id}`, {replace: true}), 2000);
            })
            .catch(error => {
                setError(`Failed to add product: ${error.message}`);
                setLoading(false);
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <h2>Add Product</h2>
            {success && <Alert variant="success">Product Added!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
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
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </Form.Select>
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

                <Button variant="primary" type="submit" disabled={loading || success}>
                    {loading ? 'Adding...' : 'Add Product'}
                </Button>
            </Form>
        </Container>
    );
}

export default AddProduct;
