import React, { useEffect, useState } from 'react'
import { BasicAPIManager } from '../api_mgr/BasicAPIManager'
import Header from './Header';
import Footer from './Footer';
import * as styles from './styles/Home.module.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
//var DefaultUserInfo={ID:0,UserName:"Guest",FamilyName:"Guest",FirstName:"",Grade:-1,Belong:"無所属",Sex:"Male",Birth:new Date('1999-12-31T15:00:00.000Z')}

interface UserInfo {
  ID: number;
  UserName: string;
  FamilyName: string;
  FirstName: string;
  Grade: number;
  Belong: string;
  Sex: "Male" | "Female";
  Birth: string | null;
}
function User() {
  const [user, setUser] = useState<null | UserInfo>(null)
  const BMgr = new BasicAPIManager()
  async function GetData(): Promise<void> {
    await setUser(await BMgr.User.GetMyUserInfo())
    console.log(user)
  }
  useEffect(() => {
    GetData()
  }, [])
  return (
    <div>
      <Header />
      <div style={{ minHeight: "70vh", width:"100%", margin: "3rem auto"}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
            <TableBody>
              <TableRow>
                  <TableCell align="center">ユーザー名</TableCell>
                  <TableCell align="center">{user?.UserName}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="center">苗字</TableCell>
                  <TableCell align="center">{user?.FamilyName}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="center">名前</TableCell>
                  <TableCell align="center">{user?.FirstName}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="center">学年</TableCell>
                  <TableCell align="center">{user?.Grade}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="center">所属</TableCell>
                  <TableCell align="center">{user?.Belong}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="center">性別</TableCell>
                  <TableCell align="center">{user?.Sex}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell align="center">誕生日</TableCell>
                  <TableCell align="center">{user?.Birth}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </div>
  )
}

export default User