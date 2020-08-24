import React from 'react'

import styleConstants from '@/styles/constants'

const GlobalThemeStyles = () => {
  return (
    <style jsx global>{`
      html {
        background-color: ${styleConstants.black};
        color: #f7f7f7;
      }
    `}
    </style>
  )
}

export default GlobalThemeStyles
