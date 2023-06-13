//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//cookie.go

package sql_list

import (
	"database/sql"
	"log"
	_ "fmt"
	"math/rand"
	"time"

)
type session_List struct {
	database *sql.DB
}
type ata_List struct {
	database *sql.DB
}



type Cookie_List struct {
	database *sql.DB
	Sessionlist *session_List
	Atalist *ata_List
}

func NewCookieList(db *sql.DB) *Cookie_List {
	var cookielist Cookie_List
	var sessionlist session_List
	var atalist ata_List
	
	cookielist.database=db
	cookielist.Sessionlist=&sessionlist
	cookielist.Atalist=&atalist
	sessionlist.database=db
	atalist.database=db
	return &cookielist
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

func randStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
			b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

func (sessionlist *session_List) Issue(userid int64) (string,error) {
	var sessionid string
	for ;true; {
		sessionid=randStringBytes(30)
		if sessionlist.Confirm(sessionid)== 0 {
			break
		}
	}
	tablename,err:=GetTableName(sessionlist.database,"/system/COOKIE/SESSION_ID")
	if err != nil {
		log.Print("@function session_List.Issue():"+err.Error())
		return "",err
	}
	stmtIns,err:=sessionlist.database.Prepare("INSERT into "+tablename+" (sessionid,userid,expiration) VALUES (?,?,?))")
	if err != nil {
		log.Print("@function session_List.Issue():"+err.Error())
		return "",err
	}
	defer stmtIns.Close()	
	_, err = stmtIns.Exec(sessionid,userid,(time.Now().Add(36*time.Hour)))
	if err != nil {
		log.Print("@function session_List.Issue():"+err.Error())
		return "",err
	}
	return sessionid,nil
}


func (sessionlist *session_List) Confirm(sessionid string) int64 {
	tablename,err:=GetTableName(sessionlist.database,"/system/COOKIE/SESSION_ID")
	if err != nil {
		log.Print("@function session_List.Confirm():" + err.Error())
		return 0
	}
	stmtOut,err:=sessionlist.database.Prepare("SELECT (userid,expiration) FROM "+tablename+" WHERE sessionid = ?")
	if err != nil {
		log.Print("@function session_List.Confirm():" + err.Error())
		return 0
	}
	defer stmtOut.Close()
	var expiration time.Time
	var userid int64
	err = stmtOut.QueryRow(sessionid).Scan(&userid,&expiration)
	if err != nil {
		log.Print("@function session_List.Confirm():" + err.Error())
		return 0
	}
	if expiration.After(time.Now()) {
		sessionlist.Delete(sessionid)
		return 0
	}
	return userid	
}


func (sessionlist *session_List) Delete(sessionid string) {
	tablename,err:=GetTableName(sessionlist.database,"/system/COOKIE/SESSION_ID")
	if err != nil {
		log.Print("@function session_List.Delete():"+err.Error())
		return
	}
	stmtIns,err:=sessionlist.database.Prepare("DELETE FROM "+tablename+" WHERE sessionid = ?")
	if err != nil {
		log.Print("@function session_List.Delete():"+err.Error())
		return
	}
	defer stmtIns.Close()	
	_, err = stmtIns.Exec(sessionid)
	if err != nil {
		log.Print("@function session_List.Delete():"+err.Error())
		return
	}
	return
}



func (atalist *ata_List) Issue(userid int64) (string,error) {
	var ataid string
	for ;true; {
		ataid=randStringBytes(30)
		if atalist.Confirm(ataid)== 0 {
			break
		}
	}
	tablename,err:=GetTableName(atalist.database,"/system/COOKIE/ATA_ID")
	if err != nil {
		log.Print("@function ata_List.Issue():"+err.Error())
		return "",err
	}
	stmtIns,err:=atalist.database.Prepare("INSERT into "+tablename+" (ataid,userid,expiration) VALUES (?,?,?))")
	if err != nil {
		log.Print("@function ata_List.Issue():"+err.Error())
		return "",err
	}
	defer stmtIns.Close()	
	_, err = stmtIns.Exec(ataid,userid,(time.Now().Add(36*time.Hour)))
	if err != nil {
		log.Print("@function ata_List.Issue():"+err.Error())
		return "",err
	}
	return ataid,nil
}


func (atalist *ata_List) Confirm(ataid string) int64 {
	tablename,err:=GetTableName(atalist.database,"/system/COOKIE/ATA_ID")
	if err != nil {
		log.Print("@function ata_List.Confirm():" + err.Error())
		return 0
	}
	
	stmtOut,err:=atalist.database.Prepare("SELECT (userid,expiration) FROM "+tablename+" WHERE ataid = ?")
	if err != nil {
		log.Print("@function ata_List.Confirm():" + err.Error())
		return 0
	}
	defer stmtOut.Close()
	var expiration time.Time
	var userid int64
	err = stmtOut.QueryRow(ataid).Scan(&userid,&expiration)
	if err != nil {
		log.Print("@function ata_List.Confirm():" + err.Error())
		return 0
	}
	if expiration.After(time.Now()) {
		atalist.Delete(ataid)
		return 0
	}
	return userid	
}


func (atalist *ata_List) Delete(ataid string) {
	tablename,err:=GetTableName(atalist.database,"/system/COOKIE/ATA_ID")
	if err != nil {
		log.Print("@function ata_List.Delete():"+err.Error())
		return
	}
	stmtIns,err:=atalist.database.Prepare("DELETE FROM "+tablename+" WHERE ataid = ?")
	if err != nil {
		log.Print("@function ata_List.Delete():"+err.Error())
		return
	}
	defer stmtIns.Close()	
	_, err = stmtIns.Exec(ataid)
	if err != nil {
		log.Print("@function ata_List.Delete():"+err.Error())
		return
	}
	return
}

