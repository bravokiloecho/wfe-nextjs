import React from 'react'
import { useTheme } from 'next-themes'

import TwitterFollowButton from '@/elements/TwitterFollowButton'

import styles from '@/styles/Header.module.css'

const Header = ({}) => {
  const { theme, setTheme } = useTheme()
  const switchTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }
  return (
    <header
      className={[styles.header].join(' ')}
    >
      {/* TWITTER LINK */}
      <TwitterFollowButton handle="wordsfromearth">
        <div className={styles.followIconPlus} />
        {/* <TwitterIcon
          fill={theme === 'dark' ? white : black}
          className={styles.followIconTwitter}
        /> */}
      </TwitterFollowButton>
      {/* THEME BUTON */}
      <button
        aria-label="Switch theme"
        onClick={switchTheme}
        className={[styles.themeButton].join(' ')}
      >
        <div
          className={[styles.themeButtonInner].join(' ')}
          style={{
            transform: `scale(1.05) translateX(${theme === 'dark' ? 25 : -25}%)`,
          }}
        />
      </button>
    </header>
  )
}

export default Header
