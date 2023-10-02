async function APIFunc(funcname,arg){
	const response = await fetch("/func/"+funcname,{method:"POST",body:JSON.stringify(arg)})
	return response.json()
	.catch((val)=>{return val})
}
async function APIFuncRaw(funcname,arg){
	const response = await fetch("/func/"+funcname,{method:"POST",body:arg})
	return response.json()
	.catch((val)=>{return val})
}


export {APIFunc,APIFuncRaw};