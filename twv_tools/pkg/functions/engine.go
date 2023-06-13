//module github.com/windows-server-2003/twv_tools/pkg/functions
//engine.go
package functions

import (
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
)


func Initialize(engine http_engine.HTTPEngine){
	engine.Register(Login,"Login")
	engine.Register(ATA_Login,"ATA_Login")
	engine.Register(ATA_Set,"ATA_Set")
	engine.Register(UploadRaw,"UploadRaw")
	engine.Register(GetEquipByTime,"GetEquipByTime")
	engine.Register(RegisterEquipInfo,"RegisterEquipInfo")
}

