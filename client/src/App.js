import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Max_calc from './components/Max/Max_calc';
import { Equip_table } from './components/Table/Equip_table';
import Other from './components/Other/Other';
import F_calc from './components/F/F_calc';
import Create_equip from './components/Create/Create_equip';
import React, { createContext, useState } from 'react'
import Select_equip from './components/Create/Select_equip';
import Distribute_equip from './components/Create/Distribute_equip';
import Show_Distribution_Res from './components/Create/Show_Distribution_Res';

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
            <Route path={"/"} element={<Home />} />
            <Route path={"/F"} element={<F_calc />} />
            <Route path={"/Max"} element={<Max_calc />}/>
            <Route path={"/Table"} element={<Equip_table />} />
            <Route path={"/Create"} element={<Create_equip />} />
            <Route path={"/Create/SelectEquip"} element={<Select_equip />} />
            <Route path={"/Create/DistributeEquip"} element={<Distribute_equip />} />
            <Route path={"/Create/ShowDistributionRes"} element={<Show_Distribution_Res />} />
            <Route path={"/Other"} element={<Other />}/>
          </Routes>
        </HashRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
