import React from 'react'
import PropTypes from 'prop-types'

const TwitterFollowButton = ({ handle, children }) => {
  const url = `https://twitter.com/${handle}`
  return (
    <a
      href={url}
      aria-label="Follow on Twitter"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

TwitterFollowButton.propTypes = {
  handle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default TwitterFollowButton
