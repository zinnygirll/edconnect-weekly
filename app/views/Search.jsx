import React from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Pagination, Row } from 'react-bootstrap';
import Layout from './shared/Layout';

const Search = (props) => {
    
    let hrefPrevious = `/search?page=${props.currentPage - 1}&searchType=${props.searchType}&searchTerm=${props.searchTerm}`;
    let hrefNext = `/search?page=${props.currentPage + 1}&searchType=${props.searchType}&searchTerm=${props.searchTerm}`;
   
    return (
        <Layout user={props.user}><br /><br />
            <Container className="bg-light p-3">
                <h4>Project Gallery</h4><br />
                <Form name="searchForm" action="search" method="POST">
                    <Form.Row>
                        <Form.Group as={Col} lg={7}>
                            <Form.Control type="text" size="lg" name="searchTerm" placeholder="Project Name, Authors, Abstract, Tags" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label htmlFor="searchType" className="sr-only">Search By:</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Search By:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" size="lg" name="searchType">
                                    <option value="name">Name</option>
                                    <option value="abstract">Abstract</option>
                                    <option value="authors">Authors</option>
                                    <option value="tags">Tags</option>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        <Col lg="auto">
                            <Button type="submit" variant="primary" size="lg">Submit</Button>
                        </Col> 
                    </Form.Row>
                </Form>
            </Container><br /><br /><br />

            <Container>
                <Row style={{display: 'flex'}} >
                    <Col>
                        {(props.count === "" || props.count === undefined || !props.count) && (<p> {props.noProject} </p>)}
                        {props.count > 0 && (<p><strong>All Projects </strong>( {props.count} results )</p>)}
                    </Col>
                    <Col className="d-flex justify-content-end">
                        {props.count > 0 && (<Pagination>
                            <Pagination.Prev href={hrefPrevious} className={props.currentPage === 1 ? 'disabled' : ''} />
                            <Pagination.Item>page {props.currentPage} of {props.totalPages}</Pagination.Item>
                            <Pagination.Next href={hrefNext} className={props.currentPage === props.totalPages ? 'disabled' : ''} />
                        </Pagination>)}
                    </Col>
                </Row>
                {(props.searchProject && props.searchProject.length > 0) && (
                    <Row className="justify-content-start">
                        {props.searchProject.slice(0,4).map(project => <Col key={project.name} lg={3}> 
                            <Card>
                                <Card.Body>
                                    <Card.Title><a href={`/project/${project._id}`}>{project.name}</a></Card.Title>
                                    <Card.Subtitle>{project.authors.map(author => <Card.Link key={author} style={{color: "black"}}>{author}</Card.Link>)}</Card.Subtitle>
                                    <Card.Text>{project.abstract}</Card.Text>
                                    {project.lastVisited && (
                                    <Card.Text>Last visited: {new Date(project.lastVisited).toLocaleDateString()}</Card.Text>)}  
                                </Card.Body>
                                <Card.Footer>{project.tags.map(tag => <Card.Link key={tag} href={`/search?page=${1}&searchType=tags&searchTerm=${tag}`}>{tag}</Card.Link>)}</Card.Footer>
                            </Card>
                        </Col>)}
                    </Row>
                )}
                {(props.searchProject && props.searchProject.length > 0) && (
                    <Row className="justify-content-start" style={{marginTop: 20}}>
                        {props.searchProject.slice(4,8).map(project => <Col key={project.name} lg={3}> 
                            <Card>
                                <Card.Body>
                                    <Card.Title><a href={`/project/${project._id}`}>{project.name}</a></Card.Title>
                                    <Card.Subtitle>{project.authors.map(author => <Card.Link key={author} style={{color: "black"}}>{author}</Card.Link>)}</Card.Subtitle>
                                    <Card.Text>{project.abstract}</Card.Text>
                                    {project.lastVisited && (
                                    <small>Last visited: {new Date(project.lastVisited).toLocaleDateString()}</small>)} 
                                </Card.Body>
                                <Card.Footer>{project.tags.map(tag => <Card.Link key={tag} href={`/search?page=${1}&searchType=tags&searchTerm=${tag}`}>{tag}</Card.Link>)}</Card.Footer>
                            </Card>
                        </Col>)}
                    </Row>
                )}
            </Container><br />
        </Layout>
    )
}

export default Search;