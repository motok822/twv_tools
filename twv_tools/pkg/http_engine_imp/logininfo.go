//module github.com/windows-server-2003/twv_tools/pkg/http_engine_init
//logininfo.go
package http_engine_imp

import (
	//"github.com/windows-server-2003/twv_tools/pkg/functions"
	_ "github.com/windows-server-2003/twv_tools/pkg/sql_list"
	_ "github.com/windows-server-2003/twv_tools/pkg/http_tools"
	_ "github.com/windows-server-2003/twv_tools/pkg/http_engine"
	_ "net/http"
	"log"
	_ "time"
	_ "encoding/json"
	"strings"
)


const SESSIONID_NAME="GO_SESSION_ID"
const ATA_NAME="GO_ATA_ID"
const SLI_NAME="STAY_LOGGED_IN"//Stay Logged In

func (engine *httpengine) getLoginInfo() bool{//whether redirected or not
	if v,err:=engine.r.Cookie(SESSIONID_NAME);err!=nil{
		//session id not set
		log.Print("session id not set")
		if w,err:=engine.r.Cookie(SLI_NAME);err!=nil||(w.Value!="true"&&w.Value!="True"&&w.Value!="TRUE"){
			//guest
			_,err=engine.Exec("Login",struct{Username string;Password string;ATA bool}{"Guest","anything",false})
			
			if err!=nil {
				log.Print(err.Error())
			}
			
		}else{
			if strings.Index(engine.r.RequestURI,"/system/auth")!=0 {
				engine.Run("ATA_Login")
				return true
			}
		}
		
	}else{
		//sessionid set
		log.Print("sessionid set")
		userid,err:=engine.sqllist.Cookie().Session().GetUserID(v.Value)
		if err!=nil {
			//incorrect sessionid!
			engine.Exec("login",struct{username string;password string}{"Guest","anything"})
		}else{
			engine.currentUserID=userid
		}
	}
	return false
}

