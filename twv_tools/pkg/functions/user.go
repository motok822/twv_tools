//module github.com/windows-server-2003/twv_tools/pkg/functions
//user.go
package functions
import (
	_ "database/sql"
	"github.com/windows-server-2003/twv_tools/pkg/sql_list"
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
	"github.com/windows-server-2003/twv_tools/pkg/http_tools"
	"golang.org/x/exp/slices"
	"fmt"
	"time"
	"encoding/json"
	"errors"
	_ "log"
	"net/http"
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
	ID int64
	UserName string
	Password sql.NullString
	Password_Hash string
	FamilyName sql.NullString
	FirstName sql.NullString
	Grade int64
	Belong sql.NullString
	Sex sql.NullString
	Birth sql.NullTime
}
type UserInfo_ struct{
	ID int64
	UserName string
	Password *string
	Password_Hash *string
	FamilyName *string
	FirstName *string
	Grade int64
	Belong *string
	Sex *string
	Birth *time.Time
}
*/
func ParseUserInfo(arg_byte []byte) (*sql_list.UserInfo,error){
	var info sql_list.UserInfo
	var info_ sql_list.UserInfo_
	err:=json.Unmarshal(arg_byte,&info_)
	if err!=nil {
		return nil,err
	}
	if info_.ID==nil {
		info.ID=0
	}else{
		info.ID=*(info_.ID)
	}
	
	info.UserName=info_.UserName
	if info_.Password==nil {
		info.Password.Valid=false
	}else{
		info.Password.Valid=true
		info.Password.String=*(info_.Password)
	}
	if info_.FamilyName==nil {
		info.FamilyName.Valid=false
	}else{
		info.FamilyName.Valid=true
		info.FamilyName.String=*(info_.FamilyName)
	}
	if info_.FirstName==nil {
		info.FirstName.Valid=false
	}else{
		info.FirstName.Valid=true
		info.FirstName.String=*(info_.FirstName)
	}
	info.Grade=info_.Grade
	if info_.Belong==nil {
		info.Belong.Valid=false
	}else{
		info.Belong.Valid=true
		info.Belong.String=*(info_.Belong)
	}
	if info_.Sex==nil {
		info.Sex.Valid=false
	}else{
		info.Sex.Valid=true
		info.Sex.String=*(info_.Sex)
	}
	info.Birth.Valid=false
	if info_.Birth!=nil {
		if *info_.Birth!="" {
			info.Birth.Valid=true
			info.Birth.Time,err=time.Parse(time.RFC3339Nano,*(info_.Birth))
			if err!=nil {
				return nil,err
			}
		}
	}
	return &info,nil
}

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

func User_GetMyUserInfo(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	allusers,err:=engine.X().SQLList.User().GetAllUser()
	if err!=nil {
		return nil,err
	}
	if err!=nil {
		return nil,err
	}
	for _,v := range allusers {
		if engine.X().CurrentUserID==v.ID {
			return UnparseUserInfo(v),nil
		}
	}
	return "",errors.New("No userinfo found!")
}


func User_UpdateUserInfo(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	info,err :=ParseUserInfo(arg_byte)
	if err!=nil {
		return nil,err
	}
	engine.X().SQLList.User().Update(*info)
	return nil,nil
}


func User_DeleteUserInfo(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	arg:=struct{UserName string;}{""}
	err:=json.Unmarshal(arg_byte,&arg)
	if err!=nil {
		return nil,err
	}
	if arg.UserName=="" {
		return nil,errors.New("Please specify username")
	}
	userid:=engine.X().SQLList.User().GetUserID(arg.UserName)
	if userid==0 {
		return nil,errors.New("UserName not existed")
	}
	userinfo,err:=engine.X().SQLList.Auth().User(userid).Pull()
	if err!=nil {
		return nil,err
	}
	for _,v:=range *(userinfo.Groups()) {
		arg:=struct{UserName string;GroupName string;}{arg.UserName,v}
		argstr,err:=json.Marshal(arg)
		if err!=nil {
			return nil,err
		}
		User_RemoveFromGroup([]byte(argstr),engine)
	}
	engine.X().SQLList.User().Delete(userid)
	engine.X().SQLList.Auth().User(userid).Destroy()
	return nil,nil
}

func User_UpdateMyUserInfo(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	info,err :=ParseUserInfo(arg_byte)
	if err!=nil {
		return nil,err
	}
	if info.ID!=engine.X().CurrentUserID {
		return nil,errors.New("Not your account")
	}
	return User_UpdateUserInfo(arg_byte,engine)
}

func User_DeleteMyUserInfo(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	arg:=struct{UserName string;}{""}
	err:=json.Unmarshal(arg_byte,&arg)
	if err!=nil {
		return nil,err
	}
	if arg.UserName=="" {
		return nil,errors.New("Please specify username")
	}
	userid:=engine.X().SQLList.User().GetUserID(arg.UserName)
	if userid==0 {
		return nil,errors.New("UserName not existed")
	}
	if userid!=engine.X().CurrentUserID {
		return nil,errors.New("Not your account")
	}
	return User_DeleteUserInfo(arg_byte,engine)
}

func User_AddToGroup(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	arg:=struct{UserName string;GroupName string;}{"",""}
	err:=json.Unmarshal(arg_byte,&arg)
	if err!=nil {
		return nil,err
	}
	if arg.UserName=="" {
		return nil,errors.New("Please specify UserName")
	}
	if arg.GroupName=="" {
		return nil,errors.New("Please specify GroupName")
	}
	userid:=engine.X().SQLList.User().GetUserID(arg.UserName)
	return nil,engine.X().SQLList.User().AddToGroup(userid,arg.GroupName)
}


func User_RemoveFromGroup(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	arg:=struct{UserName string;GroupName string;}{"",""}
	err:=json.Unmarshal(arg_byte,&arg)
	if err!=nil {
		return nil,err
	}
	if arg.UserName=="" {
		return nil,errors.New("Please specify UserName")
	}
	if arg.GroupName=="" {
		return nil,errors.New("Please specify GroupName")
	}
	userid:=engine.X().SQLList.User().GetUserID(arg.UserName)
	if userid==0 {
		return nil,errors.New("UserName not existed")
	}
	
	groupinfo,err:=engine.X().SQLList.Auth().Group(arg.GroupName).Pull()
	if err!=nil {
		return nil,err
	}
	newusers:=make([]int64,0,100)
	if slices.Contains(*(groupinfo.Users()),userid){
		for _,v := range *(groupinfo.Users()){
			if v!=userid {
				newusers=append(newusers,v)
				break
			}
		}
		*(groupinfo.Users())=newusers
		err:=engine.X().SQLList.Auth().Group(arg.GroupName).Push(groupinfo)
		if err!=nil {
			return nil,err
		}
	}
	
	
	userinfo,err:=engine.X().SQLList.Auth().User(userid).Pull()
	if err!=nil {
		return nil,err
	}
	newgroups:=make([]string,0,100)
	if slices.Contains(*(userinfo.Groups()),arg.GroupName){
		for _,v := range *(userinfo.Groups()){
			if v!=arg.GroupName {
				newgroups=append(newgroups,v)
				break
			}
		}
		*(userinfo.Groups())=newgroups
		err:=engine.X().SQLList.Auth().User(userid).Push(userinfo)
		if err!=nil {
			return nil,err
		}
	}
	return nil,nil
}

func User_Login(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	return Login(arg_byte,engine)
}

func User_Logout(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	if engine.X().CurrentUserID==0 {
		return nil,errors.New("You are not logged in lol.")
	}
	if engine.X().R.URL.Path!="/system/auth/logout" {
		http_tools.RedirectToURILoop("/system/auth/logout",engine.X().W,engine.X().R,http.StatusTemporaryRedirect)
		return nil,nil
	}
	v,err:=engine.X().R.Cookie(SESSIONID_NAME)
	if err==nil {
		engine.X().SQLList.Cookie().ATA().Delete(v.Value)
		http.SetCookie(engine.X().W,&http.Cookie{Name: SESSIONID_NAME,Value: "",MaxAge:-1,Path: "/"})
	}
	http.SetCookie(engine.X().W,&http.Cookie{Name: SLI_NAME,Value: "false",MaxAge:-1,Path: "/"})
	w,err:=engine.X().R.Cookie(ATA_NAME)
	if err==nil {
		engine.X().SQLList.Cookie().ATA().Delete(w.Value)
		http.SetCookie(engine.X().W,&http.Cookie{Name: ATA_NAME,HttpOnly:true,Value:"",MaxAge:-1,Path: "/system/auth"})
	}
	defer http_tools.RedirectToURIByQuery(engine.X().W,engine.X().R,http.StatusTemporaryRedirect)
	return nil,nil
	
}