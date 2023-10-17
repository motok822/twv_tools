import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Switch } from '@mui/material';
import React, { useRef, useState } from 'react'
import PopUp from './PopUp';

const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;

function ShowOnTable(props) {
    let rows = props.rows
    const [clickCount, SetClickCount] = useState(0);
    const [selectedElement, SetSelectedElement] = useState(['']);
    const information = useRef(null);
    const [CloseClick, SetCloseClick] = useState({flag: 0})

    const closeModal = (e) => {
        let elm = e.target;
        let flag = 0;
        while (elm != null) {
            if (elm.className != undefined && elm.className.startsWith("PopUp")) {
                flag = 1;
                break;
            }
            elm = elm.parentNode;
        }
        if (flag == 1) return;
        SetClickCount(0);
        SetSelectedElement(['']);
        document.removeEventListener("click", closeModal)
    }
    function Change_State(place, name, event, selected, EquipID, PlanID, ID) {
        const info = {
            place: place,
            color: "",
            name: name,
            EquipID: EquipID,
            PlanID: PlanID,
            ID: ID
        };
        information.current = info;
        if (clickCount == 1 || clickCount == 0) {
            document.addEventListener("click", closeModal);
            event.stopPropagation();
        }
        if (IsElementIn(selectedElement, selected)) {
            SetClickCount((pre) => (pre+1) % 3);
        } else {
            SetClickCount(1);
            SetSelectedElement([...selectedElement, selected]);
        }
    }
    const IsElementIn = (array, element) => {
        let flag = 0;
        array.map((val, ind) => {
            if (val == element) flag = 1;
        })
        if (flag == 1) return true;
        else return false;
    }

    const Equip_State = (place, name, selected) => {
        const info = {
            place: place,
            color: "",
            name: name
        };
        if (place === Reserved) {
            info.place = "貸出中"
            info.color = "gray"
        } else if (place === Komaba) {
            info.place = "駒場"
            info.color = "blue"
        } else if (place === Hongou) {
            info.place = "本郷"
            info.color = "red"
        } else {
            info.place = ""
            info.color = "black"
        }

        if (clickCount == 0 || !IsElementIn(selectedElement, selected)) {    //デフォルト状態
            return (
                <Box style={{ cursor: "default" }}>
                    <Box style={{ backgroundColor: `${info.color}`, padding: "4px", color: "white", textAlign: "center" }}>{info.name}</Box>
                </Box>
            );
        } else if (IsElementIn(selectedElement, selected)) {                  //クリック一回or二回 選ばれたセルのみ拡張 
            return (
                <Box style={{ cursor: "default" }}>
                    <Box style={{ backgroundColor: `${info.color}`, padding: "4px", color: "white", textAlign: "center" }}>{info.name}</Box>
                    <Box style={{ backgroundColor: `${info.color}`, padding: "4px", color: "white", textAlign: "center" }}>{info.place}</Box>
                </Box>
            );
        }
    }
    const ClosePopUp = () => {
        SetClickCount(0)
        SetSelectedElement(['']);
    }
    return (
        <>
            {clickCount == 2 ? <PopUp information={information.current} rows={rows} ClosePopUp={ClosePopUp}/> : <></>}
            <TableBody>
                {
                    rows.map((rowsi, PlanID) => {
                        return (
                            <TableRow>
                                {
                                    rowsi.map((row, EquipID) => {
                                        const CellFullName = row.Group + row.Family + row.Name + PlanID.toString()
                                        if (row.Name == "山行ID" || row.Name == "山行名") {
                                            return (
                                                <>
                                                    <TableCell align='right' key={CellFullName} >
                                                        {Equip_State(row.state, row.value, CellFullName)}
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </>
                                            )
                                        } else if (row.last == 1) {
                                            return (
                                                <>
                                                    <TableCell align='right' key={CellFullName} onClick={(e) => { Change_State(row.state, row.value, e, CellFullName, EquipID, PlanID, row.ID) }}>
                                                        {Equip_State(row.state, row.value, CellFullName)}
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </>)
                                        } else {
                                            return (
                                                <TableCell align='right' key={CellFullName} onClick={(e) => { Change_State(row.state, row.value, e, CellFullName, EquipID, PlanID, row.ID) }}>
                                                    {Equip_State(row.state, row.value, CellFullName)}
                                                </TableCell>
                                            )
                                        }
                                    })
                                }
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </>
    )
}

export default ShowOnTable