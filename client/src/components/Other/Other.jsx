import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from '../styles/Home.module.css'

function Other() {
  return (
    <div className={styles.Home}>
    <Header></Header>
    <main className={styles.main}>
     <div>Other</div>
    </main>
    <Footer></Footer>
    </div>
  )
}

export default Other