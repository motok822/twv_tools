import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import Draggable from 'react-draggable'
import styles from '../styles/Distribute.module.css'
import Homestyles from '../styles/Home.module.css'
import { Button } from '@mui/material'

function Distribute_equip() {
    const location = useLocation()
    const [Equips, SetEquips] = useState(location.state.Equips_state)
    const [Members, SetMembers] = useState(location.state.Members)
    let MemberPos = new Array(location.state.Members.length)
    const [EquipList, SetEquipList] = useState([])
    const navigate = useNavigate()
    let MemberDomList = new Array(location.state.Members.length)
    useEffect(() => {
        ShowList()
    }, [])
    const JumpToNext = () => {
        let flag = 1;
        for (let i = 0; i < EquipList.length; i++) {
            if (EquipList[i].MemberID == -1) flag = 0
        }
        if (flag == 0) {
            alert("割り振られていない装備があります")
        } else {
            navigate("/Create/ShowDistributionRes", {
                state: {
                    EquipList: EquipList,
                    MemberSum: Members.length,
                    Members: Members,
                    ClimbingState: location.state.ClimbingState
                }
            })
        }

    }
    const ShowList = () => {
        Object.keys(Equips).forEach(function (key) {
            if (key == "other") {
                Equips[key].map((value) => {
                    if(value.num >= 1){
                        if (value.name != "ペグ" && value.name != "ハーケン" && value.name != "お玉") {
                            for (let i = 1; i <= value.num; i++) {
                                SetEquipList((prev) => [...prev, { Name: value.name, MemberID: -1, UserName: "", EquipID: -1, cnt: String(i) }])
                            }
                        }else if(value.name == "ハーケン"){
                            for(let i = 1; i <= value.num/4; i+= 1){
                                SetEquipList((prev) => [...prev, { Name: value.name+"4", MemberID: -1, UserName: "", EquipID: -1, cnt: String(i) }])
                            }
                        }else if(value.name == "お玉"){
                            for(let i = 1; i <= value.num/2; i+= 1){
                                SetEquipList((prev) => [...prev, { Name: value.name+"2", MemberID: -1, UserName: "", EquipID: -1, cnt: String(i) }])
                            }
                        }else{
                            SetEquipList((prev) => [...prev, { Name: value.name+String(value.num), MemberID: -1, UserName: "", EquipID: -1,  cnt: "" }])
                        }
                    }
                })
            } else {
                Equips[key].map((value) => {
                    value.List.map((val) => {
                        val.selected.map((v) => {
                            if (v.flag == true) {
                                if (value.Group == "テント") {
                                    console.log(value.Type + val.Family + v.Name, "EquipID", v.EquipID)
                                    SetEquipList((prev) => [...prev, { Name: value.Type + val.Family + v.Name, MemberID: -1, UserName: "", EquipID: v.EquipID , cnt: ""}])
                                } else {
                                    SetEquipList((prev) => [...prev, { Name: value.Group + value.Type + val.Family + v.Name, MemberID: -1, UserName: "", EquipID: v.EquipID, cnt: "" }])
                                }
                            }
                        })
                    })
                })
            }
        })
    }
    const EquipMove = (e, name) => {
        let flag = 0
        getPos()
        if(e.type== "touchmove"){
            e = e.touches[0]
        }
        for (let i = 0; i < MemberPos.length; i++) {
            if (MemberPos[i].top <= e.clientY && e.clientY <= MemberPos[i].bottom && MemberPos[i].left <= e.clientX && e.clientX <= MemberPos[i].right) {
                flag = 1
                SetEquipList((prev) => {
                    for (let j = 0; j < EquipList.length; j++) {
                        if (prev[j].Name+prev[j].cnt == name) {
                            prev[j].MemberID = i
                            prev[j].UserName = Members[i]
                            let p = document.getElementById(name + "DOM")
                            p.style.backgroundColor = "rgb(0, 0, 200, 0.4)"
                        }
                    }
                    return prev
                })
            }
        }
        if (flag == 0) {
            SetEquipList((prev) => {
                for (let j = 0; j < EquipList.length; j++) {
                    if (prev[j].Name == name) {
                        prev[j].MemberID = -1
                        let p = document.getElementById(name + "DOM")
                        p.style.backgroundColor = "gray"
                    }
                }
                return prev
            })
        }
    }
    const getPos = () => {
        for (let i = 0; i < location.state.Members.length; i++) {
            MemberDomList[i] = document.getElementById("Member" + String(i))
        }
        for (let i = 0; i < location.state.Members.length; i++) {
            if (MemberDomList[i] != null) {
                MemberPos[i] = MemberDomList[i].getBoundingClientRect()
            }
        }
    }

    return (
        <>
            <Header />
            <main className={Homestyles.Home}>
                <div className={styles.ItemContainer}>
                    {
                        EquipList.map((value) => {
                            return (
                                <Draggable onDrag={(e) => EquipMove(e, value.Name + value.cnt)}>
                                    <div className={styles.MoveItem} id={value.Name + value.cnt + "DOM"}>
                                        <p>{value.Name}</p>
                                    </div>
                                </Draggable>
                            )
                        })
                    }
                </div>
                <div className={styles.MemberContainer}>
                    {Members.map((value, index) => {
                        return (
                            <div id={"Member" + String(index)} >
                                <div className={styles.MemberItem}>
                                    <p>{value}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Button onClick={JumpToNext}><h1>次へ</h1></Button>
            </main>
            <Footer />
        </>
    )
}

export default Distribute_equip