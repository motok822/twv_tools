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
import { work_sawState } from './Equip_table_list';
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import { ParsePlanMap } from './ParsePlanMap';
import ShowOnTable from './ShowOnTable';


const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

const EquipTemplate = [
  { Group: "", Type: "",Family: "", Name: "山行ID", state: Reserved, last: 1, value: "0" , ID: 0},
  { Group: "", Type: "",Family: "", Name: "山行名", state: Reserved, last: 1, value: "サンプル", ID: 0 },
  { Group: "L装", Type: "",Family: "", Name: "α", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group: "L装", Type: "",Family: "", Name: "β", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘルボ", Type: "",Family: "", Name: "α", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group: "ヘルボ", Type: "",Family: "", Name: "β", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "ヘルボ", Type: "",Family: "", Name: "γ", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group: "ヘルボ", Type: "",Family: "", Name: "δ", state: NotReserved, last: 1, value: "" , ID: 0},  
  { Group: "エキボ", Type: "",Family: "", Name: "α", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group: "エキボ", Type: "",Family: "", Name: "β", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "エキボ", Type: "",Family: "", Name: "γ", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "藪ノコ", Type: "",Family: "", Name: "α", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "藪ノコ", Type: "",Family: "", Name: "β", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "藪ノコ", Type: "",Family: "", Name: "γ", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "藪ノコ", Type: "",Family: "", Name: "δ", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "藪ノコ", Type: "",Family: "", Name: "ε", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "藪ノコ", Type: "",Family: "", Name: "ζ", state: NotReserved, last: 1, value: "" , ID: 0},    
  { Group: "なた", Type: "",Family: "", Name: "α", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group: "なた", Type: "",Family: "", Name: "β", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "スノーソー", Type: "",Family: "", Name: "α", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "スノーソー", Type: "",Family: "", Name: "β", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "スノーソー", Type: "",Family: "", Name: "γ", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "スノーソー", Type: "",Family: "", Name: "δ", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "スノーソー", Type: "",Family: "", Name: "ε", state: NotReserved, last: 0, value: "" , ID: 0},  
  { Group: "スノーソー", Type: "",Family: "", Name: "ζ", state: NotReserved, last: 1, value: "" , ID: 0},    
]


function Work_Saw_Table(props) {
  const work_saw_state = useContext(work_sawState)
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
      name: "L装",
      type: [
        { symbol: "α", selected: [0] },
        { symbol: "β", selected: [0] },
      ]
    },
    {
      name: "ヘルボ",
      type: [
        { symbol: "α", selected: [0] },
        { symbol: "β", selected: [0] },
        { symbol: "γ", selected: [0] },
        { symbol: "δ", selected: [0] },
      ]
    },
    {
      name: "エキボ",
      type: [
        { symbol: "α", selected: [0] },
        { symbol: "β", selected: [0] },
        { symbol: "γ", selected: [0] },
      ]
    },
    {
      name: "藪ノコ",
      type: [
        { symbol: "α", selected: [0] },
        { symbol: "β", selected: [0] },
        { symbol: "γ", selected: [0] },
        { symbol: "δ", selected: [0] },
        { symbol: "ε", selected: [0] },
        { symbol: "ξ", selected: [0] },
      ]
    },
    {
      name: "なた",
      type: [
        { symbol: "α", selected: [0] },
        { symbol: "β", selected: [0] },
      ]
    },
    {
      name: "スノーソー",
      type: [
        { symbol: "α", selected: [0] },
        { symbol: "β", selected: [0] },
        { symbol: "γ", selected: [0] },
        { symbol: "δ", selected: [0] },
        { symbol: "ε", selected: [0] },
        { symbol: "ξ", selected: [0] },
      ]
    },
  ]
  const [Equips, SetEquips] = useState(work_saw_state == undefined ? initial_Equips : work_saw_state)

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
              <TableCell></TableCell>
            </>)
        })
        }
      </>
    )
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}></TableCell>
              <TableCell colSpan={3}>L装</TableCell>
              <TableCell colSpan={5}>ヘルボ</TableCell>
              <TableCell colSpan={4}>エキボ</TableCell>
              <TableCell colSpan={7}>薮ノコ</TableCell>
              <TableCell colSpan={3}>なた</TableCell>
              <TableCell colSpan={3}>スノーソー</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>山行ID</TableCell>
              <TableCell></TableCell>
              <TableCell>山行名</TableCell>
              <TableCell></TableCell>
              {Table_Header()}
            </TableRow>
          </TableHead>
          <ShowOnTable rows={rows}></ShowOnTable>
        </Table>
      </TableContainer>
    </>
  )
}


export default Work_Saw_Table