//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//main.go

package sql_list
import (
	"time"
	"database/sql"
	
	
)

type SQLList interface {
	
	Auth() Auth
	
	Cookie() interface {
		Session() TokenHandler
		ATA() TokenHandler
	}
	
	
	User() interface{
		Update(UserInfo) int64
		Delete(int64)
		GetUserID(string) int64
		Confirm(int64,string) bool
		GetAllUser() ([]*UserInfo,error)
		GetGroupContent(string) ([]int64,[]string,error)//misplace??
		AddToGroup(int64,string) error
	}
	
	Table() interface{
		Get(string) (string,error)
		Add(string) (string,error)
		Delete(string) error
	}
	Plans() interface{
		Update(PlanInfo) error
		IndexOfFYear(int64) ([]int64,error)
		Plan(int64) (*PlanInfo,error)
		GetPlanByTime(time.Time,time.Time) ([]*PlanInfo,error)
	}
	Equip() interface {
		Infos() interface{
			Update(EquipInfo) error
			Pull(time.Time,time.Time) ([]*EquipInfo,error)
		}
		Classes() interface{
			Push([]EquipClass) error
			Pull() ([]*EquipClass,error)
		}
	}
	
}
type Auth interface {
	File(string) AuthHandler
	Func(string) AuthHandler
	
	User(int64) AuthLists
	Group(string) AuthLists
	
}

type AuthInfo interface {
	Set(string,uint8)
	Get(string) uint8
}
//func NewAuthInfo() *AuthInfo 


type AuthInfos interface {
	User(int64) AuthInfo
	Group(string) AuthInfo
	Default() AuthInfo
}
//func NewAuthInfos() *AuthInfos 

type AuthHandler interface {
	Pull() (AuthInfos,error)
	Push(AuthInfos) error
	Create() error
	Parent() (AuthHandler,error)
	Destroy() error
	//New() AuthInfos
}
type AuthList interface {
	Users() *([]int64)
	Groups() *([]string)
}
type AuthLists interface {
	Pull() (AuthList,error)
	Push(AuthList) error
	New() AuthList
	Create() error
	Destroy() error
}


type TokenHandler interface {
	Add(int64) (string,time.Time,error)
	Delete(string)
	GetUserID(string) (int64,error)
}

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
	ID *int64
	Name string
	FYear int64
	PlanType string
	PlanNum *int64
	ReserveStart *string
	ReserveEnd *string
	ClimeStart *string
	ClimeEnd *string
	LastUpdate string
	Members *string
}

type EquipInfo struct{
	ID int64//when 0, it means new equip info. we need to allocate ID
	UserID int64
	EquipID int64
	Act string//"MOVE","RESERVE"
	T1 time.Time
	T2 sql.NullTime
	MoveDest sql.NullString
	PlanID sql.NullInt64
}

type EquipClass struct{
	ID int64
	ParentID sql.NullInt64
	Name string
}

type UserInfo struct{
	ID int64
	UserName string
	Password sql.NullString
	Password_Hash string
	FamilyName sql.NullString
	FirstName sql.NullString
	Grade int64
	Belong sql.NullString
	Sex sql.NullString
	Birth sql.NullTime
}

type UserInfo_ struct{
	ID *int64
	UserName string
	Password *string
	Password_Hash *string
	FamilyName *string
	FirstName *string
	Grade int64
	Belong *string
	Sex *string
	Birth *string
}