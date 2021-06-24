import '../styles/globals.css'
import {withApp} from 'lib/core/wrapper'

function MyApp({ Component, pageProps, dispatch }) {
  return <Component {...pageProps} dispatch={dispatch} />
}

export default withApp(MyApp)
