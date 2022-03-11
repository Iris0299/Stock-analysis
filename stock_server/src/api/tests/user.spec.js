const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../../index')
const User = require('../models/user.model')
const APIStatus = require('../constants/APIStatus')

const expect = chai.expect

const testData = {
  user: {
    username: 'duyen',
    password: 'duyen',
    email: 'duyen@gmail.com'
  }
}

let token

chai.use(chaiHttp)

describe('POST /api/users/signup', () => {
  it('return status 201 and new user token', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: testData.user.username,
        email: testData.user.email,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('token')
        done()
      })
  })

  it('return 400 error when email is already registered', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: testData.user.username,
        email: testData.user.email,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('msg')
        expect(res.body.status).to.equal(APIStatus.FAIL)
        done()
      })
  })
})

describe('POST /api/users/login', () => {
  it('return user token', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: testData.user.username,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('token')
        token = res.body.data.token
        done()
      })
  })

  it('return 400 error when username or password wrong', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: testData.user.username,
        password: testData.user.password + 'haha'
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('msg')
        expect(res.body.status).to.equal(APIStatus.FAIL)
        done()
      })
  })
})

describe('GET /api/users/info', () => {
  after(async () => {
    await User.deleteMany({})
  })

  it('return user info: username and email', (done) => {
    chai
      .request(app)
      .get('/api/users/info')
      .set({ Authorization: token })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('info')
        expect(res.body.data.info).to.have.property('username')
        expect(res.body.data.info).to.have.property('email')
        expect(res.body.data.info.username).to.equal(testData.user.username)
        expect(res.body.data.info.email).to.equal(testData.user.email)
        done()
      })
  })
  it('return 400 error when token is not valid', (done) => {
    chai
      .request(app)
      .get('/api/users/info')
      .set({ Authorization: 'random' })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('msg')
        expect(res.body.status).to.equal(APIStatus.FAIL)
        done()
      })
  })
})
