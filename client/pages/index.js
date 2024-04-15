import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
  return (
    <h1>{currentUser ? 'You are signed in' : ' You have to sign in'}</h1>
  )
}

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser')

  return data
}

export default LandingPage