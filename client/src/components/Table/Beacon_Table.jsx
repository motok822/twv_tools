import React, { useContext, useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Switch } from '@mui/material';
import PopUp from './PopUp';
import { beaconState } from './Equip_table_list';

const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

const rows = [
  { name: "山行", value: [0] },
  { name: "A", value: [0] },
  { name: "B", value: [0] },
  { name: "E", value: [0] },
  { name: "F", value: [0] },
  { name: "G", value: [0] },
  { name: "H", value: [0] },
  { name: "M", value: [0] },
  { name: "O", value: [0] },
  { name: "Q", value: [0] },
  { name: "S", value: [0] },
  { name: "X", value: [0] },
  { name: "Y", value: [0] },
  { name: "Z", value: [0] },
  { name: "新arva", value: [0] },
  { name: "甲", value: [0] },
  { name: "丙", value: [0] },
  { name: "い", value: [0] },
  { name: "ろ", value: [0] },
  { name: "に", value: [0] },
];
const Beacon_Character = ["A", "B", "E", "F", "G", "H", "M", "O", "Q", "S", "X", "Y", "Z", "新arva", "甲", "丙", "い", "ろ", "に"]


function Beacon_Table(props) {

  const [clickCount, SetClickCount] = useState(0);
  const [selectedElement, SetSelectedElement] = useState(['']);
  const information = useRef(null);
  const beacon_state = useContext(beaconState)
  const initial_Equips = [
    {
      name: "ビーコン",
      type: [
        { symbol: "A", selected: [0] },
        { symbol: "B", selected: [0] },
        { symbol: "E", selected: [0] },
        { symbol: "F", selected: [0] },
        { symbol: "G", selected: [0] },
        { symbol: "H", selected: [0] },
        { symbol: "M", selected: [0] },
        { symbol: "O", selected: [0] },
        { symbol: "Q", selected: [0] },
        { symbol: "S", selected: [0] },
        { symbol: "X", selected: [0] },
        { symbol: "Y", selected: [0] },
        { symbol: "Z", selected: [0] },
        { symbol: "新arva", selected: [0] },
        { symbol: "甲", selected: [0] },
        { symbol: "乙", selected: [0] },
        { symbol: "い", selected: [0] },
        { symbol: "ろ", selected: [0] },
        { symbol: "に", selected: [0] },
      ]
    }
  ]
  const [Equips, SetEquips] = useState(beacon_state == undefined ? initial_Equips : beacon_state)

  const handleToggleChange = (num, ind, index, e) => {
    SetEquips((prev) => {
      const arr = [...prev]
      arr[ind].type[index].selected[num] = e.target.checked
      return arr
    })
  }

  const Table_Header = () => {
    return (
      <>
        {Equips.map((val, ind) => {
          return (
            <>
              {
                val.type.map((value, index) => {
                  return (<TableCell align='left' colSpan={value.selected.length}>{value.symbol}
                    {
                      props.CreateOption == true ?
                        <Switch size="small" checked={value.selected[0]} onChange={(e) => handleToggleChange(0, ind, index, e)} />
                        : ""
                    }
                  </TableCell>)
                })
              }
            </>)
        })
        }
      </>
    )
  }

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

  function Change_State(place, name, event, selected) {
    const info = {
      place: place,
      color: "",
      name: name
    };
    information.current = info;
    if (clickCount == 1 || clickCount == 0) {
      document.addEventListener("click", closeModal);
      event.stopPropagation();
    }
    if (IsElementIn(selectedElement, selected)) {
      SetClickCount((pre) => (pre + 1) % 3);
    } else {
      SetClickCount(1);
      SetSelectedElement([...selectedElement, selected]);
    }
  }

  const IsElementIn = (array, element) => {
    let flag = 0;
    array.map((val, ind) => {
      if (val == element) flag = 1;
    })
    if (flag == 1) return true;
    else return false;
  }

  const Equip_State = (place, name, selected) => {
    const info = {
      place: place,
      color: "",
      name: name
    };
    if (place === Reserved) {
      info.place = "貸出中"
      info.color = "gray"
    } else if (place === Komaba) {
      info.place = "駒場"
      info.color = "blue"
    } else if (place === Hongou) {
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
      {clickCount == 2 ? <PopUp information={information.current} /> : <></>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell colSpan={20}>ビーコン</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>山行</TableCell>
              <TableCell></TableCell>
              {Table_Header()}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              row.value.map((val, index) => {
                return row.name == "山行" ?
                  (
                    <>
                      <TableCell align='right' key={row.name + index.toString()} onClick={(e) => { Change_State(1, "加茂", e, row.name + index.toString()) }}>
                        {Equip_State(1, "加茂", row.name + index.toString())}
                      </TableCell>
                      <TableCell></TableCell>  {/* これは横のスペース */}
                    </>
                  ) : (<TableCell align='right' key={row.name + index.toString()} onClick={(e) => { Change_State(1, "加茂", e, row.name + index.toString()) }}>
                    {Equip_State(0, "加茂", row.name + index.toString())}
                  </TableCell>)
              }
              )))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}


export default Beacon_Table