import {APIFunc} from "../APIFunc.js"


var TestMembers={Members:[4,5,6,7],E:[4],F:[4],W:[5],H:[5],L:[6]}
var TestEquips=[
{id:0,kind:"L装",Weight:2500,Priority:2},//水含む
{id:1,kind:"E装",Weight:500,Priority:2},
{id:2,kind:"F装",Weight:700,Priority:2},
{id:3,kind:"W装",Weight:200,Priority:2},
{id:4,kind:"H装",Weight:400,Priority:2},
{id:5,kind:"小缶"},
{id:6,kind:"大缶"},
{id:7,kind:"7天本体",Weight:1500,Priority:0},
{id:8,kind:"7天ポール",Weight:700,Priority:0},
{id:9,kind:"7天フライ",Weight:1300,Priority:1},
{id:10,kind:"コッヘル特大",Weight:700,Priority:-1},
{id:10,kind:"コッヘル大",Weight:450,Priority:-1},

]
/*
kind:"L装","E装","H装","W装","F装"は特殊な扱いを受けます,"小缶","大缶"も同様に特殊な扱いを受けます,それ以外は大して変わらないので"7天フライ"でも"フライ"でも大して変わらないです
Weight:重さです,EquipClassにあるものは、そのまま使えばよく、ないものは勝手に設定してください。"小缶","大缶"は設定しないと、400g,700gに勝手に設定します、設定しないと0になります
Priority:-1:下級生優先,0:特になし,1:上級生,2:係にふる、EquipClassにあるものは、そのまま使えばよく、ないものは勝手に設定してください。設定しないと0になります
*/




class EquipAuto {
	constructor(BMgr){
		this.BMgr=BMgr
	}
	async Alloc(){
		
	}
}
	
export {EquipAuto};