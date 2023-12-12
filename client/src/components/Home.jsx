import React, { createContext, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from './styles/Home.module.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import F_calc from './F/F_calc'
import Max_calc from './Max/Max_calc'
import { ShowUser } from './UserManage'
import User from './User'

function Home() {
  return (
    <div className={styles.Home}>
      <Header></Header>
      <main className={styles.main}>

        <div className={styles.title}>
          <h1><span className={styles.blank_space}></span>東京大学</h1>
          <h1>ワンダーフォーゲル部</h1>
        </div>
        <div className={styles.news}>
          <h3>お知らせ</h3>
          <p>装備管理システムがリニューアルしました！！</p>
        </div>
        <div className={styles.SiteMenu}>
          <ul className={styles.CardList}>
            <Link to={'/Table'} className={styles.HomeLinkElement}>E表</Link>
            <Link to={'/F'} className={styles.HomeLinkElement}>F清算</Link>
            <Link to={'/Max'} className={styles.HomeLinkElement}>Max計算</Link>
            <Link to={'/Create'} className={styles.HomeLinkElement}>E表作成</Link>
            <Link to={'/Other'} className={styles.HomeLinkElement}>その他</Link>
          </ul>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Home