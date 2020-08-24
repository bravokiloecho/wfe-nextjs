import React from 'react'

import { useDarkMode } from 'next-dark-mode'

import styleConstants from '@/styles/constants'

const GlobalThemeStyles = () => {
  const [ready, setReady] = React.useState(false)
  const { darkModeActive, switchToDarkMode } = useDarkMode()
  React.useEffect(() => {
    switchToDarkMode()
    setReady(true)
  }, [switchToDarkMode])
  const { white, black } = styleConstants.colors
  const colors = {
    text: darkModeActive || !ready ? white : black,
    backgroundColor: darkModeActive || !ready ? black : white,
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
