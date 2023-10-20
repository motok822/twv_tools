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
	ServeHTTP()
	Run(string) (any,error)
	Exec(string,any) (any,error)
	X() *HTTPEngineX
}

type HTTPEngineX struct {
	W http.ResponseWriter
	R *http.Request
	SQLList sql_list.SQLList
	CurrentUserID int64
	ParseURL *url.URL
}

type HTTPServer interface {
	ServeHTTP(http.ResponseWriter,*http.Request)
	Register(EngineFunc,string)
	SQLList() sql_list.SQLList
}