// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Twitter = require('twitter-lite')

const client = new Twitter({
  subdomain: 'api', // "api" is the default (change for other subdomains)
  version: '1.1', // version "1.1" is the default (change for other subdomains)
  consumer_key: process.env.WFE_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.WFE_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.WFE_TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.WFE_TWITTER_ACCESS_TOKEN_SECRET,
})

export default async (req, res) => {
  const { count, cursor = null } = req.query
  const params = {
    screen_name: 'wordsfromearth',
    count,
    trim_user: true,
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended',
    ...cursor && { max_id: cursor },
  }
  const tweets = await client.get('statuses/user_timeline', params)
  console.log('tweets', tweets)
  const tweetsText = tweets.map(({ id, full_text: text }) => {
    const link = `https://twitter.com/${params.screen_name}/status/${id}`
    return { id, link, text }
  })
  console.log('tweetsText', tweetsText)
  res.statusCode = 200
  res.json(tweetsText)
}
