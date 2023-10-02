//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//equip.go

package sql_list

import (
	"database/sql"
	_ "log"
	_ "strings"
	_ "fmt"
	"errors"
	_ "math/rand"
	"time"
	
)

func newequipinfos(sqllist *sql_list) *equipinfos{
	var infos equipinfos
	infos.sqllist=sqllist
	return &infos
}


type equipinfos struct {
	sqllist *sql_list
}

func (infos *equipinfos) Update(info EquipInfo) error{
	tablename,err:=infos.sqllist.Table().Get("/system/EQUIP/EQUIP_INFO_INDEX")
	if err != nil {
		return err
	}
	stmtIns,err:=infos.sqllist.database.Prepare(
	"INSERT into "+tablename+
	" (ID,UserID,EquipID,Act,T1,T2,MoveDest,PlanID) VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE ID = VALUES(ID),UserID = VALUES(UserID),EquipID = VALUES(EquipID),Act = VALUES(Act),T1 = VALUES(T1),T2 = VALUES(T2),MoveDest = VALUES(MoveDest),PlanID = VALUES(PlanID);" )
	if err != nil {
		return err
	}
	defer stmtIns.Close()	
	stmtIns2,err:=infos.sqllist.database.Prepare(
	"DELETE FROM "+tablename+" WHERE ID=?;" )
	if err != nil {
		return err
	}
	defer stmtIns2.Close()
	var infoID sql.NullInt64
	if info.ID<=0 {
		infoID.Valid=false
	}else{
		infoID.Valid=true
		infoID.Int64=int64(info.ID)
	}
	switch(info.Act){
	case "DELETE":
		_, err = stmtIns2.Exec(info.ID)
		if err!=nil {
			return err
		}
		break
	case "MOVE":
		fallthrough
	case "RESERVE":
		_, err = stmtIns.Exec(infoID,info.UserID,info.EquipID,info.Act,info.T1,info.T2,info.MoveDest,info.PlanID)
		if err!=nil {
			return err
		}
		break
	}
	return nil
}

func (infos *equipinfos) Pull(start time.Time,end time.Time) ([]*EquipInfo,error){
	lists:=make([]*EquipInfo,0,100)
	tablename,err:=infos.sqllist.Table().Get("/system/EQUIP/EQUIP_INFO_INDEX")
	if err != nil {
		return lists,err
	}
	rows, err := infos.sqllist.database.Query("SELECT ID,UserID,EquipID,Act,T1,T2,MoveDest,PlanID FROM "+tablename +" WHERE (? < T2 AND T1< ?)",start,end)
	if err != nil {
		return lists,err
	}
	defer rows.Close()
	for rows.Next() {
		var info EquipInfo
		err := rows.Scan(&info.ID,&info.UserID,&info.EquipID,&info.Act,&info.T1,&info.T2,&info.MoveDest,&info.PlanID)
		if err != nil {
		return lists,err
		}
		lists=append(lists,&info)
	}
	err = rows.Err()
	if err != nil {
		return lists,err
	}
	lasts,err:=infos.pulllast()
	if err != nil {
		return lists,err
	}
	var update bool
	for _,v:=range lasts {
	update=true
		for _,w := range lists {
			if w.ID==v.ID {
				update=false
			}
		}
		if update {
			lists=append(lists,v)
		}
	}
	return lists,nil
}


func (infos *equipinfos) pulllast() ([]*EquipInfo,error){
	lists:=make([]*EquipInfo,0,100)
	tablename,err:=infos.sqllist.Table().Get("/system/EQUIP/EQUIP_INFO_INDEX")
	if err != nil {
		return lists,err
	}
	rows, err :=infos.sqllist.database.Query("SELECT ID,UserID,EquipID,Act,T1,T2,MoveDest,PlanID FROM "+tablename +" WHERE T1=(SELECT MAX(T1) FROM "+tablename+" AS us WHERE "+tablename+".UserID = us.UserID)")
	if err != nil {
		return lists,err
	}
	defer rows.Close()
	for rows.Next() {
		var info EquipInfo
		err := rows.Scan(&info.ID,&info.UserID,&info.EquipID,&info.Act,&info.T1,&info.T2,&info.MoveDest,&info.PlanID)
		if err != nil {
			return lists,err
		}
		lists=append(lists,&info)
	}
	err = rows.Err()
	if err != nil {
		return lists,err
	}
	return lists,nil
}

func newequipclasses(sqllist *sql_list) *equipclasses{
	var classes equipclasses
	classes.sqllist=sqllist
	return &classes
}


type equipclasses struct {
	sqllist *sql_list
}

func (classes *equipclasses) Push(list []EquipClass) error {
	for i,v:= range list {
		if v.ID!=int64(i) {
			return errors.New("ID not match")
		}
	}
	tablename,err:=classes.sqllist.Table().Get("/system/EQUIP/EQUIP_CLASS_INDEX")
	if err != nil {
		return err
	}
	_,err=classes.sqllist.database.Exec("DELETE FROM "+tablename)
	if err != nil {
		return err
	}
	stmtIns,err:=classes.sqllist.database.Prepare(
	"INSERT into "+tablename+
	" (ID,ParentID,Name) VALUES (?,?,?);" )
	if err != nil {
		return err
	}
	defer stmtIns.Close()	
	for _,v:=range list{
		_, err = stmtIns.Exec(v.ID,v.ParentID,v.Name)
		if err!=nil {
			return err
		}
	}
	return nil
}

func (classes *equipclasses) Pull() ([]*EquipClass,error){
	lists:=make([]*EquipClass,0,100)
	tablename,err:=classes.sqllist.Table().Get("/system/EQUIP/EQUIP_CLASS_INDEX")
	if err != nil {
		return lists,err
	}
	rows, err := classes.sqllist.database.Query("SELECT ID,ParentID,Name FROM "+tablename)
	if err != nil {
		return lists,err
	}
	defer rows.Close()
	for rows.Next() {
		var class EquipClass
		err := rows.Scan(&class.ID,&class.ParentID,&class.Name)
		if err != nil {
			return lists,err
		}
		lists=append(lists,&class)
	}
	err = rows.Err()
	if err != nil {
		return lists,err
	}
	return lists,nil
}


func newequipmanager(sqllist *sql_list) *equipmanager{
	var mgr equipmanager
	mgr.sqllist=sqllist
	mgr.infos=newequipinfos(sqllist)
	mgr.classes=newequipclasses(sqllist)
	return &mgr
}

type equipmanager struct {
	sqllist *sql_list
	infos *equipinfos
	classes *equipclasses
}

func (mgr *equipmanager) Infos() interface{Update(EquipInfo) error;Pull(time.Time,time.Time) ([]*EquipInfo,error)}{
	return mgr.infos
}


func (mgr *equipmanager) Classes() interface{Push([]EquipClass) error;Pull() ([]*EquipClass,error)}{
	return mgr.classes
}




