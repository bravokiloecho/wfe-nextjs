import React from 'react'
import PropTypes from 'prop-types'

import clamp from 'lodash/clamp'
import { useHotkeys } from 'react-hotkeys-hook'

import useOnResize from '@/hooks/useOnResize'

import styles from '@/styles/Tweet.module.css'

const Tweet = ({ tweet, totalTweets, setActiveTweetIndex }) => {
  const [hideTweet, setHideTweet] = React.useState(true)
  // CHANGE SLIDES
  const changeSlide = React.useCallback((direction = 'next') => {
    setHideTweet(true)
    setActiveTweetIndex((activeTweetIndex) => {
      const mod = direction === 'prev' ? -1 : 1
      let nextIndex = (activeTweetIndex + mod) % totalTweets
      if (nextIndex < 0) nextIndex = totalTweets - 1
      return nextIndex
    })
  }, [totalTweets, setActiveTweetIndex])
  // KEYBOARD SHORTCUTS
  useHotkeys('left', () => changeSlide('prev'))
  useHotkeys('right', () => changeSlide('next'))
  // RESIZE FONT
  const { width: windowWidth, height: windowHeight } = useOnResize()
  const [textStyle, setTextStyle] = React.useState({})
  React.useEffect(() => {
    if (!windowWidth) return
    const totalCharacters = tweet.text.length
    const area = windowWidth * windowHeight
    const characterRatio = 90 / 80
    const size = area / (characterRatio * Math.log(totalCharacters) * 2000 * 1.6)
    const sizeMax = 80
    const sizeMin = 22
    const fontSize = clamp(size, sizeMin, sizeMax)
    const newStyle = { fontSize: `${fontSize}px` }
    setTextStyle(newStyle)
    setHideTweet(false)
  }, [windowWidth, windowHeight, tweet.text])

  const backButtonWidth = 25

  return (
    <div
      className={[styles.tweetContainer].join(' ')}
    >
      <div className={styles.tweetButtons}>
        <a
          role="button"
          aria-label="Next tweet"
          className={[styles.tweetButton].join(' ')}
          onClick={() => {
            changeSlide('next')
          }}
          style={{
            right: 0,
            width: `${100 - backButtonWidth}%`,
            backgroundColor: 'red',
          }}
        >
          Next tweet
        </a>
        <a
          role="button"
          aria-label="Previous tweet"
          className={[styles.tweetButton].join(' ')}
          onClick={() => {
            changeSlide('prev')
          }}
          style={{
            left: 0,
            width: `${backButtonWidth}%`,
            backgroundColor: 'green',
          }}
        >
          Previous tweet
        </a>
      </div>
      <p
        className={[styles.tweet].join(' ')}
        style={{
          ...textStyle,
          opacity: hideTweet ? 0 : 1,
        }}
      >
        {tweet.text}
      </p>
    </div>
  )
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
  totalTweets: PropTypes.number.isRequired,
  setActiveTweetIndex: PropTypes.func.isRequired,
}

export default React.memo(Tweet)
