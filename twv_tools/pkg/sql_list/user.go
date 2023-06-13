//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//user.go

package sql_list

import (
	_ "database/sql"
	"crypto/sha512"
	"log"
	"fmt"
	_ "strings"
)





func newusermanager(sqllist *sql_list) *usermanager {
	var mgr usermanager
	mgr.sqllist=sqllist
	mgr.dest="/system/USERLIST"
	return &mgr
} 

type usermanager struct {
	sqllist *sql_list
	dest string
}


func (mgr *usermanager) Add(username string,password string) uint64{
	if mgr.GetUserID(username)!=0 {
		return 0
	}
	tablename,err:=mgr.sqllist.Table().Get(mgr.dest)
	if err!=nil {
		return 0
	}
	hash_data := sha512.Sum512([]byte(password))
	hash_str := fmt.Sprintf("%x",hash_data)
	stmtIns,err:=mgr.sqllist.database.Prepare("INSERT into "+tablename+
	" (username,password_hash) VALUES (?,?);" )
	defer stmtIns.Close()
	if err!=nil {
		return 0
	}
	_,err=stmtIns.Exec(&username,&hash_str)
	if err!=nil {
		return 0
	}
	return mgr.GetUserID(username)
	
}



func (mgr *usermanager) Delete(userid uint64){
	tablename,err:=mgr.sqllist.Table().Get(mgr.dest)
	if err!=nil {
		return
	}
	
	stmtIns,err:=mgr.sqllist.database.Prepare("Delete from "+tablename+
	" where id=?;" )
	if err!=nil {
		return
	}
	_,_=stmtIns.Exec(&userid)
	return
	
}


func (mgr *usermanager) GetUserID(username string) uint64{
	var userid uint64=0
	tablename,err:=mgr.sqllist.Table().Get(mgr.dest)
	if err!=nil {
		return 0
	}
	
	stmtOut,err:=mgr.sqllist.database.Prepare("SELECT id FROM "+tablename + " where username = ?")
	if err != nil {
		log.Print(err.Error())
		return 0
	}
	defer stmtOut.Close()
	err = stmtOut.QueryRow(username).Scan(&userid)
	if err != nil {
		return 0
	}
	return userid
}


func (mgr *usermanager) Confirm(userid uint64,password string) bool{
	hash_data := sha512.Sum512([]byte(password))
	hash_str := fmt.Sprintf("%x",hash_data)
	
	tablename,err:=mgr.sqllist.Table().Get(mgr.dest)
	if err!=nil {
		return false
	}
	
	rows, err := mgr.sqllist.database.Query("SELECT password_hash FROM "+tablename + " where id = ?",userid)
	if err != nil {
		return false
	}
	
	defer rows.Close()
	var password_hash string
	for rows.Next() {
		err = rows.Scan(&password_hash)
		if err != nil {
			return false
		}
		break
	}
	err = rows.Err()
	if err != nil {
		return false
	}
	if password_hash==hash_str {
		return true
	}
	return false
}