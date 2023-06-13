import { Link, Typography, styled } from '@mui/material'
import React from 'react'
const StyledDiv = styled("div")(() => ({
  background: "#223377"
}))
const StyledTypography = styled(Typography)(() => ({
  color: "white",
  padding: "10px 0px"
}))
const StyledA = styled("a")(() => ({
  color:"white"
}))
function Footer() {
  return (
    <StyledDiv>
      <StyledTypography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <StyledA href="/" color='white'>
          ワンゲル装備管理システム
        </StyledA>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </StyledTypography>
    </StyledDiv>
  )
}

export default Footer