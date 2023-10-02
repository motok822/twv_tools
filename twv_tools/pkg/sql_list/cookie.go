//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//cookie.go

package sql_list

import (
	_ "database/sql"
	"log"
	_ "fmt"
	_ "math/rand"
	"time"
	"errors"

)



func newtokenhandler(dest string,duration time.Duration,sqllist *sql_list) *tokenhandler{
	var handler tokenhandler
	handler.dest=dest
	handler.duration=duration
	handler.sqllist=sqllist
	handler.refresh_counter=0
	return &handler
}


type tokenhandler struct{
	sqllist *sql_list
	dest string
	duration time.Duration
	refresh_counter int64
}

func (handler *tokenhandler) Add(userid int64) (string,time.Time,error){
	var token string
	expiration:=time.Now().Add(handler.duration)
	tablename,err:=handler.sqllist.Table().Get(handler.dest)
	if err!=nil {
		return token,expiration,err
	}
	for ;true; {
		token=randStringBytes(40)
		if _,err=handler.GetUserID(token);err==nil{
			continue
		}
		break
	}
	stmtIns,err:=handler.sqllist.database.Prepare(
	"INSERT into "+tablename+
	" (token,userid,expiration) VALUES (?,?,?);" )
	if err!=nil {
		return token,expiration,err
	}
	_,err=stmtIns.Exec(token,userid,expiration)
	return token,expiration,err
}


func (handler *tokenhandler) Delete(token string){
	tablename,err:=handler.sqllist.Table().Get(handler.dest)
	if err!=nil {
		return
	}
	stmtIns,err:=handler.sqllist.database.Prepare(
	"DROP FROM "+tablename+
	" where token=?;" )
	if err!=nil {
		return
	}
	_,_=stmtIns.Exec(token)
	return
}



func (handler *tokenhandler) GetUserID(token string) (int64,error){
	var userid int64=0
	var expiration time.Time
	tablename,err:=handler.sqllist.Table().Get(handler.dest)
	if err!=nil {
		return userid,err
	}
	
	rows, err := handler.sqllist.database.Query("SELECT userid,expiration FROM "+tablename + " where token = ?",token)
	if err != nil {
		return userid,err
	}
	defer rows.Close()
	rows.Next()
	err = rows.Scan(&userid,&expiration)
	if err != nil {
		return userid,err
	}
	err = rows.Err()
	if err != nil {
		return userid,err
	}
	if time.Now().After(expiration){
		return 0,errors.New("not correct session id!!")
	}
	return userid,nil
}

func (handler *tokenhandler) Refresh() {
	tablename,err:=handler.sqllist.Table().Get(handler.dest)
	if err!=nil {
		log.Print("@refresh:"+err.Error())
		return
	}
	stmtIns,err:=handler.sqllist.database.Prepare(
	"DELETE from "+tablename+
	" WHERE expiration > ?;" )
	if err!=nil {
		log.Print("@refresh:"+err.Error())
		return
	}
	_,err=stmtIns.Exec(time.Now())
	if err!=nil {
		log.Print("@refresh:"+err.Error())
		return
	}
}

func (handler *tokenhandler) refresh_count(){
	handler.refresh_counter++
	if handler.refresh_counter==50 {
		handler.refresh_counter=0
		handler.Refresh()
	}
}


func newcookiemanager(sqllist *sql_list) *cookiemanager{
	var mgr cookiemanager
	mgr.sqllist=sqllist
	return &mgr

}

type cookiemanager struct {
	sqllist *sql_list
}

func (mgr *cookiemanager) Session() TokenHandler{
	handler:=newtokenhandler("/system/COOKIE/SESSION_ID",36*time.Hour,mgr.sqllist)
	return handler
}

func (mgr *cookiemanager) ATA() TokenHandler{
	handler:=newtokenhandler("/system/COOKIE/ATA",4320*time.Hour,mgr.sqllist)
	return handler
}