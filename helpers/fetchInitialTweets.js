import path from 'path'
import fs from 'fs'

const cachedDataDir = './cache/'
const cachedFilename = 'initialTweets'
const isProduction = process.env.NODE_ENV === 'production'

const fetchInitialTweets = async ({ forceLive = false, count = 100 }) => {
  const currentPath = process.cwd()
  const cachedFile = `${cachedDataDir}${cachedFilename}.json`
  // Return cached data (if running locally and cached version exists)
  if (!isProduction && !forceLive) {
    // Check if cached data exists
    const cachedDataPath = path.resolve(currentPath, cachedFile)
    const cachedDataExists = fs.existsSync(cachedDataPath)
    if (cachedDataExists) {
      const cachedData = JSON.parse(fs.readFileSync(cachedDataPath, 'utf8'))
      return cachedData
    }
  }
  // If fetching live or no cached data exits...
  const res = await fetch(`${process.env.API_URL}api/getTweets?count=${count}`)
  const tweets = await res.json()

  // Save data to cached file
  const dataString = JSON.stringify(tweets)
  fs.writeFileSync(cachedFile, dataString)

  return tweets
}

export default fetchInitialTweets
