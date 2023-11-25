import {BasicAPIManager} from "./BasicAPIManager.js"
import {EquipMapManager} from "./AdvancedAPIManager/EquipMapManager.js"
import {EquipAuto} from "./AdvancedAPIManager/EquipAuto.js"

class AdvancedAPIManager {
	constructor(){
		this.BMgr=new BasicAPIManager()
		this.EquipMap=new EquipMapManager(this.BMgr)
		this.EquipAuto=new EquipAuto(this.BMgr)
	}
	
	
}


export {AdvancedAPIManager};