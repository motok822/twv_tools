import func from "./RegisterFunc.js"
//Please Login First

function GetEquipTree(){
	var Result=new Array()
	func("GetEquipTree",{}).then((data)=>{ResultStr=data
	const arr=ResultStr.split(",")
	for(i=0;i< arr.length;) {
			Result.push({})
			v=i/3
			Result[v].ID=Number(arr[i++])
			if (arr[i]=="") {
					Result[v].ParentID=null
					i++
			}else{
					Result[v].ParentID=Number(arr[i++])
			}
			Result[v].Name=arr[i++]
			
	}
	})
	return Result
}
	
	

export {GetEquipTree};