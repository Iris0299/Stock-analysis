const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../../index')
const User = require('../models/user.model')
const Stock = require('../models/stock.model')
const Group = require('../models/group.model')
const APIStatus = require('../constants/APIStatus')

const expect = chai.expect

const testData = {
  user: {
    username: 'nguyenvannammmm',
    email: 'naaam.nv3899@gmail.com',
    password: '123'
  },
  stocks: [
    {
      code: 'ACB'
    },
    {
      code: 'AAA'
    },
    {
      code: 'ABS'
    }
  ],
  group: {
    groupName: 'Banks',
    stockCode: ['ACB', 'AAA', 'ABS', 'ZZZ']
  }
}

let userId, groupId, token

chai.use(chaiHttp)

describe('POST /api/groups', () => {
  before(async () => {
    const user = await User({ ...testData.user }).save()
    userId = user._id
    token = user.createToken()
  })

  it('return status 201 and created new group', (done) => {
    chai
      .request(app)
      .post('/api/groups')
      .set({ Authorization: token })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ groupName: testData.group.groupName })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('rs')
        expect(res.body.data.rs).to.have.property('userId')
        expect(res.body.data.rs).to.have.property('groupName')
        expect(res.body.data.rs).to.have.property('_id')
        groupId = res.body.data.rs._id
        expect(res.body.data.rs.userId).to.equal(userId.toString())
        expect(res.body.data.rs.groupName).to.equal(testData.group.groupName)
        done()
      })
  })

  it('return status 400 error when can not creat new group', (done) => {
    chai
      .request(app)
      .post(`/api/groups`)
      .set({ Authorization: token })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ groupName: '' })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400) // Validation Failed
        done()
      })
  })
})

describe('GET /api/groups/', () => {
  it('return group and stockCode', (done) => {
    chai
      .request(app)
      .get('/api/groups')
      .set({ Authorization: token })
      .query({ groupId: testData.group.groupId })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('groups')
        expect(res.body.data).to.have.property('totalRecords')
        expect(res.body.data.groups).to.be.an('array')
        done()
      })
  }
  )
})

describe('POST /api/groups/:groupId', () => {
  before(async () => {
    await Stock.insertMany(testData.stocks)
  })

  it('return status 201 and add stock code to group', (done) => {
    chai
      .request(app)
      .post(`/api/groups/${groupId}`)
      .set({ Authorization: token })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ stockCode: testData.group.stockCode[0] })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('rs')
        expect(res.body.data.rs).to.have.property('groupName')
        expect(res.body.data.rs).to.have.property('stockCode')
        expect(res.body.data.rs.groupName).to.equal(testData.group.groupName)
        expect(res.body.data.rs.stockCode[0]).to.equal(testData.group.stockCode[0])
        done()
      })
  })

  it('return 400 error when stock does not exits', (done) => {
    chai
      .request(app)
      .post(`/api/groups/${groupId}`)
      .set({ Authorization: token })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ stockCode: testData.group.stockCode[3] })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(404)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('msg')
        expect(res.body.status).to.equal(APIStatus.FAIL)
        done()
      })
  })
})

describe('DELETE /api/groups/:groupId', () => {
  it('return status 200 and deleted stockCode from group', (done) => {
    chai
      .request(app)
      .delete(`/api/groups/${groupId}`)
      .set({ Authorization: token })
      .send({ stockCode: testData.group.stockCode[0] })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('rs')
        done()
      })
  })

  it('return 400 error when stockCode does not exist', (done) => {
    chai
      .request(app)
      .delete(`/api/groups/${groupId}`)
      .set({ Authorization: token })
      .send({ stockCode: testData.group.stockCode[5] })
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

describe('DELETE /api/groups', () => {
  after(async () => {
    await Promise.all([
      User.deleteMany({}),
      Stock.deleteMany({}),
      Group.deleteMany({})
    ])
  })

  it('return status 200 and deleted group', (done) => {
    chai
      .request(app)
      .delete('/api/groups')
      .set({ Authorization: token })
      .send({ groupId })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('rs')
        expect(res.body.data.rs).to.have.property('groupName')
        expect(res.body.data.rs).to.have.property('stockCode')
        expect(res.body.data.rs.groupName).to.equal(testData.group.groupName)
        done()
      })
  })

  it('return 400 error when does not enter groupId', (done) => {
    chai
      .request(app)
      .delete('/api/groups')
      .set({ Authorization: token })
      .send({})
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
