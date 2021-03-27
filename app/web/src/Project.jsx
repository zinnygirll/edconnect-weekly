import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Layout from './shared/Layout';

const Project = (props) => {
    const { id } = useParams();
    const [projectName, setProjectName] = useState('');
    const [abstract, setAbstract] = useState('');
    const [authors, setAuthors] = useState('');
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetch(`/api/projects/${id}`)
          .then(res => res.json())
          .then((result) => {
              console.log(result)
              setProjectName(result.name);
              setAbstract(result.abstract);
              setAuthors(result.authors);
              setTags(result.tags);
            
                fetch(`/api/users/${result.createdBy}`)
                    .then(res => res.json())
                    .then((res) => {
                        setAuthor(res.firstname + ' ' + res.lastname);
                    }
                    )
        }
        )
    }, id)

    return (
        <Layout>
            <main> <br /><br />
                <Container>
                    <Row>
                        <h3 id="project_name"><strong>{projectName}</strong></h3>
                    </Row>
                    <Row className="bg-light p-3">
                        <Col>
                            <p>Created By</p>
                            <p id="project_author">{author}</p>
                        </Col>
                        <Col>
                            <p>Date Created</p>
                            <p>2020-08-30</p>
                        </Col>
                        <Col>
                            <p>Last Updated</p>
                            <p>2020-08-30</p>
                        </Col>
                        <Col className="mx-auto justify-content-end">
                            <Button href="/createproject" variant="primary" size="lg">Edit Project</Button>
                        </Col>
                    </Row>
                </Container><br />
            
                <Container>
                    <Row>
                        <Col>
                            <h3>Project Abstract</h3>
                            <hr className="solid" />
                            <p id="project_abstract">{abstract}</p><br/><br/>
                            <Form name="projectComment"> 
                                <Form.Group>
                                    <Form.Label><strong>Comments:</strong></Form.Label>
                                    <Form.Control as="textarea" name="comments" rows={4} cols={50} placeholder="Leave a comment" />
                                </Form.Group>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                            <hr className="solid" />
                            <p align="center">No comments added yet</p>
                        </Col>
                        <Col>
                            <h3>Project details</h3>
                            <hr className="solid" />
                            <InputGroup>
                                <Form.File id="custom-file" label="Custom file input" custom />
                                <InputGroup.Append>
                                    <Button variant="primary" type="button" name="projectFile">Upload</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <hr className="solid" />
                            <Card>
                                <Card.Header>
                                    Author(s)
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text><p align="center" id="project_authors">{authors}</p></Card.Text>
                                </Card.Body>
                                <Card.Footer id="project_tags">
                                    {tags}
                                </Card.Footer>
                            </Card><br/>
                            <Card>
                                <Card.Header>
                                    Project files
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text><p align="center">No files uploaded yet</p></Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        </main><br/>
        </Layout>
    )
}

export default Project;