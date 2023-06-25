import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from '../styles/Create_equip.module.css'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const now = new Date()
const year = now.getFullYear()
function Create_equip() {
  const [ActiveFood, SetActiveFood] = useState(2)
  const [EmergencyFood, SetEmergencyFood] = useState(1)
  const [SpareFood, SetSpareFood] = useState(0)
  const [Water, SetWater] = useState(1)
  const [Rice, SetRice] = useState(1)
  const [ClimbingType, SetClimbingType] = useState("")
  const [ClimbingId, SetClimbingId] = useState(0)
  const [ClimbingName, SetClimbingName] = useState("")
  const [ClimbingYear, SetClimbingYear] = useState(year)
  const [AdditionalEquip, SetAdditionalEquip] = useState("防寒着　熊鈴")
  const navigate = useNavigate()
  const JumpToNext = () => {
    navigate("/Create/SelectEquip", {state: {
      activefood: ActiveFood,
      emergencyfood: EmergencyFood,
      sparefood: SpareFood,
      water: Water,
      rice: Rice,
      climbingtype: ClimbingType,
      climbingid: ClimbingId,
      climbingname: ClimbingName,
      climbingyear: ClimbingYear,
      additionalequip: AdditionalEquip,
    }})
  }
  const ForShortClimbing = (type) => {
    SetClimbingType(type)
    if (type.endsWith("日帰り装")) {
      SetActiveFood(1)
      SetEmergencyFood(1)
      SetWater(1)
      SetRice(0)
    } else {
      SetActiveFood(2)
      SetEmergencyFood(1)
      SetWater(2)
      SetRice(1)
    }
  }
  return (
    <div className={styles.Home}>
      <Header></Header>
      <main className={styles.main}>
        <h1 className={styles.title}>E表作成ツール</h1>
        <div>

          <table border="1" className={styles.table}>
            <tbody>
              <tr>
                <td>山行企画の番号</td>
                <td>twv<input type='number' value={year} className={styles.NumberInput} onClick={(e) => { SetClimbingYear(e.target.value) }}></input>-
                  <input type="number" className={styles.NumberInput} onClick={(e) => { SetClimbingId(e.target.value) }}></input></td>
              </tr>
              <tr>
                <td>企画名</td>
                <input type='text' onClick={(e) => { SetClimbingName(e.target.value) }}></input>
              </tr>
              <tr>
                <td>山行形態</td>
                <td>
                  <select name="ClimbingType" onChange={(e) => { ForShortClimbing(e.target.value) }}>
                    <option value="夏山一般装" >夏山一般装</option>
                    <option value="夏山日帰り装" >夏山日帰り装</option>
                    <option value="藪一般装">藪一般装</option>
                    <option value="藪日帰り装">藪日帰り装</option>
                    <option value="沢一般装">沢一般装</option>
                    <option value="沢日帰り装" >沢日帰り装</option>
                    <option value="冬山般装">冬山般装</option>
                    <option value="冬山日帰り装">冬山日帰り装</option>
                    <option value="山スキー般装">山スキー一般装</option>
                    <option value="山スキ日帰り装">山スキー日帰り装</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>ポリタンク</td>
                <td><input type="number" value={Water} className={styles.NumberInput} onClick={(e) => { SetWater(e.target.value) }}></input>発</td>
              </tr>
              <tr>
                <td>行動食</td>
                <td><input type='number' value={ActiveFood} className={styles.NumberInput} onClick={(e) => { SetActiveFood(e.target.value) }}></input>日分</td>
              </tr>
              <tr>
                <td>非常食</td>
                <td><input type='number' value={EmergencyFood} className={styles.NumberInput} onClick={(e) => { SetEmergencyFood(e.target.value) }}></input>日分</td>
              </tr>
              <tr>
                <td>予備食</td>
                <td><input type='number' value={SpareFood} className={styles.NumberInput} onClick={(e) => { SetSpareFood(e.target.value) }}></input>日分</td>
              </tr>
              <tr>
                <td>米</td>
                <td><input type='number' value={Rice} className={styles.NumberInput} onClick={(e) => { SetRice(e.target.value) }} ></input>合</td>
              </tr>
              <tr>
                <td>追加の個装</td>
                <td><textarea rows="5" cols="33" value={"防寒着　熊鈴"} onClick={(e) => { SetAdditionalEquip(e.target.value) }}></textarea></td>
              </tr>
            </tbody>
          </table>
          <button className={styles.NextBotton} onClick={() => {JumpToNext()}}>
            次へ
          </button>
        </div>
      </main >
      <Footer></Footer>
    </div >
  )
}

export default Create_equip