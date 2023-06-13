//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//auth.go

package sql_list

import (
	_ "database/sql"
	_ "log"
	_ "strings"
	_ "fmt"
	"errors"
	"math/rand"
	
)

func newtablemanager(sqllist *sql_list) *tablemanager{
	var mgr tablemanager
	mgr.sqllist=sqllist
	return &mgr
}

type tablemanager struct {
	sqllist *sql_list
}

func (mgr *tablemanager) Get(tableid string) (string,error) {
	var tablename string = ""
	stmtOut,err:=mgr.sqllist.database.Prepare("SELECT (tablename) FROM FILEINDEX WHERE tableid = ?")
	if err != nil {
		return tablename,err
	}
	defer stmtOut.Close()
	err = stmtOut.QueryRow(tableid).Scan(&tablename)
	return tablename,err
}
func (mgr *tablemanager) gettableid(tablename string) (string,error) {
	var tableid string = ""
	stmtOut,err:=mgr.sqllist.database.Prepare("SELECT (tableid) FROM FILEINDEX WHERE tablename = ?")
	if err != nil {
		return tableid,err
	}
	defer stmtOut.Close()
	err = stmtOut.QueryRow(tablename).Scan(&tableid)
	return tableid,err
}
const letterBytes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

func randStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
			b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

func (mgr *tablemanager) Add(tableid string) (string,error) {
	var tablename string = ""
	if _,err:=mgr.Get(tableid);err==nil {
		return tablename,errors.New("@function tablemanager.Set():tableid already exists")
	}
	var i=0
	for i=0;i<10;i++ {
		tablename=randStringBytes(20)
		if _,err:=mgr.gettableid(tablename);err == nil{
			continue
		}
	}
	if i==10 {
		return tablename,errors.New("@function tablemanager.Set():failed to allocate tablename")
	}
	stmtIns,err:=mgr.sqllist.database.Prepare("INSERT into FILEINDEX (tableid,tablename) VALUES (?,?)")
	if err != nil {
		return tablename,err
	}
	defer stmtIns.Close()
	_,err = stmtIns.Exec(tableid,tablename)
	return tablename,err	
}

func (mgr *tablemanager) Delete(tableid string) error {
	if _,err:=mgr.Get(tableid);err!=nil {
		return errors.New("@function tablemanager.Delete():tableid doesn't exist")
	}
	stmtIns,err:=mgr.sqllist.database.Prepare("DROP FROM FILEINDEX where tableid = ?")
	if err != nil {
		return err
	}
	defer stmtIns.Close()
	_,err = stmtIns.Exec(tableid)
	return err	
}
