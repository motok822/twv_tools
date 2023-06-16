import {func} from "./RegisterFunc.js" 

async function Login(){
    let v={Username:"Admin",Password:"Makihata23"}
    func("Login",v).then((data)=>{console.log(data)})
}
	
export {Login};