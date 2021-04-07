const express = require('express');
const router = express.Router();
const project = require('../services/project');
const user = require('../services/user');


router.get('/projects/submit', (req, res) => {
  // add code to render the CreateProject Component
  const error = req.flash("error");
  res.render('CreateProject', { props: error });
  !req.session.user && res.redirect('/login');
});

router.post('/projects/submit', (req, res) => {
  let projectInfo = {
    name :  req.body.name,
    abstract : req.body.abstract,
    tags : req.body.tags.split(","),
    authors : req.body.authors.split(",")
  }
  const results = project.create(projectInfo);
  if (results[0] === true) {
    res.redirect('/');
  } else {
    const error = results[1];
    req.flash("error", error);
    res.redirect(303, '/projects/submit');
  }
});


router.get('/project/:id', (req, res) => {
  // add code to render the CreateProject Component
  const params = req.params.id;
  const userParams = project.getById(params);
  res.render('Project', { props1: userParams, props2: user.getById(userParams.createdBy) });
});


module.exports = router;