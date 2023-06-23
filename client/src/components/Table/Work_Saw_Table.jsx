import React, { useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Greek_Character } from './Equip_table';
import { Box } from '@mui/material';
import PopUp from './PopUp';

const rows = [
  { name: "日", value: [0] },
  { name: "L装α", value: [0] },
  { name: "L装β", value: [0] },
  { name: "ヘルボα", value: [0] },
  { name: "ヘルボβ", value: [0] },
  { name: "ヘルボγ", value: [0] },
  { name: "ヘルボδ", value: [0] },
  { name: "エキボα", value: [0] },
  { name: "エキボβ", value: [0] },
  { name: "エキボγ", value: [0] },
  { name: "藪ノコα", value: [0] },
  { name: "藪ノコβ", value: [0] },
  { name: "藪ノコγ", value: [0] },
  { name: "藪ノコδ", value: [0] },
  { name: "藪ノコε", value: [0] },
  { name: "藪ノコξ", value: [0] },
  { name: "なたα", value: [0] },
  { name: "なたβ", value: [0] },
  { name: "スノーソーα", value: [0] },
  { name: "スノーソーβ", value: [0] },
  { name: "スノーソーγ", value: [0] },
  { name: "スノーソーδ", value: [0] },
  { name: "スノーソーε", value: [0] },
  { name: "スノーソーξ", value: [0] },
];

const Table_Header = (props) => {
  return (
    <>
      {
        Greek_Character.map((value, index) => {
          if (index < props.num) {
            return (
              <>
                <TableCell>{value}</TableCell>
              </>
            )
          }
        })
      }
    </>
  )
}


function Work_Saw_Table() {


  const [clickCount, SetClickCount] = useState(0);
  const [selectedElement, SetSelectedElement] = useState(['']);
  const information = useRef(null);

  const closeModal = (e) => {
    let elm = e.target;
    let flag = 0;
    while (elm != null) {
      if (elm.className != undefined && elm.className.startsWith("PopUp")) {
        flag = 1;
        break;
      }
      elm = elm.parentNode;
    }
    if (flag == 1) return;
    SetClickCount(0);
    SetSelectedElement(['']);
    document.removeEventListener("click", closeModal)
  }

  function Change_State(name, place, event, selected) {
    const info = {
      place: place,
      color: "",
      name: name
    };
    information.current = info;
    console.log(clickCount);
    if (clickCount == 1 || clickCount == 0) {
      document.addEventListener("click", closeModal);
      event.stopPropagation();
    }
    if(IsElementIn(selectedElement, selected)){
      SetClickCount((pre) => (pre + 1) % 3); 
    }else{
      SetClickCount(1);
      SetSelectedElement([...selectedElement,selected]);
    }
  }

  
  const IsElementIn = (array, element) => {
    let flag = 0;
    array.map((val,ind) => {
      if(val == element)flag = 1;
    })
    if(flag == 1)return true;
    else return false;
  }

  const Equip_State = (place, name, selected) => {
    const info = {
      place: place,
      color: "",
      name: name
    };
    if (place === 0) {
      info.place = "貸出中"
      info.color = "gray"
    } else if (place === 1) {
      info.place = "駒場"
      info.color = "blue"
    } else if (place === 2) {
      info.place = "本郷"
      info.color = "red"
    } else info.place = ""

    if (clickCount == 0 || !IsElementIn(selectedElement, selected)) {    //デフォルト状態
      return (
        <Box style={{ cursor: "default" }}>
          <Box style={{ backgroundColor: `${info.color}`, padding: "4px", color: "white", textAlign: "center" }}>{info.name}</Box>
        </Box>
      );
    } else if (IsElementIn(selectedElement, selected)) {                  //クリック一回or二回 選ばれたセルのみ拡張 
      return (
        <Box style={{ cursor: "default" }}>
          <Box style={{ backgroundColor: `${info.color}`, padding: "4px", color: "white", textAlign: "center" }}>{info.name}</Box>
          <Box style={{ backgroundColor: `${info.color}`, padding: "4px", color: "white", textAlign: "center" }}>{info.place}</Box>
        </Box>
      );
    }
  }

  return (
    <>
      {clickCount === 2 ? <PopUp information={information.current} /> : <></>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell colSpan={3}>L装</TableCell>
              <TableCell colSpan={5}>ヘルボ</TableCell>
              <TableCell colSpan={4}>エキボ</TableCell>
              <TableCell colSpan={7}>薮ノコ</TableCell>
              <TableCell colSpan={3}>なた</TableCell>
              <TableCell colSpan={3}>スノーソー</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>日</TableCell>
              <TableCell></TableCell>
              {Table_Header({ name: "L装", num: 2 })}
              <TableCell></TableCell>
              {Table_Header({ name: "ヘルボ", num: 4 })}
              <TableCell></TableCell>
              {Table_Header({ name: "エキボ", num: 3 })}
              <TableCell></TableCell>
              {Table_Header({ name: "薮ノコ", num: 6 })}
              <TableCell></TableCell>
              {Table_Header({ name: "なた", num: 2 })}
              <TableCell></TableCell>
              {Table_Header({ name: "スノーソー", num: 6 })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              row.value.map((val, index) => {
                if (row.name === '日' || row.name === 'L装β' || row.name === 'ヘルボδ' || row.name === 'エキボγ' || row.name === '藪ノコξ' || row.name === 'なたβ' || row.name === 'スノーソーξ') {
                  return (
                    <>
                      <TableCell align='right' key={row.name + index.toString()} onClick={(e) => { Change_State(1, "加茂", e, row.name + index.toString()) }}>
                        {Equip_State(1, "加茂", row.name + index.toString())}
                      </TableCell>
                      <TableCell></TableCell>  {/* これは横のスペース */}
                    </>)
                } else {
                  return (<TableCell align='right' key={row.name + index.toString()} onClick={(e) => { Change_State(1, "加茂", e, row.name + index.toString()) }}>
                    {Equip_State(0, "加茂", row.name + index.toString())}
                  </TableCell>)
                }
              })
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}


export default Work_Saw_Table