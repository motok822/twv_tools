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
		Add(string,string) uint64
		Delete(uint64)
		GetUserID(string) uint64
		Confirm(uint64,string) bool
	}
	
	Table() interface{
		Get(string) (string,error)
		Add(string) (string,error)
		Delete(string) error
	}
	Plans() interface{
		IndexOfFYear(uint64) ([]uint64,error)
		Plan(uint64) (*PlanInfo,error)
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
	
	User(uint64) AuthLists
	Group(string) AuthLists
	
}

type AuthInfo interface {
	Set(string,uint8)
	Get(string) uint8
}
//func NewAuthInfo() *AuthInfo 


type AuthInfos interface {
	User(uint64) AuthInfo
	Group(string) AuthInfo
	Default() AuthInfo
}
//func NewAuthInfos() *AuthInfos 

type AuthHandler interface {
	Pull() (AuthInfos,error)
	Push(AuthInfos) error
	Create() error
	Parent() (AuthHandler,error)
	//New() AuthInfos
}
type AuthList interface {
	Users() []uint64
	Groups() []string
}
type AuthLists interface {
	Pull() (AuthList,error)
	Push(AuthList) error
	New() AuthList
	Create() error
}


type TokenHandler interface {
	Add(uint64) (string,time.Time,error)
	Delete(string)
	GetUserID(string) (uint64,error)
}

type PlanInfo struct {
	ID uint64
	FYear uint64
	PlanType string
	PlanNum sql.NullInt64
	ReserveStart sql.NullTime
	ReserveEnd sql.NullTime
	ClimeStart sql.NullTime
	ClimeEnd sql.NullTime
	Members sql.NullString
}

type EquipInfo struct{
	ID uint64//when 0, it means new equip info. we need to allocate ID
	UserID uint64
	EquipID uint64
	Act string//"MOVE","RESERVE"
	T1 time.Time
	T2 sql.NullTime
	MoveDest sql.NullString
	PlanID sql.NullInt64
}

type EquipClass struct{
	ID uint64
	ParentID sql.NullInt64
	Name string
}