import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from '../styles/Home.module.css'

function Return_equip() {
  return (
    <div className={styles.Home}>
    <Header></Header>
    <main className={styles.main}>  
      <div>Return_equip</div>
    </main>
    <Footer></Footer>
    </div>
  )
}

export default Return_equip