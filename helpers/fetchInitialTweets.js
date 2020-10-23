import path from 'path'
import fs from 'fs'

// LOCAL CONSTANTS
const isProduction = process.env.NODE_ENV === 'production'
const cachedDataDir = './cache/'
const currentPath = process.cwd()

// HANDLE CACHE
// ------------

// Should cache be used?
const testUseCache = (forceLive, cachedFile) => {
  const cachedDataPath = path.resolve(currentPath, cachedFile)
  const cachedDataExists = fs.existsSync(cachedDataPath)
  // Check if cached data exists
  const useCache = !isProduction && !forceLive && cachedDataExists
  return useCache
}

// Use cache
const fetchFromCache = (cachedFile) => {
  const cachedDataPath = path.resolve(currentPath, cachedFile)
  return JSON.parse(fs.readFileSync(cachedDataPath, 'utf8'))
}

// FETCHING TWEETS
// ---------------

// Generic function to fetch tweets
const fetchTweets = async ({ count, maxTweets, shuffle }) => {
  const endpoint = `/api/fetchAllTweets?count=${count}&maxTweets=${maxTweets}&shuffle=${shuffle}`
  const res = await fetch(endpoint)
  const tweets = await res.json() || []
  return tweets
}

// FETCH INITIAL BATCH OF TWEETS
const fetchInitialTweets = async ({
  forceLive = false,
  count = 100,
  maxTweets = 1000,
  shuffle,
}) => {
  const cachedFilename = 'initialTweets'
  const cachedFile = `${cachedDataDir}${cachedFilename}.json`
  const shouldUseCache = testUseCache(forceLive, cachedFile)
  if (shouldUseCache) return fetchFromCache(cachedFile)
  // If fetching live or no cached data exits...
  const tweets = await fetchTweets({ count, maxTweets, shuffle })
  // Save data to cached file
  const dataString = JSON.stringify(tweets)
  fs.writeFileSync(cachedFile, dataString)
  // return data
  return tweets
}

export default fetchInitialTweets
