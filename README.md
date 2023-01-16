# Node CRUD API

## Prerequisites

This project requires NodeJS (version 18 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
8.19.2
v18.12.1
```

## Description

Node CRUD API can run in two modes:

- standalone. Starts single instance of application, which processes and store records in in-memory database.
- cluster. Starts loadbalancer on port 4000 and multiple workers, each on its own port starting from port 4001. Loadbalancer accepts request from clients and resends them to workers using Round Robin algoruthm. Worker processes request and sends response to loadbalancer, which resends response to client. Database is stored in loadbalancer's memory. Workers access database over IPC.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/rishat-se/node-crud-api.git
$ cd node-crud-api
```

Switch to dev branch:

```sh
git checkout dev
```

Install dependencies and devdependencies, run:

```sh
$ npm install
```

optional: If you need to change Typescript code install typescript globally **npm install -g typescript** or in devdependencies **npm install -D typescript**

## Running

### Starting API

to run in standalone mode:

```sh
$ npm run start:dev
```

to run in cluster mode:

```sh
$ npm run start:multi
```

### Running the tests

**_Please, start app before you start testing, as tests do not start app themselves and connect via HTTP to an already running API._**

to run scenario 1:

```sh
$ npm run test:1
```

to run scenario 2:

```sh
$ npm run test:2
```

to run scenario 3:

```sh
$ npm run test:3
```

## Usage

### API:

API process following requests:

- GET api/users - returns all user rescords from database.
- GET api/users/{userId} - returns record of user, whose id is equal userId. userId has to be valid uuid version 4 id assigned to user record when record was created.
- POST api/users with user`s username, age, and hobbies in the body of request in JSON format - creates new user record in database and returns it.
- PUT api/users/{userId} with user`s username, age, and hobbies in the body of request in JSON format - update existing user.
- DELETE api/users/{userId} - delete existing user from database

## Authors

- **Rishat Agzamov** - [Rishat Agzamov](https://github.com/rishat-se)
