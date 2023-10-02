import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';

const StyledOverlay = styled("div")(() => ({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: 'rgba(0,0,0,0.5)',
  /*　画面の中央に要素を表示させる設定　*/
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledContent = styled("div")(() => ({
  zIndex: "100",
  width: "50%",
  padding: "1em",
  backgroundColor: "white",
}));


function PopUp(props) {
  const information = useRef(null);
  information.current = props.information;
  useEffect(() => {
    const place_option_elm = document.getElementById("place_option");
    console.log(information.current.place)
    place_option_elm.options[information.current.place].selected = true;
  },[])
  return (
    <StyledOverlay>
      <StyledContent className='PopUp'>
        <select id='place_option'>
          <option>貸し出し中</option>
          <option>駒場</option>
          <option>本郷</option>
          <option>使用しない</option>
        </select>
        <p><input type='text' value={information.current.name}></input></p>
      </StyledContent>
    </StyledOverlay>
  )
}

export default PopUp