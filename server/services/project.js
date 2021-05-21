const Project = require("../models/project");
const helper= require("../models/mongo_helper");

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
  try {
    // Create user and add to database.
    const project = new Project();
    project.name = name
    project.abstract = abstract
    project.authors = authors
    project.tags = tags
    project.createdBy = createdBy
    
    if (await project.save()) {
      return [true, project];
    };
  } catch (error) {
    /* Incase of error, catch, do ya thing! */
    return [false, helper.translateError(error)];
  }
};

/* Return project with specified id */
const getById = async (id) => {
  // populate projects with data from file.
  return await Project.findOne({ _id: id });
};

/* Return all projects */
const getAll = async () => {
  // populate projects with data from file.
  return await Project.find().limit(4);
};

/* update page view time by logged in viewer */
const updateVisit = async (userId, projectId) => {
  // Update or create new field showing the last time a project page was viewed by an existing user.
  let projectVisit = await Project.findOne({ _id: projectId, 'dateVisited.userId': userId })

  if (!projectVisit) {
    return await Project.findOneAndUpdate(
      { _id: projectId }, 
      { $addToSet: { 
                dateVisited: {
                  userId: userId,
                  dateViewed: new Date()
                }  
              } 
      })
  } else {
    return await Project.findOneAndUpdate(
      { _id: projectId, 'dateVisited.userId': userId }, 
      { $set: {
          'dateVisited.$.dateViewed': new Date()
        }
      });
  }
};

/* Return searched projects */
const projectSearch = async (searchGroup, searchQuery, page, limit) => {
  // First confirm that both searchTerm and Search Criteria exists
  if (searchGroup && searchQuery) {
      // Exact keywords to be searched. Change query based on selected searchType
    let query;
    switch (searchGroup) {
      case "name":
        query = {'name': {'$regex': `${searchQuery}`, '$options': 'i'}};
        break;
      case "abstract":
        query = {'abstract': {'$regex': `${searchQuery}`, '$options': 'i'}};
        break;
      case "authors":
        query = {'authors': {'$regex': `${searchQuery}`, '$options': 'i'}};
        break;
      case "tags":
        query = {'tags': {'$regex': `${searchQuery}`, '$options': 'i'}};
        break;
    }

    // offset calculations for the skip cursor
    let perPage = parseInt(limit);
    let offsetValue = (parseInt(page) - 1) * perPage;
    
    // populate projects with data from file that includes searched keywords
    const returnedProject = await Project.find(query).skip(offsetValue).limit(perPage);
    const projectCount = await Project.find(query).countDocuments();
    const totalPages = Math.ceil(projectCount / perPage);

    if (returnedProject.length > 0) {
      /* Return all required documents to the controller/search.js.
      The exact searchGroup (searchType) and searchQuery(searchTerm) is also sent back.
      The idea is to send them as props to the view page for the purpose of pagination*/
      return {result: true, searchProject: returnedProject, count: projectCount, searchType: searchGroup, searchTerm: searchQuery, totalPages: totalPages, currentPage: parseInt(page)}
    } else {
      return {result: false, noProject: "No projects matching your description was found"}
    }
  }
};

module.exports = {
  updateVisit,
  projectSearch,
  getAll,
  create,
  getById
};