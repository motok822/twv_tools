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
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import { ParsePlanMap } from './ParsePlanMap';
import ShowOnTable from './ShowOnTable';
import { beaconState } from './Equip_table_List';
import { ShowUser } from '../UserManage';
import { UserDict } from './Equip_table';

const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

const EquipTemplate = [
  { Group: "", Type: "", Family: "", Name: "山行ID", state: Reserved, last: 1, value: 0, ID: 0 },
  { Group: "", Type: "", Family: "", Name: "山行名", state: Reserved, last: 1, value: "サンプル", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "A", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "B", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "E", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "F", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "G", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "H", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "M", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "O", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "Q", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "S", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "X", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "Y", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "Z", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "新arva", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "甲", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "乙", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "い", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "ろ", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "ビーコン", Type: "", Family: "", Name: "に", state: NotReserved, last: 0, value: "", ID: 0 },
]

const Beacon_Character = ["A", "B", "E", "F", "G", "H", "M", "O", "Q", "S", "X", "Y", "Z", "新arva", "甲", "丙", "い", "ろ", "に"]


function Beacon_Table(props) {

  const beacon_state = useContext(beaconState)
  const [rows, SetRows] = useState(null)
  let PlanMapOneYear =  props.PlanMapOneYear
  const ParsePlan = async () =>{
    if (PlanMapOneYear != null) {
      const res = await ParsePlanMap(EquipTemplate, PlanMapOneYear)
      console.log(res)
      SetRows(res)
    }
  }
  useEffect(() => {
    ParsePlan()
  }, [])

  const initial_Equips = [
    {
      Group: "ビーコン",
      Type: "",
      List: [
        { Family: "", selected: [{ Name: "A", flag: 0 }] },
        { Family: "", selected: [{ Name: "B", flag: 0 }] },
        { Family: "", selected: [{ Name: "E", flag: 0 }] },
        { Family: "", selected: [{ Name: "F", flag: 0 }] },
        { Family: "", selected: [{ Name: "G", flag: 0 }] },
        { Family: "", selected: [{ Name: "H", flag: 0 }] },
        { Family: "", selected: [{ Name: "M", flag: 0 }] },
        { Family: "", selected: [{ Name: "O", flag: 0 }] },
        { Family: "", selected: [{ Name: "Q", flag: 0 }] },
        { Family: "", selected: [{ Name: "S", flag: 0 }] },
        { Family: "", selected: [{ Name: "X", flag: 0 }] },
        { Family: "", selected: [{ Name: "Y", flag: 0 }] },
        { Family: "", selected: [{ Name: "Z", flag: 0 }] },
        { Family: "", selected: [{ Name: "新arva", flag: 0 }] },
        { Family: "", selected: [{ Name: "甲", flag: 0 }] },
        { Family: "", selected: [{ Name: "乙", flag: 0 }] },
        { Family: "", selected: [{ Name: "い", flag: 0 }] },
        { Family: "", selected: [{ Name: "ろ", flag: 0 }] },
        { Family: "", selected: [{ Name: "に", flag: 0 }] },
      ]
    }
  ]
  const [Equips, SetEquips] = useState(beacon_state == undefined ? initial_Equips : beacon_state)
  const handleToggleChange = (num, ind, index, e) => {
    SetEquips((prev) => {
      const arr = [...prev]
      arr[ind].List[index].selected[num].flag = e.target.checked
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
                val.List.map((value, index) => {

                  return (<TableCell align='left' colSpan={value.selected.length}>{value.selected[0].Name}

                    {
                      props.CreateOption == true ?
                        <Switch size="small" checked={value.selected[0].flag} onChange={(e) => handleToggleChange(0, ind, index, e)} />
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

          {rows != null ?<ShowOnTable rows={rows}></ShowOnTable>: <></>}

        </Table>
      </TableContainer>
    </>
  )
}


export default Beacon_Table