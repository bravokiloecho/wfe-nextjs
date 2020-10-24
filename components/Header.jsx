import React from 'react'
import { useTheme } from 'next-themes'

import TwitterIcon from '@/icons/TwitterIcon'

import styles from '@/styles/Header.module.css'
import styleConstants from '@/styles/constants'

const Header = ({}) => {
  const { theme, setTheme } = useTheme()
  const switchTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }
  const { colors: { white, black } } = styleConstants
  return (
    <header
      className={[styles.header].join(' ')}
    >
      {/* TWITTER LINK */}
      <a href="https://twitter.com/wordsfromearth">
        <TwitterIcon
          fill={theme === 'dark' ? white : black}
          className={styles.followIcon}
        />
      </a>
      {/* THEME BUTON */}
      <button
        aria-label="Switch theme"
        onClick={switchTheme}
        className={[styles.themeButton].join(' ')}
        style={{
          backgroundColor: theme === 'dark' ? white : black,
        }}
      >
        <div
          className={[styles.themeButtonInner].join(' ')}
          style={{
            backgroundColor: theme === 'dark' ? black : white,
            transform: `scale(1.05) translateX(${theme === 'dark' ? 25 : -25}%)`,
          }}
        />
      </button>
    </header>
  )
}

export default Header
