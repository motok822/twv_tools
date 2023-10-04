import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled';
import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';

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
  const [NewInfo, SetNewInfo] = useState({Name: "", Place: "", planID: 0, equipID: 0})
  const handlePlaceChange = (e) => {
    SetNewInfo({Name: NewInfo.Name, Place: e.target.selectedIndex, planID: NewInfo.planID, equipID: NewInfo.equipID})
    props.rows[NewInfo.planID][NewInfo.equipID].state = e.target.selectedIndex
  }
  const handleNameChange = (e) =>{
    SetNewInfo({Name: e.target.value, Place: NewInfo.Place, planID: NewInfo.planID, equipID: NewInfo.equipID})
    props.rows[NewInfo.planID][NewInfo.equipID].value = e.target.value
  }
  const information = useRef(null);
  information.current = props.information;
  useEffect(() => {
    const place_option_elm = document.getElementById("place_option");
    place_option_elm.options[information.current.place].selected = true;
    SetNewInfo({Name: information.current.name, Place: information.current.place, planID: information.current.planID, equipID: information.current.equipID})
  },[])

  return (
    <StyledOverlay>
      <StyledContent className='PopUp'>
        <select id='place_option' onClick={(e) => handlePlaceChange(e)}>
          <option>貸し出し中</option>
          <option>駒場</option>
          <option>本郷</option>
          <option>使用しない</option>
        </select>
        <p><input type='text' value={NewInfo.Name} onChange={(e) => handleNameChange(e)} ></input></p>
      </StyledContent>
    </StyledOverlay>
  )
}

export default PopUp