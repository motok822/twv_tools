import {load_event,history_event,mode_to_page,page_to_mode,change_query} from "./load_event.js"
var on_jump=false
export async function jump_page(index){
	console.log("Jump to ",index)
	while(true){
		if(!swiper.animating&&!on_jump){
			break
		}
		console.log("wait")
		await wait(20)
	}
	if(swiper.activeIndex==index){
		return
	}
	on_jump=true
	swiper.allowSlideNext=true
	swiper.allowSlidePrev=true
	swiper.slideTo(index,1500,false)
	wait(1500)
	load_event(swiper,index)
	on_jump=false
}

const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function irregular_jump(){
	console.log("irregular")
	while(true){
		if(!swiper.animating){
			break
		}
		await wait(20)
	}
	history.pushState(null,null,change_query(location.href,{mode:page_to_mode(0)}))
	load_event(swiper)
	history_event()
}