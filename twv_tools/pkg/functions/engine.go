//module github.com/windows-server-2003/twv_tools/pkg/functions
//server.go
package functions

import (
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
	_ "log"
)


func Initialize(server http_engine.HTTPServer){
	//login_old
	
	server.Register(Login,"Login")
	AuthGroupToFunc(server.SQLList(),"Login","Guests","Exec",1)
	AuthGroupToFunc(server.SQLList(),"Login","Users","Exec",1)
	server.Register(ATA_Login,"ATA_Login")
	AuthGroupToFunc(server.SQLList(),"ATA_Login","Guests","Exec",1)
	AuthGroupToFunc(server.SQLList(),"ATA_Login","Users","Exec",1)
	server.Register(ATA_Set,"ATA_Set")
	AuthGroupToFunc(server.SQLList(),"ATA_Set","Guests","Exec",1)
	AuthGroupToFunc(server.SQLList(),"ATA_Set","Users","Exec",1)
	
	//file
	//server.Register(UploadRaw,"UploadRaw")
	//equip
	server.Register(GetEquipByTime,"GetEquipByTime")
	AuthGroupToFunc(server.SQLList(),"GetEquipByTime","Users","Exec",1)
	server.Register(RegisterEquipInfo,"RegisterEquipInfo")
	AuthGroupToFunc(server.SQLList(),"RegisterEquipInfo","Users","Exec",1)
	server.Register(GetEquipTree,"GetEquipTree")
	AuthGroupToFunc(server.SQLList(),"GetEquipTree","Users","Exec",1)
	server.Register(Equip_GetAll,"Equip_GetAll")
	AuthGroupToFunc(server.SQLList(),"Equip_GetAll","Users","Exec",1)
	server.Register(Equip_RegisterInfos,"Equip_RegisterInfos")
	AuthGroupToFunc(server.SQLList(),"Equip_RegisterInfos","Users","Exec",1)
	//user
	server.Register(User_GetUsers,"User_GetUsers")
	AuthGroupToFunc(server.SQLList(),"User_GetUsers","Users","Exec",1)
	server.Register(User_GetGroup,"User_GetGroup")
	server.Register(User_GetAll,"User_GetAll")
	server.Register(User_GetMyUserInfo,"User_GetMyUserInfo")
	AuthGroupToFunc(server.SQLList(),"User_GetMyUserInfo","Guests","Exec",1)
	AuthGroupToFunc(server.SQLList(),"User_GetMyUserInfo","Users","Exec",1)
	server.Register(User_UpdateUserInfo,"User_UpdateUserInfo")
	server.Register(User_DeleteUserInfo,"User_DeleteUserInfo")
	server.Register(User_UpdateMyUserInfo,"User_UpdateMyUserInfo")
	AuthGroupToFunc(server.SQLList(),"User_UpdateMyUserInfo","Users","Exec",1)
	AuthGroupToFunc(server.SQLList(),"User_UpdateMyUserInfo","Guests","Exec",1)
	server.Register(User_DeleteMyUserInfo,"User_DeleteMyUserInfo")
	AuthGroupToFunc(server.SQLList(),"User_DeleteMyUserInfo","Users","Exec",1)
	server.Register(User_AddToGroup,"User_AddToGroup")
	server.Register(User_RemoveFromGroup,"User_RemoveFromGroup")
	server.Register(User_Login,"User_Login")
	AuthGroupToFunc(server.SQLList(),"User_Login","Guests","Exec",1)
	AuthGroupToFunc(server.SQLList(),"User_Login","Users","Exec",1)
	server.Register(User_Logout,"User_Logout")
	AuthGroupToFunc(server.SQLList(),"User_Logout","Guests","Exec",1)
	AuthGroupToFunc(server.SQLList(),"User_Logout","Users","Exec",1)
	
	//plan
	server.Register(GetPlanByTime,"GetPlanByTime")
	AuthGroupToFunc(server.SQLList(),"GetPlanByTime","Users","Exec",1)
	server.Register(Plan_Update,"Plan_Update")
	AuthGroupToFunc(server.SQLList(),"Plan_Update","Users","Exec",1)
	
	
	//files
	AuthGroupToFile(server.SQLList(),"/js/api_mgr","Guests","Read",1)
	AuthGroupToFile(server.SQLList(),"/js/api_mgr","Users","Read",1)
	AuthGroupToFile(server.SQLList(),"/account","Guests","Read",1)
	AuthGroupToFile(server.SQLList(),"/account","Users","Read",1)
	AuthGroupToFile(server.SQLList(),"/dist/manifest.json","Guests","Read",1)
	AuthGroupToFile(server.SQLList(),"/dist","Users","Read",1)
	AuthGroupToFile(server.SQLList(),"/maxlimit","Guests","Read",1)
	AuthGroupToFile(server.SQLList(),"/maxlimit","Users","Read",1)
	
	
	
}

