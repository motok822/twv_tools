import React, { useEffect, useMemo, useState } from 'react'
import styles from '../styles/F_calc.module.css'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Footer from '../Footer';
import Header from '../Header';

const PayMoney = 1;
const PayNoMoney = 0;
interface Member {
    name: string;
    num: number;
}
function F_calc() {
  const [PayMoneyList, SetPayMoneyList] = useState <Member[]>([]);
  const [PayNoMoneyList, SetPayNoMoneyList] = useState<Member[]>([]);
  const [CalcRes, SetCalcRes] = useState([[{ name: "", num: 0 }]])
  const [PayMoneyNum, SetPayMoneyNum] = useState<number>(0)
  const [PayNoMoneyNum, SetPayNoMoneyNum] = useState<number>(0)

  const PayMoneyForm = (num :number, state: number) => {
    let array: Member[] = [];
    for (let i = 0; i < num; i++) {
      if(i < PayMoneyList.length){
        array.push({name: PayMoneyList[i].name, num: PayMoneyList[i].num})
      }else{
        array.push({ name: i.toString(), num: 0 })
      }
    }
    if (state == PayMoney) {
      SetPayMoneyList(array);
    } else {
      SetPayNoMoneyList(array);
    }
  }


  function calc() {
    let MoneySum = 0;
    // console.log("paymoneyList", PayMoneyList)
    for (let i = 0; i < PayMoneyList.length; i++) {
      MoneySum += PayMoneyList[i].num
    }
    for (let i = 0; i < PayNoMoneyList.length; i++) {
      MoneySum += PayNoMoneyList[i].num
    }
    let MoneyPerPerson = Math.floor(MoneySum / PayMoneyList.length)
    // console.log("money per person", MoneyPerPerson);
    const HaveToPay:Member[] = []
    const PaidBack:Member[] = []
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
    })
    PaidBack.sort((first, second) => {
      if (first.num < second.num) return 1;
      else if (first.num > second.num) return -1;
      else return 0;
    })

    // console.log("PaidBack", PaidBack)
    // console.log("HaveToPay", HaveToPay)
    let res = new Array(PaidBack.length)
    //resのinitialization
    for (let i = 0; i < PaidBack.length; i++) {
      res[i] = new Array(HaveToPay.length + 1)  //払われる人の名前と額が行で、払う人の名前と額が列の二次元配列
      res[i][0] = { name: PaidBack[i].name, num: 0 }  //行の先頭には自分の名前と額
      for (let j = 1; j < HaveToPay.length + 1; j++) {
        res[i][j] = { name: HaveToPay[j - 1].name, num: 0 }
      }
    }
    //resに値を代入
    let cnt = 0;
    HaveToPay.map((val, index) => {
      while (val.num != 0) {
        if (PaidBack[cnt].num == 0) {
          cnt++
          continue
        }
        if (PaidBack[cnt].num - val.num >= 0) {
          res[cnt][index + 1].num = val.num 
          PaidBack[cnt].num -= val.num
          val.num = 0
          break
        }
        if (PaidBack[cnt].num - val.num < 0) {
          res[cnt][index + 1].num =  PaidBack[cnt].num 
          val.num -= PaidBack[cnt].num
          PaidBack[cnt].num = 0
        }
      }
    })
    // console.log("result")
    // console.log(res)
    if(res.length != 0){
      SetCalcRes(res)
    }
  }
  const paymoneyplusone = async () => {
    await SetPayMoneyNum((prev) => prev + 1)
  }
  const paymoneyminusone = async () => {
    await SetPayMoneyNum((prev: number) => {
          if (prev > 0) return (prev - 1);
          else return 0
      })
  }
  const paynomoneyplusone = async () => {
    await SetPayNoMoneyNum((prev) => prev + 1)
  }
  const paynomoneyminusone = async () => {
    await SetPayNoMoneyNum((prev :number) => {
      if(prev > 0)return (prev - 1)
      else return 0
    })
  }
  useEffect(() => {
    PayMoneyForm(PayMoneyNum, PayMoney)
  }, [PayMoneyNum])

  useEffect(() => {
    PayMoneyForm(PayNoMoneyNum, PayNoMoney)
  }, [PayNoMoneyNum])

  return (
    <div className={styles.Home}>
      <Header></Header>
      <main className={styles.main}>
        <h1 className={styles.text}>F清算計算ツール</h1>
        <p className={styles.text}> お金を負担する人の数    
        <RemoveIcon onClick={() => paymoneyminusone()} className={styles.plusminus}></RemoveIcon>
        <input type='text' inputMode='numeric' min="0" value={PayMoneyNum} onChange={(e) => { if(Number(e.target.value) >= 0)SetPayMoneyNum(Number(e.target.value)) }}></input>
        <AddIcon onClick={() => paymoneyplusone()} className={styles.plusminus}></AddIcon>
        </p>
        <p className={styles.text}>お金を負担しない人の数    
        <RemoveIcon onClick={() => paynomoneyminusone()} className={styles.plusminus}></RemoveIcon>
        <input type='text' inputMode='numeric' min="0" value={PayNoMoneyNum} onChange={(e) => { if(Number(e.target.value) >= 0)SetPayNoMoneyNum(Number(e.target.value)) }}></input>
        <AddIcon onClick={() => paynomoneyplusone()} className={styles.plusminus}></AddIcon>
        </p>
        <p className={styles.text}>お金を負担する人の名前               金額</p>
        {
          PayMoneyList.map((val, index) => {
            return (
              <p className={styles.text}>
                <input type='text' placeholder='名前' onChange={(e) => { val.name = e.target.value }}></input>
                <input type='text' inputMode='numeric' min="0" placeholder='金額' onChange={(e) => { 
                if(Number(e.target.value) >= 0 && Number(e.target.value) >= 0){
                  val.num = Number(e.target.value)
                 }else{
                  e.target.value = "0"
                 } }}></input>  
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
                <input type='text' inputMode='numeric' min="0" placeholder='金額' onChange={(e) => { 
                if(Number(e.target.value) >= 0 && Number(e.target.value) >= 0){
                  val.num = Number(e.target.value)
                }else{
                  e.target.value = "0"
                }
                  }}></input>
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