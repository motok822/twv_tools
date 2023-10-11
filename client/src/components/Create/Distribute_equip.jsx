import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
    useEffect(() => {
        for(let i = 0;i < location.state.Members.length;i++){
            SetMembersPos((prev) => [...prev, {x: 0, y: 0}])
        }
        ShowList()
    }, [])
    const ShowList = () => {
        SetEquipList([])
        Object.keys(Equips).forEach(function (key) {
            if (key == "other") {

            } else {
                Equips[key].map((value) => {
                    value.List.map((val) => {
                        val.selected.map((v) => {
                            if (v.flag == true) {
                                if (value.Group == "テント") {
                                    console.log(value.Type + val.Family + v.Name)
                                    SetEquipList((prev) => [...prev, value.Type + val.Family + v.Name])
                                } else {
                                    SetEquipList((prev) => [...prev, value.Group + value.Type + val.Family + v.Name])
                                }
                            }
                        })
                    })
                })
            }
        })
    }
    const EquipMove = (e) => {
        console.log("MembersPos", MembersPos)
        console.log("Equips", e)
        console.log("Equips", e.clientX, e.clientY)
    }
    return (
        <>
            <Header />
            <main className={Homestyles.Home}>
                <div className={styles.ItemContainer}>
                {
                    EquipList.map((value) => {
                        return (
                            <Draggable>
                                <div onClick={(e) => EquipMove(e)} className={styles.MoveItem}>
                                    <p>{value}</p>
                                </div>
                            </Draggable>
                        )
                    })
                }
                </div>
                <div className={styles.MemberContainer}>
                    {Members.map((value) => {
                        return (
                            <Draggable >
                                <div className={styles.MemberItem}>
                                    <p>{value}</p>
                                </div>
                            </Draggable>
                        )
                    })}
                </div>
                <Button><h1>次へ</h1></Button>
            </main>
            <Footer />
        </>
    )
}

export default Distribute_equip