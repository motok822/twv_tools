import styled from "@emotion/styled";
import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles/Home.module.css'
import { Link } from "react-router-dom";

const StyledTypography = styled(Typography)(() => ({
    fontSize: "34px",
    flexGrow: 1,
    padding: "10px 20px"
}))
const StyledButton = styled(Button)(() => ({
    color: "white",
    flexGrow: 0.05,
    fontSize: "15px",
    "&:hover": {
        opacity: "0.5",
    }
}))

const Bottondiv = styled("div")(() => ({
    color: "white",
    border: "none",
    display:"inline",
    alignItems: "center",
    textDecoration: "none",
    "&:hover":{
        opacity: "0.5"
    }
}))
function Header() {
  return (
    <div>
        <AppBar position="static">
            <Toolbar className={styles.ToolBar}>
                <MenuIcon />
                {/* <StyledTypography component="div"><Alink href="/">ロゴ募集中!</Alink></StyledTypography>
                <StyledButton sx={{marginLeft: "auto"}} href="/F" >F清算</StyledButton>
                <StyledButton sx={{marginLeft: "auto"}} href="/Max">Max&Limit</StyledButton>
                <StyledButton sx={{marginLeft: "auto"}} href="/Table">管理表</StyledButton>
                <StyledButton sx={{marginLeft: "auto"}} href="/Return">返却</StyledButton>
                <StyledButton sx={{marginLeft: "auto"}} href="/Create">E表作成</StyledButton>
                <StyledButton sx={{marginLeft: "auto"}} href="/Modify">E表修正</StyledButton>
                <StyledButton sx={{marginLeft: "auto"}} href="/Other">その他</StyledButton> */}
                
              <Link to = {'/'} style={{marginLeft:"20px", fontSize: "1.8rem", marginRight:"20px", textDecoration:"none"}}><Bottondiv>ロゴ募集中</Bottondiv></Link>  
              <Link to = {'/F'} className={styles.HeaderLinkElement} style={{ marginLeft: "auto",textDecoration:"none"}}><Bottondiv>F清算</Bottondiv></Link>
              <Link to = {'/Max'} className={styles.HeaderLinkElement} style={{textDecoration:"none"}}><Bottondiv>Max計算</Bottondiv></Link>
              <Link to = {'/Table'} className={styles.HeaderLinkElement} style={{textDecoration:"none"}}><Bottondiv>E表</Bottondiv></Link>
              <Link to = {'/Return'} className={styles.HeaderLinkElement} style={{textDecoration:"none"}}><Bottondiv>返却</Bottondiv></Link>
              <Link to = {'/Create'} className={styles.HeaderLinkElement} style={{textDecoration:"none"}}><Bottondiv>E表作成</Bottondiv></Link>
              <Link to = {'/Modify'} className={styles.HeaderLinkElement} style={{textDecoration:"none"}}><Bottondiv>E表修正</Bottondiv></Link>
              <Link to = {'/Other'} className={styles.HeaderLinkElement} style={{textDecoration:"none"}}><Bottondiv>その他</Bottondiv></Link>
            </Toolbar>            
        </AppBar>
    </div>
  )
}

export default Header