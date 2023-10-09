import { Switch, TableCell } from '@mui/material'
import React, { useState } from 'react'

function Table_Header(props) {
    const [Equips, SetEquips] = useState(props.Equips)
    return (
      <>
        {
          Equips.map((val, ind) => {
            return (
              <>
                {val.List.map((value, index) => {
                  return (<TableCell align='left' colSpan={4}>{value.Family}
                    {
                      props.CreateOption == true && value.selected.length > 1 ?
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

export default Table_Header