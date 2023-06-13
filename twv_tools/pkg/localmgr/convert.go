//module github.com/windows-server-2003/twv_tools/pkg/localmgr
//main.go
package localmgr
import (
	"path/filepath"
	"strings"
	"errors"
	"log"
)

var public_path_relative string
var public_path_abs string

func init(){
	public_path_relative="../../public"
	public_path_abs,_=filepath.Abs(public_path_relative)
}


func ConvertPath(filename string) (string,error){
	log.Print(public_path_abs)
	filename=public_path_relative+filename
	filename,err:=filepath.Abs(public_path_relative+filename)
	if err!= nil {
		return filename,err
	}
	if strings.Index(filename,public_path_abs) != 0 {
		return filename,errors.New("the path is forbidden")
	}
	return filename,nil
}