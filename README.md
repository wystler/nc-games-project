# Ben's NC Games Project

This project is my attempt at replicating the functionality of a review website API that allows users to search for reviews of boardgames and leave comments about the reviews.  

Details of what each path in the API does is included in the ./endpoints.json and the whole app is currently being hosted here : https://nc-board-game-api.herokuapp.com/api

## Setting up the repo

You will first need to clone the repo to your local machine by using the command :

```
$ git clone https://github.com/wystler/nc-games-project.git
```

You will need to create two .env files with the following contents to be able to fully use this repo :

                        
 `.env.test` containing the line   `PGDATABASE=nc_games_test` 
                        
 `.env.development` containing the line  `PGDATABASE=nc_games`

## Installing required dependencies

I recommend using Node version 18.7.0 and Postgres 8.8.0 or higher to run this repo.
Some dependencies will need to be installed by running the following commands :   
```
$ npm i
```
To allow the test suite to run, these can be installed as dev dependencies
```
$ npm i -D jest

$ npm i -D jest-sorted

$ npm i -D supertest
```
## Creating and seeding the database

```
$ npm run setup-dbs

$ npm run seed
```

## Running the test suite

To run all tests for the app and the database utilities

```
$ npm t         
```

To run just the app tests

```
$ npm t -p ./__tests__/app.test.js
```