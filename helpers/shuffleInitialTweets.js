import shuffleArray from '@/helpersApi/shuffleArray'

const shuffleInitialTweets = (tweets, shuffleCount = 100) => {
  const initialBatch = tweets.splice(0, shuffleCount)
  const shuffledIntro = shuffleArray(initialBatch)
  const remainder = tweets
  return [...shuffledIntro, ...remainder]
}

export default shuffleInitialTweets
