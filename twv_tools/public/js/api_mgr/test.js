import {BasicAPIManager} from "./BasicAPIManager.js"
import {AdvancedAPIManager} from "./AdvancedAPIManager.js"


var BMgr=new BasicAPIManager()
var AMgr=new AdvancedAPIManager()

//console.log(await BMgr.User.GetUsers())
//console.log(await BMgr.User.GetMyUserInfo())
console.log(await BMgr.EquipClass.GetAll())
//console.log(await BMgr.EquipInfo.GetOneYear())
//console.log(await BMgr.Plans.GetOneYear())
//console.log(await AMgr.EquipMap.GetPlanMapOneYear())
/*
var DefaultEquipInfo={ID:null,UserID:2,EquipID:7,Act:"RESERVE",T1:new Date("2023-08-18 14:58:00"),T2:new Date("2023-09-18 14:58:00"),MoveDest:"",PlanID:2}
//var DefaultEquipInfo2={ID:null,UserID:2,EquipID:8,Act:"MOVE",T1:new Date("2022-08-18 14:58:00"),T2:null,MoveDest:"temp",PlanID:2}
var arr=new Array()
arr.push(DefaultEquipInfo)
//arr.push(DefaultEquipInfo2)
console.log(await BMgr.EquipInfo.RegisterInfos(arr))
*/

//console.log(await BMgr.EquipInfo.GetOneYear())
//console.log(await AMgr.EquipMap.GetPlanMapOneYear())

var TempInfo={ID:null,UserName:"TestADD",Password:"testpass",FamilyName:"Guest",FirstName:"",Grade:-1,Belong:"なし",Sex:"Male",Birth:new Date('1999-12-31T15:00:00.000Z')}
var DefaultPlanInfo={ID:null,Name:"雲取",FYear:2023,PlanType:"CLUB",PlanNum:1,ReserveStart:new Date('2023-08-23T15:00:00.000Z'),ReserveEnd:new Date('2023-08-30T15:00:00.000Z'),ClimeStart:new Date('2023-08-23T15:00:00.000Z'),ClimeEnd:new Date('2023-08-30T15:00:00.000Z'),LastUpdate:new Date('2023-08-30T15:00:00.000Z'),Members:[3]}

//console.log(JSON.stringify(DefaultPlanInfo))
//console.log(await BMgr.Plans.Update(DefaultPlanInfo))
//console.log(await BMgr.Plans.GetOneYear())
//console.log(await BMgr.User.DeleteUserInfo("TestADD"));
//console.log(await BMgr.User.Logout())
