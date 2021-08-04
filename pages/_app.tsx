import '../styles/globals.scss'
import type { AppProps } from 'next/app'

// import Nav from '@components/nav';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div>
      {/* <Nav /> */}
      <Component {...pageProps} />
    </div>
  )
}
export default MyApp
