const express = require('express');
const router = express.Router();
const projects = require('../services/project'); //add code for search inside here... Kinda like getAll

router.get('/search', async (req, res) => {
  // add code to render the Search Component, and pass all the projects as props
  if (!req.query.page || req.query === undefined) {
    // On initial search from the search page or navbar input. Results gotten from router post are displayed.
    const user = req.session.user;
    const projectResult = req.flash("projectResult");
    const searchProject = projectResult[0];
    const count = projectResult[1];
    const searchType = projectResult[2];
    const searchTerm = projectResult[3];
    const totalPages = projectResult[4];
    const currentPage = projectResult[5];
    const noProject = req.flash("error")
    res.render('Search', { user, searchProject, count, noProject, searchType, searchTerm, totalPages, currentPage });

  } else {
    // On clicking the next/previous pagination arrows, use query values for search.
    const user = req.session.user;
    const searchGroup= req.query.searchType;
    const searchQuery = req.query.searchTerm;
    const page = req.query.page;
    const limit = 4;
    //console.log(decodeURIComponent(req.query));
    const results = await projects.projectSearch(searchGroup, searchQuery, page, limit);
    if (results[0]) {
      const searchProject = results[1];
      const count = results[2];
      const searchType = results[3];
      const searchTerm = results[4];
      const totalPages = results[5];
      const currentPage = results[6];
      res.render('Search', { user, searchProject, count, searchType, searchTerm, totalPages, currentPage });
    } else {
      const noProject = results[1];
      res.render('Search', { user, noProject });
    }
  }
});

// The search with queries
router.post('/search', async (req, res) => {
  const searchGroup= req.body.searchType;
  const searchQuery = req.body.searchTerm;
  const page = 1;
  const limit = 4;
  const results = await projects.projectSearch(searchGroup, searchQuery, page, limit);
  
  if (results[0]) {
    // redirect the search results back to the search page to be viewed
    req.flash("projectResult", [results[1], results[2], results[3], results[4], results[5], results[6]]);
    res.redirect('/search');
  } else {
    const error = results[1];
    req.flash("error", error);
    res.redirect('/search');
  }
})

module.exports = router;