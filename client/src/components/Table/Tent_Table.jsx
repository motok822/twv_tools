import React, { useContext, useEffect, useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Equip_State, Greek_Character, StyledContent, StyledOverlay, UserDict, isModal } from './Equip_table';
import { Box, Switch } from '@mui/material';
import styled from '@emotion/styled';
import PopUp from './PopUp';
import { tentState } from './Equip_table_List';
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import { ParsePlanMap } from './ParsePlanMap';
import ShowOnTable from './ShowOnTable';
import { ShowUser } from '../UserManage';

const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

const EquipTemplate =
  [{ Group: "", Type: '', Family: "", Name: "山行ID", state: Reserved, last: 1, value: 0, ID: 0 },
  { Group: "", Type: '', Family: "", Name: "山行名", state: Reserved, last: 1, value: "サンプル", ID: 0 },
  { Group: "テント", Type: "7天", Family: "α", Name: "本体", state: Hongou, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "α", Name: "ポール", state: Hongou, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "α", Name: "フライ", state: Hongou, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "β", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "β", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "β", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "γ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "γ", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "γ", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "δ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "δ", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "δ", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "α", Name: "本体", state: Hongou, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "α", Name: "ポール", state: Hongou, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "α", Name: "フライ", state: Hongou, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "β", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "β", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "β", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "γ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "γ", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "γ", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "δ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "δ", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "δ", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "ε", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "ε", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "ε", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "6天", Family: "α", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "6天", Family: "α", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "6天", Family: "α", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "12天", Family: "α", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "12天", Family: "α", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "12天", Family: "α", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },];


function Tent_Table(props) {

  const tent_state = useContext(tentState)
  const UserDictionary = useContext(UserDict)
  const [rows, SetRows] = useState(null)
  let PlanMapOneYear = props.PlanMapOneYear
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
      Group: "テント",
      Type: "7天",
      List: [
        { Family: "α", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
        { Family: "β", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
        { Family: "γ", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
        { Family: "δ", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
      ]
    },
    {
      Group: "テント",
      Type: "45天",
      List: [
        { Family: "α", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
        { Family: "β", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
        { Family: "γ", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
        { Family: "δ", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
        { Family: "ε", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
      ]
    },
    {
      Group: "テント",
      Type: "6天",
      List: [
        { Family: "α", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
      ]
    },
    {
      Group: "テント",
      Type: "12天",
      List: [
        { Family: "α", selected: [{ Name: "本体", flag: 0 }, { Name: "ポール", flag: 0 }, { Name: "フライ", flag: 0 }] },
      ]
    },
  ]
  const [Equips, SetEquips] = useState(tent_state == undefined ? initial_Equips : tent_state)  //E表作成の時に使う
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
        {
          Equips.map((val, ind) => {
            return (
              <>
                {val.List.map((value, index) => {
                  return (
                    <TableCell align='left' colSpan={value.selected.length + 1}>{value.Family}
                      {
                        props.CreateOption == true ? 
                        <Switch onChange={(e) => {
                          const array = new Array(value.selected.length)
                          for (let i = 0; i < value.selected.length; i++) {
                            array[i] = value.selected[i]
                            array[i].flag = e.target.checked
                          }
                          SetEquips((prev) => {
                            const arr = [...prev]
                            arr[ind].List[index].selected = array
                            return arr
                          })
                        }} /> : <></>
                      }
                    </TableCell>
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
  const Table_Header_Element = () => {
    return (
      <>
        {
          Equips.map((val, ind) => {
            return (
              <>
                {val.List.map((value, index) => {
                  return (
                    <>
                      {
                        value.selected.map((v, i) => {
                          return (
                            <TableCell align='right'>
                              {v.Name}
                              {
                                props.CreateOption == true ?
                                  <Switch size="small" checked={value.selected[i].flag} onChange={(e) => handleToggleChange(i, ind, index, e)} />
                                  : ""
                              }
                            </TableCell>
                          )
                        })}
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
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="center" colSpan={4} style={{ borderBottom: "none" }}></TableCell>
              <TableCell align='left' colSpan={16}>7天</TableCell>
              <TableCell align='left' colSpan={20}>45天</TableCell>
              <TableCell align='left' colSpan={4}>6天</TableCell>
              <TableCell align='left' colSpan={4}>12天</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' colSpan={1} >山行ID</TableCell>
              <TableCell></TableCell>
              <TableCell align='center' colSpan={1} >山行名</TableCell>
              <TableCell></TableCell>
              {Table_Header()}
            </TableRow>
            <TableRow>
              <TableCell align='center'></TableCell>
              <TableCell></TableCell>
              <TableCell align='center'></TableCell>
              <TableCell></TableCell>
              {Table_Header_Element()}
            </TableRow>
          </TableHead>
          {rows != null ?<ShowOnTable rows={rows}></ShowOnTable>: <></>}

        </Table>
      </TableContainer>
    </>
  )
}


export default Tent_Table
