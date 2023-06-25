import React, { useEffect, useMemo, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from '../styles/F_calc.module.css'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const PayMoney = 1;
const PayNoMoney = 0;

function F_calc() {
  const [PayMoneyList, SetPayMoneyList] = useState([]);
  const [PayNoMoneyList, SetPayNoMoneyList] = useState([]);
  const [CalcRes, SetCalcRes] = useState([[{ name: "" }]])


  const PayMoneyForm = (num, state) => {
    let array = [];
    for (let i = 0; i < num; i++) {
      array.push([{ name: i.toString(), num: 0 }])
    }
    if (state == PayMoney) {
      SetPayMoneyList(array);
    } else {
      SetPayNoMoneyList(array);
    }
  }


  function calc() {
    let MoneySum = 0;
    console.log("paymoneyList", PayMoneyList)
    for (let i = 0; i < PayMoneyList.length; i++) {
      MoneySum += PayMoneyList[i].num
    }
    for (let i = 0; i < PayNoMoneyList.length; i++) {
      MoneySum += PayNoMoneyList[i].num
    }
    let MoneyPerPerson = Math.floor(MoneySum / PayMoneyList.length)
    console.log("money per person", MoneyPerPerson);
    const HaveToPay = []
    const PaidBack = []
    PayMoneyList.map((val, index) => {
      if (val.num < MoneyPerPerson) HaveToPay.push(Object.assign({}, val));
      if (val.num > MoneyPerPerson) PaidBack.push(Object.assign({}, val));
    })
    PaidBack.map((val) => {
      val.num -= MoneyPerPerson;
    })
    PayNoMoneyList.map((val, index) => {
      PaidBack.push(Object.assign({}, val));
    })
    HaveToPay.sort((first, second) => {//事前支払いが少ない順にソート
      if (first.num > second.num) return 1;
      else if (first.num < second.num) return -1;
      else return 0;
    })
    HaveToPay.map((val, index) => {
      val.num = MoneyPerPerson - val.num;
      console.log(val.num);
    })
    PaidBack.sort((first, second) => {
      if (first.num < second.num) return 1;
      else if (first.num > second.num) return -1;
      else return 0;
    })
    let cnt = 0;
    let res = new Array(PaidBack.length)
    for (let i = 0; i < PaidBack.length; i++) {
      res[i] = new Array(HaveToPay.length + 1)
      res[i][0] = { name: PaidBack[i].name, num: 0 }
      for (let j = 1; j < HaveToPay.length + 1; j++) {
        res[i][j] = { name: "", num: 0 }
      }
    }
    HaveToPay.map((val, index) => {
      while (val.num != 0) {
        if (PaidBack[cnt].num == 0) {
          cnt++; continue;
        }
        if (PaidBack[cnt].num - val.num >= 0) {
          res[cnt][index + 1] = { name: val.name, num: val.num }
          PaidBack[cnt].num -= val.num;
          val.num = 0;
        }
        if (PaidBack[cnt].num - val.num < 0) {
          res[cnt][index + 1] = { name: val.name, num: PaidBack[cnt].num }
          val.num -= PaidBack[cnt].num;
          PaidBack[cnt].num = 0;
        }
      }
    })
    console.log("result")
    console.log(res);
    SetCalcRes(res);
  }

  return (
    <div className={styles.Home}>
      <Header></Header>
      <main className={styles.main}>
        <h1 className={styles.text}>F清算計算ツール</h1>
        <p className={styles.text}> お金を負担する人の数    <input type='number' onChange={(e) => { PayMoneyForm(e.target.value, PayMoney) }}></input></p>
        <p className={styles.text}>お金を負担しない人の数    <input type='number' onChange={(e) => { PayMoneyForm(e.target.value, PayNoMoney) }}></input></p>
        <p className={styles.text}>お金を負担する人の名前               金額</p>
        {
          PayMoneyList.map((val, index) => {
            return (
              <p className={styles.text}>
                <input type='text' placeholder='名前' onChange={(e) => { val.name = e.target.value }}></input>
                <input type='number' placeholder='金額' onChange={(e) => { val.num = Number(e.target.value) }}></input>
              </p>
            )
          })
        }
        <p className={styles.text}>お金を負担しない人の名前       金額</p>
        {
          PayNoMoneyList.map((val, index) => {
            return (
              <p className={styles.text}>
                <input type='text' placeholder='名前' onChange={(e) => { val.name = e.target.value }}></input>
                <input type='number' placeholder='金額' onChange={(e) => { val.num = Number(e.target.value) }}></input>
              </p>
            )
          })
        }
        <button onClick={() => { calc() }} className={styles.button}>名前と金額を確定する</button>
        <div className={styles.table}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {
                    CalcRes[0].map((val, index) => {
                      if (index >= 1) {
                        return (
                          <TableCell>{val.name}(払う人)</TableCell>
                        )
                      }
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>

                {CalcRes.map((val, index) => {
                  return (
                    <TableRow>
                      {val.map((value, ind) => {
                        if (ind == 0) return <TableCell>{value.name}(受け取る人)</TableCell>
                        if (ind >= 1) return <TableCell>{value.num}円</TableCell>
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}

export default F_calc