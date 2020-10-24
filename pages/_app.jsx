import { ThemeProvider } from 'next-themes'

import '@/styles/fonts.css'
import '@/styles/globals.css'

import GlobalThemeStyles from '@/GlobalThemeStyles'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <Component {...pageProps} />
      <GlobalThemeStyles />
    </ThemeProvider>
  )
}

export default MyApp
