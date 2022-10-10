const { TestWatcher } = require('jest')
const request = require('supertest')
const app = require('../app.js')

//  aka index.js, connects node to the db
const db = require('../db/connection.js')

//  so tests are invoked with the test data rather than the whole dev db
const data = require('../db/data/test-data')

//  so we can run each test with a fresh, unaltered db each time
const seed = require('../db/seeds/seed.js')
//  by invoking this
beforeEach(() => {
    return seed(data);
  });

//  so it doesnt just hang until jest gets bored
afterAll(() => {
    if (db.end) db.end();
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////

describe('API tests', () => {
  describe('Endpoint testing', () => {

    test('return an array of objects with slug and description properties', () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({body}) => {
          expect(body).toBeInstanceOf(Array)        //  is it an array
          expect(body).toHaveLength(4)              //  with 4 things in it
          body.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({               //  are those things objects
              slug: expect.any(String),             //  with a slug property of string datatype
              description: expect.any(String)       //  and a description property of string datatype
            })
          )
        })
      })
    })
  })

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  describe('Error handling tests', () => {

    test('return "status:404, Route not found', () => {
      return request(app)
        .get('/api/someRandomThingThatIsntAValidPath')
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe("Route not found")
      return request(app)
        .get('/someRandomThingThatIsntAValidPath')
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe("Route not found")
          })
        })      
    })
  })
})