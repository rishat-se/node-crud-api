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

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/ORG/PROJECT.git
$ cd PROJECT
```

To install and set up the library, run:

```sh
$ npm install -S myLib
```

## Running

### Starting API

to build a distribution version and run in standalone mode:
```sh
$ npm run start: prod
```

to build a distribution version and run in cluster mode:
```sh
$ npm run start: multi
```

### Running the tests
***Please, start app before you start testing, as tests do not start app themselves and connect via HTTP to an already running API.***

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

* **Rishat Agzamov** - [Rishat Agzamov](https://github.com/rishat-se)
