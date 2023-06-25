import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from './styles/Home.module.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import F_calc from './F/F_calc'
import Max_calc from './Max/Max_calc'
import { Login } from '../api_communication/Login'

function Home() {
  console.log(Login())
  return (
    <div className={styles.Home}>  
    <Header></Header>
        <main className={styles.main}>
        
            <div className={styles.menu}>
              <Link to = {'/Table'} className={styles.HomeLinkElement}>E表</Link>
              <Link to = {'/F'} className={styles.HomeLinkElement}>F清算</Link>
              <Link to = {'/Max'} className={styles.HomeLinkElement}>Max計算</Link>
              <Link to = {'/Create'} className={styles.HomeLinkElement}>E表作成</Link>
              <Link to = {'/Other'} className={styles.HomeLinkElement}>その他</Link>
            </div>
        </main>
    <Footer></Footer>
    </div>
  )
}

export default Home