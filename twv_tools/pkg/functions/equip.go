//module github.com/windows-server-2003/twv_tools/pkg/functions
//equip.go
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
	"strconv"
	"strings"
)


func UnParseEquipInfo(info *sql_list.EquipInfo) string {
	str:=""
	str=str+fmt.Sprint(info.ID)+","
	str=str+fmt.Sprint(info.UserID)+","
	str=str+fmt.Sprint(info.EquipID)+","
	str=str+info.Act+","
	str=str+info.T1.Format(time.RFC3339Nano)+","
	if info.T2.Valid {
		str=str+info.T2.Time.Format(time.RFC3339Nano)
	}
	str=str+","
	if info.MoveDest.Valid {
		str=str+info.MoveDest.String
	}
	str=str+","
	if info.PlanID.Valid {
		str=str+fmt.Sprint(info.PlanID.Int64)
	}
	str=str+","
	return str
}

func ParseEquipInfos(str string) ([]*sql_list.EquipInfo,error){
	strarr:=strings.Split(str,",")
	infos:=make([]*sql_list.EquipInfo,0,100)
	var err error
	var tempint int
	for i:=0;i<len(strarr)/8;i++ {
		var info sql_list.EquipInfo
		var j=i*8
		if strarr[j]=="" {
			info.ID=-1
		}else{
			tempint,err=strconv.Atoi(strarr[j])
			info.ID=int64(tempint)
			if err!=nil {
				return nil,err
			}
		}		
		j++
		tempint,err=strconv.Atoi(strarr[j])
		info.UserID=int64(tempint)
		if err!=nil {
			return nil,err
		}
		j++
		tempint,err=strconv.Atoi(strarr[j])
		info.EquipID=int64(tempint)
		if err!=nil {
			return nil,err
		}
		j++
		info.Act=strarr[j]
		j++
		info.T1,err=time.Parse(time.RFC3339Nano,strarr[j])
		if err!=nil {
			return nil,err
		}
		j++
		if strarr[j]=="" {
			info.T2.Valid=false
		}else{
			info.T2.Valid=true
			info.T2.Time,err=time.Parse(time.RFC3339Nano,strarr[j])
			if err!=nil {
				return nil,err
			}
		}
		j++
		if strarr[j]=="" {
			info.MoveDest.Valid=false
		}else{
			info.MoveDest.Valid=true
			info.MoveDest.String=strarr[j]
		}
		j++
		if strarr[j]=="" {
			info.PlanID.Valid=false
		}else{
			info.PlanID.Valid=true
			tempint,err=strconv.Atoi(strarr[j])
			info.PlanID.Int64=int64(tempint)
			if err!=nil {
				return nil,err
			}
		}		
		j++
		infos=append(infos,&info)
	}
	return infos,nil
}

func Equip_RegisterInfos(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	infos,err:=ParseEquipInfos(string(arg_byte))
	if err!=nil {
		return nil,err
	}
	for _,v:=range infos {
		err=engine.X().SQLList.Equip().Infos().Update(*v)
		if err!=nil {
			return nil,err
		}
	}
	return nil,nil
}

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
		result=result+UnParseEquipInfo(v)
	}
	if result=="" {
		return result,nil
	}
	return result[:len(result)-1],nil
	
}

func RegisterEquipInfo(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	arg:=struct{ID int64;UserID int64;EquipID int64;Act string;T1 string;T2 string;MoveDest string;PlanID int64}{}
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

func UnParseEquipClass(class *sql_list.EquipClass) string {
	str:=""
	str=str+fmt.Sprint(class.ID)+","
	if class.ParentID.Valid {
		str=str+fmt.Sprint(class.ParentID.Int64)
	}
	str=str+","
	str=str+class.Name+","
	return str
}

func Equip_GetAll(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	val,err:=engine.X().SQLList.Equip().Classes().Pull()
	if err!= nil {
		return nil,err
	}
	var result=""
	for _,v:=range val {
		result=result+UnParseEquipClass(v)
	}
	if result=="" {
		return result,nil
	}
	return result[:len(result)-1],nil
	

}

func GetEquipTree(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
	return Equip_GetAll(arg_byte,engine)
}
