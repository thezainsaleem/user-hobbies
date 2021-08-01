const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app')

const User = require('../models/user.model')

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Test Users', () =>{
  
  describe('Get /api/v1/users',() => {
    it("should get all users", (done) => {
      chai.request(server)
          .get("/api/v1/users",).query({page: 1})
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body.docs.should.be.a('array');
            done();
          });
    })
  });

  describe('POST /api/v1/users/',() => {
    it("should create user", (done) => {
      chai.request(server)
          .post("/api/v1/users",).send({name: "Admin Example", hobbies: []})
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            done();
          });
    })
  });

  describe('GET /api/v1/users/:id', () => {
    let user = null;
    before(async () => {
      user = await User.create({
        name: "Example",
        hobbies: []
      });
    })
    it("should get details of a user", (done) => {
      chai.request(server)
          .get(`/api/v1/users/${user._id}`,)
          .end((err, resp) => {
            console.log("REQE")
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body._id.should.eq(user._id.toString());
            done();
          });
    })
  });

  describe('PUT /api/v1/users/:id',() => {
    let user = null;
    before(async () => {
      user = await User.create({
        name: "Example",
        hobbies: []
      });
    })
    it("should update details of a user", (done) => {
      chai.request(server)
          .put(`/api/v1/users/${user._id}`).send({name: "Dummy", hobbies: []})
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body.name.should.eq('Dummy');
            resp.body._id.should.eq(user._id.toString());
            done();
          });
    })
  });

  describe('DELETE /api/v1/users/:id',() => {
    let user = null;
    before(async () => {
      user = await User.create({
        name: "Example",
        hobbies: []
      });
    })
    it("should delete the user", (done) => {
      chai.request(server)
          .delete(`/api/v1/users/${user._id}`)
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body._id.should.eq(user._id.toString());
            done();
          });
    })
  });
});
