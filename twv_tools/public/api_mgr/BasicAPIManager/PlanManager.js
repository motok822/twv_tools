import {APIFunc} from "../APIFunc.js"



var DefaultPlanInfo={ID:3,Name:"雲取",FYear:2023,PlanType:"CLUB",PlanNum:"1",ReserveStart:new Date('2023-08-23T15:00:00.000Z'),ReserveEnd:new Date('2023-08-30T15:00:00.000Z'),ClimeStart:new Date('2023-08-23T15:00:00.000Z'),ClimeEnd:new Date('2023-08-30T15:00:00.000Z'),LastUpdate:new Date('2023-08-30T15:00:00.000Z'),Members:"3"}


class PlanManager {
	async GetOneYear(){//auth:user
		var oneyearpast=new Date()
		oneyearpast.setFullYear(((new Date()).getFullYear())-1)
		var oneyearfuture=new Date()
		oneyearfuture.setFullYear(((new Date()).getFullYear())+1)
		return this.GetByTime(oneyearpast,oneyearfuture)
	}
	async GetByTime(start,end){
		return ParsePlanInfo(await APIFunc("GetPlanByTime",{Start:start.toISOString(),End:end.toISOString()}))
	}
	async GetIndexofFYear(fyear){
		console.log("not implemented")
	}
	SortPlans(plans){
		var sorted=new Array()
		if(!(plans.length>0)){
			return sorted
		}
		sorted.push(plans[0])
		for(var i=1;i<plans.length;i++){
			var upper=i
			var lower=0
			while(upper!=lower){
				var test=Math.floor((upper+lower)/2)
				if(ComparePlans(plans[i],plans[test])){
					upper=test
				}else{
					lower=test+1
				}
			}
			sorted.splice(lower,0,plans[i])
		}
		return sorted
	}
}

function ComparePlans(a,b){//a<b -> True, a>b -> False
	var a_ct
	var b_ct
	if(a.ReserveStart!=null){
		a_ct=a.ReserveStart
	}else{
		if(a.ClimeStart!=null){
			a_ct=a.ClimeStart
		}else{
			if(a.ClimeEnd!=null){
				a_ct=a.ClimeEnd
			}else{
				if(a.ReserveEnd!=null){
					a_ct=a.ReserveEnd
				}else{
					if(a.LastUpdate==null){
						return null
					}
					a_ct=a.LastUpdate
				}
			}
		}
	}
	if(b.ReserveStart!=null){
		b_ct=b.ReserveStart
	}else{
		if(b.ClimeStart!=null){
			b_ct=b.ClimeStart
		}else{
			if(b.ClimeEnd!=null){
				b_ct=b.ClimeEnd
			}else{
				if(b.ReserveEnd!=null){
					b_ct=b.ReserveEnd
				}else{
					if(b.LastUpdate==null){
						return null
					}
					b_ct=b.LastUpdate
				}
			}
		}
	}
	if(a_ct.getTime()<b_ct.getTime()){
		return true
	}
	return false
}


function ParsePlanInfo(str){
	const arr=str.split(",")
	var infos=new Array()
	for(var i=0;i<arr.length;){
		var info={}
		info.ID=Number(arr[i++])
		info.Name=arr[i++]
		info.FYear=Number(arr[i++])
		info.PlanType=arr[i++]
		if (arr[i]=="") {
			info.PlanNum=null
			i++
		}else{
			info.PlanNum=Number(arr[i++])
		}
		if (arr[i]=="") {
			info.ReserveStart=null
			i++
		}else{
			info.ReserveStart=new Date(arr[i++])
		}
		if (arr[i]=="") {
			info.ReserveEnd=null
			i++
		}else{
			info.ReserveEnd=new Date(arr[i++])
		}
		if (arr[i]=="") {
			info.ClimeStart=null
			i++
		}else{
			info.ClimeStart=new Date(arr[i++])
		}
		if (arr[i]=="") {
			info.ClimeEnd=null
			i++
		}else{
			info.ClimeEnd=new Date(arr[i++])
		}
		info.LastUpdate=new Date(arr[i++])
		if (arr[i]=="") {
			info.Members=null
			i++
		}else{
			var temparr=arr[i++].split(";")
			info.Members=new Array()
			for(var v of temparr){
				info.Members.push(Number(v))
			}
		}
		infos.push(info)
	}
	return infos
}



export {PlanManager};