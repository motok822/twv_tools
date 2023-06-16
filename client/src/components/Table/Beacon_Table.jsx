import React, { useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import PopUp from './PopUp';

const rows = [
  {name: "日", value: [0]},
  {name: "A", value: [0]},
  {name: "B", value: [0]},
  {name: "E", value: [0]},
  {name: "F", value: [0]},
  {name: "G", value: [0]},
  {name: "H", value: [0]},
  {name: "M", value: [0]},
  {name: "O", value: [0]},
  {name: "Q", value: [0]},
  {name: "S", value: [0]},
  {name: "X", value: [0]},
  {name: "Y", value: [0]},
  {name: "Z", value: [0]},
  {name: "新arva", value: [0]},
  {name: "甲", value: [0]},
  {name: "丙", value: [0]},
  {name: "い", value: [0]},
  {name: "ろ", value: [0]},
  {name: "に", value: [0]},
];
const Beacon_Character = ["A","B","E","F","G","H","M","O","Q","S","X","Y","Z","新arva","甲","丙","い","ろ","に"]
const Table_Header = (props) => {
    return(
      <>
        {
          Beacon_Character.map((value, index) => {
            return(
              <TableCell align="left">{value}</TableCell>
            )
          })
        }
      </>
    )
}


function Beacon_Table() {
  
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
                <TableCell colSpan={20}>ビーコン</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>日</TableCell>
                <TableCell></TableCell>
                {Table_Header({name:"ビーコン"})}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                  row.value.map((val,index) => {
                      return row.name=="日" ?
                       (
                        <>
                       <TableCell align='left'>{Equip_State(0,"ほげ")}</TableCell>
                       <TableCell align='center'></TableCell>{/* これは横のスペース */}
                        </>
                       ) : (<TableCell align='left'>{Equip_State(0,"ほげ")}</TableCell>)
                  }
                )))}
            </TableBody>
        </Table>
    </TableContainer>
  </>
  )
}


export default Beacon_Table