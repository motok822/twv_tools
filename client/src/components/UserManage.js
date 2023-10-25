import { BasicAPIManager } from "../api_mgr/BasicAPIManager";

async function ShowUser() {
    var BMgr = new BasicAPIManager()
    const res = await BMgr.User.GetUsers()
    console.log("show User",res)
    return res
}
export{ShowUser}
