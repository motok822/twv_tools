//module github.com/windows-server-2003/twv_tools/pkg/functions
//plan.go
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