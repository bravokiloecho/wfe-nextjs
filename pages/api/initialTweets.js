// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetchTimeline from '@/helpers/fetchTimeline'

export default async (req, res) => {
  const tweets = fetchTimeline({ count: 250 })
  res.statusCode = 200
  res.json(tweets)
}
