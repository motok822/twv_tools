//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//access.go

package sql_list

import (
	"database/sql"
	"log"
	_ "fmt"
	_"math/rand"
	_"time"

)

type Access_List struct {
	database *sql.DB
	Funclist *aceess_Func_List
	Filelist *access_File_List
}


type aceess_Func_List struct {
	database *sql.DB
}
type access_File_List struct {
	database *sql.DB
}


func NewAccessList(db *sql.DB) *Access_List {
	var accesslist Access_List
	
	var funclist aceess_Func_List
	var filelist access_File_List
	
	accesslist.database=db
	accesslist.Funclist=&funclist
	accesslist.Filelist=&filelist
	funclist.database=db
	filelist.database=db
	return &accesslist
}

type access_info_func struct{
	auth uint8
	exec uint8
}

type access_info_file struct{
	auth uint8
	write uint8
	read uint8
}

type Access_Func struct{
	users map[int64] access_info_func
	groups map[string] access_info_func
	default_setting access_info_func
}
/*
content:DEFAULT or USER or GROUP
authority:ternary numeral,0:null,1:accept,2:deny
-0(authority change,delete)0(exec)
*/


type Access_File struct{
	users map[int64] access_info_file
	groups map[string] access_info_file
	default_setting access_info_file
}
/*
content:DEFAULT or USER or GROUP
authority:ternary numeral,0:null,1:accept,2:deny
-0(authority change,delete)0(write)0(read)
*/
func denyall_func() *Access_Func{
	var accessfunc Access_Func
	accessfunc.users=make(map[int64] access_info_func)
	accessfunc.groups=make(map[string] access_info_func)
	accessfunc.default_setting.exec=2
	accessfunc.default_setting.auth=2
	return &accessfunc
}

func denyall_file() *Access_File{
	var accessfile Access_File
	accessfile.users=make(map[int64] access_info_file)
	accessfile.groups=make(map[string] access_info_file)
	accessfile.default_setting.read=2
	accessfile.default_setting.write=2
	accessfile.default_setting.auth=2
	return &accessfile
}


func (funclist *aceess_Func_List) GetAccessInfo(funcname string) *Access_Func{
	var accessfunc Access_Func
	accessfunc.users=make(map[int64] access_info_func)
	accessfunc.groups=make(map[string] access_info_func)
	tablename,err:=GetTableName(funclist.database,"/system/AUTH/FUNCS/"+funcname)
	if err != nil {
		log.Print("@function GetAccessInfo():" + err.Error())
		return denyall_func()
	}
	rows, err := funclist.database.Query("SELECT (content,userid,groupname,authority) FROM "+tablename)
	if err != nil {
		log.Print("@function GetAccessInfo():" + err.Error())
		return denyall_func()
	}
	defer rows.Close()
	var content string
	var userid sql.NullInt64
	var groupname sql.NullString
	var authority int64
	for rows.Next() {
		err := rows.Scan(&content,&userid,&groupname,&authority)
		if err != nil {
			log.Print("@function GetAccessInfo():" + err.Error())
			return denyall_func()
		}
		switch(content){
		case "DEFAULT":
			accessfunc.default_setting=access_info_func{uint8((authority%9)/3),uint8(authority%3)}
			break
		case "USER":
			if !userid.Valid {
				continue
			}
			accessfunc.users[userid.Int64]=access_info_func{uint8((authority%9)/3),uint8(authority%3)}
			break
		case "GROUP":
			if !groupname.Valid {
				continue
			}
			accessfunc.groups[groupname.String]=access_info_func{uint8((authority%9)/3),uint8(authority%3)}
			break
		}
	}
	err = rows.Err()
	if err != nil {
		log.Print("@function GetAccessInfo():" + err.Error())
		return denyall_func()
	}
	return &accessfunc
}


func (filelist *access_File_List) GetAccessInfo(filename string) *Access_File{
	var accessfile Access_File
	accessfile.users=make(map[int64] access_info_file)
	accessfile.groups=make(map[string] access_info_file)
	tablename,err:=GetTableName(filelist.database,"/system/AUTH/FILES/"+filename)
	if err != nil {
		log.Print("@function GetAccessInfo():" + err.Error())
		return denyall_file()
	}
	rows, err := filelist.database.Query("SELECT (content,userid,groupname,authority) FROM "+tablename)
	if err != nil {
		log.Print("@function GetAccessInfo():" + err.Error())
		return denyall_file()
	}
	defer rows.Close()
	var content string
	var userid sql.NullInt64
	var groupname sql.NullString
	var authority int64
	for rows.Next() {
		err := rows.Scan(&content,&userid,&groupname,&authority)
		if err != nil {
			log.Print("@function GetAccessInfo():" + err.Error())
			return denyall_file()
		}
		switch(content){
		case "DEFAULT":
			accessfile.default_setting=access_info_file{uint8((authority%27)/9),uint8((authority%9)/3),uint8(authority%3)}
			break
		case "USER":
			if !userid.Valid {
				continue
			}
			accessfile.users[userid.Int64]=access_info_file{uint8((authority%27)/9),uint8((authority%9)/3),uint8(authority%3)}
			break
		case "GROUP":
			if !groupname.Valid {
				continue
			}
			accessfile.groups[groupname.String]=access_info_file{uint8((authority%27)/9),uint8((authority%9)/3),uint8(authority%3)}
			break
		}
	}
	err = rows.Err()
	if err != nil {
		log.Print("@function GetAccessInfo():" + err.Error())
		return denyall_file()
	}
	return &accessfile
}

func update_access(original uint8,new uint8) uint8{
	switch original{
	case 0:
		return new
	case 1:
		if new==2 {
			return new
		}
	case 2:
		return original
	}
	return 2
}

func (filelist *access_File_List) GetAccessMap(authlist *Auth_List,userid int64,filename string) map[string] bool{
	//accessinfo:=filelist.GetAccessInfo(filename)
	usergroups:=authlist.GetUserGroups(userid)
	accessinfo:=filelist.GetAccessInfo(filename)
	accesslist:=make(map[string] uint8)
	accesslist["AUTH"]=accessinfo.default_setting.auth
	accesslist["WRITE"]=accessinfo.default_setting.write
	accesslist["READ"]=accessinfo.default_setting.read
	if val,ok:=accessinfo.users[userid];ok {
		accesslist["AUTH"]=update_access(accesslist["AUTH"],val.auth)
		accesslist["WRITE"]=update_access(accesslist["WRITE"],val.write)
		accesslist["READ"]=update_access(accesslist["READ"],val.read)
	}
	
	for _,v:= range usergroups {
		val,ok:=accessinfo.groups[v]
		if ok {
			accesslist["AUTH"]=update_access(accesslist["AUTH"],val.auth)
			accesslist["WRITE"]=update_access(accesslist["WRITE"],val.write)			
			accesslist["READ"]=update_access(accesslist["READ"],val.read)			
		}
	}
	accesslist_bool:=make(map[string] bool)
	for i,v := range accesslist {
		if v==1 {
			accesslist_bool[i]=true
		}else{
			accesslist_bool[i]=false
		}
	}
	return accesslist_bool
	
}

func (funclist *aceess_Func_List) GetAccessMap(authlist *Auth_List,userid int64,funcname string) map[string] bool{
	//accessinfo:=funclist.GetAccessInfo(funcname)
	usergroups:=authlist.GetUserGroups(userid)
	accessinfo:=funclist.GetAccessInfo(funcname)
	accesslist:=make(map[string] uint8)
	accesslist["AUTH"]=accessinfo.default_setting.auth
	accesslist["EXEC"]=accessinfo.default_setting.exec
	if val,ok:=accessinfo.users[userid];ok {
		accesslist["AUTH"]=update_access(accesslist["AUTH"],val.auth)
		accesslist["EXEC"]=update_access(accesslist["EXEC"],val.exec)
	}
	
	for _,v:= range usergroups {
		val,ok:=accessinfo.groups[v]
		if ok {
			accesslist["AUTH"]=update_access(accesslist["AUTH"],val.auth)
			accesslist["EXEC"]=update_access(accesslist["EXEC"],val.exec)			
		}
	}
	accesslist_bool:=make(map[string] bool)
	for i,v := range accesslist {
		if v==1 {
			accesslist_bool[i]=true
		}else{
			accesslist_bool[i]=false
		}
	}
	return accesslist_bool
	
}