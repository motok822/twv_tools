import React, { createContext, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';
import styles from '../styles/Select_equip.module.css'
import { Equip_table } from '../Table/Equip_table';
import Equip_table_list from '../Table/Equip_table_list';

export const EquipsContext = createContext()

function Select_equip() {
  const location = useLocation();
  const [ClimbingState, SetClimbingState] = useState(location.state)
  const [MemberNum, SetMemberNum] = useState(5)
  const [Members, SetMembers] = useState(["", "", "", "", ""])
  const [EquipsState, SetEquips] = useState({
    tent: [
      {
        name: "7天",
        type: [
          { symbol: "α", selected: [0, 0, 0] },
          { symbol: "β", selected: [0, 0, 0] },
          { symbol: "γ", selected: [0, 0, 0] },
          { symbol: "δ", selected: [0, 0, 0] },
        ]
      },
      {
        name: "45天",
        type: [
          { symbol: "α", selected: [0, 0, 0] },
          { symbol: "β", selected: [0, 0, 0] },
          { symbol: "γ", selected: [0, 0, 0] },
          { symbol: "δ", selected: [0, 0, 0] },
          { symbol: "ε", selected: [0, 0, 0] },
        ]
      },

      {
        name: "12天",
        type: [
          { symbol: "α", selected: [0, 0, 0] },
        ]
      },
      {
        name: "その他",
        type: [
          { symbol: "α", selected: [0, 0, 0] },
        ]
      }

    ],
    pot_head: [{
      name: "コッヘル",
      type: [
        { symbol: "α", selected: [0, 0, 0] },
        { symbol: "β", selected: [0, 0, 0] },
        { symbol: "γ", selected: [0, 0, 0] },
        { symbol: "δ", selected: [0, 0] },
        { symbol: "ε", selected: [0] },
        { symbol: "ξ", selected: [0] },

      ]
    },
    {
      name: "ヘッド",
      type: [
        { symbol: "α", selected: [0] },
        { symbol: "β", selected: [0] },
        { symbol: "γ", selected: [0] },
        { symbol: "δ", selected: [0] },
        { symbol: "ε", selected: [0] },
        { symbol: "η", selected: [0] },
        { symbol: "Θ", selected: [0] },
        { symbol: "λ", selected: [0] },
        { symbol: "μ", selected: [0] },
        { symbol: "π", selected: [0] },
        { symbol: "ρ", selected: [0] },
        { symbol: "σ", selected: [0] },
        { symbol: "φ", selected: [0] },
        { symbol: "ω", selected: [0] },
      ]
    }],
    work_saw: [
      {
        name: "L装",
        type: [
          { symbol: "α", selected: [0] },
          { symbol: "β", selected: [0] },
        ]
      },
      {
        name: "ヘルボ",
        type: [
          { symbol: "α", selected: [0] },
          { symbol: "β", selected: [0] },
          { symbol: "γ", selected: [0] },
          { symbol: "δ", selected: [0] },
        ]
      },
      {
        name: "エキボ",
        type: [
          { symbol: "α", selected: [0] },
          { symbol: "β", selected: [0] },
          { symbol: "γ", selected: [0] },
        ]
      },
      {
        name: "藪ノコ",
        type: [
          { symbol: "α", selected: [0] },
          { symbol: "β", selected: [0] },
          { symbol: "γ", selected: [0] },
          { symbol: "δ", selected: [0] },
          { symbol: "ε", selected: [0] },
          { symbol: "ξ", selected: [0] },
        ]
      },
      {
        name: "なた",
        type: [
          { symbol: "α", selected: [0] },
          { symbol: "β", selected: [0] },
        ]
      },
      {
        name: "スノーソー",
        type: [
          { symbol: "α", selected: [0] },
          { symbol: "β", selected: [0] },
          { symbol: "γ", selected: [0] },
          { symbol: "δ", selected: [0] },
          { symbol: "ε", selected: [0] },
          { symbol: "ξ", selected: [0] },
        ]
      },
    ],
    beacon: [
      {
        name: "ビーコン",
        type: [
          { symbol: "A", selected: [0] },
          { symbol: "B", selected: [0] },
          { symbol: "E", selected: [0] },
          { symbol: "F", selected: [0] },
          { symbol: "G", selected: [0] },
          { symbol: "H", selected: [0] },
          { symbol: "M", selected: [0] },
          { symbol: "O", selected: [0] },
          { symbol: "Q", selected: [0] },
          { symbol: "S", selected: [0] },
          { symbol: "X", selected: [0] },
          { symbol: "Y", selected: [0] },
          { symbol: "Z", selected: [0] },
          { symbol: "新arva", selected: [0] },
          { symbol: "甲", selected: [0] },
          { symbol: "乙", selected: [0] },
          { symbol: "い", selected: [0] },
          { symbol: "ろ", selected: [0] },
          { symbol: "に", selected: [0] },
        ]
      }
    ],
    other: [
      {
        name: "F装",
        num: 1,
      },
      {
        name: "W装",
        num: 1,
      },
      {
        name: "ペグ",
        num: 1,
      },
      {
        name: "大缶",
        num: 1,
      },
      {
        name: "小缶",
        num: 1,
      },
      {
        name: "共ポリ",
        num: 1,
      },
      {
        name: "お玉",
        num: 1,
      },
      {
        name: "しゃもじ",
        num: 1,
      },
      {
        name: "熊スプレー",
        num: 1,
      },
      {
        name: "浄水器",
        num: 1,
      },
      {
        name: "替えフィルター",
        num: 1,
      },
    ]
  })

  const navigate = useNavigate()

  const JumpToNext = () => {
    navigate("/Create/DistributeEquip", {
      state: {
        Equips_state: EquipsState
      }
    })
  }

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
              <td className={styles.TableContent}><input type='number' value={MemberNum} onChange={
                (e) => {
                  SetMemberNum(e.target.value);
                  const array = new Array(Number(e.target.value))
                  for (let i = 0; i < Number(e.target.value); i++) {
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
                  return (
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
        <EquipsContext.Provider value={EquipsState}>
          <Equip_table_list CreateOption={true} />
        </EquipsContext.Provider>
        <div>
          <p className={styles.Text}>その他</p>

          <table border="1" className={styles.table}>
            <tbody>
              <tr>
                <td>F装</td>
                <input type='number' className={styles.NumberInput}></input>
                <td>W装</td>
                <input type='number' className={styles.NumberInput}></input>
              </tr>
              <tr>
                <td>ペグ</td>
                <input type='number' className={styles.NumberInput}></input>
                <td>大缶</td>
                <input type='number' className={styles.NumberInput}></input>
              </tr>
              <tr>
                <td>小缶(L缶除く)</td>
                <input type='number' className={styles.NumberInput}></input>
                <td>共ポリ</td>
                <input type='number' className={styles.NumberInput}></input>
              </tr>
              <tr>
                <td>お玉</td>
                <input type='number' className={styles.NumberInput}></input>
                <td>しゃもじ</td>
                <input type='number' className={styles.NumberInput}></input>
              </tr>
              <tr>
                <td>熊スプレー</td>
                <input type='number' className={styles.NumberInput}></input>
                <td>浄水器</td>
                <input type='number' className={styles.NumberInput}></input>
              </tr>
              <tr>
                <td>替えフィルター</td>
                <input type='number' className={styles.NumberInput}></input>
              </tr>
            </tbody>
          </table>
        </div>
        <button className={styles.button} onClick={JumpToNext}>
          次へ
        </button>
      </main>
      <Footer />
    </div>
  )
}

export default Select_equip