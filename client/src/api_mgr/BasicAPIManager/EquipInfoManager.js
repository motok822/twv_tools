import {APIFunc,APIFuncRaw} from "../APIFunc.js"


var DefaultEquipInfo={ID:3,UserID:2,EquipID:7,Act:"MOVE",T1:new Date("2022-08-18 14:58:00"),T2:null,MoveDest:"本郷部室",PlanID:30}

class EquipInfoManager {
	async GetOneYear(){//auth:user
		var oneyearpast=new Date()
		oneyearpast.setFullYear(((new Date()).getFullYear())-1)
		var oneyearfuture=new Date()
		oneyearfuture.setFullYear(((new Date()).getFullYear())+1)
		return this.GetByTime(oneyearpast,oneyearfuture)
	}
	async GetByTime(start,end){
		return ParseEquipInfo(await APIFunc("GetEquipByTime",{Start:start.toISOString(),End:end.toISOString()}))
	}
	async RegisterInfos(infos){
		var str=""
		for(var v of infos){
			str=str+UnParseEquipInfo(v)
		}
		if(str!=""){
			str=str.slice(0,str.length-1)
		}
		return await APIFuncRaw("Equip_RegisterInfos",str)
	}
}



function UnParseEquipInfo(info){
	var str=""
	if(info.ID==null){
		str=str+","
	}else{
		str=str+info.ID+","
	}
	str=str+info.UserID+","+info.EquipID+","+info.Act+","+info.T1.toISOString()+","
	if(info.T2==null){
		str=str+","
	}else{
		str=str+info.T2.toISOString()+","
	}
	if(info.MoveDest==null){
		str=str+","
	}else{
		str=str+info.MoveDest+","
	}
	if(info.PlanID==null){
		str=str+","
	}else{
		str=str+info.PlanID+","
	}
	return str	
}


function ParseEquipInfo(str){
	const arr=str.split(",")
	var info=new Array()
	for(var i=0;i< arr.length;) {
    info.push({})
    var v=i/8
    info[v].ID=Number(arr[i++])
    info[v].UserID=Number(arr[i++])
    info[v].EquipID=Number(arr[i++])
    info[v].Act=arr[i++]
    info[v].T1=new Date(arr[i++])
    if (arr[i]=="") {
        info[v].T2=null
        i++
    }else{
        info[v].T2=new Date(arr[i++])
    }
    if (arr[i]=="") {
        info[v].MoveDest=null
        i++
    }else{
        info[v].MoveDest=arr[i++]
    }
    if (arr[i]=="") {
        info[v].PlanID=null
        i++
    }else{
        info[v].PlanID=Number(arr[i++])
    }
	}
	return info
}



export {EquipInfoManager};
