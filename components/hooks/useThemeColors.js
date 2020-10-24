import { useTheme } from 'next-themes'

import styleConstants from '@/styles/constants'

const useThemeColors = () => {
  const { theme } = useTheme()
  const darkModeActive = theme === 'dark'
  const { white, black } = styleConstants.colors
  return {
    text: darkModeActive ? white : black,
    backgroundColor: darkModeActive ? black : white,
  }
}

export default useThemeColors
