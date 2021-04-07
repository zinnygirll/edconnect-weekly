import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Layout from './shared/Layout';

const CreateProject = (props) => {

    return(
        <Layout>
          <main class="mx-auto w-50 p-3">
            <h3>Submit Project</h3>
            <Form name="submitProject" id="createProjectForm" action="/projects/submit" method="POST"> 
                  {props.props.length > 0 && (
                  <Alert variant="danger">
                    {props.props.map((anyAlert) => { return <> {anyAlert} <br/></>})}
                  </Alert>)}
                  <Form.Group>
                    <Form.Label>Project Name:</Form.Label>
                    <Form.Control type="text" id="name" name="name" placeholder="Enter project name" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Project Abstract:</Form.Label>
                    <Form.Control as="textarea" id="abstract" name="abstract" rows={4} cols={100} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Author(s):</Form.Label>
                    <Form.Control type="text" id="authors" name="authors" placeholder="Enter author names (seperated by comma)" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tag(s):</Form.Label>
                    <Form.Control type="text" id="tags" name="tags" placeholder="Use # to tag project with different topics" />
                  </Form.Group>
                  <Button variant="primary" type="submit">Continue</Button>
            </Form>
        </main><br></br>
        </Layout>
    )
}

export default CreateProject;