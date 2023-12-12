import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled';
import { Button, FormControl, InputLabel, MenuItem, NativeSelect } from '@mui/material';
import Select from 'react-select'
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { ShowUser } from '../UserManage';
import { useAsyncError } from 'react-router-dom';

const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

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
let EquipInfoTemplate = { ID: null, UserID: 2, EquipID: 7, Act: "DELETE", T1: new Date("2022-08-18 14:58:00"), T2: null, MoveDest: "temp", PlanID: 0 }


function PopUp(props) {
  const [NewInfo, SetNewInfo] = useState({ Name: "", Place: "", PlanID: 0, EquipID: 0 })
  let dictionary = null
  const [UserDictionary, SetUserDictionary] = useState(null)
  const [UserNameDictionary, SetUserNameDictionary] = useState({ value: "default", label: "default" })
  const UpdaeUserNameDictionary = async () => {
    if (dictionary == null) {
      dictionary = await ShowUser()
      await SetUserDictionary(dictionary)
    }
    console.log(UserDictionary)
    dictionary = dictionary.filter((x) => x.FamilyName != '' || x.FirstName != '')
    SetUserNameDictionary(
      dictionary.map((x) => {
        return {
          value: x.UserName,
          label: x.FamilyName + x.FirstName,
        }
      }
      )
    )
    console.log(UserNameDictionary)
  }
  const SearchUser = (Name) => {
    console.log(UserDictionary)
    for (let i = 0; i < UserDictionary.length; i++) {
      if (UserDictionary[i].UserName == Name) {
        return UserDictionary[i].ID
      }
    }
    return 3 //TestUser
  }
  const ConstToString = (place) => {
    let res = ""
    switch (place) {
      case 0:
        res = "予約"
        break
      case 1:
        res = "駒場"
        break
      case 2:
        res = "本郷"
        break
      case 3:
        res = "使用しない"
        break
    }
    return res
  }
  const handlePlaceChange = (e) => {
    SetNewInfo({ Name: NewInfo.Name, Place: e.target.selectedIndex, PlanID: NewInfo.PlanID, EquipID: NewInfo.EquipID, ID: NewInfo.ID })
  }
  const handleNameChange = (e) => {
    SetNewInfo({ Name: e.value, Place: NewInfo.Place, PlanID: NewInfo.PlanID, EquipID: NewInfo.EquipID, ID: NewInfo.ID })
  }
  const information = useRef(null);
  information.current = props.information;
  useEffect(() => {
    const place_option_elm = document.getElementById("place_option");
    place_option_elm.options[information.current.place].selected = true;
    SetNewInfo({ Name: information.current.name, Place: information.current.place, PlanID: information.current.PlanID, EquipID: information.current.EquipID, ID: information.current.ID })
    UpdaeUserNameDictionary()
  }, [])  //初期設定
  const ButtonClick = async () => {
    let BMgr = new BasicAPIManager()
    props.rows[NewInfo.PlanID][NewInfo.EquipID].state = NewInfo.Place
    props.rows[NewInfo.PlanID][NewInfo.EquipID].value = NewInfo.Name  //user名
    let NewEquipRequest = new Array()
    EquipInfoTemplate.T1 = new Date()
    EquipInfoTemplate.Act = "MOVE"
    EquipInfoTemplate.T2 = null
    EquipInfoTemplate.MoveDest = ConstToString(NewInfo.Place)
    EquipInfoTemplate.PlanID = props.rows[NewInfo.PlanID][1].value
    EquipInfoTemplate.EquipID = NewInfo.ID
    EquipInfoTemplate.UserID = SearchUser(NewInfo.Name)
    NewEquipRequest.push(EquipInfoTemplate)
    console.log("EquipInfoTemplate")
    console.log(EquipInfoTemplate)
    console.log(await BMgr.EquipInfo.RegisterInfos(NewEquipRequest))
    console.log("EquipInfo")
    console.log(await BMgr.EquipInfo.GetOneYear())
    props.ClosePopUp()
  }
  return (
    <StyledOverlay>
      <StyledContent className='PopUp'>
        <select id='place_option' onChange={(e) => handlePlaceChange(e)}>
          <option>貸し出し中</option>
          <option>駒場</option>
          <option>本郷</option>
          <option>使用しない</option>
        </select>
        <Select options={UserNameDictionary} className="aaa" onChange={(e) => { handleNameChange(e) }} />
        <Button onClick={ButtonClick}>E表に反映</Button>
      </StyledContent>
    </StyledOverlay>
  )
}

export default PopUp