async function func(funcname,arg){
	const response = await fetch("/func/"+funcname,{method:"POST",body:JSON.stringify(arg)})
	return response.json()
	.catch((val)=>{return val})
}

export {func};