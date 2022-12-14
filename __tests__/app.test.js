const request = require('supertest')
const app = require('../app.js')
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

  describe('GET/api/categories', () => {
    test('return an array of objects with slug and description properties', () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({body}) => {
          expect(body).toBeInstanceOf(Array)        
          expect(body).toHaveLength(4)              
          body.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({               
              slug: expect.any(String),             
              description: expect.any(String)       
            })
          )
        })
      })
    })

    test('return "status:404, Route not found"', () => {
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

///////////////////////////////////////////////////////////////////////////////////////////////////////

describe('GET/api/reviews/:review_id', () => {
  test('return a specific review by passing a parametric endpoint to /api/reviews', () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({body}) => {
        expect(body).toEqual({
            review_id: 3,
            title: 'Ultimate Werewolf',
            designer: 'Akihisa Okui',
            owner: 'bainesface',
            review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            review_body: "We couldn't find the werewolf!",
            category: 'social deduction',
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
            comment_count: 3
      })          
    })
  })
  
  test('returns the specified review object with a "comment_count" property, with a value of the total number of comments for that review', () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({body}) => {
        expect(body).toEqual({
            review_id: 3,
            title: 'Ultimate Werewolf',
            designer: 'Akihisa Okui',
            owner: 'bainesface',
            review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            review_body: "We couldn't find the werewolf!",
            category: 'social deduction',
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
            comment_count: 3
        }) 
      })
    })
      
  test('return "status:404, Route not found"', () => {
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

  test('return "status:404, sorry, no review with that id exists" when asked for a review_id that doesnt exist', () => {
    return request(app)
      .get('/api/reviews/100000')
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("sorry, no review with that id exists")
    })
  })

  test('return "status:400, request has a value of the incorrect datatype" when asked for a review_id that isnt a number', () => {
    return request(app)
      .get('/api/reviews/n0tANumb3r')
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("request has a value of the incorrect datatype")
    })       
  })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('GET /api/reviews/:review_id/comments', () => {
  test('return an array of comments for the given review_id with each comment having the following properties: comment_id, votes, created_at, author, body, review_id', () => {
    return request(app)
      .get('/api/reviews/3/comments')
      .expect(200)
      .then(({body}) => {
        expect(body).toBeSortedBy("created_at", { descending: true })              
        expect(body).toBeInstanceOf(Array)        
        expect(body).toHaveLength(3)        
        body.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({               
              comment_id: expect.any(Number),             
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              review_id: expect.any(Number)
            })
          )
        })
      })
  })


test('return "status:404, Route not found"', () => {
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

test('return "status:404, Resource not found" when asked for a review_id that doesnt exist', () => {
  return request(app)
    .get('/api/reviews/100000/comments')
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("Resource not found")
  })
})

test('return "status:200, sorry, there are no comments for that review" when asked for a review_id that doesnt exist', () => {
  return request(app)
    .get('/api/reviews/1/comments')
    .expect(200)
    .then(({body}) => {
      expect(body.msg).toBe("sorry, there are no comments for that review")
  })
})

test('return "status:400, request has a value of the incorrect datatype" when asked for a review_id that isnt a number', () => {
  return request(app)
    .get('/api/reviews/n0tANumb3r/comments')
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("request has a value of the incorrect datatype")
  })       
})
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('GET/api/reviews', () => {
  test('returns a reviews array of review objects, each of which should have the following properties: owner, title, review_id, category, review_img_url, created_at, votes, designer, comment_count', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(({body}) => {
        expect(body).toBeSortedBy("created_at", { descending: true })              
        expect(body).toBeInstanceOf(Array)        
        expect(body).toHaveLength(13)        
        body.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({               
              owner: expect.any(String),             
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              designer: expect.any(String),
              comment_count: expect.any(Number)
            })
          )
        })
      })
    })

    test('returns a reviews array of review objects, all with the passed category type', () => {
      return request(app)
        .get('/api/reviews?category=dexterity')
        .expect(200)
        .then(({body}) => {     
          expect(body).toBeInstanceOf(Array)        
          expect(body).toHaveLength(1)        
          body.forEach((review) => {
            expect(review).toEqual(
              expect.objectContaining({               
                owner: expect.any(String),             
                title: expect.any(String),
                review_id: expect.any(Number),
                category: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                designer: expect.any(String),
                comment_count: expect.any(Number)
              })
            )
          })
        })
      })
      
    test('return "status:400, Invalid category type" when given an invalid category type query', () => {
      return request(app)
      .get('/api/reviews?category=cheese')
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("Invalid category type")
      })
    })

  test('returns all the reviews objects, ordered by any valid column name query', () => {
    return request(app)
    .get('/api/reviews?sort_by=votes')
    .expect(200)
    .then(({body}) => {
      expect(body).toBeSortedBy("votes", { descending: true })              
      expect(body).toBeInstanceOf(Array)        
      expect(body).toHaveLength(13)        
      body.forEach((review) => {
        expect(review).toEqual(
          expect.objectContaining({               
            owner: expect.any(String),             
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(Number)
          })
        )
      })
    })
  })

  test('returns all the reviews objects, ordered by any valid order direction query', () => {
    return request(app)
    .get('/api/reviews?order=asc')
    .expect(200)
    .then(({body}) => {
      expect(body).toBeSortedBy("created_at", { ascending: true })              
      expect(body).toBeInstanceOf(Array)        
      expect(body).toHaveLength(13)        
      body.forEach((review) => {
        expect(review).toEqual(
          expect.objectContaining({               
            owner: expect.any(String),             
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(Number)
          })
        )
      })
    })
  })

  test('returns all the reviews objects, ordered by any valid column name query and direction', () => {
    return request(app)
    .get('/api/reviews?sort_by=designer&order=asc')
    .expect(200)
    .then(({body}) => {
      expect(body).toBeSortedBy("designer", { ascending: true })              
      expect(body).toBeInstanceOf(Array)        
      expect(body).toHaveLength(13)        
      body.forEach((review) => {
        expect(review).toEqual(
          expect.objectContaining({               
            owner: expect.any(String),             
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(Number)
          })
        )
      })
    })
  })

  test('return "status:400, Invalid sort query type" when given an invalid sort query type', () => {
    return request(app)
    .get('/api/reviews?sort_by=notAColumn')
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Invalid sort query type")
    })
  })

  test('return "status:400, Invalid order query type" when given an invalid order query type', () => {
    return request(app)
    .get('/api/reviews?order=random')
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Invalid order query type")
    })
  })

  test('return "status:400, Invalid query type" when given an invalid query type', () => {
    return request(app)
    .get('/api/reviews?random=asc')
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Invalid query type")
    })
  })
})


////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('GET/api/users', () => {      
  test('return an array of user objects with username, name, and avatar_url properties', () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({body}) => {
        expect(body).toBeInstanceOf(Array)       
          expect(body).toHaveLength(4)             
          body.forEach((user) => {
          expect(user).toEqual(
          expect.objectContaining({               
            username: expect.any(String),             
            name: expect.any(String),
            avatar_url: expect.any(String)
          })
        )
      })
    })
  })      
})  

///////////////////////////////////////////////////////////////////////////////////////////////////////////      

describe('PATCH/api/reviews/:review_id', () => {      
  test('update and return the updated review', () => {
    return request(app)
      .patch("/api/reviews/3")
      .send({inc_votes: 20})
      .expect(200)
      .then(({body}) => {
        expect(body.votes).toBe(25)
    })
  })
  
  test('return "status:400, body of request is not in an acceptable form"', () => {
    const badPatch = {something:"wrong"}
    return request(app)
      .patch('/api/reviews/2')
      .send(badPatch)
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("body of request is not in an acceptable form")
    })
  })

  test('return "status:400, request has a value of the incorrect datatype"', () => {
    const badPatch = {inc_votes:"notANumber"}
    return request(app)
      .patch('/api/reviews/2')
      .expect(400)
      .send(badPatch)
      .then(({body}) => {
        expect(body.msg).toBe("request has a value of the incorrect datatype")
    })
  })

  test('return "status:404, sorry, no review with that id exists', () => {
    return request(app)
      .patch('/api/reviews/200000')
      .send({inc_votes:10})
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("sorry, no review with that id exists")
    })
  })

  test('return "status:400, request has a value of the incorrect datatype"', () => {
    return request(app)
      .patch('/api/reviews/notANumber')
      .send({inc_votes:10})
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("request has a value of the incorrect datatype")
      })
    })
  })

///////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('POST /api/reviews/:review_id/comments', () => {
  test('add the passed comment to the comments table and return the added comment', () => {
    return request(app)
      .post('/api/reviews/10/comments')
      .send({username:"dav3rid", body:"4 wheels > 2"})
      .expect(201)
      .then(({body}) => {
        expect(body).toEqual(
          expect.objectContaining({               
            author: expect.any(String),             
            body: expect.any(String),
            comment_id: expect.any(Number),
            created_at: expect.any(String),
            review_id: expect.any(Number),
            votes: expect.any(Number)
          })
        )
      })
    })
  

  test('return "status:400, body of request is not in an acceptable form"', () => {
    const badPost = {something:"wrong"}
    return request(app)
      .post('/api/reviews/2/comments')
      .send(badPost)
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("body of request is not in an acceptable form")
    })
  })

  test('return "status:404, sorry, no user with that id exists"', () => {
    return request(app)
      .post('/api/reviews/2/comments')
      .send({username:"bobGenghisKhan", body:"4 legs > 4 wheels"})
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("sorry, no user with that id exists")
    })
  })

  test('return "status:404, sorry, no review with that id exists"', () => {
    return request(app)
      .post('/api/reviews/20000/comments')
      .send({username:"dav3rid", body:"4 wheels > 2"})
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("Resource not found")
    })
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('DELETE /api/comments/:comment_id', () => {
  test('return "status:204" and no content', () => {
    return request(app)
    .delete('/api/comments/1')
    .expect(204)
    .then(({body}) => {
      expect(body).toEqual({})
    })
  })

test('return "status:404, Resource not found" when passed id does not exist ', () => {
  return request(app)
    .delete('/api/comments/20000')
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("Resource not found")
  })
})

test('return "status:400, request has a value of the incorrect datatype" when passed id is not a number', () => {
  return request(app)
    .delete('/api/comments/notAnId')
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("request has a value of the incorrect datatype")
  })
})
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('GET /api', () => {
  test('returns the api endpoints file as a json', () => {
    return request(app)
    .get('/api')
    .expect(200)
    .then(({body}) => {
      expect(body).toBeInstanceOf(Object)
    })
  })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('GET /api/users/:username', () => {
  test('returns an object containing the specified users details', () => {
    return request(app)
    .get('/api/users/bainesface')
    .expect(200)
    .then(({body}) => {
      expect(body).toEqual({
        username: 'bainesface',
        name: 'sarah',
        avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4'
      })
    })
  })

  test('returns "status:404, Resource not found" when a requesting a non existant username', () => {
    return request(app)
    .get('/api/users/notAUsername')
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("Resource not found")
    })
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////

describe('PATCH /api/comments/:comment_id', () => {
  test('updates the specified comment and returns the updated comment', () => {
    return request(app)
    .patch("/api/comments/2")
    .send({inc_votes: 20})
    .expect(200)
    .then(({body}) => {
      expect(body.votes).toBe(33)
    })
  })

  test('return "status:400, body of request is not in an acceptable form"', () => {
    const badPatch = {something:"wrong"}
    return request(app)
      .patch('/api/comments/2')
      .send(badPatch)
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("body of request is not in an acceptable form")
    })
  })

  test('return "status:400, request has a value of the incorrect datatype"', () => {
    const badPatch = {inc_votes:"notANumber"}
    return request(app)
      .patch('/api/comments/2')
      .expect(400)
      .send(badPatch)
      .then(({body}) => {
        expect(body.msg).toBe("request has a value of the incorrect datatype")
    })
  })

  test('return "status:404, sorry, no comment with that id exists', () => {
    return request(app)
      .patch('/api/comments/200000')
      .send({inc_votes:10})
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("sorry, no comment with that id exists")
    })
  })

  test('return "status:400, request has a value of the incorrect datatype"', () => {
    return request(app)
      .patch('/api/comments/notANumber')
      .send({inc_votes:10})
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("request has a value of the incorrect datatype")
      })
    })
})


})



