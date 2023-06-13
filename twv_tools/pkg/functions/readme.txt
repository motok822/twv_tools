//関数の呼び出し方

async function func(funcname,arg){
	fetch("/func/"+funcname,{method:"POST",body:JSON.stringify(arg)})
	.then((res) => {
		console.log(res)
		if (!res.ok) {
				throw new Error(`${res.status} ${res.statusText}`);
		}
		return res.blob();
	})
	.then((blob) => {
		console.log(blob)
		const obj = JSON.parse(blob)
		return obj
	})
	.catch((reason) => {
			console.log(reason);
			return {error:"func js failed"}
	});
}

func("name_of_function",argument)
で関数を呼び出せる

//Login:"Login"
argument={Username:"username",Password:"password",ATA:bool}
ATAはtrueかfalseを指定、ATAがtrueだと、Stay Logged Inが指定され、Sessionが切れても自動でLoginする

//UploadRaw:"UploadRaw?Dest=/dest"
Dest=... の部分に、uploadする先を決めて、Argumentにbyteでファイルのデータを入れる

//ATA_Login

//ATA_Set
