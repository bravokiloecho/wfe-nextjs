export const isProduction = process.env.NODE_ENV === 'production'

export const shuffleArray = (array = []) => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const trimTrailingSlash = (str) => {
  return str.replace(/\/$/, '')
}

export const getApiUrl = () => {
  const url = isProduction ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.API_URL
  return trimTrailingSlash(url)
}
