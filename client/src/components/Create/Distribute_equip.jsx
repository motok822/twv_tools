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
    const [MembersPos, SetMembersPos] = useState([])
    const [EquipList, SetEquipList] = useState([])
    const navigate = useNavigate()
    let MemberDomList = new Array(location.state.Members.length)
    useEffect(() => {
        for (let i = 0; i < location.state.Members.length; i++) {
            SetMembersPos((prev) => [...prev, {}])
        }
        getPos()
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
                    ClimbingType: location.state.ClimbingType
                }
            })
        }

    }
    const ShowList = () => {
        Object.keys(Equips).forEach(function (key) {
            if (key == "other") {
                Equips[key].map((value) => {
                    if (value.num >= 1) {
                        for (let i = 1; i <= value.num; i++) {
                            SetEquipList((prev) => [...prev, { Name: value.name, MemberID: -1, UserName: "" }])
                        }
                    }
                })
            } else {
                Equips[key].map((value) => {
                    value.List.map((val) => {
                        val.selected.map((v) => {
                            if (v.flag == true) {
                                if (value.Group == "テント") {
                                    console.log(value.Type + val.Family + v.Name)
                                    SetEquipList((prev) => [...prev, { Name: value.Type + val.Family + v.Name, MemberID: -1, UserName: "" }])
                                } else {
                                    SetEquipList((prev) => [...prev, { Name: value.Group + value.Type + val.Family + v.Name, MemberID: -1, UserName: "" }])
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
        for (let i = 0; i < MembersPos.length; i++) {
            if (MembersPos[i].top <= e.pageY && e.pageY <= MembersPos[i].bottom && MembersPos[i].left <= e.pageX && e.pageX <= MembersPos[i].right) {
                flag = 1
                SetEquipList((prev) => {
                    for (let j = 0; j < EquipList.length; j++) {
                        if (prev[j].Name == name) {
                            prev[j].MemberID = i
                            prev[j].UserName = Members[i]
                            e.target.style.backgroundColor = "rgb(0, 0, 200, 0.4)"
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
                        e.target.style.backgroundColor = "gray"
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
                SetMembersPos((prev) => {
                    prev[i] = MemberDomList[i].getBoundingClientRect()
                    return prev
                })
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
                                <Draggable onDrag={(e) => EquipMove(e, value.Name)}>
                                    <div className={styles.MoveItem}>
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