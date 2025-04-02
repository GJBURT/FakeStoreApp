import { Container, Carousel, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {

    return (
            <Container>
                <Row>
                    <Col>
                        <h3>Welcome to Fake Store!</h3>
                        <p>Discover the latest trends in fashion, electronics, and more! 
                            <Link to="/ProductListing">
                            <button variant="primary">Check it out here!</button>
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Container>
            );
        }

export default HomePage;