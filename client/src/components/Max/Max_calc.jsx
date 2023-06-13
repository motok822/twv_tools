import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from '../styles/Home.module.css'

function Max_calc() {
  return (
    <div className={styles.Home}>
    <Header></Header>
    <main className={styles.main}>
      <div>Max_calc</div>
    </main>
    <Footer></Footer>
    </div>
  )
}

export default Max_calc