import {BasicAPIManager} from "./BasicAPIManager.js"
import {AdvancedAPIManager} from "./AdvancedAPIManager.js"


var BMgr=new BasicAPIManager()
var AMgr=new AdvancedAPIManager()

//console.log(await BMgr.User.GetUsers())
//console.log(await BMgr.EquipClass.GetAll())
//console.log(await BMgr.EquipInfo.GetOneYear())
//console.log(await BMgr.Plans.GetOneYear())
console.log(await AMgr.EquipMap.GetPlanMapOneYear())

var DefaultEquipInfo={ID:null,UserID:2,EquipID:7,Act:"MOVE",T1:new Date("2022-08-18 14:58:00"),T2:null,MoveDest:"temp",PlanID:2}
var DefaultEquipInfo2={ID:null,UserID:2,EquipID:8,Act:"MOVE",T1:new Date("2022-08-18 14:58:00"),T2:null,MoveDest:"temp",PlanID:2}
var arr=new Array()
arr.push(DefaultEquipInfo)
arr.push(DefaultEquipInfo2)
console.log(await BMgr.EquipInfo.RegisterInfos(arr))

console.log(await BMgr.EquipInfo.GetOneYear())
