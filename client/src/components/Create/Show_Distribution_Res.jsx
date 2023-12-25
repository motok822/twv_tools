import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import styles from '../styles/Select_equip.module.css'
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import { Button } from '@mui/material';
import { ShowUser } from '../UserManage';

let EquipInfoTemplate = { ID: null, UserID: 2, EquipID: 7, Act: "DELETE", T1: new Date("2022-08-18 14:58:00"), T2: null, MoveDest: "temp", PlanID: 0 }

function Show_Distribution_Res() {
    const location = useLocation();
    const EquipList = location.state.EquipList
    const MemberNum = location.state.MemberSum
    const ClimbingState = location.state.ClimbingState
    const MemberEquip = new Array(MemberNum)
    const Members = location.state.Members
    MemberEquip.fill([])
    console.log(ClimbingState)
    const IndivisualEquip = [
        "夏山一般装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフ、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツorジャージ上、山用ズボン、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、",
        "夏山日帰り装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、山用ズボン、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、",
        "藪一般装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフ、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、藪軍手、藪メガネ、メガネバンド、防虫ネット、",
        "藪日帰り装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、藪軍手、藪メガネ、メガネバンド、防虫ネット、",
        "沢一般装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフ、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツorジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、遡行図、沢足袋、軍足(二本指靴下)、毛下、メット、ハーネス、カラビナ×3、確保器、80ロープ、120テープ、藪軍手、",
        "沢日帰り装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、遡行図、沢足袋、軍足(二本指靴下)、毛下、メット、ハーネス、カラビナ×3、確保器、80ロープ、120テープ、藪軍手、",
        "岩一般装: テープスリング*2、変形D型環付きカラビナ2 ハーネス、ヘルメット、クライミングシューズ、チョークバッグ、フリクションコード、セルフビレイコード、ビレイグローブ、テーピング、ヘッドランプ、atcガイド、hms型カラビナ、120テープスリング+180テープスリング、カラビナ３、缶きり(1年)、非常用パック、",
        "岩日帰り装: テープスリング*2、変形D型環付きカラビナ2 ハーネス、ヘルメット、クライミングシューズ、チョークバッグ、フリクションコード、セルフビレイコード、ビレイグローブ、テーピング、ヘッドランプ、atcガイド、hms型カラビナ、120テープスリング+180テープスリング、カラビナ３、",
        "冬山一般装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフ、シュラフカバー、登山靴、雨具(ゴアマ)orヤッケ、山シャツorジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、毛下(厚手)、ゴーグル、サングラス、目出し帽、スパッツ、ハンガロン、オーバーグローブ、",
        "冬山日帰り装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、毛下(厚手)、ゴーグル、サングラス、目出し帽、スパッツ、ハンガロン、オーバーグローブ、",
        "山スキー一般装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフ、シュラフカバー、兼用靴、雨具(ゴアマ)orヤッケ、山シャツorジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ベニヤ板、軍手×2、ライター×2、ヘッドランプ、替え電池、テーピング、ガムテープ、新聞紙、キジペ(トイレットペーパー)、ブキ(食器)、コーゲキ(スプーン)、ナイフ、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、F共装、毛下(厚手)、ゴーグル、サングラス、目出し帽、スパッツ、ハンガロン、オーバーグローブ、スキー板、ストック、シール、クトー、",
        "山スキー日帰り装(1人" + String(ClimbingState.Water) + "発): ザック、ザックカバー、シュラフカバー、登山靴、雨具(ゴアマ)、山シャツor ジャージ上、防寒具(フリースorセーター)、速乾性Tシャツ(ダクロンT)×2、靴下×2、地図(本、予備)、コンパス、マップケース、銀マット、ヘッドランプ、替え電池、テーピング、キジペ(トイレットペーパー)、笛、缶きり(1年)、非常用パック、タオル、帽子、時計、日焼け止め、お金、本審用紙(登山計画書)、学生証、保険証、毛下(厚手)、ゴーグル、サングラス、目出し帽、スパッツ、ハンガロン、オーバーグローブ、スキー板、ストック、シール、クトー、"
    ]
    const SearchUser = (Name, UserDictionary) => {
        for (let i = 0; i < UserDictionary.length; i++) {
            if (UserDictionary[i].FamilyName + UserDictionary[i].FirstName == Name) {
                return UserDictionary[i].ID
            }
        }
        return 3
    }
    const navigate = useNavigate()
    const ChangeEquipState = async () => {
        let BMgr = new BasicAPIManager()
        let NewEquipRequest = new Array()
        const UserDictionary = await ShowUser()
        EquipList.map((value) => {
            const newEquipInfo = Object.assign({}, EquipInfoTemplate)
            newEquipInfo.T1 = new Date(ClimbingState.T1)
            newEquipInfo.Act = "RESERVE"
            newEquipInfo.T2 = new Date(ClimbingState.T2)
            newEquipInfo.MoveDest = "予約"
            newEquipInfo.PlanID = ClimbingState.ClimbingId
            newEquipInfo.EquipID = value.EquipID
            newEquipInfo.UserID = SearchUser(value.UserName, UserDictionary)
            console.log("UserName", newEquipInfo.UserID)
            console.log(value.Name, value.EquipID)
            console.log("newEquipInfo", newEquipInfo)
            NewEquipRequest.push(newEquipInfo)
        })
        console.log(await BMgr.EquipInfo.RegisterInfos(NewEquipRequest))
        console.log("EquipInfo")
        console.log(await BMgr.EquipInfo.GetOneYear())
        navigate("/Table")
    }
    const AddPlan = async () => {
        let BMgr = new BasicAPIManager()
        let AMgr = new AdvancedAPIManager()
        console.log("ClimbingState", ClimbingState)
        let DefaultPlanInfo = { ID: ClimbingState.ClimbingId, Name: ClimbingState.ClimbingName, FYear: ClimbingState.ClimbingYear, PlanType: "CLUB", PlanNum: 1, ReserveStart: new Date(ClimbingState.T1), ReserveEnd: new Date(ClimbingState.T2), ClimeStart: new Date(ClimbingState.T1), ClimeEnd: new Date(ClimbingState.T2), LastUpdate: new Date('2023-08-30T15:00:00.000Z'), Members: [MemberNum] }
        console.log(JSON.stringify(DefaultPlanInfo))
        console.log(await BMgr.Plans.Update(DefaultPlanInfo))
        console.log(await BMgr.Plans.GetOneYear())
    }
    EquipList.map((value) => {
        MemberEquip[value.MemberID] = [...MemberEquip[value.MemberID], value.Name]
    })
    useEffect(() => {
        AddPlan()
    }, [])
    return (
        <>
            <div className={styles.Home}>
                <Header />
                <main className={styles.main}>
                    <p>
                        {IndivisualEquip[ClimbingState.ClimbingType]}
                        {ClimbingState.Water > 0 ? "ポリタン" + "×" + String(ClimbingState.ActiveFood) : ""}
                        {ClimbingState.ActiveFood > 0 ? "行動食" + String(ClimbingState.ActiveFood) + "日分、" : ""}
                        {ClimbingState.EmergencyFood > 0 ? "非常食" + String(ClimbingState.EmergencyFood) + "日分、" : ""}
                        {ClimbingState.Rice > 0 ? "無洗米" + String(ClimbingState.Rice) + "日分、" : ""}
                        {ClimbingState.SpareFood > 0 ? "予備食" + String(ClimbingState.SpareFood) + "日分、" : ""}
                        {ClimbingState.AdditionalEquip}
                    </p>
                    {console.log("MemberEquip", MemberEquip)}
                    <div>
                        {
                            MemberEquip.map((value, ind) => {
                                return (
                                    <p>
                                        <div style={{ display: "flex" }}>
                                            <div>{Members[ind] + ":"}</div>
                                            {value.map((val) => {
                                                { console.log(val) }
                                                return (
                                                    <>
                                                        <div style={{ display: "inline" }}>{val}</div>
                                                        <div style={{ width: "10px" }}></div>
                                                    </>
                                                )
                                            })}
                                        </div>

                                    </p>
                                )
                            })
                        }
                    </div>

                </main>
                <Button onClick={ChangeEquipState}><h2>確認</h2></Button>
                <Footer />
            </div>
        </>
    )
}

export default Show_Distribution_Res