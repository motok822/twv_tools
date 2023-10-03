import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import { ParsePlanMap } from './ParsePlanMap';

const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

const EquipTemplate = [
  { Group: "", Family: "", Name: "山行ID", state: NotReserved, last: 1, value: "0" },
  { Group: "", Family: "", Name: "山行名", state: NotReserved, last: 1, value: "サンプル" },
  { Group: "ビーコン", Family: "", Name: "A", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "B", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "E", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "F", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "G", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "H", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "M", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "O", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "Q", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "S", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "X", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "Y", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "Z", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "新arva", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "甲", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "乙", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "い", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "ろ", state: NotReserved, last: 0, value: "" },
  { Group: "ビーコン", Family: "", Name: "は", state: NotReserved, last: 0, value: "" },
]

const Beacon_Character = ["A", "B", "E", "F", "G", "H", "M", "O", "Q", "S", "X", "Y", "Z", "新arva", "甲", "丙", "い", "ろ", "に"]


function Beacon_Table(props) {

  const [clickCount, SetClickCount] = useState(0);
  const [selectedElement, SetSelectedElement] = useState(['']);
  const information = useRef(null);
  const beacon_state = useContext(beaconState)
  const [rows, SetRows] = useState([[...EquipTemplate]])
  let PlanMapOneYear = null
  useEffect(() => {
    Fetch_Tent_Table();
  }, [])
  const Fetch_Tent_Table = async () => {
    let BMgr = new BasicAPIManager();
    let AMgr = new AdvancedAPIManager();

    console.log(await BMgr.User.GetUsers())
    console.log(await BMgr.EquipClass.GetAll())
    console.log(await BMgr.EquipInfo.GetOneYear())
    console.log(await BMgr.Plans.GetOneYear())
    console.log("plan map")
    PlanMapOneYear = await AMgr.EquipMap.GetPlanMapOneYear()
    console.log(PlanMapOneYear)
    SetRows(ParsePlanMap([EquipTemplate], EquipTemplate, PlanMapOneYear))
  }
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
    } else {
      info.place = ""
      info.color = "gray"
    }

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
              <TableCell colSpan={4}></TableCell>
              <TableCell colSpan={20}>ビーコン</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>山行ID</TableCell>
              <TableCell></TableCell>
              <TableCell>山行名</TableCell>
              <TableCell></TableCell>
              {Table_Header()}
            </TableRow>
          </TableHead>
          <TableBody>
          {
                rows.map((rowsi, index) => {
                  return (
                    <TableRow>
                      {
                        rowsi.map((row) => {
                          const CellFullName = row.Group + row.Family + row.Name + index.toString()
                          if (row.Name == "山行ID" || row.Name == "山行名") {
                            return (
                              <>
                                <TableCell align='right' key={CellFullName} >
                                  {Equip_State(row.state, row.value, CellFullName)}
                                </TableCell>
                                <TableCell></TableCell>
                              </>
                            )
                          } else if (row.last == 1) {
                            return (
                              <>
                                <TableCell align='right' key={CellFullName} onClick={(e) => { Change_State(row.state, row.value, e, CellFullName) }}>
                                  {Equip_State(row.state, row.value, CellFullName)}
                                </TableCell>
                                <TableCell></TableCell>
                              </>)
                          } else {
                            return (
                              <TableCell align='right' key={CellFullName} onClick={(e) => { Change_State(row.state, row.value, e, CellFullName) }}>
                                {Equip_State(row.state, row.value, CellFullName)}
                              </TableCell>
                            )
                          }
                        })
                      }
                    </TableRow>
                  )
                })
              }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}


export default Beacon_Table