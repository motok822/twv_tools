//module github.com/windows-server-2003/twv_tools/pkg/http_tools
//minetype.go
package http_tools
import (
	"net/http"
	_ "net/url"
	"strings"
	_ "github.com/windows-server-2003/twv_tools/pkg/http_engine"
)

var MINETYPE=map[string]string{".txt":"text/plain",".text":"text/plain",".csv":"text/csv",".html":"text/html",".css":"text/css",".js":"text/javascript",".json":"application/json",".pdf":"application/pdf",".jpeg":"image/jpeg",".jpg":"image/jpeg",".png":"image/png",".gif":"image/gif",".svg":"image/svg+xml",".zip":"application/zip",".mp4":"video/mpeg"}


func AttachMINETYPE(w http.ResponseWriter,path string){
	var index int
	if index=strings.LastIndex(path,".");index==-1{
		return
	}
	val,ok:=MINETYPE[path[index:]]
	if !ok {
		return
	}	
	w.Header().Set("Content-Type",val)
}

