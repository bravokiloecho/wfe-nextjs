import fetchTweets from '@/helpersApi/fetchTweets'

const fetchAllTweets = ({ count, maxTweets }) => {
  const fetchAndBuild = async ({
    cursor,
    previousTweets = [],
    initial = false,
    resolve,
  }) => {
    const tweets = await fetchTweets({ count, cursor })
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
  return new Promise((resolve) => {
    fetchAndBuild({ resolve, initial: true })
  })
}

export default async (req, res) => {
  const { count, maxTweets } = req.query
  const tweets = await fetchAllTweets({ count, maxTweets })
  res.statusCode = 200
  res.json(tweets)
}
