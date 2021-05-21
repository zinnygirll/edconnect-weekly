// import required modules and files
import regeneratorRuntime from "regenerator-runtime";
const mongoose = require('mongoose');
const dbHandler = require('./dbHandler');
const projectService = require('../services/project');
const userService = require('../services/user');
const faker = require('faker');

/* Connect to a new in-memory database before running any tests.*/
beforeAll(async () => await dbHandler.connect());

/* Clear all test data after every test.*/
afterEach(async () => await dbHandler.clearDatabase());

/* Remove and close the db and server.*/
afterAll(async () => await dbHandler.closeDatabase());

/* Project cards test suite.*/
describe('Project cards', () => {

    /* Create user successfully */
    it('should successfully create new user', async () => {
        const userId = await userService.create(userPerson);
        const user = await userService.getById(userId[1]._id); 
        expect(user.firstname).toEqual(userPerson.firstname);
        expect(user.lastname).toEqual(userPerson.lastname);
        expect(user.matricNumber).toEqual(userPerson.matricNumber);
        expect(user.password).not.toBe(userPerson.password);
    });
    
    /* Create projects successfully and leaved the dateVisited field blank */
    it('should successfully create project document', async () => {
        const userId = await userService.create(userPerson);
        const user = await userService.getById(userId[1]._id);
        const createProjectId = await projectService.create({
            ...projectDoc,
            createdBy: user._id
        });
        const project = await projectService.getById(createProjectId[1]._id);
        expect(project.name).toEqual(projectDoc.name);
        expect(project.abstract).toEqual(projectDoc.abstract);
        expect(project.dateVisited.length).toBe(0);
    });
    
    /* Tests should show results of documents that match search criteria */
    it("Should show documents matching search criteria", async () => {
        const userId = await userService.create(userPerson);
        const project1 = await projectService.create({
            name: 'first project',
            abstract: 'A new dual‑camera system captures more of what you see and love.',
            authors: ["author1", "author2", "author3"],
            tags: ["one", "two", "three"],
            createdBy: userId[1]._id
        });
        const project2 = await projectService.create({
            name: 'second project',
            abstract: 'A new dual‑camera system captures more of what you see and love.',
            authors: ["author1", "author2", "author3"],
            tags: ["one", "two", "three"],
            createdBy: userId[1]._id
        });
        const search = await projectService.projectSearch("name", project1[1].name, 1, 1);
        expect(search.searchProject[0].name).toContain("first project");
        expect(search.count).toEqual(1);

        const search2 = await projectService.projectSearch("name", project2[1].name, 1, 1);
        expect(search2.searchProject[0].name).toContain("second project");
        expect(search2.count).toEqual(1);
    });
    
});

const userPerson = {
    firstname: "Edconnet",
    lastname: "Learning",
    email: "email@edconnect.com",
    matricNumber: "10/1221",
    program: "program",
    graduationYear: "2009",
    password: "password1234"
};

let projectDoc = {
    name: 'project 1',
    abstract: 'A new dual‑camera system captures more of what you see and love.',
    authors: ["author1", "author2", "author3"],
    tags: ["one", "two", "three"]
};