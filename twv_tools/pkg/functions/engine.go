//module github.com/windows-server-2003/twv_tools/pkg/functions
//server.go
package functions

import (
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
)


func Initialize(server http_engine.HTTPServer){
	//login
	server.Register(Login,"Login")
	server.Register(ATA_Login,"ATA_Login")
	server.Register(ATA_Set,"ATA_Set")
	//file
	server.Register(UploadRaw,"UploadRaw")
	//equip
	server.Register(GetEquipByTime,"GetEquipByTime")
	server.Register(RegisterEquipInfo,"RegisterEquipInfo")
	server.Register(GetEquipTree,"GetEquipTree")
	server.Register(Equip_GetAll,"Equip_GetAll")
	server.Register(Equip_RegisterInfos,"Equip_RegisterInfos")
	//user
	server.Register(User_GetUsers,"User_GetUsers")
	//plan
	server.Register(GetPlanByTime,"GetPlanByTime")
	
}

