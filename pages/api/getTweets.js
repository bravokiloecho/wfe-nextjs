export default async (req, res) => {
  console.log('req.query', req.query)
  const tweets = []
  res.statusCode = 200
  res.json(tweets)
}
