import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Max_calc from './components/Max/Max_calc';
import Return_equip from './components/Return/Return_equip';
import { Equip_table } from './components/Table/Equip_table';
import Modify_equip from './components/Modify/Modify_equip';
import Other from './components/Other/Other';
import F_calc from './components/F/F_calc';
import Create_equip from './components/Create/Create_equip';
import React, { createContext, useState } from 'react'
import Select_equip from './components/Create/Select_equip';
import Distribute_equip from './components/Create/Distribute_equip';
import Login from './components/Login/Login';
import AuthGuard from './components/Login/AuthGuard';
import FailedToLogin from './components/Login/FailedToLogin';

export const UserContext = createContext();

function App() {
  const [UserInfo,SetUserInfo] = useState({
    user_name: "",
    family_name: "",
    first_name: "",
    grade: 1,
    user_auth: true,
  })
  return (
    <div className='App'>

      <UserContext.Provider value={UserInfo}>
        <HashRouter>
          <Routes>
            <Route path={"/"} element={<AuthGuard component={<Home />}/>} />
            <Route path={"/F"} element={<AuthGuard component={<F_calc />} />} />
            <Route path={"/Max"} element={<AuthGuard component={<Max_calc />} />}/>
            <Route path={"/Table"} element={<AuthGuard component={<Equip_table />} />} />
            <Route path={"/Create"} element={<AuthGuard component={<Create_equip />} />} />
            <Route path={"/Create/SelectEquip"} element={<AuthGuard component={<Select_equip />} />} />
            <Route path={"/Create/DistributeEquip"} element={<AuthGuard component={<Distribute_equip />} />} />
            <Route path={"/Other"} element={<AuthGuard component={<Other />} />}/>
            <Route path={"/Login"} element={<Login />} />
            <Route path={"/FailedToLogin"} element={<FailedToLogin />}/>
          </Routes>
        </HashRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
