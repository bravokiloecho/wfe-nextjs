import React from 'react'

import MetaHead from '@/MetaHead'
import Tweet from '@/Tweet'
import Header from '@/Header'

import shuffleInitialTweets from '@/helpers/shuffleInitialTweets'
import fetchInitialTweets from '@/helpers/fetchInitialTweets'
import styles from '@/styles/Home.module.css'

const Page = ({ tweets, shuffleTweets }) => {
  // Shuffle first tweets to create sense of randomness on every page load
  const [initialTweets, setInitialTweets] = React.useState([])
  React.useEffect(() => {
    const initialTweets = shuffleTweets ? shuffleInitialTweets(tweets, 100) : tweets
    setInitialTweets(initialTweets)
  // eslint-disable-next-line
  }, [])
  const [activeTweetIndex, setActiveTweetIndex] = React.useState(0)
  const activeTweet = initialTweets[activeTweetIndex]
  if (!initialTweets.length) return null
  return (
    <div className={styles.container}>
      <MetaHead />

      <main
        className={styles.main}
      >
        {activeTweet && (
          <Tweet
            tweet={activeTweet}
            totalTweets={initialTweets.length}
            setActiveTweetIndex={setActiveTweetIndex}
          />
        )}
      </main>

      <Header />
    </div>
  )
}

export async function getStaticProps() {
  const shuffle = true
  // Fetch tweets
  const tweets = await fetchInitialTweets({ count: 200, forceLive: false, shuffle })
    .catch((err) => {
      console.error(err)
    })
  // will receive `tweets` as a prop at build time
  return {
    props: {
      tweets,
      shuffleTweets: shuffle,
      revalidate: 86400,
    },
  }
}

export default Page
