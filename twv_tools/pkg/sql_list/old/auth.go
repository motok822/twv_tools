//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//auth.go

package sql_list

import (
	"database/sql"
	"strings"
	"fmt"
	"log"
	
)

type Auth_List struct {
	database *sql.DB
}

func NewAuthList(db *sql.DB) *Auth_List {
	var authlist Auth_List
	authlist.database=db
	return &authlist
}

func (authlist *Auth_List) GetAuthGroups() []string {
	filelist:=GetAllFiles(authlist.database)
	authgroups:= make([]string,0,100)
	for _,v:=range filelist {
		num:=strings.LastIndex(v,"/")
		if num==-1 {
			continue
		}
		if v[0:num+1]=="/system/AUTH/GROUPS/" {
			
			authgroups=append(authgroups,v[num+1:])
		}
	}
	return authgroups
}

func (authlist *Auth_List) GetUserGroups(userid int64) []string {
	grouplist:= make([]string,0,100)
	tablename:=fmt.Sprintf("/system/AUTH/USERS/%d",userid)
	tablename,err:=GetTableName(authlist.database,tablename)
	if err != nil {
		log.Print("@function GetUserGroups():" + err.Error())
		return grouplist
	}
	rows, err := authlist.database.Query("SELECT (groupname) FROM "+tablename)
	if err != nil {
		log.Print("@function GetUserGroups():" + err.Error())
		return grouplist
	}
	defer rows.Close()
	var groupname string
	for rows.Next() {
		err := rows.Scan(&groupname)
		if err != nil {
			log.Print("@function GetUserGroups():" + err.Error())
			return grouplist
		}
		grouplist=append(grouplist,groupname)
	}
	err = rows.Err()
	if err != nil {
		log.Print("@function GetAccessInfo():" + err.Error())
	}
	return grouplist
}