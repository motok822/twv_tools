function change_length(e){
	let target=document.getElementById(e.target.id)
	let fontsize=window.getComputedStyle(target).fontSize
	target.style.width=(fontsize.slice(0,fontsize.length-2)*0.5*(e.target.value.length+6))+"px";
}
function display_box_next(e){
	if(document.getElementById(e.target.id+"_next").style.display==""){
		document.getElementById(e.target.id+"_next").style.display="block";
		e.target.value=""
		change_length(e)
	}			
}
function check_string_box(e){
	let str=e.target.value
	let valid=check_string(str)
	
	if(!valid){
		document.getElementById(e.target.id+"_warning").textContent ="Only alphabets, numbers and underbar is allowed";
		document.getElementById(e.target.id).style.border="3px solid rgb(217,48,37)";
		return false;
	}else{
		document.getElementById(e.target.id+"_warning").textContent ="";
		document.getElementById(e.target.id).style.border="";
	}
	return true;
}
function check_string(str){
	for (let i = 0; i < str.length; i++) {
		if(str[i].match(/[^a-zA-Z0-9_]/)){
			return false
			break
		}
	}
	return true
}