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
    db.end();
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////

describe('API tests', () => {
  describe('Endpoint testing', () => {

    test('GET/api/categories - return an array of objects with slug and description properties', () => {
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

    test('GET/api/reviews/:review_id - return a review object with the following properties: review_id, title, review_body, designer, review_img_url, votes, category, owner', () => {
      return request(app)
        .get("/api/reviews/3")
        .expect(200)
        .then(({body}) => {
          expect(body).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              review_body: expect.any(String),
              designer: expect.any(String),
              review_img_url: expect.any(String),
              votes: expect.any(Number),
              category: expect.any(String),
              owner: expect.any(String)
            })
          )
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