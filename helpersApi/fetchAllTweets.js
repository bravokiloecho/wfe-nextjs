import fetchTweets from '@/helpersApi/fetchTweets'
import { shuffleArray } from '@/helpers/utils'

const runFetchAllTweets = ({ count, maxTweets }) => {
  const fetchAndBuild = async ({
    cursor,
    previousTweets = [],
    initial = false,
    resolve,
    reject,
  }) => {
    const tweets = await fetchTweets({ count, cursor })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
    const { id: firstTweetId } = tweets[0] || {}
    const { id: lastTweetId } = tweets[tweets.length - 1] || {}
    const { id: previousTweetId } = previousTweets[previousTweets.length - 1] || {}
    // If not inital remove duplicate first tweet
    if (!initial && tweets.length && firstTweetId === previousTweetId) {
      tweets.shift()
    }
    const mergedTweets = [...previousTweets, ...tweets]
    // If finished
    if (mergedTweets.length >= maxTweets || tweets.length < count - 1) {
      resolve(mergedTweets)
      return
    }
    // Else continue
    fetchAndBuild({ cursor: lastTweetId, previousTweets: mergedTweets, resolve })
  }
  return new Promise((resolve, reject) => {
    fetchAndBuild({ resolve, reject, initial: true })
  })
}

const fetchAllTweets = async ({ count, maxTweets, shuffle }) => {
  const tweets = await runFetchAllTweets({ count, maxTweets })
    .catch((err) => {
      console.error(err)
    })
  if (shuffle === 'true') {
    return shuffleArray(tweets)
  }
  return tweets
}

export default fetchAllTweets
