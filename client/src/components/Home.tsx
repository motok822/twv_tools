import React, { createContext, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from './styles/Home.module.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import F_calc from './F/F_calc'
import Max_calc from './Max/Max_calc'
import { ShowUser } from './UserManage'
import User from './User'
import { BasicAPIManager } from '../api_mgr/BasicAPIManager'


interface UserInfo {
  ID: number;
  UserName: string;
  FamilyName: string;
  FirstName: string;
  Grade: number;
  Belong: string;
  Sex: "Male" | "Female";
  Birth: Date;
}

function Home() {
  const [User, SetUser] = useState<null | UserInfo[]>(null)
  const today = new Date()
  const BMgr = new BasicAPIManager()
  async function GetData(): Promise<void> {
    const res:UserInfo[] = await BMgr.User.GetUsers()
    console.log(res)
    SetUser(res)
  }
  useEffect(()=>{
    GetData()

  }, [])
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
          {
            User?.map((x) => {
              if(x.Birth && x.Birth?.getDate() == today.getDate() && x.Birth?.getMonth() == today.getMonth()){
                return <p>{x.FamilyName + x.FirstName}さんの誕生日です🎊</p>
              }
            })
          }
        </div>
        <div className={styles.SiteMenu}>
          <ul className={styles.CardList}>
            <Link to={'/Table'} className={styles.HomeLinkElement}>E表</Link>
            <Link to={'/F'} className={styles.HomeLinkElement}>F清算</Link>
            <Link to={'/Max'} className={styles.HomeLinkElement}>Max計算</Link>
            <Link to={'/Create'} className={styles.HomeLinkElement}>E表作成</Link>
          </ul>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Home