import React, { useCallback, useEffect, useRef, useState } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import styles from '../styles/EquipTable.module.css'
import Tent_Table from './Tent_Table';
import Pot_Head_Table from './Pot_Head_Table';
import Work_Saw_Table from './Work_Saw_Table';
import Beacon_Table from './Beacon_Table';
import { AppBar, Box, Button, Toolbar, Typography, css } from '@mui/material';
import styled from '@emotion/styled';
import Equip_table_list from './Equip_table_list';

const Greek_Character = ["α", "β", "γ", "δ", "ε", "ζ", "η"];
const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;


function Equip_table() {
  return (
    <div className={styles.Home}>
      <Header></Header>
      <main className={styles.main}>
        <p className={styles.title}>装備管理システム</p>
        <Equip_table_list/>
      </main >
      <Footer></Footer>
    </div >
  )
}




export { Equip_table }
export { Greek_Character }