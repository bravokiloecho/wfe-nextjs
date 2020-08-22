import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/styles/Tweet.module.css'

const Tweet = ({ tweet, activeTweetIndex, setActiveTweetIndex }) => {
  return (
    <a
      className={[styles.tweetContainer].join(' ')}
      onClick={() => {
        setActiveTweetIndex(activeTweetIndex + 1)
      }}
      role="button"
      aria-label="Next tweet"
    >
      <p className={[styles.tweet].join(' ')}>{tweet.text}</p>
    </a>
  )
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
  activeTweetIndex: PropTypes.number.isRequired,
  setActiveTweetIndex: PropTypes.func.isRequired,
}

export default Tweet
