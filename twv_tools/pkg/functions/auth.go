//module github.com/windows-server-2003/twv_tools/pkg/functions
//auth.go
package functions

import (
	//"net/http"
	_ "database/sql"
	"github.com/windows-server-2003/twv_tools/pkg/sql_list"
	_ "log"
	_ "github.com/windows-server-2003/twv_tools/pkg/http_engine"
	//"github.com/windows-server-2003/twv_tools/pkg/http_tools"
	//"errors"
	//"encoding/json"
)


//status 0:undefined,1:allow,2:denied
func AuthUserToFunc(sqllist sql_list.SQLList,funcname string,userid int64,auth string,status uint8) error{
	funcinfo,err:=sqllist.Auth().Func(funcname).Pull()
	if err!=nil {
		return err
	}
	funcinfo.User(userid).Set(auth,status)
	err=sqllist.Auth().Func(funcname).Push(funcinfo)
	return err
}

func AuthGroupToFunc(sqllist sql_list.SQLList,funcname string,groupname string,auth string,status uint8) error{
	funcinfo,err:=sqllist.Auth().Func(funcname).Pull()
	if err!=nil {
		return err
	}
	funcinfo.Group(groupname).Set(auth,status)
	err=sqllist.Auth().Func(funcname).Push(funcinfo)
	return err
}

func AuthUserToFile(sqllist sql_list.SQLList,filename string,userid int64,auth string,status uint8) error{
	fileinfo,err:=sqllist.Auth().File(filename).Pull()
	if err!=nil {
		return err
	}
	fileinfo.User(userid).Set(auth,status)
	err=sqllist.Auth().File(filename).Push(fileinfo)
	return err
}

func AuthGroupToFile(sqllist sql_list.SQLList,filename string,groupname string,auth string,status uint8) error{
	fileinfo,err:=sqllist.Auth().File(filename).Pull()
	if err!=nil {
		return err
	}
	fileinfo.Group(groupname).Set(auth,status)
	err=sqllist.Auth().File(filename).Push(fileinfo)
	return err
}
