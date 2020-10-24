const Twitter = require('twitter-lite')

const client = new Twitter({
  subdomain: 'api', // "api" is the default (change for other subdomains)
  version: '1.1', // version "1.1" is the default (change for other subdomains)
  consumer_key: process.env.WFE_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.WFE_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.WFE_TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.WFE_TWITTER_ACCESS_TOKEN_SECRET,
})

const fetchTweets = async ({ count, cursor }) => {
  const params = {
    screen_name: 'wordsfromearth',
    count,
    trim_user: true,
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended',
    ...(cursor && { max_id: cursor }),
  }
  const tweets = await client.get('statuses/user_timeline', params)
    .catch((err) => {
      console.error(err)
    })
  const tweetsText = tweets.map(({ id, full_text: text }) => {
    const link = `https://twitter.com/${params.screen_name}/status/${id}`
    return { id, link, text }
  })
  return tweetsText
}

export default fetchTweets
