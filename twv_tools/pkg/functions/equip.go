//module github.com/windows-server-2003/twv_tools/pkg/functions
//login.go
package functions

import (
	_ "net/http"
	_ "database/sql"
	"github.com/windows-server-2003/twv_tools/pkg/sql_list"
	_ "log"
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
	_ "github.com/windows-server-2003/twv_tools/pkg/http_tools"
	_ "errors"
	"encoding/json"
	"fmt"
	"time"
	_ "strconv"
)



func GetEquipByTime(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	arg:=struct{Start string;End string;}{"",""}
	err:=json.Unmarshal(arg_byte,&arg)
	if err!=nil {
		return nil,err
	}
	StartTime,err:=time.Parse(time.RFC3339Nano,arg.Start)
	if err!=nil {
		return nil,err
	}
	EndTime,err:=time.Parse(time.RFC3339Nano,arg.End)
	if err!=nil {
		return nil,err
	}
	
	val,err:=engine.X().SQLList.Equip().Infos().Pull(StartTime,EndTime)
	if err!=nil {
		return nil,err
	}
	var result=""
	for _,v:=range val {
		result=result+fmt.Sprint(v.ID)+","
		result=result+fmt.Sprint(v.UserID)+","
		result=result+fmt.Sprint(v.EquipID)+","
		result=result+v.Act+","
		result=result+v.T1.Format(time.RFC3339Nano)+","
		if v.T2.Valid {
			result=result+v.T2.Time.Format(time.RFC3339Nano)
		}
		result=result+","
		if v.MoveDest.Valid {
			result=result+v.MoveDest.String
		}
		result=result+","
		if v.PlanID.Valid {
			result=result+fmt.Sprint(v.PlanID.Int64)
		}
		result=result+","
		
	}
	if result=="" {
		return result,nil
	}
	return result[:len(result)-1],nil
	
}

func RegisterEquipInfo(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	arg:=struct{ID uint64;UserID uint64;EquipID uint64;Act string;T1 string;T2 string;MoveDest string;PlanID int64}{}
	err:=json.Unmarshal(arg_byte,&arg)
	if err!=nil {
		return nil,err
	}
	
	var info sql_list.EquipInfo
	info.ID=arg.ID
	info.UserID=arg.UserID
	info.EquipID=arg.EquipID
	info.Act=arg.Act
	info.T1,err=time.Parse(time.RFC3339Nano,arg.T1)
	if err!=nil {
		return nil,err
	}
	if arg.T1!="" {
		info.T2.Valid=true
		info.T2.Time,err=time.Parse(time.RFC3339Nano,arg.T2)
		if err!=nil {
			return nil,err
		}
	}else{
		info.T2.Valid=false
	}
	if arg.MoveDest=="" {
		info.MoveDest.Valid=false
	}else{
		info.MoveDest.Valid=true
		info.MoveDest.String=arg.MoveDest
	}
	if arg.PlanID==0 {
		info.PlanID.Valid=false
	}else{
		info.PlanID.Valid=true
		info.PlanID.Int64=arg.PlanID
	}
	
	return nil,engine.X().SQLList.Equip().Infos().Update(info)
}
