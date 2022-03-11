const stockData = require('../model/stock.model')
const request = require('request')

const getData = (url) => {
  request(url, { json: true }, async (err, res, body) => {
    const newBody = body.map(stock => {
      return {
        code: stock.a,
        refPrice: stock.b,
        ceil: stock.c,
        floor: stock.d,
        salePrice1: stock.o,
        saleVol1: stock.p,
        salePrice2: stock.q,
        saleVol2: stock.r,
        salePrice3: stock.s,
        saleVol3: stock.t,
        delta: stock.k,
        price: stock.l,
        volumn: stock.m,
        totalVol: stock.n,
        high: stock.v,
        low: stock.w,
        buyPrice1: stock.i,
        buyVol1: stock.j,
        buyPrice2: stock.g,
        buyVol2: stock.h,
        buyPrice3: stock.e,
        buyVol3: stock.f
      }
    })
    console.log(newBody[0])
    // await stockData.insertMany(newBody)
    //   .then(() => console.log('Data inserted'))
    //   .catch((error) => console.log(error))
  })
}

module.exports = { getData }
