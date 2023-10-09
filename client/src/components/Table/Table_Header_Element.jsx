import { Switch, TableCell } from '@mui/material'
import React, { useState } from 'react'

function Table_Header_Element(props) {
    const [Equips, SetEquips] = useState(props.Equips)
    const handleToggleChange = (num, ind, index, e) => {
        SetEquips((prev) => {
            const arr = [...prev]
            arr[ind].List[index].selected[num].flag = e.target.checked
            return arr
        })
    }
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
                                                                <Switch size="small" checked={value.selected[i].flag} onChange={(e) => handleToggleChange(0, ind, index, e)} />
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

export default Table_Header_Element