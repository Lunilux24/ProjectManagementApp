## Stack
- Django + DRF
- PostgreSQL
- REST API
- React + Axios

## Objective
Create a simple project management app that uses a Django REST Framework backend backed by PostgreSQL that exposes CRUD endpoints for multiple related models, and a simple React frontend that consumes those endpoints using Axios. 

## System Architecture

![Application SA Diagram](SAD.svg)

## Data
#### Database
- Projects will be stored in a project table with an id, title, creation_date, description and a status (ready, in_progress, complete)
- CRUD operations possible on all projects
- A search bar to retrieve projects as well as sort button to sort by title and creation_date

#### API

| Methods | URLs                          | Actions                                        |
| ------- | ----------------------------- | ---------------------------------------------- |
| POST    | /api/projects                 | create new project                             |
| GET     | /api/projects                 | retrieve all projects                          |
| GET     | /api/projects/:id             | retrieve a project by id                       |
| PUT     | /api/projects/:id             | update a project by id                         |
| DELETE  | /api/projects/:id             | delete a project by id                         |
| GET     | /api/projects?title=[keyword] | find all projects where title contains keyword |
