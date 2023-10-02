
import {APIFunc} from "../APIFunc.js"


var DefaultEquipClass={ID:7,Group:"テント",Type:"７天",Family:"α"}

class EquipClassManager {
	async GetAll(){//auth:user
		var infos_raw=ParseEquipClass(await APIFunc("Equip_GetAll",{}))
		var haschild=new Array(infos_raw.length)
		haschild.fill(false)
		for(var i=0;i<infos_raw.length;i++){
			var k=infos_raw[i].ParentID
			if(k!=null){
				if(infos_raw[k].ID==k){
					haschild[k]=true
				}
				for(var j=0;j<infos_raw.length;j++){
					if(infos_raw[j].ID==k){
						haschild[j]=true
						break
					}
					if(j==infos_raw.length-1){
						console.log("Tree structure failed")
					}
				}
			}
		}
		var infos=new Array()
		for(var i=0;i<infos_raw.length;i++){
			if(haschild[i]){
				continue
			}
			var info={}
			var info_pr=null
			var info_gpr=null
			var info_ggpr=null
			if(infos_raw[i].ParentID!=null){
				var k=infos_raw[i].ParentID
				if(infos_raw[k].ID==k){
					info_pr=k
				}else{
					for(var j=0;j<infos_raw.length;j++){
						if(infos_raw[j].ID==k){
							info_pr=j
							break
						}
					}
				}
			}
			if(info_pr!=null&&infos_raw[info_pr].Name=="ROOT"){
				info_pr=null
			}
			if(info_pr!=null&&infos_raw[info_pr].ParentID!=null){
				k=infos_raw[info_pr].ParentID
				if(infos_raw[k].ID==k){
					info_gpr=k
				}else{
					for(var j=0;j<infos_raw.length;j++){
						if(infos_raw[j].ID==k){
							info_gpr=j
							break
						}
					}
				}
			}
			if(info_gpr!=null&&infos_raw[info_gpr].Name=="ROOT"){
				info_gpr=null
			}
			
			if(info_gpr!=null&&infos_raw[info_gpr].ParentID!=null){
				k=infos_raw[info_gpr].ParentID
				if(infos_raw[k].ID==k){
					info_ggpr=k
				}else{
					for(var j=0;j<infos_raw.length;j++){
						if(infos_raw[j].ID==k){
							info_ggpr=j
							break
						}
					}
				}
			}
			if(info_ggpr!=null&&infos_raw[info_ggpr].Name=="ROOT"){
				info_ggpr=null
			}
			
			if(info_ggpr!=null){
				info.Group=infos_raw[info_ggpr].Name
				info.Type=infos_raw[info_gpr].Name
				info.Family=infos_raw[info_pr].Name
			}else{
				if(info_gpr!=null){
					info.Group=infos_raw[info_gpr].Name
					info.Family=infos_raw[info_pr].Name
				}else{
					if(info_pr!=null){
						info.Group=infos_raw[info_pr].Name
					}
				}
			}
			info.Name=infos_raw[i].Name
			info.ID=infos_raw[i].ID
			infos.push(info)
		}
		return infos
	}
	
	
}

function ParseEquipClass(str){
	const arr=str.split(",")
	var infos=new Array()
	for(var i=0;i< arr.length;) {
    infos.push({})
    var v=i/3
    infos[v].ID=Number(arr[i++])
    if(arr[i]=="") {
        infos[v].ParentID=null
        i++
    }else{
        infos[v].ParentID=Number(arr[i++])
    }
    infos[v].Name=arr[i++]
    
	}
	return infos
}



export {EquipClassManager};