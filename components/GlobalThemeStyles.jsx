import React from 'react'
import { useTheme } from 'next-themes'

import styleConstants from '@/styles/constants'

const GlobalThemeStyles = () => {
  const { theme } = useTheme()
  const darkModeActive = theme === 'dark'
  const { white, black } = styleConstants.colors
  const colors = {
    text: darkModeActive ? white : black,
    backgroundColor: darkModeActive ? black : white,
  }

  return (
    <style jsx global>{`
      html {
        background-color: ${colors.backgroundColor};
        color: ${colors.text};
      }
    `}
    </style>
  )
}

export default GlobalThemeStyles
