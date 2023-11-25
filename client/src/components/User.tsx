import React, { useEffect, useState } from 'react'
import { BasicAPIManager } from '../api_mgr/BasicAPIManager'
import Header from './Header';
import Footer from './Footer';
import * as styles from './styles/Home.module.css';
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
      <div style={{ minHeight: "100vh" }}>
        <table>
          <tbody style={{border: "1", borderCollapse: "collapse"}}>
            <tr>
              <td>ユーザー名</td>
              <td>{user?.UserName}</td>
            </tr>
            <tr>
              <td>苗字</td>
              <td>{user?.FamilyName}</td>
            </tr>
            <tr>
              <td>名前</td>
              <td>{user?.FirstName}</td>
            </tr>
            <tr>
              <td>学年</td>
              <td>{user?.Grade}</td>
            </tr>
            <tr>
              <td>所属</td>
              <td>{user?.Belong}</td>
            </tr>
            <tr>
              <td>性別</td>
              <td>{user?.Sex}</td>
            </tr>
            <tr>
              <td>誕生日</td>
              <td>{user?.Birth}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  )
}

export default User