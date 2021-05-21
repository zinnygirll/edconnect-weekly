/**
 * @jest-environment jsdom
 */

import regeneratorRuntime from "regenerator-runtime";
import React from 'react';
import Search from '../../views/Search';
//import { render, unmountComponentAtNode } from '@testing-library/react';
import { render, unmountComponentAtNode } from 'react-dom';
import faker from 'faker';

//  A div where the component will be rendered.
let container; 

describe('Project cards shown on page', () => {

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup after test.
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  // project cards total length up to 20.
  let projectCards = new Array(20).fill(0).map(() => {
    return {
      _id: faker.random.alphaNumeric(6),
      name: faker.lorem.words(),
      authors: [faker.name.firstName(), faker.name.firstName()],
      abstract: faker.lorem.sentences(),
      tags: [faker.lorem.word(), faker.lorem.word()]
    };
  });

  it('displays only 8 project cards', async () => {
    render(<Search searchProject = { projectCards } />, container);
    const projects = document.getElementsByClassName('card')
    expect(projects.length).toBe(8)
  });
})