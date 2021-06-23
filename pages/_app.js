import '../styles/globals.css'
import {withApp} from 'lib/core/wrapper'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withApp(MyApp)
