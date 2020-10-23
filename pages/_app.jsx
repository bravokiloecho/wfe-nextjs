import withDarkMode, { MODE } from 'next-dark-mode'

import '@/styles/fonts.css'
import '@/styles/globals.css'

import GlobalThemeStyles from '@/GlobalThemeStyles'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalThemeStyles />
    </>
  )
}

export default withDarkMode(MyApp, { defaultMode: MODE.DARK })
