const express = require('express');
const router = express.Router();
const projects = require('../services/project'); //add code for search inside here... Kinda like getAll


router.get('*/search', async (req, res) => {

  /* All requests for search are routed through the GET method. 
  Whether it comes through pagination or on initial submit */

  const user = req.session.user;
  const searchGroup = req.query.searchType;
  const searchQuery = req.query.searchTerm;
  const page = req.query.page || 1;
  const limit = 8;
  const searchResults = await projects.projectSearch(searchGroup, searchQuery, page, limit);
  if (searchResults) {
      const { result, searchProject, count, searchType, searchTerm, totalPages, currentPage, noProject } = searchResults;
      if (result === true) {
        res.render('Search', { user, searchProject, count, searchType, searchTerm, totalPages, currentPage });
      } else {
        res.render('Search', { user, noProject });
      }
  } else {
      res.render('Search', { user });
  }
});


module.exports = router;