//module github.com/windows-server-2003/twv_tools/pkg/http_engine
//main.go
package http_engine

import (
	//"github.com/windows-server-2003/twv_tools/pkg/functions"
	"github.com/windows-server-2003/twv_tools/pkg/sql_list"
	"net/http"
	"net/url"
)

type EngineFunc func ([]byte,HTTPEngine) (any,error)


type HTTPEngine interface {
	Register(EngineFunc,string)
	ServeHTTP(http.ResponseWriter,*http.Request)
	Run(string) (any,error)
	Exec(string,any) (any,error)
	X() *HTTPEngineX
}

type HTTPEngineX struct {
	W http.ResponseWriter
	R *http.Request
	SQLList sql_list.SQLList
	CurrentUserID uint64
	ParseURL *url.URL
}
