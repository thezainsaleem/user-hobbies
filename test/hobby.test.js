const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app')

const User = require('../models/user.model')
const Hobby = require('../models/hobby.model')

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Test Hobbies', () =>{
  let user = null;
  before(async () => {
    user = await User.create({
      name: "Example",
      hobbies: []
    });
  });
  describe('Get /api/v1/users/:userId/hobbies/',() => {
    it("should get all hobbies of a user", (done) => {
      chai.request(server)
          .get(`/api/v1/users/${user._id}/hobbies`,).query({page: 1})
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body.docs.should.be.a('array');
            done();
          });
    })
  });

  describe('POST /api/v1/users/:userId/hobbies/',() => {
    it("should create a hobby for a user", (done) => {
      chai.request(server)
          .post(`/api/v1/users/${user._id}/hobbies`,).send({name: "Dummy", passionLevel: "High", year: "1994"})
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            done();
          });
    })
  });

  describe('GET /api/v1/users/:userId/hobbies/:id', () => {
    let hobby = null;
    before(async () => {
      hobby = await Hobby.create({
        name: "Dummy",
        passionLevel: "High",
        year: "1994"
      });
    });
    it("should get details of a hobby for a user", (done) => {
      chai.request(server)
          .get(`/api/v1/users/${user._id}/hobbies/${hobby._id}`)
          .end((err, resp) => {
            console.log(JSON.stringify(resp.body));
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body._id.should.eq(hobby._id.toString());
            done();
          });
    })
  });

  describe('PUT /api/v1/users/:userId/hobbies/:id',() => {
    let hobby = null;
    before(async () => {
      hobby = await Hobby.create({
        name: "Dummy",
        passionLevel: "High",
        year: "1994"
      });
    });
    it("should update details of a hobby for a user", (done) => {
      chai.request(server)
          .put(`/api/v1/users/${user._id}/hobbies/${hobby._id}`).send({name: "Dummy",
          passionLevel: "High",
          year: "1995"})
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body.year.should.eq('1995');
            resp.body._id.should.eq(hobby._id.toString());
            done();
          });
    })
  });

  describe('DELETE /api/v1/users/:userId/hobbies/:id',() => {
    let hobby = null;
    before(async () => {
      hobby = await Hobby.create({
        name: "Dummy",
        passionLevel: "High",
        year: "1994"
      });
    });
    it("should delete the hobby for a user", (done) => {
      chai.request(server)
          .delete(`/api/v1/users/${user._id}/hobbies/${hobby._id}`)
          .end((err, resp) => {
            console.log(JSON.stringify(resp.body))
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body._id.should.eq(hobby._id.toString());
            done();
          });
    })
  });
});
