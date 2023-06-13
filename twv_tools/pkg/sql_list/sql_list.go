//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//main.go

package sql_list
import (
	"database/sql"
	_ "strings"
	_ "fmt"
	"log"
	"time"
)


func NewSQLList(database *sql.DB) SQLList{
//func NewSQLList(database *sql.DB) *sql_list{
	var sqllist sql_list
	sqllist.database=database
	sqllist.auth=newauthmanager(&sqllist)
	sqllist.cookie=newcookiemanager(&sqllist)
	sqllist.user=newusermanager(&sqllist)
	sqllist.table=newtablemanager(&sqllist)
	sqllist.plans=newplanmanager(&sqllist)
	sqllist.equip=newequipmanager(&sqllist)
	return &sqllist
}


type sql_list struct {
	database *sql.DB
	auth *authmanager
	cookie *cookiemanager
	user *usermanager
	table *tablemanager
	plans *planmanager
	equip *equipmanager
}

func (sqllist *sql_list) Auth() Auth{
	return sqllist.auth
}

func (sqllist *sql_list) Cookie() interface {Session() TokenHandler;ATA() TokenHandler}{
	return sqllist.cookie
}


func (sqllist *sql_list) User() interface{Add(string,string) uint64;Delete(uint64);GetUserID(string) uint64;Confirm(uint64,string) bool}{
	return sqllist.user
}


func (sqllist *sql_list) Table() interface{Get(string) (string,error);Add(string) (string,error);Delete(string) error}{
	return sqllist.table
}

func (sqllist *sql_list) Plans() interface{IndexOfFYear(uint64) ([]uint64,error);Plan(uint64) (*PlanInfo,error)}{
	return sqllist.plans
}

func (sqllist *sql_list) Equip() interface{Infos() interface{Update(EquipInfo) error;Pull(time.Time,time.Time) ([]*EquipInfo,error)};Classes() interface{Push([]EquipClass) error;Pull() ([]*EquipClass,error)}}{
	return sqllist.equip
}



func (sqllist *sql_list) gettablename(tableid string) (string,error) {
	var tablename string = ""
	stmtOut,err:=sqllist.database.Prepare("SELECT (tablename) FROM FILEINDEX WHERE tableid = ?")
	if err != nil {
		log.Print("@function getTableName():" + err.Error())
		return tablename,err
	}
	defer stmtOut.Close()
	err = stmtOut.QueryRow(tableid).Scan(&tablename)
	if err != nil {
		log.Print("@function Confirm():" + err.Error()) // proper error handling instead of panic in your app
	}
	return tablename,err
}

func (sqllist *sql_list) getallfiles() []string{
	fileindex:=make([]string,0,100)
	rows, err := sqllist.database.Query("SELECT (tableid) FROM FILEINDEX")
	if err != nil {
		log.Print("@function getAllFiles():" + err.Error())
		return fileindex
	}
	defer rows.Close()
	var str string
	for rows.Next() {
		err := rows.Scan(&str)
		if err != nil {
			log.Print("@function getAllFiles():" + err.Error())
			return fileindex
		}
		fileindex=append(fileindex,str)
	}
	err = rows.Err()
	if err != nil {
		log.Print("@function getAllFiles():" + err.Error())
	}
	return fileindex
}




