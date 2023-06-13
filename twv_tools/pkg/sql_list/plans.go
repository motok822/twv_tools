//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//plans.go

package sql_list

import (
	_ "database/sql"
	_ "crypto/sha512"
	"log"
	_ "fmt"
	_ "strings"
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

func (mgr *planmanager) Plan(planID uint64) (*PlanInfo,error){
	var info PlanInfo
	tablename,err:=mgr.sqllist.Table().Get("/system/PLAN/PLAN_INDEX")
	if err!=nil {
		return &info,err
	}
	
	stmtOut,err:=mgr.sqllist.database.Prepare("SELECT ID,FYear,PlanType,PlanNum,ReserveStart,ReserveEnd,ClimeStart,ClimeEnd,Members FROM "+tablename + " where ID = ?")
	if err != nil {
		log.Print(err.Error())
		return &info,err
	}
	defer stmtOut.Close()
	err = stmtOut.QueryRow(planID).Scan(&info.ID,&info.FYear,&info.PlanType,&info.PlanNum,&info.ReserveStart,&info.ReserveEnd,&info.ClimeStart,&info.ClimeEnd,&info.Members)
	if err != nil {
		return &info,err
	}
	return &info,nil
}


func (mgr *planmanager) IndexOfFYear(FYear uint64) ([]uint64,error){
	index:=make([]uint64,0,100)
	tablename,err:=mgr.sqllist.Table().Get("/system/PLAN/PLAN_INDEX")
	rows, err := mgr.sqllist.database.Query("SELECT ID FROM "+tablename +" WHERE FYear=?",FYear)
	if err != nil {
		return index,err
	}
	defer rows.Close()
	var ID uint64
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