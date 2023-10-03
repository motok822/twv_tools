
const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;
/*
const EquipTemplate =
  [{ Group: "", Family: "", name: "山行", state: NotReserved, last: 1, value: "0" },
  { Group: "7天", Family: "α", name: "本体", state: Hongou, last: 0, value: "加茂" },
  { Group: "7天", Family: "α", name: "フライ", state: Hongou, last: 0, value: "加茂" },
  { Group: "7天", Family: "α", name: "ポール", state: Hongou, last: 1, value: "加茂" },
  { Group: "7天", Family: "β", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "7天", Family: "β", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "7天", Family: "β", name: "ポール", state: NotReserved, last: 1, value: "" },
  { Group: "7天", Family: "γ", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "7天", Family: "γ", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "7天", Family: "γ", name: "ポール", state: NotReserved, last: 1, value: "" },
  { Group: "7天", Family: "δ", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "7天", Family: "δ", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "7天", Family: "δ", name: "ポール", state: NotReserved, last: 1, value: "" },
  { Group: "45天", Family: "α", name: "本体", state: Hongou, last: 0, value: "加茂" },
  { Group: "45天", Family: "α", name: "フライ", state: Hongou, last: 0, value: "加茂" },
  { Group: "45天", Family: "α", name: "ポール", state: Hongou, last: 1, value: "加茂" },
  { Group: "45天", Family: "β", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "45天", Family: "β", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "45天", Family: "β", name: "ポール", state: NotReserved, last: 1, value: "" },
  { Group: "45天", Family: "γ", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "45天", Family: "γ", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "45天", Family: "γ", name: "ポール", state: NotReserved, last: 1, value: "" },
  { Group: "45天", Family: "δ", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "45天", Family: "δ", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "45天", Family: "δ", name: "ポール", state: NotReserved, last: 1, value: "" },
  { Group: "45天", Family: "ε", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "45天", Family: "ε", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "45天", Family: "ε", name: "ポール", state: NotReserved, last: 1, value: "" },
  { Group: "6天", Family: "α", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "6天", Family: "α", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "6天", Family: "α", name: "ポール", state: NotReserved, last: 1, value: "" },
  { Group: "6天", Family: "β", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "6天", Family: "β", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "6天", Family: "β", name: "ポール", state: NotReserved, last: 1, value: "" },
  { Group: "12天", Family: "α", name: "本体", state: NotReserved, last: 0, value: "" },
  { Group: "12天", Family: "α", name: "フライ", state: NotReserved, last: 0, value: "" },
  { Group: "12天", Family: "α", name: "ポール", state: NotReserved, last: 1, value: "" },];
*/
function ParsePlanMap(rows, EquipTemplate, PlanMap){
    let EquipId = []
    let res= [];
    for(let i = 0;i < EquipTemplate.length;i++){
        for(let j = 0;j < PlanMap.equipclass.length;j++){
            if(PlanMap.equipclass[j].Group == EquipTemplate[i].Group &&
                PlanMap.equipclass[j].Family == EquipTemplate[i].Family &&
                   PlanMap.equipclass[j].Name == EquipTemplate[i].Name 
                ){
                EquipId = [...EquipId, j]
            } 
        }
    }
    EquipId.sort()
    for(let i = 0;i < PlanMap.planmap[0].length;i++){
        let nextRow = EquipTemplate.map((obj) => Object.assign({}, obj))
        res = [...res, nextRow]
    }
    for(let j = 0;j < PlanMap.planmap[EquipId[0]].length; j++){
        res[j][0].value = PlanMap.plans[j].ID
    }
    for(let i = 0;i < EquipId.length;i++){
        for(let j = 0;j < PlanMap.planmap[EquipId[i]].length; j++){
            if(PlanMap.planmap[EquipId[i]][j].MoveDest == "本郷"){  
                res[j][i+1].state = Hongou                         //山行のカラムがあるので+1
            }else if(PlanMap.planmap[EquipId[i]][j].MoveDest == "駒場"){
                res[j][i+1].state = Komaba 
            }else if(PlanMap.planmap[EquipId[i]][j].MoveDest == "予約"){
                res[j][i+1].state = Reserved
            }else{
                res[j][i+1].state = NotReserved
            }
        }
    }
    rows = [rows[0], ...res]
    rows.reverse()
    return rows
}
export {ParsePlanMap}