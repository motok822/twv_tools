//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//user.go

package sql_list

import (
	"database/sql"
	"crypto/sha512"
	"log"
	"fmt"
	"strings"
)

/*

//userlist
type User_List
	func Confirm(username string,password string) bool
	func GetIDByUsername(username string) uint64
*/

type User_List struct {
	database *sql.DB
}

func NewUserList(db *sql.DB) *User_List {
	var userlist User_List
	userlist.database=db
	return &userlist
}

func (userlist *User_List) Confirm(username string,password string) bool{
	var password_hash string = ""
	tablename,err:= GetTableName(userlist.database,"/system/USERLIST")
	if err!= nil {
		return false
	}
	
	stmtOut,err:=userlist.database.Prepare("SELECT (password_hash) FROM "+tablename+" WHERE username = ?")
	if err != nil {
		log.Print("@function Confirm():" + err.Error())
		return false
	}
	defer stmtOut.Close()
	err = stmtOut.QueryRow(username).Scan(&password_hash)
	if err != nil {
		log.Print("@function Confirm():" + err.Error()) // proper error handling instead of panic in your app
		return false
	}
	hash_data := sha512.Sum512([]byte(password))
	hash_str := fmt.Sprintf("%x",hash_data)
	if password_hash == hash_str {
		log.Print(password_hash)
		return true
	}
	return false	
}

func (userlist *User_List) GetIDByUsername(username string) uint64{
	var userid uint64 = 0
	stmtOut,err:=userlist.database.Prepare("SELECT (userid) FROM USERLIST WHERE username = ?")
	if err != nil {
		log.Print("@function GetIDByUsername():" + err.Error())
		return 0
	}
	defer stmtOut.Close()
	err = stmtOut.QueryRow(username).Scan(&userid)
	if err != nil {
		log.Print("@function GetIDByUsername():" + err.Error()) // proper error handling instead of panic in your app
		return 0
	}
	return userid
}

func (userlist *User_List) GetUsers() []string {
	filelist:=GetAllFiles(userlist.database)
	users:= make([]string,0,100)
	for _,v:=range filelist {
		num:=strings.LastIndex(v,"/")
		if num==-1 {
			continue
		}
		if v[0:num+1]=="/system/AUTH/USERS/" {
			
			users=append(users,v[num+1:])
		}
	}
	return users
}