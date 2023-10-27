//module github.com/windows-server-2003/twv_tools/pkg/http_tools
//redirect.go
package http_tools
import (
	"net/http"
	"net/url"
	_ "github.com/windows-server-2003/twv_tools/pkg/http_engine"
)


func RedirectTo(dest string,w http.ResponseWriter,code int){
	w.Header().Set("Location",dest)
	w.WriteHeader(code)
}
func RedirectToURI(desturi string,w http.ResponseWriter,r *http.Request,code int){
	RedirectTo(desturi,w,code)
}
func RedirectToURILoop(desturi string,w http.ResponseWriter,r *http.Request,code int){
	RedirectToURI(desturi+"?RedirectURI="+url.QueryEscape(r.RequestURI),w,r,code)
}
func RedirectToURILoopModeUnauthrized(desturi string,w http.ResponseWriter,r *http.Request,code int){
	RedirectToURI(desturi+"?mode=unauthorized&RedirectURI="+url.QueryEscape(r.RequestURI),w,r,code)
}
func RedirectToURIByQuery(w http.ResponseWriter,r *http.Request,code int) bool{
	err:=r.ParseForm()
	if err!=nil {
		return false
	}
	if val,ok:=r.Form["RedirectURI"];ok {
		RedirectToURI(val[0],w,r,code)
		return true
	}
	return false
}