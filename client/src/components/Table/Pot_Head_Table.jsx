import React, { useContext, useEffect, useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Greek_Character, StyledContent, StyledOverlay } from './Equip_table';
import { Box, Switch } from '@mui/material';
import PopUp from './PopUp';
import { pot_headState } from './Equip_table_list';
import { ParsePlanMap } from './ParsePlanMap';
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import ShowOnTable from './ShowOnTable';

const Head_Character = ["α", "β", "γ", "δ", "ε", "η", "θ", "λ", "μ", "π", "ρ", "σ", "φ", "ω"];


const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

const EquipTemplate = [
  { Group: "", Family: "", Name: "山行ID", state: Reserved, last: 1, value: "0" , ID: 0},
  { Group: "", Family: "", Name: "山行名", state: Reserved, last: 1, value: "サンプル", ID: 0 },
  { Group: "コッヘル", Family: "α", Name: "特大", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group: "コッヘル", Family: "α", Name: "大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Family: "α", Name: "中", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "コッヘル", Family: "β", Name: "特大", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group: "コッヘル", Family: "β", Name: "大", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group: "コッヘル", Family: "β", Name: "中", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "コッヘル", Family: "γ", Name: "特大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Family: "γ", Name: "大", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group: "コッヘル", Family: "γ", Name: "中", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "コッヘル", Family: "δ", Name: "大", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "コッヘル", Family: "δ", Name: "中", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "コッヘル", Family: "ε", Name: "大", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "コッヘル", Family: "ζ", Name: "大", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "α", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "β", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "γ", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "δ", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "ε", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "η", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "Θ", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "λ", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "μ", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "π", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "ρ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "ヘッド", Family: "", Name: "σ", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "φ", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group: "ヘッド", Family: "", Name: "ω", state: NotReserved, last: 1, value: "" , ID: 0},
  
]


function Pot_Head_Table(props) {
  const pot_head_state = useContext(pot_headState)
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
                        <TableCell align='center'>特大
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
                        <TableCell align='center'>中
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
                        <TableCell align='center'>大
                          {
                            props.CreateOption == true ?
                              <Switch size="small" checked={value.selected[0]} onChange={(e) => handleToggleChange(0, ind, index, e)} />
                              : ""
                          }
                        </TableCell>
                        <TableCell align='center'>中
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
              {Pot_Header()}
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}></TableCell>
              <TableCell align="center" colSpan={2}></TableCell>
              {Pot_Header_Element()}
            </TableRow>
          </TableHead>

          <ShowOnTable rows={rows}></ShowOnTable>

        </Table>
      </TableContainer>
    </>
  )
}


export default Pot_Head_Table