
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
function ParsePlanMap(rows, EquipTemplate, PlanMap) {
    let EquipID = []
    let res = [];
    for (let i = 0; i < EquipTemplate.length; i++) {
        for (let j = 0; j < PlanMap.equipclass.length; j++) {
            if (PlanMap.equipclass[j].Group == EquipTemplate[i].Group &&
                PlanMap.equipclass[j].Type == EquipTemplate[i].Type &&
                PlanMap.equipclass[j].Family == EquipTemplate[i].Family &&
                PlanMap.equipclass[j].Name == EquipTemplate[i].Name
            ) {
                EquipID = [...EquipID, j]
            }
        }
    }
    EquipID.sort(function (first, second) {
        if (first > second) {
            return 1;
        } else if (first < second) {
            return -1;
        } else {
            return 0;
        }
    });
    for (let i = 0; i < PlanMap.planmap[0].length; i++) {
        let nextRow = EquipTemplate.map((obj) => Object.assign({}, obj))
        res = [...res, nextRow]
    }
    for (let j = 0; j < PlanMap.planmap[EquipID[0]].length; j++) {
        res[j][0].value = PlanMap.plans[j].ID
        res[j][1].value = PlanMap.plans[j].Name
    }
    for (let i = 0; i < EquipID.length; i++) {    //Equip
        for (let j = 0; j < PlanMap.planmap[EquipID[i]].length; j++) {  //planの個数
            res[j][i + 2].ID = PlanMap.planmap[EquipID[i]][j].EquipID
            if (PlanMap.planmap[EquipID[i]][j].MoveDest == "本郷") {
                res[j][i + 2].state = Hongou                         //山行のカラムがあるので+2
            } else if (PlanMap.planmap[EquipID[i]][j].MoveDest == "駒場") {
                res[j][i + 2].state = Komaba
            } else if (PlanMap.planmap[EquipID[i]][j].MoveDest == "予約") {
                res[j][i + 2].state = Reserved
            } else {
                res[j][i + 2].state = NotReserved
            }
        }
    }
    rows = [rows[0], ...res]
    // rows.reverse()
    return rows
}
export { ParsePlanMap }