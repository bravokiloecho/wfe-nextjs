import React from 'react'
import PropTypes from 'prop-types'

import clamp from 'lodash/clamp'
import { useHotkeys } from 'react-hotkeys-hook'

import useOnResize from '@/hooks/useOnResize'

import styles from '@/styles/Tweet.module.css'

const Tweet = ({ tweet, totalTweets, setActiveTweetIndex }) => {
  // CHANGE SLIDES
  const changeSlide = React.useCallback((direction = 'next') => {
    setActiveTweetIndex((activeTweetIndex) => {
      const mod = direction === 'previous' ? -1 : 1
      let nextIndex = (activeTweetIndex + mod) % totalTweets
      if (nextIndex < 0) nextIndex = totalTweets - 1
      return nextIndex
    })
  }, [totalTweets, setActiveTweetIndex])
  // KEYBOARD SHORTCUTS
  useHotkeys('left', () => changeSlide('previous'))
  useHotkeys('right', () => changeSlide('next'))
  // RESIZE FONT
  const { width: windowWidth, height: windowHeight } = useOnResize()
  const fontSize = React.useMemo(() => {
    const totalCharacters = tweet.text.length
    const area = windowWidth * windowHeight
    const characterRatio = 90 / 80
    const size = area / (characterRatio * Math.log(totalCharacters) * 2000 * 1.6)
    const sizeMax = 80
    const sizeMin = 22
    return `${clamp(size, sizeMin, sizeMax)}px`
  }, [windowWidth, windowHeight, tweet.text])

  return (
    <a
      className={[styles.tweetContainer].join(' ')}
      onClick={() => {
        changeSlide('next')
      }}
      role="button"
      aria-label="Next tweet"
    >
      <p
        className={[styles.tweet].join(' ')}
        style={{ fontSize }}
      >
        {tweet.text}
      </p>
    </a>
  )
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
  totalTweets: PropTypes.number.isRequired,
  setActiveTweetIndex: PropTypes.func.isRequired,
}

export default Tweet
