import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  }) 

  const handleEmail = (e) => setEmail(e.target.value)

  const handePassword = (e) => setPassword(e.target.value)
  
  const onSubmit = async (e) => {
    e.preventDefault()
    await doRequest()
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group mt-2">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={handleEmail}
        />
      </div>
      <div className="form-group mt-2">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={handePassword}
        />
      </div>
      {errors}
      <button className="btn btn-primary mt-2">
        Sign Up
      </button>
    </form>
  )
}

export default Signup