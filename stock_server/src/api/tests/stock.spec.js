const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../../index')
const User = require('../models/user.model')
const Stock = require('../models/stock.model')
const Expected = require('../models/expected.model')
const APIStatus = require('../constants/APIStatus')

const expect = chai.expect
const testData = {
  user: {
    username: 'duyen',
    email: 'duyen@gmail.com',
    password: 'duyen'
  },
  stocks: [
    {
      code: 'ABC',
      price: 100
    },
    {
      code: 'VNPT',
      price: 200
    },
    {
      code: 'VNG',
      price: 300
    }
  ],
  expectedPrice: {
    stockCode: 'ABC',
    value: 20
  }
}
let _id, token

chai.use(chaiHttp)

describe('GET /api/stocks', () => {
  before(async () => {
    await Stock.insertMany(testData.stocks)
  })

  it('return all stocks in database and total records', (done) => {
    chai
      .request(app)
      .get('/api/stocks')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('stocks')
        expect(res.body.data).to.have.property('totalRecords')
        expect(res.body.data.totalRecords).to.equal(testData.stocks.length)
        expect(res.body.data.stocks).to.be.an('array')
        done()
      })
  })
})

describe('GET /api/stocks/:stockCode', () => {
  it('return stock data', (done) => {
    chai
      .request(app)
      .get(`/api/stocks/${testData.stocks[0].code}`)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('stock')
        expect(res.body.data.stock).to.have.property('code')
        expect(res.body.data.stock).to.have.property('price')
        expect(res.body.data.stock.code).to.equal(testData.stocks[0].code)
        expect(res.body.data.stock.price).to.equal(testData.stocks[0].price)
        done()
      })
  })

  it('return 404 error when stock does not exist', (done) => {
    chai
      .request(app)
      .get(`/api/stocks/${testData.stocks[0].code + 'ZZZ'}`)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(404)
        expect(res.body).to.have.property('status')
        expect(res.body.status).to.equal(APIStatus.FAIL)
        done()
      })
  })
})

describe('POST /api/stocks/expected-price/:stockCode', () => {
  before(async () => {
    const user = await User({ ...testData.user }).save()
    _id = user._id
    token = user.createToken()
  })

  it('return status 201 and new expected price', (done) => {
    chai
      .request(app)
      .post(`/api/stocks/expected-price/${testData.expectedPrice.stockCode}`)
      .set({ Authorization: token })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ value: testData.expectedPrice.value })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('rs')
        expect(res.body.data.rs).to.have.property('userId')
        expect(res.body.data.rs).to.have.property('stockCode')
        expect(res.body.data.rs).to.have.property('value')
        expect(res.body.data.rs.userId).to.equal(_id.toString())
        expect(res.body.data.rs.stockCode).to.equal(
          testData.expectedPrice.stockCode
        )
        expect(res.body.data.rs.value).to.equal(testData.expectedPrice.value)
        done()
      })
  })

  it('return 400 error when expected-price existed', (done) => {
    chai
      .request(app)
      .post(`/api/stocks/expected-price/${testData.expectedPrice.stockCode}`)
      .set({ Authorization: token })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ value: testData.expectedPrice.value })
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

describe('GET /api/stocks/expected-price/:stockCode', () => {
  it('return stock and expected data', (done) => {
    chai
      .request(app)
      .get(`/api/stocks/expected-price/${testData.expectedPrice.stockCode}`)
      .set({ Authorization: token })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('stock')
        expect(res.body.data).to.have.property('expectedValue')
        expect(res.body.data.stock).to.have.property('code')
        expect(res.body.data.stock).to.have.property('price')
        expect(res.body.data.expectedValue).to.be.a('number')
        expect(res.body.data.expectedValue).to.equal(
          testData.expectedPrice.value
        )
        done()
      })
  })

  it('return 404 error when expected price does not exist', (done) => {
    chai
      .request(app)
      .get('/api/stocks/expected-price/ZZZ')
      .set({ Authorization: token })
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

describe('PUT /api/stocks/expected-price/:stockCode', () => {
  it('return status 200 and updated expected price value', (done) => {
    const newValue = 156
    chai
      .request(app)
      .put(`/api/stocks/expected-price/${testData.expectedPrice.stockCode}`)
      .set({ Authorization: token })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ value: newValue })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('rs')
        expect(res.body.data.rs).to.have.property('userId')
        expect(res.body.data.rs).to.have.property('stockCode')
        expect(res.body.data.rs).to.have.property('value')
        expect(res.body.data.rs.userId).to.equal(_id.toString())
        expect(res.body.data.rs.stockCode).to.equal(
          testData.expectedPrice.stockCode
        )
        expect(res.body.data.rs.value).to.equal(newValue)
        done()
      })
  })

  it('return 400 error when expected price does not exist', (done) => {
    const newValue = 156
    chai
      .request(app)
      .put(`/api/stocks/expected-price/${testData.stocks[2].code}`)
      .set({ Authorization: token })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ value: newValue })
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

describe('DELETE /api/stocks/expected-price/:stockCode', () => {
  after(async () => {
    await Promise.all([
      User.deleteMany({}),
      Stock.deleteMany({}),
      Expected.deleteMany({})
    ])
  })

  it('return status 200 and deleted expected price', (done) => {
    chai
      .request(app)
      .delete(`/api/stocks/expected-price/${testData.expectedPrice.stockCode}`)
      .set({ Authorization: token })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('msg')
        expect(res.body).to.have.property('data')
        expect(res.body.status).to.equal(APIStatus.SUCCESS)
        expect(res.body.data).to.have.property('rs')
        expect(res.body.data.rs).to.have.property('userId')
        expect(res.body.data.rs).to.have.property('stockCode')
        expect(res.body.data.rs).to.have.property('value')
        expect(res.body.data.rs.userId).to.equal(_id.toString())
        expect(res.body.data.rs.stockCode).to.equal(
          testData.expectedPrice.stockCode
        )
        done()
      })
  })

  it('return 400 error when expected price does not exist', (done) => {
    chai
      .request(app)
      .delete(`/api/stocks/expected-price/${testData.stocks[2].code}`)
      .set({ Authorization: token })
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
