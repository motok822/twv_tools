//module github.com/windows-server-2003/twv_tools/pkg/functions
//plan.go
package functions

import (
	_ "net/http"
	_ "database/sql"
	"github.com/windows-server-2003/twv_tools/pkg/sql_list"
	"log"
	"github.com/windows-server-2003/twv_tools/pkg/http_engine"
	_ "github.com/windows-server-2003/twv_tools/pkg/http_tools"
	_ "errors"
	"encoding/json"
	"fmt"
	"time"
	_ "strconv"
)


func UnParsePlan(plan *sql_list.PlanInfo) (string){
	str:=""
	str=str+fmt.Sprint(plan.ID)+","
	str=str+plan.Name+","
	str=str+fmt.Sprint(plan.FYear)+","
	str=str+plan.PlanType+","
	if plan.PlanNum.Valid {
		str=str+fmt.Sprint(plan.PlanNum.Int64)
	}
	str=str+","
	if plan.ReserveStart.Valid {
		str=str+plan.ReserveStart.Time.Format(time.RFC3339Nano)
	}
	str=str+","
	if plan.ReserveEnd.Valid {
		str=str+plan.ReserveEnd.Time.Format(time.RFC3339Nano)
	}
	str=str+","
	if plan.ClimeStart.Valid {
		str=str+plan.ClimeStart.Time.Format(time.RFC3339Nano)
	}
	str=str+","
	if plan.ClimeEnd.Valid {
		str=str+plan.ClimeEnd.Time.Format(time.RFC3339Nano)
	}
	str=str+","
	str=str+plan.LastUpdate.Format(time.RFC3339Nano)+","
	if plan.Members.Valid {
		str=str+plan.Members.String
	}
	str=str+","
	
	return str
}
/*
type PlanInfo struct {
	ID int64
	Name string
	FYear int64
	PlanType string
	PlanNum sql.NullInt64
	ReserveStart sql.NullTime
	ReserveEnd sql.NullTime
	ClimeStart sql.NullTime
	ClimeEnd sql.NullTime
	LastUpdate time.Time
	Members sql.NullString
}
type PlanInfo_ struct {
	ID int64
	Name string
	FYear int64
	PlanType string
	PlanNum *int64
	ReserveStart *time.Time
	ReserveEnd *time.Time
	ClimeStart *time.Time
	ClimeEnd *time.Time
	LastUpdate *time.Time
	Members *string
}
*/

func Plan_Update(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){	
	log.Print("fuck")
	info,err :=ParsePlan(arg_byte)
	if err!=nil {
		return nil,err
	}
	engine.X().SQLList.Plans().Update(*info)
	return nil,nil
}

func ParsePlan(arg_byte []byte) (*sql_list.PlanInfo,error){
	var info sql_list.PlanInfo
	var info_ sql_list.PlanInfo_
	err:=json.Unmarshal(arg_byte,&info_)
	if err!=nil {
		return nil,err
	}
	if info_.ID==nil {
		info.ID=0
	}else{
		info.ID=*(info_.ID)
	}
	info.Name=info_.Name
	info.FYear=info_.FYear
	info.PlanType=info_.PlanType
	if info_.PlanNum==nil {
		info.PlanNum.Valid=false
	}else{
		info.PlanNum.Valid=true
		info.PlanNum.Int64=*(info_.PlanNum)
	}
	info.ReserveStart.Valid=false
	if info_.ReserveStart!=nil {
		if *info_.ReserveStart!="" {
			info.ReserveStart.Valid=true
			info.ReserveStart.Time,err=time.Parse(time.RFC3339Nano,*(info_.ReserveStart))
			if err!=nil {
				return nil,err
			}
		}
	}
	info.ReserveEnd.Valid=false
	if info_.ReserveEnd!=nil {
		if *info_.ReserveEnd!="" {
			info.ReserveEnd.Valid=true
			info.ReserveEnd.Time,err=time.Parse(time.RFC3339Nano,*(info_.ReserveEnd))
			if err!=nil {
				return nil,err
			}
		}
	}
	info.ClimeStart.Valid=false
	if info_.ClimeStart!=nil {
		if *info_.ClimeStart!="" {
			info.ClimeStart.Valid=true
			info.ClimeStart.Time,err=time.Parse(time.RFC3339Nano,*(info_.ClimeStart))
			if err!=nil {
				return nil,err
			}
		}
	}
	info.ClimeEnd.Valid=false
	if info_.ClimeEnd!=nil {
		if *info_.ClimeEnd!="" {
			info.ClimeEnd.Valid=true
			info.ClimeEnd.Time,err=time.Parse(time.RFC3339Nano,*(info_.ClimeEnd))
			if err!=nil {
				return nil,err
			}
		}
	}
	if info_.LastUpdate=="" {
		info.LastUpdate=time.Now()
	}else{
		info.LastUpdate,err=time.Parse(time.RFC3339Nano,info_.LastUpdate)
		if err!=nil {
			return nil,err
		}
	}
	if info_.Members==nil {
		info.Members.Valid=false
	}else{
		info.Members.Valid=true
		info.Members.String=*(info_.Members)
	}
	
	return &info,nil
}



func GetPlanByTime(arg_byte []byte,engine http_engine.HTTPEngine) (any,error){
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
	
	val,err:=engine.X().SQLList.Plans().GetPlanByTime(StartTime,EndTime)
	if err!=nil {
		return nil,err
	}
	var result=""
	for _,v:=range val {
		result=result+UnParsePlan(v)
	}
	if result=="" {
		return result,nil
	}
	return result[:len(result)-1],nil
	
}