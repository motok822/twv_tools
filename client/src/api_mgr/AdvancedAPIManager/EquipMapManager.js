import {APIFunc} from "../APIFunc.js"


var NullEquipID={ID:0,UserID:0,EquipID:0,Act:"NULL",T1:null,T2:null,MoveDest:"",PlanID:0}


class EquipMapManager {
	constructor(BMgr){
		this.BMgr=BMgr
	}
	async GetPlanMapOneYear(){
		var oneyearpast=new Date()
		oneyearpast.setFullYear(((new Date()).getFullYear())-1)
		var oneyearfuture=new Date()
		oneyearfuture.setFullYear(((new Date()).getFullYear())+1)
		return await this.GetPlanMap(oneyearpast,oneyearfuture)
	}
	async GetPlanMap(start,end){//auth:user
		var equipclass=await this.BMgr.EquipClass.GetAll()
		var plans=this.BMgr.Plans.SortPlans(await this.BMgr.Plans.GetOneYear())
		var infos=await this.BMgr.EquipInfo.GetByTime(start,end)
		var planmap=new Array(equipclass.length)
		for(var i=0;i<equipclass.length;i++){
			planmap[i]=new Array(plans.length)
			let temp=Object.assign({},NullEquipID);
			temp.EquipID=equipclass[i].ID;
			for(var j=0;j<plans.length;j++){
				planmap[i][j]=temp;	
			}
		}
		for(const v of infos){
			var i=0;
			for(;i<equipclass.length;i++){
				if(v.EquipID==equipclass[i].ID){
					break
				}
			}
			if(i==equipclass.length){
				continue
			}
			var j=0
			for(;j<plans.length;j++){
				if(v.PlanID==plans[j].ID){
					break
				}
			}
			if(j==plans.length){
				continue
			}
			if(planmap[i][j]==null||planmap[i][j].Act=="NULL"){
				planmap[i][j]=v
			}else{
				if(planmap[i][j].Act=="RESERVE"&&v.Act=="MOVE"){
					planmap[i][j]=v
					continue
				}
				if(planmap[i][j].Act=="MOVE"&&v.Act=="RESERVE"){
					continue
				}
				if(planmap[i][j].Act=="RESERVE"&&v.Act=="RESERVE"){
					if(planmap[i][j].T1.getTime()<v.T1.getTime()){
						planmap[i][j]=v
					}
					continue
				}
				if(planmap[i][j].Act=="MOVE"&&v.Act=="MOVE"){
					if(planmap[i][j].T1.getTime()<v.T1.getTime()){
						planmap[i][j]=v
					}
					continue
				}
			}
		}
		return {equipclass,plans,planmap}
	}
}


function WhereIsIt(EquipInfoList,EquipList){
	for(const v of EquipList){
		if(v.Act=="RESERVE"){
			if(v.T1.getTime()>new Date().getTime()){
				continue
			}
		}
		for(var u of EquipList){
			if(u.ID==v.EquipID){
				if(u.LastUpdate==null){
					u.LastUpdate=v
				}else{
					if(v.T1.getTime()>u.LastUpdate.T1.getTime()){
						u.LastUpdate=v
					}
				}
			}
		}
	}
	
}

export {EquipMapManager};