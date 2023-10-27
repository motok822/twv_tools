//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//plans.go

package sql_list

import (
	"database/sql"
	_ "crypto/sha512"
	_ "log"
	_ "fmt"
	_ "strings"
	"time"
)


func newplanmanager(sqllist *sql_list) *planmanager{
	var mgr planmanager
	mgr.sqllist=sqllist
	return &mgr
}

type planmanager struct {
	sqllist *sql_list
	dest string
}

func (mgr *planmanager) Plan(planID int64) (*PlanInfo,error){
	var info PlanInfo
	tablename,err:=mgr.sqllist.Table().Get("/system/PLAN/PLAN_INDEX")
	if err!=nil {
		return &info,err
	}
	
	stmtOut,err:=mgr.sqllist.database.Prepare("SELECT ID,Name,FYear,PlanType,PlanNum,ReserveStart,ReserveEnd,ClimeStart,ClimeEnd,LastUpdate,Members FROM "+tablename + " where ID = ?")
	if err != nil {
		return &info,err
	}
	defer stmtOut.Close()
	err = stmtOut.QueryRow(planID).Scan(&info.ID,&info.Name,&info.FYear,&info.PlanType,&info.PlanNum,&info.ReserveStart,&info.ReserveEnd,&info.ClimeStart,&info.LastUpdate,&info.ClimeEnd,&info.Members)
	if err != nil {
		return &info,err
	}
	return &info,nil
}
/*
type PlanInfo struct {
	ID int64
	Name string
	FYear int64
	PlanType string
	PlanNum sql.NullInt64
	ReserveStart sql.NullTime
	ReserveEnd sql.NullTime
	ClimeStart sql.NullTime
	ClimeEnd sql.NullTime
	LastUpdate time.Time
	Members sql.NullString
}
*/
func (mgr *planmanager) Update(info PlanInfo) error{
	tablename,err:=mgr.sqllist.Table().Get("/system/PLAN/PLAN_INDEX")
	if err!=nil {
		return err
	}
	stmtIns,err:=mgr.sqllist.database.Prepare("INSERT into "+tablename+
	" (ID,Name,FYear,PlanType,PlanNum,ReserveStart,ReserveEnd,ClimeStart,ClimeEnd,LastUpdate,Members) VALUES (?,?,?,?,?,?,?,?,?,NOW(),?) ON DUPLICATE KEY UPDATE ID = VALUES(ID),Name=VALUES(Name),FYear = VALUES(FYear),PlanType = VALUES(PlanType),PlanNum = VALUES(PlanNum),ReserveStart = VALUES(ReserveStart),ReserveEnd = VALUES(ReserveEnd),ClimeStart = VALUES(ClimeStart),ClimeEnd = VALUES(ClimeEnd),LastUpdate = VALUES(LastUpdate),Members = VALUES(Members);" )
	if err!=nil {
		return err
	}
	defer stmtIns.Close()
	if info.ID!=0 {
		if info.PlanType=="DELETE"||info.PlanType=="Delete"||info.PlanType=="delete" {
			stmtIns2,err:=mgr.sqllist.database.Prepare("DELETE from "+tablename+
			" where id = ?;" )
			if err!=nil {
				return err
			}
			_,err=stmtIns2.Exec(&info.ID)
		}else{
			_,err=stmtIns.Exec(&info.ID,&info.Name,&info.FYear,&info.PlanType,&info.PlanNum,&info.ReserveStart,&info.ReserveEnd,&info.ClimeStart,&info.ClimeEnd,&info.Members)
		}
	}else{
		var tempid sql.NullInt64
		tempid.Valid=false
		_,err=stmtIns.Exec(&tempid,&info.Name,&info.FYear,&info.PlanType,&info.PlanNum,&info.ReserveStart,&info.ReserveEnd,&info.ClimeStart,&info.ClimeEnd,&info.Members)
	}
	return err
}


func (mgr *planmanager) IndexOfFYear(FYear int64) ([]int64,error){
	index:=make([]int64,0,100)
	tablename,err:=mgr.sqllist.Table().Get("/system/PLAN/PLAN_INDEX")
	rows, err := mgr.sqllist.database.Query("SELECT ID FROM "+tablename +" WHERE FYear=?",FYear)
	if err != nil {
		return index,err
	}
	defer rows.Close()
	var ID int64
	for rows.Next() {
		err := rows.Scan(&ID)
		if err != nil {
		return index,err
		}
		index=append(index,ID)
	}
	err = rows.Err()
	if err != nil {
		return index,err
	}
	return index,nil
}


func (mgr *planmanager) GetPlanByTime(start time.Time,end time.Time) ([]*PlanInfo,error){
	lists:=make([]*PlanInfo,0,100)
	tablename,err:=mgr.sqllist.Table().Get("/system/PLAN/PLAN_INDEX")
	if err != nil {
		return lists,err
	}
	rows, err := mgr.sqllist.database.Query("SELECT ID,Name,FYear,PlanType,PlanNum,ReserveStart,ReserveEnd,ClimeStart,ClimeEnd,LastUpdate,Members FROM "+tablename +" WHERE ((? < ReserveEnd AND ReserveStart< ?) OR (? < ClimeEnd AND ClimeStart< ?) OR (? < LastUpdate AND LastUpdate < ?))",start,end,start,end,start,end)
	if err != nil {
		return lists,err
	}
	defer rows.Close()
	for rows.Next() {
		var info PlanInfo
		err := rows.Scan(&info.ID,&info.Name,&info.FYear,&info.PlanType,&info.PlanNum,&info.ReserveStart,&info.ReserveEnd,&info.ClimeStart,&info.LastUpdate,&info.ClimeEnd,&info.Members)
		if err != nil {
			return lists,err
		}
		appendflag:=false
		if info.ReserveStart.Valid || info.ReserveEnd.Valid {
			if info.ReserveStart.Valid && info.ReserveEnd.Valid {
				if info.ReserveEnd.Time.After(start) && info.ReserveStart.Time.Before(end) {
					appendflag=true
				}
			}
			if info.ReserveStart.Valid && !info.ReserveEnd.Valid {
				if info.ReserveStart.Time.After(start) && info.ReserveStart.Time.Before(end) {
					appendflag=true
				}
			}
			if !info.ReserveStart.Valid && info.ReserveEnd.Valid {
				if info.ReserveEnd.Time.After(start) && info.ReserveEnd.Time.Before(end) {
					appendflag=true
				}
			}
		}
		if info.ClimeStart.Valid || info.ClimeEnd.Valid {
			if info.ClimeStart.Valid && info.ClimeEnd.Valid {
				if info.ClimeEnd.Time.After(start) && info.ClimeStart.Time.Before(end) {
					appendflag=true
				}
			}
			if info.ClimeStart.Valid && !info.ClimeEnd.Valid {
				if info.ClimeStart.Time.After(start) && info.ClimeStart.Time.Before(end) {
					appendflag=true
				}
			}
			if !info.ClimeStart.Valid && info.ClimeEnd.Valid {
				if info.ClimeEnd.Time.After(start) && info.ClimeEnd.Time.Before(end) {
					appendflag=true
				}
			}
		}
		if !info.ReserveStart.Valid && !info.ReserveEnd.Valid && !info.ClimeStart.Valid && !info.ClimeEnd.Valid {
			if info.LastUpdate.After(start) && info.LastUpdate.Before(end) {
				appendflag=true
			}
		}
		if appendflag {
			lists=append(lists,&info)
		}
	}
	err = rows.Err()
	if err != nil {
		return lists,err
	}
	return lists,nil
}