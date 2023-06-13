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

type httpengine struct {
	w http.ResponseWriter
	r *http.Request
	sqllist sql_list.SQLList
	funclist map[string] http_engine.EngineFunc
	currentUserID uint64
	servername string
	parseurl *url.URL
}

func NewHTTPEngine(servername string,sqllist sql_list.SQLList) http_engine.HTTPEngine{
	var engine httpengine
	engine.sqllist=sqllist
	engine.servername=servername
	engine.funclist=make(map[string] http_engine.EngineFunc)
	return &engine
}


func (engine *httpengine) ServeHTTP(w http.ResponseWriter,r *http.Request){
	log.Print(r.RequestURI)
	engine.currentUserID=0
	engine.w=w
	engine.r=r
	err:=r.ParseForm()
	if err!=nil {
		log.Print("ParseForm Failed")
		http_tools.WriteErrorAuto(http.StatusBadRequest,engine)
		return
	}
	
	
	//about user_info
	if redirect:=engine.getLoginInfo();redirect {
		return
	}
	//system
	if strings.Index(r.RequestURI,"/system/")==0 {
		if r.URL.Path=="/system/auth/ata/set" {
			engine.Run("ATA_Set")
			return
		}
		if r.URL.Path=="/system/auth/ata/login" {
			engine.Run("ATA_Login")
			return
		}
		
		http_tools.WriteErrorAuto(http.StatusNotFound,engine)
	}
	
	if strings.Index(r.RequestURI,"/func/")==0 {
		_,err:=engine.Run(r.URL.Path[len("/func/"):])
		if err!=nil {
			log.Print(err.Error())
		}
		return
	}
	engine.DeployLocalFile()
	
	
	
}

func (engine *httpengine) DeployLocalFile(){
	if !sql_list.Certificate("Read",engine.sqllist.Auth().File(engine.r.URL.Path),engine.sqllist.Auth().User(engine.currentUserID)){
		log.Print("failed")
		http_tools.WriteErrorAuto(http.StatusNotFound,engine)
		return
	}
	
	filename,err:=localmgr.ConvertPath(engine.r.URL.Path)
	if err!=nil {
		http_tools.WriteErrorAuto(http.StatusNotFound,engine)
		return
	}
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



func (engine *httpengine) Register(f http_engine.EngineFunc,funcname string){
	engine.funclist[funcname]=f
}

func (engine *httpengine) Run(funcname string) (any,error){
	if !sql_list.Certificate("Exec",engine.sqllist.Auth().Func(funcname),engine.sqllist.Auth().User(engine.currentUserID)) {
		err:=errors.New("@"+funcname+" By User("+fmt.Sprint(engine.currentUserID)+"):unauthorized")
		val,err2:=json.Marshal(struct{Error string}{err.Error()})
		if err2==nil {
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
		return nil,errors.New("No function found")
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
	enginex:=http_engine.HTTPEngineX{engine.w,engine.r,engine.sqllist,engine.currentUserID,engine.parseurl}
	return &enginex
}