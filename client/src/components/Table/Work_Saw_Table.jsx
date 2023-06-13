import React, { useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Greek_Character} from './Equip_table';
import { Box } from '@mui/material';
import PopUp from './PopUp';

const rows = [
  {name:"日", value:[0]}, 
  {name:"L装α", value:[0]},
  {name:"L装β", value:[0]},
  {name:"ヘルボα", value:[0]},
  {name:"ヘルボβ", value:[0]},
  {name:"ヘルボγ", value:[0]},
  {name:"ヘルボδ", value:[0]},
  {name:"エキボα", value:[0]},
  {name:"エキボβ", value:[0]},
  {name:"エキボγ", value:[0]},
  {name:"藪ノコα", value:[0]},
  {name:"藪ノコβ", value:[0]},
  {name:"藪ノコγ", value:[0]},
  {name:"藪ノコδ", value:[0]},
  {name:"藪ノコε", value:[0]},
  {name:"藪ノコξ", value:[0]},
  {name:"なたα", value:[0]},
  {name:"なたβ", value:[0]},
  {name:"スノーソーα", value:[0]},
  {name:"スノーソーβ", value:[0]},
  {name:"スノーソーγ", value:[0]},
  {name:"スノーソーδ", value:[0]},
  {name:"スノーソーε", value:[0]},
  {name:"スノーソーξ", value:[0]},
];

const Table_Header = (props) => {
    return(
      <>
        {
          Greek_Character.map((value, index) => {
            if(index < props.num){
              return(
                <>
                <TableCell>{value}</TableCell>
                </>
              )
            }
          })
        }
      </>
    )
}


function Work_Saw_Table() {

  
  const [isModal, SetIsModal] = useState(false);
  const information = useRef(null);

  const closeModal = (e) => {
    let elm = e.target;
    let flag = 0;
    while(elm != null){
      if(elm.className != undefined && elm.className.startsWith("PopUp")) {
        flag=1;
        break;
      }
      elm = elm.parentNode;
    }
    if(flag == 1) return;
    SetIsModal(false);
    document.removeEventListener("click", (e) => {closeModal(e)})
  }

  function Change_State(info,event){
    SetIsModal(true);
    information.current = info;
    document.addEventListener("click", closeModal);
    event.stopPropagation();
  }

  const Equip_State = (place,name) => {
    const info = {
      place: place,
      color: "",
      name: name
    };
    if(place === 0){
      info.place = "貸代中"
      info.color = "gray"
    }else if(place === 1){
      info.place = "駒場"
      info.color = "blue"
   }else if(place === 2){
      info.place = "本郷"
      info.color = "red"
    }else info.place = ""
    return (
      <Box style={{cursor: "default"}} onClick= {(event) => {Change_State(info, event)}}>
      <Box style={{backgroundColor: `${info.color}`, padding: "4px", color:"white", textAlign: "center"}}>{info.name}</Box>
      </Box>
    );
  }
  return (
    <>
    {isModal===true ? <PopUp information = {information.current}/> : <></>}
    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell colSpan={3}>L装</TableCell>
                <TableCell colSpan={5}>ヘルボ</TableCell>
                <TableCell colSpan={4}>エキボ</TableCell>
                <TableCell colSpan={7}>薮ノコ</TableCell>
                <TableCell colSpan={3}>なた</TableCell>
                <TableCell colSpan={3}>スノーソー</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>日</TableCell>
                <TableCell></TableCell>
                {Table_Header({name:"L装",num:2})}
                <TableCell></TableCell>
                {Table_Header({name:"ヘルボ",num:4})}
                <TableCell></TableCell>
                {Table_Header({name:"エキボ",num:3})}
                <TableCell></TableCell>
                {Table_Header({name:"薮ノコ",num:6})}
                <TableCell></TableCell>
                {Table_Header({name:"なた",num:2})}
                <TableCell></TableCell>
                {Table_Header({name:"スノーソー",num:6})}
            </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                  row.value.map((val,index) => {
                    if(row.name === '日' || row.name === 'L装β' || row.name === 'ヘルボδ' || row.name === 'エキボγ' || row.name ==='藪ノコξ' || row.name ==='なたβ' || row.name ==='スノーソーξ'){
                      return (
                      <>
                        <TableCell align='left'>{Equip_State(0,"ほげ")}</TableCell>
                        <TableCell align='left'></TableCell>
                      </>)
                    }else{
                      return (<TableCell align='left'>{Equip_State(0,"ほげ")}</TableCell>)
                    }
                  })
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
  )
}


export default Work_Saw_Table