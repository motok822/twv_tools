import React, { useContext, useEffect, useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Greek_Character, StyledContent, StyledOverlay, UserDict} from './Equip_table';
import { Box, Switch } from '@mui/material';
import PopUp from './PopUp';
import { ParsePlanMap } from './ParsePlanMap';
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import ShowOnTable from './ShowOnTable';
import { pot_headState } from './Equip_table_List';
import { ShowUser } from '../UserManage';
const Head_Character = ["α", "β", "γ", "δ", "ε", "η", "θ", "λ", "μ", "π", "ρ", "σ", "φ", "ω"];


const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

const EquipTemplate = [
  { Group: "", Type: "", Family: "", Name: "山行ID", state: Reserved, last: 1, value: 0, ID: 0 },
  { Group: "", Type: "", Family: "", Name: "山行名", state: Reserved, last: 1, value: "サンプル", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "α", Name: "特大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "α", Name: "大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "α", Name: "中", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "β", Name: "特大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "β", Name: "大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "β", Name: "中", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "γ", Name: "特大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "γ", Name: "大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "γ", Name: "中", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "δ", Name: "大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "δ", Name: "中", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "ε", Name: "大", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "コッヘル", Type: "", Family: "ζ", Name: "大", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "α", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "β", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "γ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "δ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "ε", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "η", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "Θ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "λ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "μ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "π", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "ρ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "σ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "φ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Type: "", Family: "", Name: "ω", state: NotReserved, last: 1, value: "", ID: 0 },

]


function Pot_Head_Table(props) {
  const pot_head_state = useContext(pot_headState)
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
      Group: "コッヘル",
      Type: "",
      List: [
        { Family: "α", selected: [{ Name: "特大", flag: 0 }, { Name: "大", flag: 0 }, { Name: "中", flag: 0 }] },
        { Family: "β", selected: [{ Name: "特大", flag: 0 }, { Name: "大", flag: 0 }, { Name: "中", flag: 0 }] },
        { Family: "γ", selected: [{ Name: "特大", flag: 0 }, { Name: "大", flag: 0 }, { Name: "中", flag: 0 }] },
        { Family: "δ", selected: [{ Name: "大", flag: 0 }, { Name: "中", flag: 0 }] },
        { Family: "ε", selected: [{ Name: "中", flag: 0 }] },
        { Family: "ξ", selected: [{ Name: "中", flag: 0 }] },

      ]
    },
    {
      Group: "ヘッド",
      Type: "",
      List: [
        { Family: "", selected: [{ Name: "α", flag: 0 }] },
        { Family: "", selected: [{ Name: "β", flag: 0 }] },
        { Family: "", selected: [{ Name: "γ", flag: 0 }] },
        { Family: "", selected: [{ Name: "δ", flag: 0 }] },
        { Family: "", selected: [{ Name: "ε", flag: 0 }] },
        { Family: "", selected: [{ Name: "η", flag: 0 }] },
        { Family: "", selected: [{ Name: "Θ", flag: 0 }] },
        { Family: "", selected: [{ Name: "λ", flag: 0 }] },
        { Family: "", selected: [{ Name: "μ", flag: 0 }] },
        { Family: "", selected: [{ Name: "π", flag: 0 }] },
        { Family: "", selected: [{ Name: "ρ", flag: 0 }] },
        { Family: "", selected: [{ Name: "σ", flag: 0 }] },
        { Family: "", selected: [{ Name: "φ", flag: 0 }] },
        { Family: "", selected: [{ Name: "ω", flag: 0 }] },
      ]
    }
  ]
  const [Equips, SetEquips] = useState(pot_head_state == undefined ? initial_Equips : pot_head_state)
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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4} style={{ borderBottom: "none" }}></TableCell>
              <TableCell align='left' colSpan={18}>コッヘル</TableCell>
              <TableCell align='left' colSpan={20}>ヘッド</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' colSpan={1} >山行ID</TableCell>
              <TableCell></TableCell>
              <TableCell align='center' colSpan={1} >山行名</TableCell>
              <TableCell></TableCell>
              {Table_Header()}
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}></TableCell>
              <TableCell align="center" colSpan={2}></TableCell>
              {Table_Header_Element()}
            </TableRow>
          </TableHead>
          {rows != null ? <ShowOnTable rows={rows}></ShowOnTable>: <></>}
        </Table>
      </TableContainer>
    </>
  )
}


export default Pot_Head_Table