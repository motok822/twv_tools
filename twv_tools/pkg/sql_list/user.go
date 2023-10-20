//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//user.go

package sql_list

import (
	"database/sql"
	"crypto/sha512"
	"log"
	"fmt"
	_ "strings"
	"golang.org/x/exp/slices"
	"errors"
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


func (mgr *usermanager) Update(info UserInfo) int64{
	if info.ID==0 {//create new
		if !info.Password.Valid {
			return 0
		}
		hash_data := sha512.Sum512([]byte(info.Password.String))
		info.Password_Hash= fmt.Sprintf("%x",hash_data)
	}else{
		if mgr.GetUserID(info.UserName)!=info.ID {
			return 0
		}
		var old_info *UserInfo=nil
		all_info,err:=mgr.GetAllUser()
		if err!= nil {
			return 0
		}
		for _,v := range all_info {
			if v.ID==info.ID {
				old_info=v
				break
			}
		}
		if old_info==nil {
			return 0
		}
		if info.Password.Valid {
			hash_data := sha512.Sum512([]byte(info.Password.String))
			info.Password_Hash= fmt.Sprintf("%x",hash_data)
		}else{
			info.Password_Hash=old_info.Password_Hash
		}
		if !info.FamilyName.Valid {
			info.FamilyName.Valid=old_info.FamilyName.Valid
			info.FamilyName.String=old_info.FamilyName.String
		}
		if !info.FirstName.Valid {
			info.FirstName.Valid=old_info.FirstName.Valid
			info.FirstName.String=old_info.FirstName.String
		}
		if !info.Belong.Valid {
			info.Belong.Valid=old_info.Belong.Valid
			info.Belong.String=old_info.Belong.String
		}
		if !info.Sex.Valid {
			info.Sex.Valid=old_info.Sex.Valid
			info.Sex.String=old_info.Sex.String
		}
		if !info.Birth.Valid {
			info.Birth.Valid=old_info.Birth.Valid
			info.Birth.Time=old_info.Birth.Time
		}
	}
	//normality check
	if info.UserName=="" {
		return 0
	}
	
	tablename,err:=mgr.sqllist.Table().Get(mgr.dest)
	if err!=nil {
		return 0
	}
	stmtIns,err:=mgr.sqllist.database.Prepare("INSERT into "+tablename+
	" (id,username,password_hash,familyname,firstname,grade,belong,sex,birth) VALUES (?,?,?,?,?,?,?,?,?);" )
	if err!=nil {
		return 0
	}
	defer stmtIns.Close()
	if info.ID!=0 {
		_,err=stmtIns.Exec(&info.ID,&info.UserName,&info.Password_Hash,&info.FamilyName,&info.FirstName,&info.Grade,&info.Belong,&info.Sex,&info.Birth)
	}else{
		var tempid sql.NullInt64
		tempid.Valid=false
		_,err=stmtIns.Exec(&tempid,&info.UserName,&info.Password_Hash,&info.FamilyName,&info.FirstName,&info.Grade,&info.Belong,&info.Sex,&info.Birth)
	}
	if err!=nil {
		return 0
	}
	if info.ID==0 {
		userid:=mgr.sqllist.User().GetUserID(info.UserName)
		if userid==0 {
			return 0
		}
		err=mgr.sqllist.Auth().User(userid).Create()
		if err!=nil {
			return 0
		}
		userinfo,err:=mgr.sqllist.Auth().User(userid).Pull()
		if err!=nil {
			return 0
		}
		
		if !slices.Contains(*(userinfo.Users()),userid){
			*(userinfo.Users())=append(*(userinfo.Users()),userid)
			err:=mgr.sqllist.Auth().User(userid).Push(userinfo)
			if err!=nil {
				return 0
			}
		}
		mgr.AddToGroup(userid,"Guests")
	}
	return mgr.GetUserID(info.UserName)
	
}

func (mgr *usermanager) AddToGroup(userid int64,groupname string) error{
	if userid<=0 {
		return errors.New("Please specify userid")
	}
	
	groupinfo,err:=mgr.sqllist.Auth().Group(groupname).Pull()
	if err!=nil {
		return err
	}
	if !slices.Contains(*(groupinfo.Users()),userid){
		*(groupinfo.Users())=append(*(groupinfo.Users()),userid)
		err:=mgr.sqllist.Auth().Group(groupname).Push(groupinfo)
		if err!=nil {
			return err
		}
	}
	
	
	userinfo,err:=mgr.sqllist.Auth().User(userid).Pull()
	if err!=nil {
		return err
	}
	if !slices.Contains(*(userinfo.Groups()),groupname){
		*(userinfo.Groups())=append(*(userinfo.Groups()),groupname)
		err:=mgr.sqllist.Auth().User(userid).Push(userinfo)
		if err!=nil {
			return err
		}
	}
	return nil
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
		quser:=*(tgroup.Users())
		qgroup:=*(tgroup.Groups())
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
