import {UserManager} from "./BasicAPIManager/UserManager.js"
import {EquipInfoManager} from "./BasicAPIManager/EquipInfoManager.js"
import {EquipClassManager} from "./BasicAPIManager/EquipClassManager.js"
import {PlanManager} from "./BasicAPIManager/PlanManager.js"


class BasicAPIManager {
	constructor(){
		this.User = new UserManager()
		this.EquipInfo = new EquipInfoManager()
		this.EquipClass = new EquipClassManager()
		this.Plans = new PlanManager()
	}
	
	
}


export {BasicAPIManager};