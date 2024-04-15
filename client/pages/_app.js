import buildClient from '../api/build-client'
import Header from '../components/header'

import 'bootstrap/dist/css/bootstrap.css'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  )
}

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const client = buildClient(ctx)
  const { data } = await client.get('/api/users/currentuser')

  let pageProps = {}
  if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)

  return {
    ...data,
    pageProps
  }
}

export default AppComponent