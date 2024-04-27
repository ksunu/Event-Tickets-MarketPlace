import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

const NewTicket = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')

  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: { title, price },
    onSuccess: () => Router.push('/')
  }) 
  
  const handleTitle = (e) => setTitle(e.target.value)

  const handlePrice = (e) => setPrice(e.target.value)

  const priceOnBlur = () => {
    const value = parseFloat(price)
    if (isNaN(value)) return

    setPrice(value.toFixed(2))
  } 

  const onSubmit = (e) => {
    e.preventDefault()
    doRequest()
  }

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group mt-2">
          <label>Title</label>
          <input
            value={title}
            onChange={handleTitle}
            className="form-control"
          />
        </div>
        <div className="form-group mt-2">
          <label>Price</label>
          <input
            type="number"
            onBlur={priceOnBlur}
            value={price}
            onChange={handlePrice}
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewTicket