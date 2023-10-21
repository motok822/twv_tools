import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';
import styles from '../styles/Select_equip.module.css'
import { Equip_table } from '../Table/Equip_table';
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';

export const EquipsContext = createContext()
let EquipInfoTemplate = { ID: null, UserID: 2, EquipID: 7, Act: "DELETE", T1: new Date("2022-08-18 14:58:00"), T2: null, MoveDest: "temp", PlanID: 0 }
const ClimbingTypeName = [
  "夏山一般装",
  "夏山日帰り装",
  "藪一般装",
  "藪日帰り装",
  "沢一般装",
  "沢日帰り装",
  "冬山般装",
  "冬山日帰り装",
  "山スキー般装",
  "山スキ日帰り装"
]
function Select_equip() {
  const location = useLocation();
  const [ClimbingState, SetClimbingState] = useState(location.state)
  const [MemberNum, SetMemberNum] = useState(5)
  const [Members, SetMembers] = useState(["1人目", "2人目", "3人目", "4人目", "5人目"])
  useEffect(() => {
    console.log("MemberNum", MemberNum)
    console.log("Members", Members.length)
    SetMembers((prev) => {
      for(let i = 0;i < MemberNum;i++){
        if(i >= Members.length){
          console.log("MemberNum",  MemberNum)
          prev = [...prev, String(i+1)+"人目"]
        }else if(prev[i] == ""){
          prev[i] = String(i+1) + "人目"
        }
      }
      prev = prev.slice(0, MemberNum)
      return prev
    })
  }, [MemberNum])
  useEffect(() => {
    SetEquipIDs() 
  })
  const [EquipsState, SetEquips] = useState({
    tent: [
      {
        Group: "テント",
        Type: "7天",
        List: [
          { Family: "α", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
          { Family: "β", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
          { Family: "γ", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
          { Family: "δ", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
        ]
      },
      {
        Group: "テント",
        Type: "45天",
        List: [
          { Family: "α", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
          { Family: "β", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
          { Family: "γ", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
          { Family: "δ", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
          { Family: "ε", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
        ]
      },
      {
        Group: "テント",
        Type: "6天",
        List: [
          { Family: "α", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
          { Family: "β", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "フライ", flag: 0, EquipID: 0 }] },
        ]
      },
      {
        Group: "テント",
        Type: "12天",
        List: [
          { Family: "α", selected: [{ Name: "本体", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }, { Name: "ポール", flag: 0, EquipID: 0 }] },
        ]
      },
    ],
    pot_head: [
      {
        Group: "コッヘル",
        Type: "",
        List: [
          { Family: "α", selected: [{ Name: "特大", flag: 0, EquipID: 0 }, { Name: "大", flag: 0, EquipID: 0 }, { Name: "中", flag: 0, EquipID: 0 }] },
          { Family: "β", selected: [{ Name: "特大", flag: 0, EquipID: 0 }, { Name: "大", flag: 0, EquipID: 0 }, { Name: "中", flag: 0, EquipID: 0 }] },
          { Family: "γ", selected: [{ Name: "特大", flag: 0, EquipID: 0 }, { Name: "大", flag: 0, EquipID: 0 }, { Name: "中", flag: 0, EquipID: 0 }] },
          { Family: "δ", selected: [{ Name: "大", flag: 0, EquipID: 0 }, { Name: "中", flag: 0, EquipID: 0 }] },
          { Family: "ε", selected: [{ Name: "中", flag: 0, EquipID: 0 }] },
          { Family: "ξ", selected: [{ Name: "中", flag: 0, EquipID: 0 }] },

        ]
      },
      {
        Group: "ヘッド",
        Type: "",
        List: [
          { Family: "", selected: [{ Name: "α", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "β", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "γ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "δ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "ε", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "η", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "Θ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "λ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "μ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "π", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "ρ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "σ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "φ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "ω", flag: 0, EquipID: 0 }] },
        ]
      }],
    work_saw: [
      {
        Group: "L装",
        Type: "",
        List: [
          { Family: "", selected: [{ Name: "α", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "β", flag: 0, EquipID: 0 }] },
        ]
      },
      {
        Group: "ヘルボ",
        Type: "",
        List: [
          { Family: "", selected: [{ Name: "α", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "β", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "γ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "δ", flag: 0, EquipID: 0 }] },
        ]
      },
      {
        Group: "エキボ",
        Type: "",
        List: [
          { Family: "", selected: [{ Name: "α", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "β", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "γ", flag: 0, EquipID: 0 }] },
        ]
      },
      {
        Group: "藪ノコ",
        Type: "",
        List: [
          { Family: "", selected: [{ Name: "α", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "β", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "γ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "δ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "ε", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "ζ", flag: 0, EquipID: 0 }] },
        ]
      },
      {
        Group: "なた",
        Type: "",
        List: [
          { Family: "", selected: [{ Name: "α", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "β", flag: 0, EquipID: 0 }] },
        ]
      },
      {
        Group: "スノーソー",
        Type: "",
        List: [
          { Family: "", selected: [{ Name: "α", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "β", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "γ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "δ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "ε", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "ζ", flag: 0, EquipID: 0 }] },
        ]
      },
    ],
    beacon: [
      {
        Group: "ビーコン",
        Type: "",
        List: [
          { Family: "", selected: [{ Name: "A", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "B", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "E", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "F", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "G", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "H", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "M", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "O", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "Q", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "S", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "X", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "Y", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "Z", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "新arva", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "甲", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "乙", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "い", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "ろ", flag: 0, EquipID: 0 }] },
          { Family: "", selected: [{ Name: "に", flag: 0, EquipID: 0 }] },
        ]
      }
    ],
    other: [
      {
        name: "F装",
        num: 0,
      },
      {
        name: "W装",
        num: 0,
      },
      {
        name: "ペグ",
        num: 0,
      },
      {
        name: "大缶",
        num: 0,
      },
      {
        name: "小缶",
        num: 0,
      },
      {
        name: "共ポリ",
        num: 0,
      },
      {
        name: "お玉",
        num: 0,
      },
      {
        name: "しゃもじ",
        num: 0,
      },
      {
        name: "熊スプレー",
        num: 0,
      },
      {
        name: "浄水器",
        num: 0,
      },
      {
        name: "替えフィルター",
        num: 0,
      },
    ]
  })

  const navigate = useNavigate()
  const JumpToNext = () => {
    console.log(EquipsState)
    navigate("/Create/DistributeEquip", {
      state: {
        Equips_state: EquipsState,
        Members: Members,
        ClimbingState: ClimbingState
      }
    })
  }
  const SearchEquipID = (Group, Type, Family, Name) => {
    for (let i = 0; i < PlanMapOneYear.equipclass.length; i++) {
      if (Group == PlanMapOneYear.equipclass[i].Group &&
        Type == PlanMapOneYear.equipclass[i].Type &&
        Family == PlanMapOneYear.equipclass[i].Family &&
        Name == PlanMapOneYear.equipclass[i].Name) {
        return PlanMapOneYear.equipclass[i].ID
      }
    }
    return null
  }
  const SetEquipIDs = async() => {
    let BMgr = new BasicAPIManager()
    let AMgr = new AdvancedAPIManager();
    PlanMapOneYear = await AMgr.EquipMap.GetPlanMapOneYear()
    Object.keys(EquipsState).forEach(function (key) {
      if (key != "other") {
        EquipsState[key].map((value) => {
          value.List.map((val) => {
            val.selected.map((v) => {
              v.EquipID = SearchEquipID(value.Group, value.Type, val.Family, v.Name)
              console.log(value.Group+value.Type+val.Family+v.Name, v.EquipID)
            })
          })
        })
      }
    })
  }
  const MakeRequest = (template) => {
    let Requests = new Array()
    Object.keys(EquipsState).forEach(function (key) {
      if (key != "other") {
        EquipsState[key].map((value) => {
          value.List.map((val) => {
            val.selected.map((v) => {
              if (v.flag == 1) {
                const request = Object.assign({}, template)
                request.EquipID = v.EquipID
                Requests = [...Requests, request]
              }
            })
          })
        })
      }
    })
    return Requests
  }
  const SetOtherEquip = (value, e) => {
    value.num = Number(e.target.value)
    if(value.num < 0)value.num = 0
  }
  let PlanMapOneYear = null
  const SendInfoToServer = async () => {
    let BMgr = new BasicAPIManager()
    let AMgr = new AdvancedAPIManager();
    PlanMapOneYear = await AMgr.EquipMap.GetPlanMapOneYear()
    SetEquipIDs()
    console.log(EquipsState)
    }

  return (
    <div className={styles.Home}>
      <Header />
      <main className={styles.main}>
        <table border="1" className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.TableTitle}>山行企画名</td>
              <td className={styles.TableContent}>{ClimbingState.ClimbingName}</td>
            </tr>
            <tr>
              <td className={styles.TableTitle}>山行形態</td>
              <td className={styles.TableContent}>{ClimbingTypeName[ClimbingState.ClimbingType]}</td>
            </tr>
            <tr>
              <td className={styles.TableTitle}>参加人数</td>
              <td className={styles.TableContent}><input type='number' value={MemberNum} onChange={
                (e) => {
                  SetMemberNum(e.target.value);
                }}></input>人</td>
            </tr>
            <tr>
              <td className={styles.TableTitle}>参加メンバー</td>
              <td className={styles.TableContent}>
                {Members.map((val, ind) => {
                  return (
                    <input type='text' onChange={(e) =>{
                      SetMembers((prev) => {
                        prev[ind] = e.target.value
                        return prev
                      })
                    }} placeholder={val}></input>
                  )
                })}
              </td>
            </tr>
          </tbody>
        </table>
        <p className={styles.Text}>共装選択</p>
        <EquipsContext.Provider value={EquipsState}>
          <Equip_table CreateOption={true} />
        </EquipsContext.Provider>
        <div>
          <p className={styles.Text}>その他</p>

          <table border="1" className={styles.table}>
            <tbody>
              <div className={styles.GridTable}> 
              {
                EquipsState.other.map((value) => {
                  return (
                    <>
                      <td>{value.name}</td>
                      <input type='number' className={styles.NumberInput} placeholder={value.num} onChange={(e) => SetOtherEquip(value, e)}></input>
                      <div className={styles.space}></div>
                    </>
                  )
                })
              }
              </div>
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