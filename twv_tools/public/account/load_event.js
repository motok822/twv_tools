import {BasicAPIManager} from "../js/api_mgr/BasicAPIManager.js"
import {AdvancedAPIManager} from "../js/api_mgr/AdvancedAPIManager.js"
import {jump_page} from "./jump_page.js"

var BMgr=new BasicAPIManager()
var AMgr=new AdvancedAPIManager()



export function load_event(swiper){
	let page=swiper.realIndex
	document.getElementById("swiper_button_next").style.display="none";
	document.getElementById("swiper_button_prev").style.display="none";
	swiper.allowTouchMove=false
	let purpose=(new URL(location.href)).searchParams.get("mode")
	switch(page){
		case mode_to_page("nothing"):
			let myinfo=BMgr.User.GetMyUserInfo()
			if(myinfo.ID==0){
				jump_page(mode_to_page("login_username"))
			}	
			break;
		case mode_to_page("login_username"):
			break
		case mode_to_page("login_password"):
			swiper.allowSlideNext=false
			swiper.allowTouchMove=true
			document.getElementById("swiper_button_prev").style.display="flex";
			break;
	}
}

const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
export async function history_event(){
	console.log(location.href)
	var mode=((new URL(location.href)).searchParams.get("mode"))
	let userinfo
	switch(mode){
		case null:
		case "nothing":
			await jump_page(mode_to_page("nothing"))
			userinfo=await BMgr.User.GetMyUserInfo()
			if(userinfo.ID==0){
				let currentURL=new URL(location.href)
				history.replaceState(null,null,change_query(currentURL.href,{mode:"login_username"}))
				history_event()
			}else{
				let redirectURI=((new URL(location.href)).searchParams.get("RedirectURI"))
				let origin=(new URL(location.href)).origin
				if(redirectURI!=null){
					location.replace(origin+redirectURI)
				}else{
					location.replace(origin+"/dist/index.html")
				}
			}
			break
		case "login_username":
			await jump_page(mode_to_page("login_username"))
			break
		case "login_password":
			await jump_page(mode_to_page("login_password"))
			let username=((new URL(location.href)).searchParams.get("username"))
			if(username==null){
				let currentURL=new URL(location.href)
				history.replaceState(null,null,change_query(currentURL.href,{mode:"login_username"}))
				document.getElementById("login_username_warning").textContent=""
				history_event()
			}
			document.getElementById("login_password_title_text").textContent=username
			break
		case "login_try":
			userinfo=await BMgr.User.GetMyUserInfo()
			if(userinfo.ID!=0){
				let currentURL=new URL(location.href)
				history.replaceState(null,null,change_query(currentURL.href,{mode:"nothing"}))
				history_event();
			}
			await BMgr.User.Login(document.getElementById("login_password_title_text").textContent,document.getElementById("login_password").value)
			userinfo=await BMgr.User.GetMyUserInfo()
			if(userinfo.ID!=0){
				let redirectURI=((new URL(location.href)).searchParams.get("RedirectURI"))
				let origin=(new URL(location.href)).origin
				if(redirectURI!=null){
					location.replace(origin+redirectURI)
				}else{
					location.replace(origin+"/dist/index.html")
				}
			}else{
				let currentURL=new URL(location.href)
				document.getElementById("login_password_warning").textContent="username or password is incorrect"
				history.replaceState(null,null,change_query(currentURL.href,{mode:"login_password"}))
				history_event()
			}
			break
	}
}

export function mode_to_page(str){
	switch(str){
		case "nothing":
			return 2;
		case "login":
		case "login_username":
			return 0;
		case "login_password":
			return 1;
		case "register":
			return 3;
		case "unauthorized":
			return 4;
	}
	return 2;
}
export function page_to_mode(num){
	switch(num){
		case 2:
			return "nothing";
		case 0:
			return "login_username";
		case 1:
			return "login_password";
		case 3:
			return "register";
		case 4:
			return "unauthorized";
	}
	return "nothing";
}
function get_query_params(search){
	const params = new URLSearchParams(search);
	let paramObj = {};
	for(var value of params.keys()) {
		paramObj[value] = params.get(value);
	}
	return paramObj
}
export function change_query(url,query){
	let old_URL=new URL(url)
	let params=get_query_params(old_URL.search)
	for(const p in query){
		params[p]=query[p]
	}
	let query_str=(new URLSearchParams(params).toString())
	if(query_str!=""){
		old_URL.search="?"+query_str;
	}else{
		old_URL.search=""
	}
	return old_URL.href
	//history.pushState(null,null,old_URL.href)	
}