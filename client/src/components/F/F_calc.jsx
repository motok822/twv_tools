import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from '../styles/Home.module.css'

function F_calc() {
  return (
    <div className={styles.Home}>
    <Header></Header>
    <main className={styles.main}>
      <div>F_calc</div>
    </main>
    <Footer></Footer>
    </div>
  )
}

export default F_calc