//module github.com/windows-server-2003/twv_tools/pkg/functions
//user.go
package functions
import (
	_ "database/sql"
	"github.com/windows-server-2003/twv_tools/pkg/sql_list"
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
	"golang.org/x/exp/slices"
	"fmt"
	"time"
	"encoding/json"
	_ "log"
)

func UnparseUserInfo(info *sql_list.UserInfo) string{
	str:=fmt.Sprint(info.ID)+","+info.UserName+","
	if info.FamilyName.Valid {
		str=str+info.FamilyName.String
	}
	str=str+","
	if info.FirstName.Valid {
		str=str+info.FirstName.String
	}
	str=str+","
	str=str+fmt.Sprint(info.Grade)+","
	if info.Belong.Valid {
		str=str+info.Belong.String
	}
	str=str+","
	if info.Sex.Valid {
		str=str+info.Sex.String
	}
	str=str+","
	if info.Birth.Valid {
		str=str+info.Birth.Time.Format(time.RFC3339Nano)
	}
	str=str+","
	return str[:len(str)-1]
}

/*
type UserInfo struct{
	id int64
	username string
	password_hash string
	familyname sql.NullString
	firstname sql.NullString
	grade int64
	belong sql.NullString
	sex sql.NullString
	birth sql.NullTime
}
*/

func User_GetAll(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	allusers,err:=engine.X().SQLList.User().GetAllUser()
	if err!=nil {
		return nil,err
	}
	result:=""
	for _,v := range allusers {
		result=result+UnparseUserInfo(v)+","
	}
	if result=="" {
		return "",nil
	}
	return result[:len(result)-1],nil
}


func User_GetGroup(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	arg:=struct{GroupName string;}{""}
	err:=json.Unmarshal(arg_byte,&arg)
	if err!=nil {
		return nil,err
	}
	allusers,err:=engine.X().SQLList.User().GetAllUser()
	if err!=nil {
		return nil,err
	}
	groupusers,_,err:=engine.X().SQLList.User().GetGroupContent(arg.GroupName)
	if err!=nil {
		return nil,err
	}
	result:=""
	for _,v := range allusers {
		if slices.Contains(groupusers,v.ID) {
			result=result+UnparseUserInfo(v)+","
		}
	}
	if result=="" {
		return "",nil
	}
	return result[:len(result)-1],nil
}

func User_GetUsers(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	arg:=struct{GroupName string;}{"Users"}
	argstr,err:=json.Marshal(arg)
	if err!=nil {
		return nil,err
	}
	return User_GetGroup([]byte(argstr),engine)
}