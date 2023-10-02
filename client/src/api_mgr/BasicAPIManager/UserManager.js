import {APIFunc} from "../APIFunc.js"


var DefaultUserInfo={ID:0,UserName:"Guest",FamilyName:"Guest",FirstName:"",Grade:-1,Belong:"無所属",Sex:"Male",Birth:new Date('1999-12-31T15:00:00.000Z')}


class UserManager {
	async GetAll(){//auth:admin
		console.log("not implemented")
	}
	async GetGroup(){//auth:admin
		console.log("not implemented")
	}
	async GetUsers(){//auth:user
		return ParseUserInfo(await APIFunc("User_GetUsers",{}))
	}
	
	
}

function ParseUserInfo(str){
	const arr=str.split(",")
	var infos=new Array()
	for(var i=0;i<arr.length;){
		var info={}
		info.ID=Number(arr[i++])
		info.UserName=arr[i++]
		info.FamilyName=arr[i++]
		info.FirstName=arr[i++]
		if (arr[i]=="") {
			info.Grade=-1
			i++
		}else{
			info.Grade=Number(arr[i++])
		}
		info.Belong=arr[i++]
		info.Sex=arr[i++]
		if (arr[i]=="") {
			info.Birth=null
			i++
		}else{
			info.Birth=new Date(arr[i++])
		}
		infos.push(info)
	}
	return infos
}



export {UserManager};