import React from 'react';
import {useState, useEffect} from 'react';
import { Jumbotron, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './shared/Layout';

const Home = (props) => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch("api/projects")
          .then(res => res.json())
          .then(
            (result) => {
              setProjects(result.slice(0,4));
            }
          )
      }, [])
    return (
        <Layout>
            <main className="mx-auto">
                <Jumbotron>
                    <h1>Project Explorer</h1>
                    <p>Project Explorer is a repository for final year projects across all departments at your institution. You can submit your project and search projects submitted by others to learn from.</p>
                    <Button variant="primary" href="/signup" className="mr-2">Get Started</Button>
                    <Button variant="secondary" href="/login">Login</Button>
                </Jumbotron>

                <Container>
                    <Row className="showcase justify-content-between">
                        {projects.map(project => <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title><Link to={`/projects/${project.id}`}>{project.name}</Link></Card.Title>
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