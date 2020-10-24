import path from 'path'
import fs from 'fs'


import * as utils from '@/helpers/utils'

// LOCAL CONSTANTS
const cachedDataDir = './cache/'
const currentPath = process.cwd()

// HANDLE CACHE
// ------------

// Should cache be used?
const testUseCache = (forceLive, cachedFile) => {
  const cachedDataPath = path.resolve(currentPath, cachedFile)
  const cachedDataExists = fs.existsSync(cachedDataPath)
  // Check if cached data exists
  const useCache = !utils.isProduction && !forceLive && cachedDataExists
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
const fetchTweets = async ({ req, count, maxTweets, shuffle }) => {
  const baseUrl = utils.getApiUrl(req)
  const endpoint = `${baseUrl}/api/fetchAllTweets?count=${count}&maxTweets=${maxTweets}&shuffle=${shuffle}`
  console.log('baseUrl', baseUrl)
  console.log('endpoint', endpoint)
  const res = await fetch(endpoint)
  const tweets = await res.json() || []
  return tweets
}

// FETCH INITIAL BATCH OF TWEETS
const fetchInitialTweets = async ({
  req,
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
  const tweets = await fetchTweets({ req, count, maxTweets, shuffle })
  // Save data to cached file
  const dataString = JSON.stringify(tweets)
  fs.writeFileSync(cachedFile, dataString)
  // return data
  return tweets
}

export default fetchInitialTweets
