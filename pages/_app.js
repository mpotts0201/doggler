import '../styles/globals.css'
import Router from 'lib/core/Router'
import {withApp} from 'lib/core/wrapper'

// function MyApp({ Component, pageProps, dispatch }) {
//   return <Component {...pageProps} dispatch={dispatch} />
// }

function MyApp(props) {
  return <Router {...props} />;
}

export default withApp(MyApp)
