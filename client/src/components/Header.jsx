import styled from "@emotion/styled";
import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles/Header.module.css'
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
        <AppBar position="static">
            <Toolbar className={styles.ToolBar}>
              <Link to = {'/'} className={styles.HomeLinkElement}><div className={styles.BottonDiv}>ロゴ募集中</div></Link>  
              <Link to = {'/F'} className={styles.HeaderLinkElement} style={{ marginLeft: "auto"}}><div className={styles.BottonDiv}>F清算</div></Link>
              <Link to = {'/Max'} className={styles.HeaderLinkElement} ><div className={styles.BottonDiv}>Max計算</div></Link>
              <Link to = {'/Table'} className={styles.HeaderLinkElement} ><div className={styles.BottonDiv}>E表</div></Link>
              <Link to = {'/Create'} className={styles.HeaderLinkElement} ><div className={styles.BottonDiv}>E表作成</div></Link>
              <Link to = {'/Other'} className={styles.HeaderLinkElement} ><div className={styles.BottonDiv}>その他</div></Link>
            </Toolbar>            
        </AppBar>
    </div>
  )
}

export default Header