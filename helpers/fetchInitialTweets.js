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
const fetchTweets = async ({ count, cursor, maxTweets }) => {
  const endpoint = `${process.env.API_URL}api/fetchAllTweets?count=${count}&maxTweets=${maxTweets}`
  // const endpointWithCursor = cursor ? `${endpoint}&cursor=${cursor}` : endpoint
  // const res = await fetch(endpointWithCursor)
  const res = await fetch(endpoint)
  const tweets = await res.json() || []
  return tweets
}

// // LOOP TO FETCH ALL TWEETS
// export const fetchAllTweets = ({ count, maxTweets }) => {
//   const fetchAndBuild = async ({ cursor, previousTweets = [], resolve, initial = false }) => {
//     const tweets = await fetchTweets({ count, cursor })
//     // If not inital remove duplicate first tweet
//     if (!initial && tweets.length) {
//       tweets.shift()
//     }
//     const mergedTweets = [...previousTweets, ...tweets]
//     // If finished
//     if (mergedTweets.length >= maxTweets || tweets.length < count - 1) {
//       resolve(mergedTweets)
//       return
//     }
//     // Else continue
//     const lastTweet = mergedTweets[mergedTweets.length - 1]
//     const { id: nextCursor } = lastTweet
//     fetchAndBuild({ cursor: nextCursor, previousTweets: mergedTweets, resolve })
//   }
//   return new Promise((resolve) => {
//     fetchAndBuild({ resolve, initial: true })
//   })
// }

// FETCH INITIAL BATCH OF TWEETS
export const fetchInitialTweets = async ({ forceLive = false, count = 100, maxTweets = 100000 }) => {
  const cachedFilename = 'initialTweets'
  const cachedFile = `${cachedDataDir}${cachedFilename}.json`
  const shouldUseCache = testUseCache(forceLive, cachedFile)
  if (shouldUseCache) return fetchFromCache(cachedFile)
  // If fetching live or no cached data exits...
  const tweets = await fetchTweets({ count, maxTweets })
  // Save data to cached file
  const dataString = JSON.stringify(tweets)
  fs.writeFileSync(cachedFile, dataString)
  // return data
  return tweets
}

export default fetchInitialTweets
