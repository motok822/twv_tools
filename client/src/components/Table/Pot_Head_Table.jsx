import React, { useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Greek_Character, StyledContent, StyledOverlay } from './Equip_table';
import { Box } from '@mui/material';
import PopUp from './PopUp';

const Head_Character = ["α","β","γ","δ","ε","η","θ","λ","μ","π","ρ","σ","φ","ω"];

const Pot_Header = (props) => {
    return(
      <>
        {Greek_Character.map((value, index) => {
            if(index < props.num){
              return(<TableCell align="left" colSpan={4}>{value}</TableCell>)
            }
          })}
      </>
    )
}

const Pot_Header_Element = (num) => {
  return(
    <>
  {Head_Character.map((value, index) => {
    if(index < num){
      return (
        <>
          <TableCell align='center'>中</TableCell>
          <TableCell align='center'>大</TableCell>
          <TableCell align='center'>特大</TableCell>
          <TableCell></TableCell>
        </>
      )
    }
  })}
  </>
  )
}

const Head_Header = () => {
  return(
    <>
      {Head_Character.map((value) => {
            return(
                <TableCell align="left" colSpan={2}>{value}</TableCell>
            )
        })}
    </>
  )
}

const Head_Header_Element = (num) => {
  return(
  <>
  {Head_Character.map((value) => {
        return(
            <TableCell align="center" colSpan={2}></TableCell>
        )
    })}
  </>
  )
}

const rows = [
  {name:"日", value:[0]},
  {name:"コッヘルα", value:[0,0,0]},
  {name:"コッヘルβ", value:[0,0,0]},
  {name:"コッヘルγ", value:[0,0,0]},
  {name:"コッヘルδ", value:[0,0]},
  {name:"コッヘルε", value:[0]},
  {name:"ξ", value:[0]},
  {name:"ヘッドα", value:[0]},
  {name:"ヘッドβ", value:[0]},
  {name:"ヘッドγ", value:[0]},
  {name:"ヘッドδ", value:[0]},
  {name:"ヘッドε", value:[0]},
  {name:"ヘッドη", value:[0]},
  {name:"ヘッドθ", value:[0]},
  {name:"ヘッドλ", value:[0]},
  {name:"ヘッドμ", value:[0]},
  {name:"ヘッドπ", value:[0]},
  {name:"ヘッドρ", value:[0]},
  {name:"ヘッドσ", value:[0]},
  {name:"ヘッドφ", value:[0]},
  {name:"ヘッドω", value:[0]}
]

function Pot_Head_Table() {
  
  const [clickCount, SetClickCount] = useState(0);
  const [selectedElement, SetSelectedElement] = useState(['']);
  const information = useRef(null);
  
  const closeModal = (e) => {
    let elm = e.target;
    let flag = 0;
    while(elm != null){
      console.log(elm);
      if(elm.className != undefined && elm.className.startsWith("PopUp")) {
        flag=1;
        break;
      }
      elm = elm.parentNode;
    }
    if(flag == 1) return;
    SetClickCount(0);
    SetSelectedElement(['']);
    document.removeEventListener("click", closeModal)
  }
  
  function Change_State(name, place, event, selected) {
    const info={
      place: place,
      color: "",
      name: name
    };
    if (place === 0) {
      info.place = "貸出中"
      info.color = "gray"
    } else if (place === 1) {
      info.place = "駒場"
      info.color = "blue"
    } else if (place === 2) {
      info.place = "本郷"
      info.color = "red"
    } else info.place = ""

    information.current = info;
    console.log(clickCount);
    if(clickCount == 1 || clickCount == 0){
      document.addEventListener("click", closeModal);
      event.stopPropagation();
    }
    if(IsElementIn(selectedElement, selected)){
      SetClickCount((pre) => (pre + 1) % 3); 
    }else{
      SetClickCount(1);
      SetSelectedElement([...selectedElement,selected]);
    }
  }

  const IsElementIn = (array, element) => {
    let flag = 0;
    array.map((val,ind) => {
      if(val == element)flag = 1;
    })
    if(flag == 1)return true;
    else return false;
  }

  const Equip_State = (place, name, selected) => {
    const info = {
      place: place,
      color: "",
      name: name
    };
    if (place === 0) {
      info.place = "貸出中"
      info.color = "gray"
    } else if (place === 1) {
      info.place = "駒場"
      info.color = "blue"
    } else if (place === 2) {
      info.place = "本郷"
      info.color = "red"
    } else info.place = ""

    if (clickCount == 0 || !IsElementIn(selectedElement, selected)) {    //デフォルト状態
      return (
        <Box style={{ cursor: "default" }}>
          <Box style={{ backgroundColor: `${info.color}`, padding: "4px", color: "white", textAlign: "center" }}>{info.name}</Box>
        </Box>
      );
    } else if(IsElementIn(selectedElement, selected)){                  //クリック一回or二回 選ばれたセルのみ拡張 
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
      {clickCount==2 ? <PopUp information={information.current}/> : <></>}
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2} style={{borderBottom: "none"  }}></TableCell>
                  <TableCell align='left' colSpan={18}>コッヘル</TableCell>
                  <TableCell align='left' colSpan={20}>ヘッド</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center' colSpan={1} >日</TableCell>
                  <TableCell></TableCell>
                  {Pot_Header({num: 3})}
                  <TableCell align="left" colSpan={3}>δ</TableCell>
                  <TableCell align="left" colSpan={2}>ε</TableCell>
                  <TableCell align="left" colSpan={2}>ξ</TableCell>
                  {Head_Header()}
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}></TableCell>
                  {Pot_Header_Element(3)}
                  <TableCell align='center'>中</TableCell>
                  <TableCell align='center'>大</TableCell>
                  <TableCell></TableCell>
                  <TableCell align='center'>大</TableCell>
                  <TableCell></TableCell>
                  <TableCell align='center'>大</TableCell>
                  <TableCell></TableCell>
                  {Head_Header_Element()}
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row) => (
                  row.value.map((val,index) => {
                    if(index == row.value.length-1){
                      return (
                        <>
                          <TableCell align='right' key={row.name+index.toString()} onClick={(e) => {Change_State(1,"ほげ",e,row.name+index.toString())}}>
                            {Equip_State(1, "ほげ",row.name+index.toString())}
                            </TableCell>
                          <TableCell></TableCell>  {/* これは横のスペース */}
                        </>)
                    }else{
                      return (<TableCell align='right' key = {row.name+index.toString()} onClick={(e) => {Change_State(1,"ほげ",e,row.name+index.toString())}}>
                              {Equip_State(0, "ほげ",row.name+index.toString())} 
                            </TableCell>)
                    }
                  })
                ))}
              </TableBody>
          </Table>
      </TableContainer>
    </>
    )
  }
  

export default Pot_Head_Table