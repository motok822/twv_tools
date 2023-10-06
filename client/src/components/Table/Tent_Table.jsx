import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { tentState } from './Equip_table_list';
import { BasicAPIManager } from '../../api_mgr/BasicAPIManager';
import { AdvancedAPIManager } from '../../api_mgr/AdvancedAPIManager';
import { ParsePlanMap } from './ParsePlanMap';
import ShowOnTable from './ShowOnTable';

const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

const EquipTemplate =
  [{ Group: "", Type: '',Family: "", Name: "山行ID", state: Reserved, last: 1, value: "0", ID: 0 },
  { Group: "", Type: '',Family: "", Name: "山行名", state: Reserved, last: 1, value: "サンプル", ID: 0 },
  { Group:"テント", Type: "7天", Family: "α", Name: "本体", state: Hongou, last: 0, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "α", Name: "フライ", state: Hongou, last: 0, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "α", Name: "ポール", state: Hongou, last: 1, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "β", Name: "本体", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "β", Name: "フライ", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "β", Name: "ポール", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "γ", Name: "本体", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group:"テント", Type: "7天", Family: "γ", Name: "フライ", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "γ", Name: "ポール", state: NotReserved, last: 1, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "δ", Name: "本体", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "δ", Name: "フライ", state: NotReserved, last: 0, value: "" , ID: 0},
  { Group:"テント",Type: "7天", Family: "δ", Name: "ポール", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "α", Name: "本体", state: Hongou, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "α", Name: "フライ", state: Hongou, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "α", Name: "ポール", state: Hongou, last: 1, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "β", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "β", Name: "フライ", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "β", Name: "ポール", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "γ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "γ", Name: "フライ", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "γ", Name: "ポール", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "δ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "δ", Name: "フライ", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "δ", Name: "ポール", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "ε", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "ε", Name: "フライ", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"45天",Type: "", Family: "ε", Name: "ポール", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group:"6天",Type: "", Family: "α", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"6天",Type: "", Family: "α", Name: "フライ", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"6天",Type: "", Family: "α", Name: "ポール", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group:"6天",Type: "", Family: "β", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"6天",Type: "", Family: "β", Name: "フライ", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"6天",Type: "", Family: "β", Name: "ポール", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group:"12天",Type: "", Family: "α", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"12天",Type: "", Family: "α", Name: "フライ", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group:"12天",Type: "", Family: "α", Name: "ポール", state: NotReserved, last: 1, value: "", ID: 0 },];


function Tent_Table(props) {

  const tent_state = useContext(tentState)
  const [rows, SetRows] = useState([[...EquipTemplate]])
  let PlanMapOneYear = null;
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
    console.log(rows)
    const res = ParsePlanMap([EquipTemplate], EquipTemplate, PlanMapOneYear)
    console.log(res)
    SetRows(res)
  }

  const initial_Equips = [
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
  ]
  const [Equips, SetEquips] = useState(tent_state == undefined ? initial_Equips : tent_state)  //E表作成の時に使う

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
                      props.CreateOption == true && value.selected.length > 1 ?
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="center" colSpan={4} style={{ borderBottom: "none" }}></TableCell>
              <TableCell align='left' colSpan={16}>7天</TableCell>
              <TableCell align='left' colSpan={20}>45天</TableCell>
              <TableCell align='left' colSpan={8}>6天</TableCell>
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

          <ShowOnTable rows={rows}></ShowOnTable>

        </Table>
      </TableContainer>
    </>
  )
}


export default Tent_Table

/*
To do
テーブルの部分の抽象化をもうちょい頑張る
新しいequip情報をサーバーに送るやつを作る
E表作成のトグルスイッチがポップアップ画面にも浮き出るのを直す
E表作成を終わらせる
反省点
もっと抽象化しておくべきだった（正直今からじゃ無理かな）
*/