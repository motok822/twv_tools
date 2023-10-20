//module github.com/windows-server-2003/twv_tools/pkg/functions
//login.go
package functions

import (
	"net/http"
	_ "database/sql"
	_ "github.com/windows-server-2003/twv_tools/pkg/sql_list"
	_ "log"
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
	"github.com/windows-server-2003/twv_tools/pkg/http_tools"
	"errors"
	"encoding/json"
)

const SESSIONID_NAME="GO_SESSION_ID"
const ATA_NAME="GO_ATA_ID"
const SLI_NAME="STAY_LOGGED_IN"//Stay Logged In


func Login(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	engine.X().CurrentUserID=0
	arg:=struct{UserName string;Password string;ATA bool}{"","",false}
	err:=json.Unmarshal(arg_byte,&arg)
	if err!=nil {
		return nil,err
	}
	userid:=engine.X().SQLList.User().GetUserID(arg.UserName)
	if userid!=0 {
		if !engine.X().SQLList.User().Confirm(userid,arg.Password){
			return nil,errors.New("username or password not correct")
		}
	}
	val,err:=login(userid,engine)
	if err!=nil||!arg.ATA {
		return val,err
	}
	return engine.Run("ATA_Set")
}

func login(userid int64,engine http_engine.HTTPEngine) (any,error){
	token,expire,err:=engine.X().SQLList.Cookie().Session().Add(userid)
	if err!=nil {
		return nil,errors.New("Failed to allocate sessionid")
	}
	http.SetCookie(engine.X().W,&http.Cookie{Name: SESSIONID_NAME,Value: token,Expires: expire,Path: "/"})
	engine.X().CurrentUserID=userid
	return struct{Status string}{"succeed"},nil
}

func ATA_Login(arg_byte []byte,engine http_engine.HTTPEngine) (any,error) {
	if engine.X().R.URL.Path!="/system/auth/ata/login" {
		http_tools.RedirectToURILoop("/system/auth/ata/login",engine.X().W,engine.X().R,http.StatusTemporaryRedirect)
		return nil,nil
	}
	defer http_tools.RedirectToURIByQuery(engine.X().W,engine.X().R,http.StatusTemporaryRedirect)
	w,err:=engine.X().R.Cookie(SLI_NAME)
	if err!=nil||(w.Value!="true"&&w.Value!="True"&&w.Value!="TRUE") {
		return nil,errors.New("No ATA	token set")
	}
	v,err:=engine.X().R.Cookie(ATA_NAME)
	if err!=nil {
		w.Value="False"
		http.SetCookie(engine.X().W,w)
		return nil,errors.New("No ATA token set")
	}
	userid,err:=engine.X().SQLList.Cookie().ATA().GetUserID(v.Value)
	if err!=nil {
		w.Value="False"
		http.SetCookie(engine.X().W,w)
		v.MaxAge=0
		http.SetCookie(engine.X().W,v)
		return nil,err
	}
	_,err=login(userid,engine)
	if err!=nil {
		return nil, err
	}
	engine.X().SQLList.Cookie().ATA().Delete(v.Value)
	
	w.Value="False"
	http.SetCookie(engine.X().W,w)
	v.MaxAge=0
	http.SetCookie(engine.X().W,v)
	
	return nil,ATA_set(userid,engine)
}
func ATA_Set(arg []byte,engine http_engine.HTTPEngine) (any,error) {
	w,err:=engine.X().R.Cookie(SLI_NAME)
	if err==nil&&(w.Value=="true"||w.Value=="True"||w.Value=="TRUE") {
		return nil,errors.New("ATA already set")
	}

	if engine.X().R.URL.Path!="/system/auth/ata/set" {
		http_tools.RedirectToURILoop("/system/auth/ata/set",engine.X().W,engine.X().R,http.StatusTemporaryRedirect)
		return nil,nil
	}
	
	defer http_tools.RedirectToURIByQuery(engine.X().W,engine.X().R,http.StatusTemporaryRedirect)
	
	err=ATA_set(engine.X().CurrentUserID,engine)
	if err!=nil {
		return nil,err
	}
	return struct{Status string}{"succeed"},nil
}



func ATA_set(userid int64,engine http_engine.HTTPEngine) error{
	token,expire,err:=engine.X().SQLList.Cookie().ATA().Add(userid)
	if err!=nil {
		return err
	}
	http.SetCookie(engine.X().W,&http.Cookie{Name: SLI_NAME,Value: "true",Expires: expire,Path: "/"})
	http.SetCookie(engine.X().W,&http.Cookie{Name: ATA_NAME,HttpOnly:true,Value: token,Expires: expire,Path: "/system/auth"})
	return nil
}
