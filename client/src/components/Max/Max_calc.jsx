import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from '../styles/Home.module.css'

function Max_calc() {
  return (
    <div className={styles.Home}>
    <Header></Header>
    <div style={{display: "flex", justifyContent: "center"}}>
      <iframe src='https://internal.u-twv.com/maxlimit/embedded.html' width={"95%"} height={"700px"}></iframe>
    </div>
    <Footer></Footer>
    </div>
  )
}

export default Max_calc