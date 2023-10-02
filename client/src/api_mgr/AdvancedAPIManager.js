import {BasicAPIManager} from "./BasicAPIManager.js"
import {EquipMapManager} from "./AdvancedAPIManager/EquipMapManager.js"

class AdvancedAPIManager {
	constructor(){
		this.BMgr=new BasicAPIManager()
		this.EquipMap=new EquipMapManager(this.BMgr)
	}
	
	
}


export {AdvancedAPIManager};