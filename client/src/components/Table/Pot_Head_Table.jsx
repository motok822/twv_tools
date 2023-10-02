import React, { useContext, useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Greek_Character, Hongou, Komaba, Reserved, StyledContent, StyledOverlay } from './Equip_table';
import { Box, Switch } from '@mui/material';
import PopUp from './PopUp';
import { pot_headState } from './Equip_table_list';

const Head_Character = ["α", "β", "γ", "δ", "ε", "η", "θ", "λ", "μ", "π", "ρ", "σ", "φ", "ω"];


const rows = [
  { name: "山行", value: [0] },
  { name: "コッヘルα", value: [0, 0, 0] },
  { name: "コッヘルβ", value: [0, 0, 0] },
  { name: "コッヘルγ", value: [0, 0, 0] },
  { name: "コッヘルδ", value: [0, 0] },
  { name: "コッヘルε", value: [0] },
  { name: "ξ", value: [0] },
  { name: "ヘッドα", value: [0] },
  { name: "ヘッドβ", value: [0] },
  { name: "ヘッドγ", value: [0] },
  { name: "ヘッドδ", value: [0] },
  { name: "ヘッドε", value: [0] },
  { name: "ヘッドη", value: [0] },
  { name: "ヘッドθ", value: [0] },
  { name: "ヘッドλ", value: [0] },
  { name: "ヘッドμ", value: [0] },
  { name: "ヘッドπ", value: [0] },
  { name: "ヘッドρ", value: [0] },
  { name: "ヘッドσ", value: [0] },
  { name: "ヘッドφ", value: [0] },
  { name: "ヘッドω", value: [0] }
]

function Pot_Head_Table(props) {

  const [clickCount, SetClickCount] = useState(0);
  const [selectedElement, SetSelectedElement] = useState(['']);
  const information = useRef(null);
  const pot_head_state = useContext(pot_headState)
  const initial_Equips = [
    {
      name: "コッヘル",
      type: [
        { symbol: "α", selected: [0, 0, 0] },
        { symbol: "β", selected: [0, 0, 0] },
        { symbol: "γ", selected: [0, 0, 0] },
        { symbol: "δ", selected: [0, 0] },
        { symbol: "ε", selected: [0] },
        { symbol: "ξ", selected: [0] },

      ]
    },
    {
      name: "ヘッド",
      type: [
        { symbol: "α", selected: [0] },
        { symbol: "β", selected: [0] },
        { symbol: "γ", selected: [0] },
        { symbol: "δ", selected: [0] },
        { symbol: "ε", selected: [0] },
        { symbol: "η", selected: [0] },
        { symbol: "Θ", selected: [0] },
        { symbol: "λ", selected: [0] },
        { symbol: "μ", selected: [0] },
        { symbol: "π", selected: [0] },
        { symbol: "ρ", selected: [0] },
        { symbol: "σ", selected: [0] },
        { symbol: "φ", selected: [0] },
        { symbol: "ω", selected: [0] },
      ]
    }
  ]
  const [Equips, SetEquips] = useState(pot_head_state == undefined ? initial_Equips : pot_head_state)

  const handleToggleChange = (num, ind, index, e) => {
    SetEquips((prev) => {
      const arr = [...prev]
      arr[ind].type[index].selected[num] = e.target.checked
      return arr
    })
  }
  const Pot_Header = () => {
    return (
      <>
        {Equips.map((val, ind) => {
          return (
            <>
              {
                val.type.map((value, index) => {

                  return (<TableCell align='left' colSpan={value.selected.length + 1}>{value.symbol}
                    {
                      props.CreateOption == true && value.selected.length > 1?
                        <Switch size="small" onChange={(e) => {
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
            </>)
        })
        }
      </>
    )
  }

  const Pot_Header_Element = () => {
    return (
      <>
        {Equips.map((val, ind) => {
          return (
            <>
              {val.type.map((value, index) => {
                if (val.name == "コッヘル") {
                  if (value.selected.length == 3) {
                    return (
                      <>
                        <TableCell align='center'>中
                          {
                            props.CreateOption == true ?
                              <Switch size="small" checked={value.selected[0]} onChange={(e) => handleToggleChange(0, ind, index, e)} />
                              : ""
                          }
                        </TableCell>
                        <TableCell align='center'>大
                          {
                            props.CreateOption == true ?
                              <Switch size="small" checked={value.selected[1]} onChange={(e) => handleToggleChange(1, ind, index, e)} />
                              : ""
                          }
                        </TableCell>
                        <TableCell align='center'>特大
                          {
                            props.CreateOption == true ?
                              <Switch size="small" checked={value.selected[2]} onChange={(e) => handleToggleChange(2, ind, index, e)} />
                              : ""
                          }
                        </TableCell>
                        <TableCell></TableCell>
                      </>
                    )
                  } else if (value.selected.length == 2) {
                    return (
                      <>
                        <TableCell align='center'>中
                          {
                            props.CreateOption == true ?
                              <Switch size="small" checked={value.selected[0]} onChange={(e) => handleToggleChange(0, ind, index, e)} />
                              : ""
                          }
                        </TableCell>
                        <TableCell align='center'>大
                          {
                            props.CreateOption == true ?
                              <Switch size="small" checked={value.selected[1]} onChange={(e) => handleToggleChange(1, ind, index, e)} />
                              : ""
                          }
                        </TableCell>
                        <TableCell></TableCell>
                      </>
                    )
                  } else if (value.selected.length == 1) {
                    return (
                      <>
                        <TableCell align='center'>大
                          {
                            props.CreateOption == true ?
                              <Switch size="small" checked={value.selected[0]} onChange={(e) => handleToggleChange(0, ind, index, e)} />
                              : ""
                          }
                        </TableCell>
                        <TableCell></TableCell>
                      </>
                    )
                  }
                } else if (val.name == "ヘッド") {
                  return (
                    <>
                      <TableCell>
                      {
                        props.CreateOption == true ?
                          <Switch size="small" checked={value.selected[0]} onChange={(e) => handleToggleChange(0, ind, index, e)} />
                          : ""
                      }
                      </TableCell>
                      <TableCell></TableCell>
                    </>
                  )
                }
              })}
            </>
          )
        })}
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
              <TableCell align="center" colSpan={2} style={{ borderBottom: "none" }}></TableCell>
              <TableCell align='left' colSpan={18}>コッヘル</TableCell>
              <TableCell align='left' colSpan={20}>ヘッド</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' colSpan={1} >山行</TableCell>
              <TableCell></TableCell>
              {Pot_Header()}
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}></TableCell>
              {Pot_Header_Element()}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              row.value.map((val, index) => {
                if (index == row.value.length - 1) {
                  return (
                    <>
                      <TableCell align='right' key={row.name + index.toString()} onClick={(e) => { Change_State(Komaba, "加茂", e, row.name + index.toString()) }}>
                        {Equip_State(1, "加茂", row.name + index.toString())}
                      </TableCell>
                      <TableCell></TableCell>  {/* これは横のスペース */}
                    </>)
                } else {
                  return (<TableCell align='right' key={row.name + index.toString()} onClick={(e) => { Change_State(Komaba, "加茂", e, row.name + index.toString()) }}>
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


export default Pot_Head_Table