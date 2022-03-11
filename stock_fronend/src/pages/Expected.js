import { useEffect, useState } from 'react'
import '../css/index.css'
import AddExpected from './AddExpected'

const url = 'http://localhost:3456/api/stocks'

const Expected = () => {
    const [stock, setStock] = useState([])
    const [show, setShow] = useState(false)
    const [stockCode, setStockCode] = useState('')

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(body => {
                const data = body.data.stocks
                setStock(data)
            })
    }, [])

    return (
        <div>
            <div className='stockExpect'>
                {
                    stock.map(data => (<ul className='stock' key={data.code} >
                        <li onClick={
                            () => {
                                setShow(!show)
                                setStockCode(data.code)
                            }
                        } > {data.code} </li> </ul>
                    ))
                }
            </div>

            <div className='AddExpect'>{show && <h1> abc </h1> && <AddExpected code={stockCode}> </AddExpected>}</div>
        </div>
    )
}

export default Expected