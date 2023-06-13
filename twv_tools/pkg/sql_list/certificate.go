//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//func.go
package sql_list

import (
	"log"
)

func Certificate(action string,handler AuthHandler,lists AuthLists) bool{
	infos,err:=handler.Pull()
	if err!=nil {
		return false
	}
	list,err:=lists.Pull()
	if err!= nil {
		return false
	}
	var auth uint8=0
	
	for _,v:=range list.Users() {
		try:=infos.User(v).Get(action)
		log.Print(try)
		if try!=0 {
			if try==2 {
				return false
			}
			if try==1 && auth==0 {
				auth=1
			}
		}
	}
	for _,v:=range list.Groups() {
		try:=infos.Group(v).Get(action)
		if try!=0 {
			if try==2 {
				return false
			}
			if try==1 && auth==0 {
				auth=1
			}
		}
	}
	
	
	if auth==0 {
		auth=infos.Default().Get(action)
	}
	if auth==1 {
		return true
	}
	return false
}
