<p align="center">
  <a href="https://annea.ai/" target="blank"><img src="https://annea.ai/wp-content/uploads/2020/10/ANNEA-Logo-long-tagline-green-bg.jpg" width="200" alt="Annea Logo" /></a>
</p>

# ANNEA UI 📃
The following project is the backend serivce that manage CRUD operations or indicator and provice API that could be consumed from any FE client **(using Graphql client)**.
This backend service is built with the framework NestJS, please take a look at the section stack below 👇 to know how to run it.

## Project stack information
The project is built with Nestjs which is just an framework dedicated to create standalone backend service.
The porject main language is Typescript (Javascript + Types) for all the business logic, different library to manage http calls and typeORM to manage entities.
To feel more familiar with these technologies and stacks, please find below all relevant documentations:
- NestJs (Backend/Server side framework) -> [NESTJS DOCS](https://docs.nestjs.com/) 👩‍💻🧑‍💻
- Express JS (Routing) -> [Express DOCS](https://expressjs.com/) 💫
- GraphQL (Javascript with types) -> [GraphQL DOCS](https://graphql.org/) 🧠

## Setup ⏳
Please make sure you have the minimum requirements to be able to run the project. This means you already installed Node latest stable version.
Optional: You could also install Docker in case you would like to create portable image and test it in different machine.
- You can install node from here: [Download Node](https://nodejs.org/en) 🏗️

## How to run the project ⏲
This a simple NPM project, this mean you just need to install the package used first, then project will be able to be started:
1. Open a new terminal.
2. Cd (ie: locate) to the path of the project root.
3. Run the following command ``npm i``. The previous command will take a bit of time to install all the packages.
4. After that , run the command ``npm start``.
If everything is fine, then a server will be starting and listening in the following address `http://localhost:3001`.

## Test the project 🧨
The project conatain different test case of functionality and components:\
1. run the command ``npm test``
This is the output after finishing the test execution:
```
Test Suites: 5 passed, 5 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        3.678 s, estimated 4 s
Ran all test suites.
```

## Developer important notes 🎯
- Please keep in your mind that this project uses huskies which is a pre-check before you commit and push.\
  - This is a safety to keep always the project build successful and the code style unique cross all the developers. So always keep in your mind to run the formatter before pushing.
- The project use postgresql as DB so you might need DBeaver to check the Table or do DB operations. -> [LINK](https://dbeaver.io/)

## Building and Deployment
The CI/CD of this project is handled by the github actions workflow:
- You can visit the actions tab to find out all the previous build of this project.
For the project deployment:
- This is handled directly via an intergration with a service cloud provider
- With simple manual click (or merge pull request) in the cloud service, we will have the project live under the following link: [Annea UI](https://annea-backend-service.onrender.com/)
