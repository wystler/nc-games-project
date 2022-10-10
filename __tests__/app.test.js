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
          expect(body).toBeInstanceOf(Array)
          expect(body).toHaveLength(8)
          expect(body.hasOwnProperty("slug")).toBe(true)
          expect(body.hasOwnProperty("description")).toBe(true)
        })
      })
  })

  describe('Error handling tests', () => {

    test('return "status:404, Route not found', () => {
      return request(app)
        .get('/api/someRandomThingThatIsntAValidPath')
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe("Route not found")
        })
    })
  })
})



//   test("status:200, responds with an array of treasure objects", () => {
//     //  invoke it with the end point being tested
// return request(app)
//   .get("/api/")
//     //  hopefully get a response code
//   .expect(200)
//     //  and some stuff in the body
//   .then(({ body }) => {
//     const { treasures } = body;
//     //  that should be an array in this case
//     expect(treasures).toBeInstanceOf(Array);
//     //  with 26 objects inside
//     expect(treasures).toHaveLength(26);
//     treasures.forEach((treasure) => {
//       expect(treasure).toEqual(
//     //  with these characteristics
//         expect.objectContaining({
//           treasure_id: expect.any(Number),
//           treasure_name: expect.any(String),
//           colour: expect.any(String),
//           age: expect.any(Number),
//           cost_at_auction: expect.any(Number),
//           shop_id: expect.any(Number),
//         })
//       );
//     });
//   });
// });
// })