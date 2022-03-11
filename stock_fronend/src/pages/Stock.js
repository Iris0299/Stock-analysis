const { useEffect, useState } = require('react')

const url = 'http://localhost:3456/api/stocks'

const Stock = () => {
  const [stock, setStock] = useState([])

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(url)
      .then(res => res.json())
      .then(body => {
        const data = body.data.stocks
        setStock(data)
      })
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Ref Price</th>
            <th>Ceil</th>
            <th>Floor</th>
            <th>Sale Price 1</th>
            <th>Sale Vol 1</th>
            <th>Sale Price 2</th>
            <th>Sale Vol 2</th>
            <th>Sale Price 3</th>
            <th>Sale Vol 3</th>
            <th>Delta</th>
            <th>Price</th>
            <th>Volumn</th>
            <th>Total Vol</th>
            <th>Hight</th>
            <th>Low</th>
            <th>Buy Price 1</th>
            <th>Buy Vol 1</th>
            <th>Buy Price 2</th>
            <th>Buy Vol 2</th>
            <th>Buy Price 3</th>
            <th>Buy Vol 3</th>
          </tr>
        </thead>
        {stock &&
          stock.map(data =>
            <tbody key={data.code}>
              <tr>
                <td>{data.code}</td>
                <td>{data.refPrice}</td>
                <td>{data.ceil}</td>
                <td>{data.floor}</td>
                <td>{data.salePrice1}</td>
                <td>{data.saleVol1}</td>
                <td>{data.salePrice2}</td>
                <td>{data.saleVol2}</td>
                <td>{data.salePrice3}</td>
                <td>{data.saleVol3}</td>
                <td>{data.delta}</td>
                <td>{data.price}</td>
                <td>{data.volumn}</td>
                <td>{data.totalVol}</td>
                <td>{data.high}</td>
                <td>{data.low}</td>
                <td>{data.buyPrice1}</td>
                <td>{data.buyVol1}</td>
                <td>{data.buyPrice2}</td>
                <td>{data.buyVol2}</td>
                <td>{data.buyPrice3}</td>
                <td>{data.buyVol3}</td>
              </tr>
            </tbody>
          )
        }

      </table>
    </div >
  )
}

export default Stock
