import React from 'react'

import MetaHead from '@/MetaHead'
import Tweet from '@/Tweet'

import fetchInitialTweets from '@/helpers/fetchInitialTweets'
import styles from '@/styles/Home.module.css'

const Home = ({ tweets }) => {
  const [activeTweetIndex, setActiveTweetIndex] = React.useState(0)
  const activeTweet = tweets[activeTweetIndex]
  return (
    <div className={styles.container}>
      <MetaHead />

      <main
        className={styles.main}
      >
        {activeTweet && (
          <Tweet
            tweet={activeTweet}
            totalTweets={tweets.length}
            setActiveTweetIndex={setActiveTweetIndex}
          />
        )}
      </main>

      {/* <footer className={styles.footer}>
        Footer
      </footer> */}
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const tweets = await fetchInitialTweets({ count: 200, forceLive: false, shuffle: true })
  // console.log('tweets', tweets)
  // will receive `tweets` as a prop at build time
  return {
    props: {
      tweets,
      revalidate: 86400,
    },
  }
}

export default Home
