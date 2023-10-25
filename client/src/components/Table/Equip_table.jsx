import React, { createContext, useCallback, useEffect, useRef, useState } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import styles from '../styles/EquipTable.module.css'
import Tent_Table from './Tent_Table';
import Pot_Head_Table from './Pot_Head_Table';
import Work_Saw_Table from './Work_Saw_Table';
import Beacon_Table from './Beacon_Table';
import { AppBar, Box, Button, Toolbar, Typography, css } from '@mui/material';
import styled from '@emotion/styled';
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import Equip_table_list from './Equip_table_List';
import { ShowUser } from '../UserManage';

const Greek_Character = ["α", "β", "γ", "δ", "ε", "ζ", "η"];
export const UserDict = createContext()

function Equip_table(props) {
  const [PlanMapOneYear, SetPlanMapOneYear] = useState(null)
  useEffect(() => {
    Fetch_Table();
  }, [])
  const Fetch_Table = async () => {
    let BMgr = new BasicAPIManager();
    let AMgr = new AdvancedAPIManager();
    console.log(await BMgr.User.GetUsers())
    console.log(await BMgr.EquipClass.GetAll())
    console.log(await BMgr.EquipInfo.GetOneYear())
    console.log(await BMgr.Plans.GetOneYear())
    console.log("plan map")
    SetPlanMapOneYear(await AMgr.EquipMap.GetPlanMapOneYear())
  }

  if (props.CreateOption == true) {
    return (
      <>
        {
          PlanMapOneYear == null ? <></> : <Equip_table_list PlanMapOneYear={PlanMapOneYear} CreateOption={true} />
        }
      </>
    )
  } else {
    return (
        <div className={styles.Home}>
          <Header></Header>
          <main className={styles.main}>
            <p className={styles.title}>装備管理システム</p>
            {
              PlanMapOneYear == null ? <></> : <Equip_table_list PlanMapOneYear={PlanMapOneYear} CreateOption={false} />
            }
          </main >
          <Footer></Footer>
        </div >
    )
  }
}




export { Equip_table }
export { Greek_Character }