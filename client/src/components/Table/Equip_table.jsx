import React, { useCallback, useEffect, useRef, useState } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import styles from '../styles/Home.module.css'
import Tent_Table from './Tent_Table';
import Pot_Head_Table from './Pot_Head_Table';
import Work_Saw_Table from './Work_Saw_Table';
import Beacon_Table from './Beacon_Table';
import { AppBar, Box, Button, Toolbar, Typography, css} from '@mui/material';
import styled from '@emotion/styled';

const Greek_Character= ["α","β","γ","δ","ε","ζ","η"];



function Equip_table() {
  const [selected, SetSelected] = useState(1);
  const [active1, SetActive1] = useState(1);
  const [active2, SetActive2] = useState(0);
  const [active3, SetActive3] = useState(0);
  const [active4, SetActive4] = useState(0);
  const active1Ref = useRef();
  const active2Ref = useRef();
  const active3Ref = useRef();
  const active4Ref = useRef();
  active1Ref.current= active1;
  active2Ref.current= active2;
  active3Ref.current= active3;
  active4Ref.current= active4;

  

  const RLfunction = useCallback((event) => {
    const keyCode = event.keyCode;
    if(keyCode == 37){
      if(active1Ref.current==1){
        SetActive1(0);
        SetActive4(1);
        SetSelected(4);
      }else if(active2Ref.current==1){
        SetActive2(0);
        SetActive1(1);
        SetSelected(1);
      }else if(active3Ref.current==1){
        SetActive3(0);
        SetActive2(1);
        SetSelected(2);
      }else if(active4Ref.current==1){
        SetActive4(0);
        SetActive3(1);
        SetSelected(3);
      }
    }
    if(keyCode == 39){
      if(active1Ref.current==1){
        SetActive1(0);
        SetActive2(1);
        SetSelected(2);
      }else if(active2Ref.current==1){
        SetActive2(0);
        SetActive3(1);
        SetSelected(3);
      }else if(active3Ref.current==1){
        SetActive3(0);
        SetActive4(1);
        SetSelected(4);
      }else if(active4Ref.current==1){
        SetActive4(0);
        SetActive1(1);
        SetSelected(1);
      }
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", RLfunction, false);
  }, [])
  const Initialize_active= ()=>{
    SetActive1(0);
    SetActive2(0);
    SetActive3(0);
    SetActive4(0);
  }
  const handleClick = (e) => {
    SetSelected(Number(e.target.id));
    switch(Number(e.target.id)){
      case 1:
        Initialize_active()
        SetActive1(1);
        break;
      case 2:
        Initialize_active()
        SetActive2(1);
        break;
      case 3:
        Initialize_active()
        SetActive3(1);
        break;
      case 4:
        Initialize_active()
        SetActive4(1);
        break; 
      default: break;
    }
  }
  const display = (val) => {
    switch(val){
      case 0:
        return;
      case 1:
        return (<Tent_Table></Tent_Table>);
      case 2:
        return (<Pot_Head_Table></Pot_Head_Table>);
      case 3:
        return (<Work_Saw_Table></Work_Saw_Table>);
      case 4:
        return (<Beacon_Table></Beacon_Table>);
      default:
        return;
    }
  };
  return (
    <div className={styles.Home}>  
     <Header></Header>
          <main className={styles.main}>
            <p style={{fontSize:"32px", textAlign:"center"}}>装備管理システム</p>
            <p style={{fontSize:"32px", textAlign:"center"}}>～見方～</p>
            <p><div width="16px" height="16px"></div></p>
            <div>
              <AppBar position='static' style={{
                boxShadow: "none",
                background: "white",
                display: "flex",
                justifyContent: "center"
                }} >
                <Toolbar style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "48px"
                }}>
                  <Typography style={{color: "black", fontSize: "24px"}} onClick={(e)=>{handleClick(e)}} id="1" className={active1? styles.red: ""}>テント</Typography>
                  <Typography style={{color: "black", fontSize: "24px"}} onClick={(e)=>{handleClick(e)}} id="2" className={active2? styles.red: ""}>コッヘル・ヘッド</Typography>
                  <Typography style={{color: "black", fontSize: "24px"}} onClick={(e)=>{handleClick(e)}} id="3" className={active3? styles.red: ""}>係装・薮ノコ・なた・スノーソー</Typography>
                  <Typography style={{color: "black", fontSize: "24px"}} onClick={(e)=>{handleClick(e)}} id="4" className={active4? styles.red: ""}>ビーコン</Typography>
                </Toolbar>
              </AppBar>
            </div>
            <div>
              {display(selected)}
            </div>
          </main>
      <Footer></Footer>
    </div>
  )
}




export  {Equip_table}
export {Greek_Character}