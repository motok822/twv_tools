import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';
import styles from '../styles/Select_equip.module.css'
import { Equip_table } from '../Table/Equip_table';
import Equip_table_list from '../Table/Equip_table_list';


function Select_equip() {
  const location = useLocation();
  const [ClimbingState, SetClimbingState] = useState(location.state)
  const [MemberNum, SetMemberNum] = useState(5)
  const [Members, SetMembers] = useState(["","",""])
  return (
    <div className={styles.Home}>
      <Header />
      <main className={styles.main}>
        <table border="1" className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.TableTitle}>山行企画名</td>
              <td className={styles.TableContent}>{ClimbingState.climbingname}</td>
            </tr>
            <tr>
              <td className={styles.TableTitle}>山行形態</td>
              <td className={styles.TableContent}>{ClimbingState.climbingtype}</td>
            </tr>
            <tr>
              <td className={styles.TableTitle}>参加人数</td>
              <td className={styles.TableContent}><input type='number' value={3} onChange={
                (e) => {
                  SetMemberNum(e.target.value); 
                  const array = new Array(Number(e.target.value))
                  for(let i = 0;i < Number(e.target.value); i++){
                    array[i] = ""
                  }
                  console.log(array)
                  SetMembers(array)
                }}></input>人</td>
            </tr>
            <tr>
              <td className={styles.TableTitle}>参加メンバー</td>
              <td className={styles.TableContent}>
                {Members.map((val) => {
                  return(
                    <input type='text' onChange={(e) => {
                      val = e.target.value
                    }}></input>
                  )
                })}
              </td>
            </tr>
          </tbody>
        </table>
        <p className={styles.Text}>共装選択</p>
        <Equip_table_list CreateOption={true}/>
      </main>
      <Footer />
    </div>
  )
}

export default Select_equip