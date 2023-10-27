//module github.com/windows-server-2003/twv_tools/pkg/http_engine_init
//http_engine.go
package http_engine_imp

import (
	"github.com/windows-server-2003/twv_tools/pkg/sql_list"
	//"github.com/windows-server-2003/twv_tools/pkg/http_tools"
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
	"github.com/windows-server-2003/twv_tools/pkg/http_tools"
	"net/http"
	"errors"
	"log"
	"os"
	"io"
	"github.com/windows-server-2003/twv_tools/pkg/localmgr"
	"encoding/json"
	"fmt"
	"strings"
	"bytes"
	"net/url"
	"io/ioutil"
)

type httpserver struct {
	sqllist sql_list.SQLList
	funclist map[string] http_engine.EngineFunc
}

func NewHTTPServer(sqllist sql_list.SQLList) http_engine.HTTPServer{
	var server httpserver
	server.sqllist=sqllist
	server.funclist=make(map[string] http_engine.EngineFunc)
	return &server
}

func (server *httpserver) ServeHTTP(w http.ResponseWriter,r *http.Request){
	var engine httpengine
	engine.funclist=server.funclist
	engine.w=w
	engine.r=r
	engine.sqllist=server.sqllist
	engine.ServeHTTP()
}

type httpengine struct {
	funclist map[string] http_engine.EngineFunc
	w http.ResponseWriter
	r *http.Request
	sqllist sql_list.SQLList
	CurrentUserID int64
	parseURL *url.URL
}


func (engine *httpengine) ServeHTTP(){
	log.Print(engine.r.RequestURI)
	engine.CurrentUserID=0
	err:=engine.r.ParseForm()
	if err!=nil {
		log.Print("ParseForm Failed")
		http_tools.WriteErrorAuto(http.StatusBadRequest,engine)
		return
	}
	if engine.r.URL.Path=="/dist/manifest.json" {
		engine.DeployLocalFile()
		return
	}
	
	//about user_info
	if redirect:=engine.getLoginInfo();redirect {
		return
	}
	//system
	if strings.Index(engine.r.RequestURI,"/system/")==0 {
		if engine.r.URL.Path=="/system/auth/ata/set" {
			engine.Run("ATA_Set")
			return
		}
		if engine.r.URL.Path=="/system/auth/ata/login" {
			engine.Run("ATA_Login")
			return
		}
		if engine.r.URL.Path=="/system/auth/logout" {
			engine.Run("User_Logout")
			return
		}
		
		http_tools.WriteErrorAuto(http.StatusNotFound,engine)
	}
	
	if strings.Index(engine.r.RequestURI,"/func/")==0 {
		_,err:=engine.Run(engine.r.URL.Path[len("/func/"):])
		if err!=nil {
			log.Print(err.Error())
		}
		return
	}
	engine.DeployLocalFile()
	
	
	
}

func (engine *httpengine) DeployLocalFile(){
	log.Print("llog:",engine.r.URL.Path)
	if !sql_list.Certificate("Read",engine.sqllist.Auth().File(engine.r.URL.Path),engine.sqllist.Auth().User(engine.CurrentUserID)){
		http_tools.RedirectToURILoopModeUnauthrized("/account/main.html",engine.X().W,engine.X().R,http.StatusTemporaryRedirect)
		return
	}
	filename,err:=localmgr.ConvertPath(engine.r.URL.Path)
	if err!=nil {
		http_tools.WriteErrorAuto(http.StatusNotFound,engine)
		return
	}
	http_tools.AttachMINETYPE(engine.X().W,filename)
	file,err:=os.Open(filename)
	if err!=nil{
		http_tools.WriteErrorAuto(http.StatusNotFound,engine)
		return
	}
	_,err=io.Copy(engine.w,file)
	if err!=nil{
		http_tools.WriteErrorAuto(http.StatusInternalServerError,engine)
	}
}



func (server *httpserver) Register(f http_engine.EngineFunc,funcname string){
	server.funclist[funcname]=f
}

func (server *httpserver) SQLList() sql_list.SQLList{
	return server.sqllist
}

func (engine *httpengine) Run(funcname string) (any,error){
	if !sql_list.Certificate("Exec",engine.sqllist.Auth().Func(funcname),engine.sqllist.Auth().User(engine.CurrentUserID)) {
		err:=errors.New("@"+funcname+" By User("+fmt.Sprint(engine.CurrentUserID)+"):unauthorized")
		engine.X().W.WriteHeader(http.StatusUnauthorized)
		val,err2:=json.Marshal(struct{Error string}{err.Error()})
		if err2==nil {//Write called after Handler finished
			bb:=bytes.NewReader(val)
			io.Copy(engine.w,bb)
		}
		return nil,err
	}
	b,err:=ioutil.ReadAll(engine.X().R.Body)
	if err!=nil {
		return nil,err
	}
	arg:=[]byte(b)
	if f,ok:=engine.funclist[funcname];ok {
		var val []byte
		v,err:=f(arg,engine)
		if err!=nil {
			log.Print(err.Error())
			val,err=json.Marshal(struct{Error string}{err.Error()})
		}else{
			val,err=json.Marshal(v)
		}
		if err!=nil {
			return v,err
		}
		bb:=bytes.NewReader(val)
		io.Copy(engine.w,bb)
		return v,err
	}else{
		err:=errors.New("@"+funcname+" Such function not found")
		engine.X().W.WriteHeader(http.StatusNotFound)
		val,err2:=json.Marshal(struct{Error string}{err.Error()})
		if err2==nil {//Write called after Handler finished
			bb:=bytes.NewReader(val)
			io.Copy(engine.w,bb)
		}
		return nil,err
	}
}

func (engine *httpengine) Exec(funcname string,v any) (any,error){
	arg,err:=json.Marshal(v)
	if err!=nil {
		return nil,err
	}
	if f,ok:=engine.funclist[funcname];ok {
		return f(arg,engine)
	}else{
		return nil,errors.New("No function found")
	}
}


func (engine *httpengine) X() *http_engine.HTTPEngineX{
	enginex:=http_engine.HTTPEngineX{engine.w,engine.r,engine.sqllist,engine.CurrentUserID,engine.parseURL}
	return &enginex
}