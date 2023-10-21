import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import styles from '../styles/Select_equip.module.css'
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import { Button } from '@mui/material';

let EquipInfoTemplate = { ID: null, UserID: 2, EquipID: 7, Act: "DELETE", T1: new Date("2022-08-18 14:58:00"), T2: null, MoveDest: "temp", PlanID: 0 }

function Show_Distribution_Res() {

    const IndivisualEquip = [
        "夏山一般装(1人1発): ザック、ザックカバー、シュラフ、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツorジャージ上、山用ズボン、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、ポリタン×1、行動食2日分、非常食1日分、無洗米1合",
        "夏山日帰り装(1人1発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、山用ズボン、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、ポリタン×1、行動食2日分、非常食1日分、無洗米1合",
        "藪一般装(1人1発): ザック、ザックカバー、シュラフ、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、藪軍手、藪メガネ、メガネバンド、防虫ネット、ポリタン×1、行動食2日分、非常食1日分、無洗米1合",
        "藪日帰り装(1人1発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、藪軍手、藪メガネ、メガネバンド、防虫ネット、ポリタン×1、行動食2日分、非常食1日分、無洗米1合",
        "沢一般装(1人1発): ザック、ザックカバー、シュラフ、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツorジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、遡行図、沢足袋、軍足(二本指靴下)、毛下、メット、ハーネス、カラビナ×3、確保器、80ロープ、120テープ、藪軍手、ポリタン×1、行動食2日分、非常食1日分、無洗米1合",
        "日帰り装(1人1発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、遡行図、沢足袋、軍足(二本指靴下)、毛下、メット、ハーネス、カラビナ×3、確保器、80ロープ、120テープ、藪軍手、ポリタン×1、行動食2日分、非常食1日分、無洗米1合",
        "冬山一般装(1人1発): ザック、ザックカバー、シュラフ、シュラフカバー、登山靴、雨具(ゴアマ)orヤッケ、山シャツorジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、毛下(厚手)、ゴーグル、サングラス、目出し帽、スパッツ、ハンガロン、オーバーグローブ、ポリタン×1、行動食2日分、非常食1日分、無洗米1合",
        "冬山日帰り装(1人1発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、毛下(厚手)、ゴーグル、サングラス、目出し帽、スパッツ、ハンガロン、オーバーグローブ、ポリタン×1、行動食2日分、非常食1日分、無洗米1合",
        "山スキー一般装(1人1発): ザック、ザックカバー、シュラフ、シュラフカバー、兼用靴、雨具(ゴアマ)orヤッケ、山シャツorジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、毛下(厚手)、ゴーグル、サングラス、目出し帽、スパッツ、ハンガロン、オーバーグローブ、スキー板、ストック、シール、クトー、ポリタン×1、行動食2日分、非常食1日分、無洗米1合",
        "山スキー日帰り装(1人1発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、毛下(厚手)、ゴーグル、サングラス、目出し帽、スパッツ、ハンガロン、オーバーグローブ、スキー板、ストック、シール、クトー、ポリタン×1、行動食2日分、非常食1日分、無洗米1合"
    ]
    const ChangeEquipState = async () => {
        let BMgr = new BasicAPIManager()
        let NewEquipRequest = new Array()

        EquipList.map((value) => {
            const newEquipInfo = Object.assign({}, EquipInfoTemplate)
            newEquipInfo.T1 = new Date(ClimbingState.T1)
            newEquipInfo.Act = "MOVE"
            newEquipInfo.T2 = new Date(ClimbingState.T2)
            newEquipInfo.MoveDest = "予約"
            newEquipInfo.PlanID = ClimbingState.ClimbingId
            newEquipInfo.EquipID = value.EquipID
            console.log(value.Name, value.EquipID)
            console.log("newEquipInfo",newEquipInfo)
            NewEquipRequest.push(newEquipInfo)
        })
        console.log(await BMgr.EquipInfo.RegisterInfos(NewEquipRequest))
        console.log("EquipInfo")
        console.log(await BMgr.EquipInfo.GetOneYear())
    }
    const AddPlan = async () => {
        let BMgr = new BasicAPIManager()
        let AMgr = new AdvancedAPIManager()
        console.log("ClimbingState", ClimbingState)
        let DefaultPlanInfo = { ID: ClimbingState.ClimbingId, Name: ClimbingState.ClimbingName, FYear: 2023, PlanType: "CLUB", PlanNum: 1, ReserveStart: new Date(ClimbingState.T1), ReserveEnd: new Date(ClimbingState.T2), ClimeStart: new Date(ClimbingState.T1), ClimeEnd: new Date(ClimbingState.T2), LastUpdate: new Date('2023-08-30T15:00:00.000Z'), Members: [MemberNum] }
        console.log(JSON.stringify(DefaultPlanInfo))
        console.log(await BMgr.Plans.Update(DefaultPlanInfo))
        console.log(await BMgr.Plans.GetOneYear())
    }
    const location = useLocation();
    const EquipList = location.state.EquipList
    const MemberNum = location.state.MemberSum
    const ClimbingState = location.state.ClimbingState
    const [MemberEquip, SetMemberEquip] = useState(new Array(MemberNum))
    MemberEquip.fill([])
    console.log(IndivisualEquip[ClimbingState.ClimbingType])
    console.log(ClimbingState.ClimbingType)
    useEffect(() => {
        EquipList.map((value) => {
            SetMemberEquip((prev) => {
                prev[value.MemberID] = [...prev[value.MemberID], value.Name]
                return prev
            })
        })
        AddPlan()
    }, [])
    return (
        <>
            <div className={styles.Home}>
                <Header />
                <main className={styles.main}>
                    <p>
                        {IndivisualEquip[ClimbingState.ClimbingType]}
                    </p>
                    {console.log("MemberEquip", MemberEquip)}
                    <div>
                        {
                            MemberEquip.map((value) => {
                                return (
                                    <p>
                                        {value.map((val) => {
                                            { console.log(val) }
                                            return (
                                                <div>{val}</div>
                                            )
                                        })}
                                    </p>
                                )
                            })
                        }
                    </div>

                </main>
                <Button onClick={ChangeEquipState}>確認</Button>
                <Footer />
            </div>
        </>
    )
}

export default Show_Distribution_Res