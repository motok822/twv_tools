//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//user.go

package sql_list

import (
	_ "database/sql"
	"crypto/sha512"
	"log"
	"fmt"
	_ "strings"
	"golang.org/x/exp/slices"
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


func (mgr *usermanager) Add(info UserInfo,password string) int64{
	if mgr.GetUserID(info.UserName)!=0 {
		return 0
	}
	tablename,err:=mgr.sqllist.Table().Get(mgr.dest)
	if err!=nil {
		return 0
	}
	hash_data := sha512.Sum512([]byte(password))
	info.Password_Hash= fmt.Sprintf("%x",hash_data)
	stmtIns,err:=mgr.sqllist.database.Prepare("INSERT into "+tablename+
	" (username,password_hash,familyname,firstname,grade,belong,sex,birth) VALUES (?,?,?,?,?,?,?,?);" )
	defer stmtIns.Close()
	if err!=nil {
		return 0
	}
	_,err=stmtIns.Exec(&info.UserName,&info.Password_Hash,&info.FamilyName,&info.FirstName,&info.Grade,&info.Belong,&info.Sex,&info.Birth)
	if err!=nil {
		return 0
	}
	return mgr.GetUserID(info.UserName)
	
}


func (mgr *usermanager) Delete(userid int64){
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


func (mgr *usermanager) GetUserID(username string) int64{
	var userid int64=0
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


func (mgr *usermanager) Confirm(userid int64,password string) bool{
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


func (mgr *usermanager) GetAllUser() ([]*UserInfo,error){
	var userlist=make([]*UserInfo,0,100)
	tablename,err:=mgr.sqllist.Table().Get(mgr.dest)
	if err!=nil {
		return nil,err
	}
	rows, err := mgr.sqllist.database.Query("SELECT ID,UserName,FamilyName,FirstName,Grade,Belong,Sex,Birth FROM "+tablename)
	if err != nil {
		return nil,err
	}
	
	defer rows.Close()
	
	for rows.Next() {
		var info UserInfo
		err = rows.Scan(&info.ID,&info.UserName,&info.FamilyName,&info.FirstName,&info.Grade,&info.Belong,&info.Sex,&info.Birth)
		if err != nil {
			return nil,err
		}
		userlist=append(userlist,&info)
	}
	err = rows.Err()
	if err != nil {
		return nil,err
	}
	
	return userlist,nil
	
}


func (mgr *usermanager) GetGroupContent(groupname string) ([]int64,[]string,error){
	groupusers:=make([]int64,0,100)
	groupgroups:=make([]string,0,100)
	queue:=make([]string,0,100)
	queue=append(queue,groupname)
	for ;len(queue)>0; {
		tgroup,err:=mgr.sqllist.Auth().Group(queue[0]).Pull()
		if err!=nil {
			return nil,nil,err
		}
		quser:=tgroup.Users()
		qgroup:=tgroup.Groups()
		for _,v := range quser {
			if !slices.Contains(groupusers,v) {
				groupusers=append(groupusers,v)
			}
		}
		for _,v := range qgroup {
			if !slices.Contains(groupgroups,v) {
				groupgroups=append(groupgroups,v)
				queue=append(queue,v)
			}
		}
		queue=queue[1:]
	}
	return groupusers,groupgroups,nil
	
	
}
