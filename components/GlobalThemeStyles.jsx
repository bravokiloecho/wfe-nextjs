import React from 'react'
import useThemeColors from '@/hooks/useThemeColors'

const GlobalThemeStyles = () => {
  const colors = useThemeColors()

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
