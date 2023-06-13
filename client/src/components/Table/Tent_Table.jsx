import React, { useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Equip_State, Greek_Character, StyledContent, StyledOverlay, isModal } from './Equip_table';
import { Box} from '@mui/material';
import styled from '@emotion/styled';
import PopUp from './PopUp';

const rows = [
  {name: "日", value:[0]},
  {name: "7天α",value:[0,0,0]},
  {name: "7天β",value:[0,0,0]},
  {name: "7天γ",value:[0,0,0]},
  {name: "7天δ",value:[0,0,0]},
  {name: "45天α",value:[0,0,0]},
  {name: "45天β",value:[0,0,0]},
  {name: "45天γ",value:[0,0,0]},
  {name: "45天δ",value:[0,0,0]},
  {name: "45天ε",value:[0,0,0]},
  {name: "6天α",value:[0,0,0]},
  {name: "6天β",value:[0,0,0]},
  {name: "12天α",value:[0,0,0]},
  {name: "その他α",value:[0,0,0]}];

const Table_Header = (props) => {
    return(
      <>
        {Greek_Character.map((value, index) => {
            if(index < props.num) return(<TableCell align='left' colSpan={4}>{value}</TableCell>)
          })}
      </>
    )
}

const Table_Header_Element = (num) => {
  return(
    <>
    {Greek_Character.map((value, index) => {
        if(index < num) return(
          <>
          <TableCell align='right'>本体</TableCell>
          <TableCell align='right'>ポール</TableCell>
          <TableCell align='right'>フライ</TableCell>
          <TableCell></TableCell>
          </>
        )
      })}
    </>
  )
}



function Tent_Table() {
  
  const [isModal, SetIsModal] = useState(false);
  const information = useRef(null);
  const PopUpWrapper = useRef(null);

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
    {isModal===true ? <PopUp information={information.current} ref={PopUpWrapper}/> : <></>}
    <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2} style={{borderBottom: "none"  }}></TableCell>
                  <TableCell align='left' colSpan={16}>7天</TableCell>
                  <TableCell align='left' colSpan={20}>45天</TableCell>
                  <TableCell align='left' colSpan={8}>6天</TableCell>
                  <TableCell align='left' colSpan={4}>12天</TableCell>
                  <TableCell align='left' colSpan={4}>その他</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center' colSpan={1} >日</TableCell>
                  <TableCell></TableCell>
                  {Table_Header({num: 4})}
                  {Table_Header({num: 5})}
                  {Table_Header({num: 2})}
                  {Table_Header({num: 1})}
                  {Table_Header({num: 1})}
                </TableRow>
                <TableRow>
                  <TableCell align='center'></TableCell>
                  <TableCell></TableCell>
                  {Table_Header_Element(4)}
                  {Table_Header_Element(5)}
                  {Table_Header_Element(2)}
                  {Table_Header_Element(1)}
                  {Table_Header_Element(1)}
                </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
              {rows.map((row) => (
                  row.value.map((val,index) => {
                    if(index == row.value.length-1){
                      return (
                      <>
                        <TableCell align='right'>{Equip_State(0,"ほげ")}</TableCell>
                        <TableCell></TableCell>
                      </>)
                    }else{
                      return (<TableCell align='right'>{Equip_State(0,"ほげ")}  </TableCell>)
                    }
                  })
                ))}
              </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
  
    </>
  )
}


export default Tent_Table