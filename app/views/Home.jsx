import React from 'react';
import { Jumbotron, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Layout from './shared/Layout';

const Home = (props) => {

    return (
        <Layout user={props.user}>
            <main className="mx-auto">
                <Jumbotron>
                    <h1>Project Explorer</h1>
                    <p>Project Explorer is a repository for final year projects across all departments at your institution. You can submit your project and search projects submitted by others to learn from.</p>
                    <Button variant="primary" href="/signup" className="mr-2">Get Started</Button>
                    <Button variant="secondary" href="/login">Login</Button>
                </Jumbotron>

                <Container>
                    <Row className="showcase justify-content-between">
                        {props.project.reverse().slice(0,4).map(project => <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title><a href={`/project/${project.id}`}>{project.name}</a></Card.Title>
                                    <Card.Subtitle>{project.authors}</Card.Subtitle>
                                    <Card.Text>{project.abstract}</Card.Text>
                                    <Card.Footer>{project.tags}</Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>)}
                    </Row>
                </Container><br/><br/>
            </main>
        </Layout>
    )
}

export default Home;