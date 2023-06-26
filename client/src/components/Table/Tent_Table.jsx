import React, { useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Equip_State, Greek_Character, StyledContent, StyledOverlay, isModal } from './Equip_table';
import { Box, Switch } from '@mui/material';
import styled from '@emotion/styled';
import PopUp from './PopUp';

const rows = [
  { name: "日", value: [0] },
  { name: "7天α", value: [0, 0, 0] },
  { name: "7天β", value: [0, 0, 0] },
  { name: "7天γ", value: [0, 0, 0] },
  { name: "7天δ", value: [0, 0, 0] },
  { name: "45天α", value: [0, 0, 0] },
  { name: "45天β", value: [0, 0, 0] },
  { name: "45天γ", value: [0, 0, 0] },
  { name: "45天δ", value: [0, 0, 0] },
  { name: "45天ε", value: [0, 0, 0] },
  { name: "6天α", value: [0, 0, 0] },
  { name: "6天β", value: [0, 0, 0] },
  { name: "12天α", value: [0, 0, 0] },
  { name: "その他α", value: [0, 0, 0] }];



function Tent_Table(props) {

  const information = useRef(null);
  const [clickCount, SetClickCount] = useState(0);
  const [selectedElement, SetSelectedElement] = useState(['']);
  const [Equips, SetEquips] = useState([
    {
      name: "7天",
      type: [
        { symbol: "α", selected: [0, 0, 0] },
        { symbol: "β", selected: [0, 0, 0] },
        { symbol: "γ", selected: [0, 0, 0] },
        { symbol: "δ", selected: [0, 0, 0] },
      ]
    },
    {
      name: "45天",
      type: [
        { symbol: "α", selected: [0, 0, 0] },
        { symbol: "β", selected: [0, 0, 0] },
        { symbol: "γ", selected: [0, 0, 0] },
        { symbol: "δ", selected: [0, 0, 0] },
        { symbol: "ε", selected: [0, 0, 0] },
      ]
    },
    {
      name: "6天",
      type: [
        { symbol: "α", selected: [0, 0, 0] },
        { symbol: "β", selected: [0, 0, 0] },
      ]
    },
    {
      name: "12天",
      type: [
        { symbol: "α", selected: [0, 0, 0] },
      ]
    },
    {
      name: "その他",
      type: [
        { symbol: "α", selected: [0, 0, 0] },
      ]
    }

  ]
  )

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
        {
          Equips.map((val, ind) => {
            return (
              <>
                {val.type.map((value, index) => {
                  return (<TableCell align='left' colSpan={4}>{value.symbol}
                    {
                      props.CreateOption == true ?
                        <Switch onChange={(e) => {
                          const array = new Array(value.selected.length)
                          for (let i = 0; i < value.selected.length; i++) {
                            array[i] = e.target.checked
                          }
                          SetEquips((prev) => {
                            const arr = [...prev]
                            arr[ind].type[index].selected = array
                            return arr
                          })
                        }} /> : ""
                    }
                  </TableCell>)
                })
                }
              </>
            )
          })
        }
      </>
    )
  }
  const Table_Header_Element = () => {
    return (
      <>
        {
          Equips.map((val, ind) => {
            return (
              <>
                {val.type.map((value, index) => {
                  return (
                    <>
                      <TableCell align='right'>
                        本体
                        {
                          props.CreateOption == true ?
                            <Switch size="small" checked={value.selected[0]} onChange={(e) => handleToggleChange(0, ind, index, e)} />
                            : ""
                        }
                      </TableCell>
                      <TableCell align='right'>
                        ポール
                        {
                          props.CreateOption == true ?
                            <Switch size="small" checked={value.selected[1]} onChange={(e) => handleToggleChange(1, ind, index, e)} />
                            : ""
                        }
                      </TableCell>
                      <TableCell align='right'>
                        フライ
                        {
                          props.CreateOption == true ? 
                            <Switch size="small" checked={value.selected[2]} onChange={(e) => handleToggleChange(2, ind, index, e)} />
                            : ""
                        }
                      </TableCell>
                      <TableCell></TableCell>
                    </>
                  )
                })
                }
              </>
            )
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
        <Table aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="center" colSpan={2} style={{ borderBottom: "none" }}></TableCell>
              <TableCell align='left' colSpan={16}>7天</TableCell>
              <TableCell align='left' colSpan={20}>45天</TableCell>
              <TableCell align='left' colSpan={8}>6天</TableCell>
              <TableCell align='left' colSpan={4}>12天</TableCell>
              <TableCell align='left' colSpan={4}>その他</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' colSpan={1} >日</TableCell>
              <TableCell></TableCell>
              {Table_Header()}
            </TableRow>
            <TableRow>
              <TableCell align='center'></TableCell>
              <TableCell></TableCell>
              {Table_Header_Element()}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {rows.map((row) => (
                row.value.map((val, index) => {
                  if (index == row.value.length - 1) {
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}


export default Tent_Table