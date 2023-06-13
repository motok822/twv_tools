//module github.com/windows-server-2003/twv_tools/pkg/html_transport
//main.go
package html_transport
import (
	"os"
	"io"
	"path/filepath"
	"strings"
	"errors"
)

var public_path_relative string
var public_path_abs string

func init(){
	public_path_relative="../../public"
	public_path_abs,_=filepath.Abs(public_path_relative)
}


func AccessLocalFile(filename string,dst io.Writer) (*os.File,error){
	var file *os.File
	filename=public_path_relative+filename
	filename,err:=filepath.Abs(public_path_relative+filename)
	if err!= nil {
		return file,err
	}
	if strings.Index(filename,public_path_abs) != 0 {
		err:=errors.New("the path is forbidden")
		return file,err
	}
	file,err=os.Open(filename)
	if err!=nil{
		return file,err
	}
	return file,nil
}