import func from "./RegisterFunc.js"

function GetEquipByTime(StartTime,EndTime){
	//Please Login First
	var ResultStr=""
	v={Start:StartTime.toISOString(),End:EndTime.toISOString()}
	var Result=new Array()
	func("GetEquipByTime",v).then((data)=>{ResultStr=data
	const arr=ResultStr.split(",")
	for(i=0;i< arr.length;) {
			Result.push({})
			v=i/8
			Result[v].ID=Number(arr[i++])
			Result[v].UserID=Number(arr[i++])
			Result[v].EquipID=Number(arr[i++])
			Result[v].Act=arr[i++]
			Result[v].T1=new Date(arr[i++])
			if (arr[i]=="") {
					Result[v].T2=null
					i++
			}else{
					Result[v].T2=new Date(arr[i++])
			}
			if (arr[i]=="") {
					Result[v].MoveDest=null
					i++
			}else{
					Result[v].MoveDest=arr[i++]
			}
			if (arr[i]=="") {
					Result[v].PlanID=null
					i++
			}else{
					Result[v].PlanID=Number(arr[i++])
			}
	}
	})
	return Result
}
export {GetEquipByTime};