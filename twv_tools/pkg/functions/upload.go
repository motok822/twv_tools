//module github.com/windows-server-2003/twv_tools/pkg/functions
//upload.go
package functions

import (
	_ "net/http"
	_ "database/sql"
	"github.com/windows-server-2003/twv_tools/pkg/sql_list"
	_ "log"
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
	_ "github.com/windows-server-2003/twv_tools/pkg/http_tools"
	"github.com/windows-server-2003/twv_tools/pkg/localmgr"
	"errors"
	_ "encoding/json"
	"os"
	"io"
	"bytes"
)


func UploadRaw(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	var dest string
	if val,ok:=engine.X().R.Form["Dest"];ok {
		dest=val[0]
	}else{
		return nil,errors.New("dest is not specified")
	}
	if !sql_list.Certificate("Write",engine.X().SQLList.Auth().File(dest),engine.X().SQLList.Auth().User(engine.X().CurrentUserID)){
		return nil,errors.New("not authorized")
	}
	filepath,err:=localmgr.ConvertPath(dest)
	if err!=nil {
		return nil,err
	}
	file,err:=os.Create(filepath)
	defer file.Close()
	_,err=io.Copy(file,bytes.NewReader(arg_byte))
	return nil,err
}