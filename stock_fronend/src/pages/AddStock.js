import { useEffect, useState } from 'react'
import '../css/index.css'

import {getStockFromGroups, postStockFromGroups} from './getdata'

const AddStock = ({id}) => {
  const [listStock, setListStock] = useState([])
  const [addStock, setAddStock] = useState('')
  const [stock, setStock] = useState('')

  const handleAddStock = () => {
    setStock(addStock)
    setAddStock('')
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    
    getStockFromGroups(`http://localhost:3456/api/groups/?groupId=${id}`, token)
      .then(body => {
        const data = body.data.groups.stockCode
        setListStock(data)
      });

    postStockFromGroups(`http://localhost:3456/api/groups/${id}`, token, { stockCode: stock })
      .then(body => {
        alert(body.status); // JSON data parsed by `data.json()` call
      });
  }, [stock, id])

  return (
    <div>
      <label htmlFor='code'>Stock code: </label>
      <input
        className='addStock'
        type='text' 
        name='name' 
        id='code' 
        onChange={e => setAddStock(e.target.value)} 
        value={addStock}
      />

      <button onClick={handleAddStock}>Add stock</button>

      {
        listStock.map(stock => (
          <ul className='stock'>
            <li key={stock}>{stock}</li>
          </ul>
        ))
      }
    </div>
  )
}

export default AddStock
