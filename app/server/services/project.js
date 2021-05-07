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
  return await Project.find();
};

/* update page view time */
const updateVisit = async (id) => {
  // Update or create new field showing the last time a project page was viewed.
  const filter = { _id: id };
  const update = { lastVisited: new Date() };
  return await Project.findOneAndUpdate(filter, update, { new: true });
};

/* Return searched projects */
const projectSearch = async (searchGroup, searchQuery, page, limit) => {

  // Exact keywords to be searched. Change query based on selected searchType
  let query;
  switch (searchGroup) {
    case "name":
      query = {'name': {'$regex': `${searchQuery}`}};
      break;
    case "abstract":
      query = {'abstract': {'$regex': `${searchQuery}`}};
      break;
    case "authors":
      query = {'authors': {'$regex': `${searchQuery}`}};
      break;
    case "tags":
      query = {'tags': {'$regex': `${searchQuery}`}};
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
    // Put in array so we can have the projects and total figure
    return [true, returnedProject, projectCount, searchGroup, searchQuery, totalPages, parseInt(page)]
  } else {
    return [false, "No projects matching your description was found"]
  }
};

module.exports = {
  updateVisit,
  projectSearch,
  getAll,
  create,
  getById
};