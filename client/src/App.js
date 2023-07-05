import './App.css';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Max_calc from './components/Max/Max_calc';
import Return_equip from './components/Return/Return_equip';
import {Equip_table} from './components/Table/Equip_table';
import Modify_equip from './components/Modify/Modify_equip';
import Other from './components/Other/Other';
import F_calc from './components/F/F_calc';
import Create_equip from './components/Create/Create_equip';
import React from 'react'
import Select_equip from './components/Create/Select_equip';
import Distribute_equip from './components/Create/Distribute_equip';


function App() {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
            <Route path={"/"} element={<Home/>} />
            <Route path={"/F"} element={<F_calc/>} />
            <Route path={"/Max"} element={<Max_calc/>} />
            <Route path={"/Table"} element={<Equip_table/>} />
            <Route path={"/Create"} element={<Create_equip/>} />
            <Route path={"/Create/SelectEquip"} element={<Select_equip/>}/>
            <Route path={"/Create/DistributeEquip"} element={<Distribute_equip/>}/>
            <Route path={"/Other"} element={<Other/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
