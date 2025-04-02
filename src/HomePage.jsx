import { Container, Carousel, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {

    return (
            <Container>
                <Row>
                    <Col>
                        <h3>Welcome to Fake Store!</h3>
                        <p>At Fake Store you can discover the latest trends in fashion, electronics, and more!<br></br><br></br>
                            <Link to="/ProductListing">
                            <button variant="primary">Check out all of our amazing products here!</button>
                            </Link>
                            <br></br><br></br>
                            Make sure to like us on social media!
                        </p>
                    </Col>
                </Row>
            </Container>
            );
        }

export default HomePage;