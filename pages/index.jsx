import React from 'react'

import MetaHead from '@/MetaHead'
import Tweet from '@/Tweet'

import fetchInitialTweets from '@/helpers/fetchInitialTweets'
import styles from '@/styles/Home.module.css'

const shuffleArray = (array = []) => {
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

const Home = ({ tweets }) => {
  const [activeTweetIndex, setActiveTweetIndex] = React.useState(0)
  const activeTweet = tweets[activeTweetIndex]
  return (
    <div className={styles.container}>
      <MetaHead />

      <main
        className={styles.main}
      >
        <Tweet
          tweet={activeTweet}
          totalTweets={tweets.length}
          setActiveTweetIndex={setActiveTweetIndex}
        />
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
  const tweets = await fetchInitialTweets({ count: 100, forceLive: false })
  const tweetsShuffled = shuffleArray(tweets)
  // By returning { props: tweets }, the Blog component
  // will receive `tweets` as a prop at build time
  return {
    props: {
      tweets: tweetsShuffled,
    },
  }
}

export default Home
