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
                        {props.project.reverse().map(project => <Col key={project.name}>
                            <Card>
                                <Card.Body>
                                    <Card.Title><a href={`/project/${project.id}`}>{project.name}</a></Card.Title>
                                    <Card.Subtitle>{project.authors.map(author => <Card.Link key={author} style={{color: "black"}}>{author}</Card.Link>)}</Card.Subtitle>
                                    <Card.Text>{project.abstract}</Card.Text>
                                </Card.Body>
                                <Card.Footer>{project.tags.map(tag => <Card.Link key={tag} href={`/search?page=${1}&searchType=tags&searchTerm=${tag}`}>{tag}</Card.Link>)}</Card.Footer>
                            </Card>
                        </Col>)}
                    </Row>
                </Container><br/><br/>
            </main>
        </Layout>
    )
}

export default Home;