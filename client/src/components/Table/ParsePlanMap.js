
const Reserved = 0;
const Komaba = 1;
const Hongou = 2;
const NotReserved = 3;
/*
const EquipTemplate =
  [{ Group: "", Type: '', Family: "", Name: "山行ID", state: Reserved, last: 1, value: "0", ID: 0 },
  { Group: "", Type: '', Family: "", Name: "山行名", state: Reserved, last: 1, value: "サンプル", ID: 0 },
  { Group: "テント", Type: "7天", Family: "α", Name: "本体", state: Hongou, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "α", Name: "ポール", state: Hongou, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "α", Name: "フライ", state: Hongou, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "β", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "β", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "β", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "γ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "γ", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "γ", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "δ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "δ", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "7天", Family: "δ", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "α", Name: "本体", state: Hongou, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "α", Name: "ポール", state: Hongou, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "α", Name: "フライ", state: Hongou, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "β", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "β", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "β", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "γ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "γ", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "γ", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "δ", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "δ", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "δ", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "ε", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "ε", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "45天", Family: "ε", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "6天", Family: "α", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "6天", Family: "α", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "6天", Family: "α", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "6天", Family: "β", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "6天", Family: "β", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "6天", Family: "β", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },
  { Group: "テント", Type: "12天", Family: "α", Name: "本体", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "12天", Family: "α", Name: "ポール", state: NotReserved, last: 0, value: "", ID: 0 },
  { Group: "テント", Type: "12天", Family: "α", Name: "フライ", state: NotReserved, last: 1, value: "", ID: 0 },];
  {ID: 1, UserID: 3, EquipID: 5, Act: 'MOVE', T1: Fri Oct 06 2023 19:47:41 GMT+0900 (Japan Standard Time)
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