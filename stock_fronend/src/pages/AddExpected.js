import { useEffect, useState } from 'react'
import '../css/index.css'

import {postExpected} from './getdata'

const AddExpected = ({code}) => {
  const [addExpect, setAddExpect] = useState('')
  const [expect, setExpect] = useState('')

  const handleAddExpect = () => {
    setExpect(addExpect)
    setAddExpect('')
  }
  useEffect(() => {
    const token = localStorage.getItem("token")

    postExpected(`http://localhost:3456/api/stocks/expected-price/${code}`, token, { value: expect })
      .then(body => {
        console.log(body); // JSON data parsed by `data.json()` call
      });
  }, [code, expect])

  return (
    <div >
      <label htmlFor='code'>Stock code: </label>
      <input
        type='text' name='name' id='code' onChange={e => setAddExpect(e.target.value)} value={addExpect}
      />
      <button onClick={handleAddExpect}>Add Expected</button>
    </div>
  )
}

export default AddExpected
