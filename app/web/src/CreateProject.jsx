import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Layout from './shared/Layout';

const CreateProject = (props) => {
  const [projectName, setProjectName] = useState('');
  const [abstract, setAbstract] = useState('');
  const [authors, setAuthors] = useState('');
  const [tags, setTags] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [alertBlock, setAlertBlock] = useState(false);
  let history = useHistory();

  const handleInputChange = event => {
    const {name, value} = event.target
    switch (name) {
        case 'name':
            setProjectName(value)
            break;
        case 'abstract':
            setAbstract(value)
            break;
        case 'authors':
            setAuthors(value)
            break;
        case 'tags':
            setTags(value)
            break;
    }
  }

  let cookieCheck = document.cookie.split(';').some((item) => item.trim().startsWith('uid='));
    if (!cookieCheck) {
      history.push('/login'); // redirect user to login.html page if cookie doesn't exist
    }

  const handleSubmit = event => {
    event.preventDefault();
    let projectInfo = {
        name : projectName,
        authors : authors.split(","),
        abstract : abstract,
        tags : tags.split(",")
    }


    fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(projectInfo), // All form data
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then ((response) => {
            if (response.status === "ok") {
                history.push("/"); // redirect user to home page
            } else if (response.status !== "ok") {
                setAlertBlock(true);
                setAlerts(response.errors); // Supposed to print error message.
            }
        })
  }

    return(
        <Layout>
          <main class="mx-auto w-50 p-3">
            <h3>Submit Project</h3>
            <Form name="submitProject" onSubmit={handleSubmit}> 
                  {alertBlock && (
                  <Alert variant="danger">
                    {alerts.map((anyAlert) => { return <> {anyAlert} <br/></>})}
                  </Alert>)}
                  <Form.Group>
                    <Form.Label for="name" class="form-label">Project Name:</Form.Label>
                    <Form.Control type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label for="abstract" class="form-label">Project Abstract:</Form.Label>
                    <Form.Control as="textarea" 
                      id="abstract" 
                      name="abstract" 
                      rows={4} cols={100}
                      value={abstract}
                      onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label for="authors" class="form-label">Author(s):</Form.Label>
                    <Form.Control type="text" 
                      id="authors" 
                      name="authors" 
                      placeholder="Enter author names (seperated by comma)"
                      value={authors}
                      onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label for="tags" class="form-label">Tag(s):</Form.Label>
                    <Form.Control type="text" 
                      id="tags" 
                      name="tags" 
                      placeholder="Use # to tag project with different topics"
                      value={tags}
                      onChange={handleInputChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit">Continue</Button>
            </Form>
        </main><br></br>
        </Layout>
    )
}

export default CreateProject;