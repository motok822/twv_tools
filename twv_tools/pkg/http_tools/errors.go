//module github.com/windows-server-2003/twv_tools/pkg/http_tools
//redirect.go
package http_tools
import (
	"net/http"
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
	"io"
	"strings"
)


var MINE_type=map[string]string{".txt":"text/plain",".text":"text/plain",".csv":"text/csv",".html":"text/html",".css":"text/css",".js":"text/javascript",".json":"application/json",".pdf":"application/pdf",".jpeg":"image/jpeg",".jpg":"image/jpeg",".png":"image/png",".gif":"image/gif",".svg":"image/svg+xml",".zip":"application/zip",".mp4":"video/mpeg"}

func GetMinetype(filename string) string {
	index:=strings.LastIndex(filename,".")
	if index==-1 {
		return ""
	}
	minetype,ok:=MINE_type[filename[index:]]
	if !ok {
		minetype=""
	}
	return minetype
}


func WriteErrorAuto(code int,engine http_engine.HTTPEngine){
	engine.X().W.WriteHeader(code)
	minetype:=GetMinetype(engine.X().R.RequestURI)
	switch(code){
	case 404:
		switch(minetype){
		case "text/html":
			io.WriteString(engine.X().W,"<div>"+http.StatusText(code)+"<br></br>"+"RequestedURI:"+engine.X().R.RequestURI+"</div>")
			break
		case "text/plain":
			io.WriteString(engine.X().W,http.StatusText(code)+"\n"+"RequestedURI:"+engine.X().R.RequestURI)
			break	
		default:
			break
		}
		break
	default:
		break
	}
	
}
