//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//auth.go

package sql_list

import (
	"database/sql"
	_ "log"
	"strings"
	"fmt"
	"errors"
	
	
)

func newauthinfo() *authinfo{
	var info authinfo
	for i,_:= range info.auths {
		info.auths[i]=0
	}
	return &info
}

type authinfo struct {
	auths [5]uint8
}
func (info *authinfo) authtype(typename string) int64{
	switch typename {
	case "Full-Control":
		fallthrough
	case "full-control":
		fallthrough
	case "Full-control":
		fallthrough
	case "FullControl":
		fallthrough
	case "fullcontrol":
		fallthrough
	case "FC":
		fallthrough
	case "fc":
		fallthrough
	case "F":
		fallthrough
	case "f":
		return 0
	case "AUTH":
		fallthrough
	case "auth":
		fallthrough
	case "Auth":
		fallthrough
	case "A":
		fallthrough
	case "a":
		return 1
	case "WRITE":
		fallthrough
	case "write":
		fallthrough
	case "Write":
		fallthrough
	case "W":
		fallthrough
	case "w":
		return 2
	case "READ":
		fallthrough
	case "read":
		fallthrough
	case "Read":
		fallthrough
	case "R":
		fallthrough
	case "r":
		return 3
	case "EXEC":
		fallthrough
	case "exec":
		fallthrough
	case "Exec":
		fallthrough
	case "E":
		fallthrough
	case "e":
		return 4
	}
	return -1
}
func (info *authinfo) Set(typename string,status uint8){
	authtype:=info.authtype(typename)
	info.setbin(authtype,status)
}
func (info *authinfo) setbin(authtype int64,status uint8){
	if authtype<0 || authtype>=int64(len(info.auths)) {
		return
	}
	info.auths[authtype]=status
}

func (info *authinfo) setbin_all(status int64){
	var pow int64= 1
	for i,_:= range info.auths {
		info.auths[i]=uint8(status%(pow*3)/pow)
		pow*=3
	}
}

func (info *authinfo) Get(typename string) uint8{
	authtype:=info.authtype(typename)
	if authtype==0 {
		if info.auths[authtype]!= 0 {
			return info.auths[authtype]
		}
		var result uint8=1
		for i,v:=range info.auths {
			if i==0 {continue}
			if v==2 {return 2}
			if v==0 {result=0}
		}
		return result
	}
	if authtype<0 || authtype>=int64(len(info.auths)) {
		return 2
	}
	if info.Get("FC")==1 {
		return 1
	}
	return info.auths[authtype]
}

func (info *authinfo) getbin(authtype int64) uint8{
	if authtype<0 || authtype>=int64(len(info.auths)) {
		return 2
	}
	return info.auths[authtype]
}

func (info *authinfo) getbin_all() int64{
	var pow int64 =1
	var result int64 =0
	for _,v:=range info.auths {
		result+=pow*int64(v)
		pow*=3
	}
	return result
}

func (info *authinfo) Clone() *authinfo {
	clone:=newauthinfo()
	for i,v:=range info.auths {
		clone.auths[i]=v
	}
	return clone
}

func newauthinfos() *authinfos{
	var infos authinfos
	infos.users=make(map[int64] *authinfo)
	infos.groups=make(map[string] *authinfo)
	infos.default_set=newauthinfo()
	return &infos
}
type authinfos struct{
	users map[int64] *authinfo
	groups map[string] *authinfo
	default_set *authinfo
	original *authinfos
}

func (infos *authinfos) User(userid int64) AuthInfo{
	return infos.user(userid)
}
func (infos *authinfos) user(userid int64) *authinfo{
	val,ok:=infos.users[userid]
	if !ok {
		val=newauthinfo()
		infos.users[userid]=val
	}
	return val	
}

func (infos *authinfos) Group(groupname string) AuthInfo{
	return infos.group(groupname)
}
func (infos *authinfos) group(groupname string) *authinfo{
	val,ok:=infos.groups[groupname]
	if !ok {
		val=newauthinfo()
		infos.groups[groupname]=val
	}
	return val
}

func (infos *authinfos) Default() AuthInfo{
	return infos.def()
}
func (infos *authinfos) def() *authinfo{
	return infos.default_set
}

func (infos *authinfos) Clone() *authinfos{
	clone:=newauthinfos()
	for i,v:=range infos.users {
		clone.users[i]=v.Clone()
	}
	for i,v:=range infos.groups {
		clone.groups[i]=v.Clone()
	}
	clone.default_set=infos.default_set.Clone()
	clone.original=infos.original
	return clone
}

func newauthhandler(destlist []string,sqllist *sql_list) *authhandler{
	var handler authhandler
	handler.sqllist=sqllist
	handler.dest=destlist[0]
	if len(destlist)==1 {
		handler.is_root=true
	}else{
		handler.is_root=false
		handler.parent=newauthhandler(destlist[1:],sqllist)
	}
	return &handler
}
type authhandler struct {
	sqllist *sql_list
	dest string
	is_root bool
	parent AuthHandler
}





func (handler *authhandler) Pull() (AuthInfos,error){
	infos:=newauthinfos()
	tablename,err:=handler.sqllist.Table().Get(handler.dest)
	if err != nil {
		if parent,err:=handler.Parent();err!=nil{
			return infos,err
		}else{
			return parent.Pull()
		}
	}
	rows, err := handler.sqllist.database.Query("SELECT content,userid,groupname,authority FROM "+tablename)
	if err != nil {
		return infos,err
	}
	defer rows.Close()
	var content string
	var userid sql.NullInt64
	var groupname sql.NullString
	var authority int64
	for rows.Next() {
		err := rows.Scan(&content,&userid,&groupname,&authority)
		if err != nil {
			return infos,err
		}
		switch(content){
		case "DEFAULT":
			infos.def().setbin_all(authority)
			break
		case "USER":
			if !userid.Valid {
				continue
			}
			infos.user(int64(userid.Int64)).setbin_all(authority)
			break
		case "GROUP":
			if !groupname.Valid {
				continue
			}
			infos.group(groupname.String).setbin_all(authority)
			break
		}
	}
	err = rows.Err()
	if err != nil {
		return infos,err
	}
	
	
	return infos,nil
}
func (handler *authhandler) Push(infos AuthInfos) error {
	val,ok:=infos.(*authinfos)
	if !ok {
		return errors.New("Type Assertion Failed")
	}
	return handler.push(val)
}
func (handler *authhandler) push(infos *authinfos) error {
	tablename,err:=handler.sqllist.Table().Get(handler.dest)
	if err != nil {
		original,err:=handler.Pull()
		if err!=nil {
			return err
		}
		val,ok:=original.(*authinfos)
		if !ok {
			return errors.New("type assertion failed")
		}
		infos.original=val
		err=handler.Create()
		if err!=nil {
			return err
		}
		tablename,err=handler.sqllist.Table().Get(handler.dest)
		if err!=nil {
			return err
		}
	}else{
		original,err:=handler.Pull()
		if err!=nil {
			return err
		}
		val,ok:=original.(*authinfos)
		if !ok {
			return errors.New("type assertion failed")
		}
		infos.original=val
	}
	stmtIns,err:=handler.sqllist.database.Prepare(
	"INSERT into "+tablename+
	" (content,userid,groupname,authority) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE content = VALUES(content),userid = VALUES(userid),groupname = VALUES(groupname),authority = VALUES(authority);" )
	if err != nil {
		return err
	}
	defer stmtIns.Close()	
	stmtIns2,err:=handler.sqllist.database.Prepare(
	"DELETE FROM "+tablename+" WHERE content=? AND userid=? AND groupname=?;" )
	if err != nil {
		return err
	}
	defer stmtIns2.Close()	
	
	var content string
	var userid sql.NullInt64
	var groupname sql.NullString
	var authority int64
	content="USER"
	for i,v:=range infos.users {
		if val,ok:=infos.original.users[i];ok {
			if val.getbin_all()==v.getbin_all() {
				continue
			}
		}
		userid.Valid=true
		userid.Int64=int64(i)
		groupname.Valid=false
		authority=v.getbin_all()
		_, err = stmtIns.Exec(content,userid,groupname,authority)
		if err!=nil {
			return err
		}
	}
	for i,_:=range infos.original.users {
		if _,ok:=infos.users[i];!ok {
			userid.Valid=true
			userid.Int64=int64(i)
			groupname.Valid=false
			_, err = stmtIns.Exec(content,userid,groupname)
			if err!=nil {
				return err
			}
		}
		
	}
	
	
	content="GROUP"
	for i,v:=range infos.groups {
		if val,ok:=infos.original.groups[i];ok {
			if val.getbin_all()==v.getbin_all() {
				continue
			}
		}
		userid.Valid=false
		groupname.Valid=true
		groupname.String=i
		authority=v.getbin_all()
		_, err = stmtIns.Exec(content,userid,groupname,authority)
		if err!=nil {
			return err
		}
	}
	for i,_:=range infos.original.groups {
		if _,ok:=infos.groups[i];!ok {
			userid.Valid=false
			groupname.Valid=true
			groupname.String=i
			_, err = stmtIns2.Exec(content,userid,groupname)
			if err!=nil {
				return err
			}
		}
	}
	
	content="DEFAULT"
	if infos.def().getbin_all()!=infos.original.def().getbin_all() {
		userid.Valid=false
		groupname.Valid=false
		authority=infos.def().getbin_all()
		_, err = stmtIns.Exec(content,userid,groupname,authority)
		if err!=nil {
			return err
		}
	}
	return nil
}

func (handler *authhandler) Create() error {
	pinfo,err:=handler.Pull()
	if err!=nil {
		return err
	}
	tablename,err:=handler.sqllist.Table().Get(handler.dest)
	if err==nil {
		return errors.New("authinfos already exists")
	}
	if tablename,err=handler.sqllist.Table().Add(handler.dest);err!=nil {
		return err
	}
	_,err=handler.sqllist.database.Exec("create table "+tablename+
	" (id integer NOT NULL AUTO_INCREMENT,content varchar(100) NOT NULL,userid INTEGER UNIQUE,groupname varchar(100) UNIQUE,authority integer NOT NULL,PRIMARY KEY (id));")
	if err!=nil {
		handler.sqllist.Table().Delete(tablename)
		return err
	}
	return handler.Push(pinfo)
}



func (handler *authhandler) Destroy() error {
	_,err:=handler.sqllist.Table().Get(handler.dest)
	if err!=nil {
		return errors.New("authhandler not exists")
	}
	handler.sqllist.Table().Delete(handler.dest)
	return nil
}


func (handler *authhandler) Parent() (AuthHandler,error) {
	if handler.is_root {
		return handler.parent,errors.New("this is root")
	}
	return handler.parent,nil
}

func newauthlist() *authlist {
	var list authlist
	list.users=make([]int64,0,100)
	list.groups=make([]string,0,100)
	return &list
}
type authlist struct{
	users []int64
	groups []string
}
func (list *authlist) Users() *([]int64) {
	return &(list.users)
}
func (list *authlist) Groups() *([]string) {
	return &(list.groups)
}

func (list *authlist) Clone() *authlist{
	newlist:=newauthlist()
	for _,v:=range list.users {
		newlist.users=append(newlist.users,v)
	}
	for _,v:=range list.groups {
		newlist.groups=append(newlist.groups,v)
	}
	return newlist
} 

type authlists struct {
	dest string
	sqllist *sql_list
}

func newauthlists(dest string,sqllist *sql_list) *authlists{
	var lists authlists
	lists.dest=dest
	lists.sqllist=sqllist
	return &lists
}

func (lists *authlists) Pull() (AuthList,error){
	list:=newauthlist()
	tablename,err:=lists.sqllist.Table().Get(lists.dest)
	if err != nil {
		return list,err
	}
	rows, err := lists.sqllist.database.Query("SELECT content,userid,groupname FROM "+tablename)
	if err != nil {
		return list,err
	}
	defer rows.Close()
	var content string
	var userid sql.NullInt64
	var groupname sql.NullString
	for rows.Next() {
		err := rows.Scan(&content,&userid,&groupname)
		if err != nil {
			return list,err
		}
		if content=="GROUP" && groupname.Valid {
			list.groups=append(list.groups,groupname.String)
		}
		if content=="USER" && userid.Valid {
			list.users=append(list.users,int64(userid.Int64))
		}
	}
	
	err = rows.Err()
	if err != nil {
		return list,err
	}
	
	return list,nil
}
func (lists *authlists) Push(list AuthList) error {
	val,ok:=list.(*authlist)
	if !ok {
		return errors.New("Type Assertion Failed")
	}
	return lists.push(val)
}


func (lists *authlists) push(list *authlist) error{
	var content string
	var userid sql.NullInt64
	var groupname sql.NullString
	var original *authlist
	var ok bool
	tablename,err:=lists.sqllist.Table().Get(lists.dest)
	if err != nil {
		val,err:=lists.Pull()
		if err!=nil {
			return err
		}
		original,ok=val.(*authlist)
		if !ok {
			return errors.New("type assertion failed")
		}
		err=lists.Create()
		if err!=nil {
			return err
		}
		tablename,err=lists.sqllist.Table().Get(lists.dest)
		if err!=nil {
			return err
		}
	}else{
		val,err:=lists.Pull()
		if err!=nil {
			return err
		}
		original,ok=val.(*authlist)
		if !ok {
			return errors.New("type assertion failed")
		}
		
	}
	
	stmtIns,err:=lists.sqllist.database.Prepare(
	"INSERT into "+tablename+
	" (content,userid,groupname) VALUES (?,?,?) ON DUPLICATE KEY UPDATE content = VALUES(content),userid = VALUES(userid),groupname = VALUES(groupname);" )
	
	if err != nil {
		return err
	}
	defer stmtIns.Close()	
	stmtIns2,err:=lists.sqllist.database.Prepare(
	"DELETE FROM "+tablename+" WHERE content=? AND (userid=? OR groupname=?);" )
	if err != nil {
		return err
	}
	defer stmtIns2.Close()	
	
	content="USER"
	userid.Valid=true
	groupname.Valid=false
	for _,v:=range list.users {
		update:=true
		for _,w:=range original.users {
			if v==w {
				update=false
			}
		}
		if update {
			userid.Int64=int64(v)
			_, err = stmtIns.Exec(content,userid,groupname)
			if err!=nil {
				return err
			}
		}
	}
	for _,v:=range original.users {
		update:=true
		for _,w:=range list.users {
			if v==w {
				update=false
			}
		}
		if update {
			userid.Int64=int64(v)
			_, err = stmtIns2.Exec(content,userid,groupname)
			if err!=nil {
				return err
			}
		}
	}
	content="GROUP"
	userid.Valid=false
	groupname.Valid=true
	for _,v:=range list.groups {
		update:=true
		for _,w:=range original.groups {
			if v==w {
				update=false
			}
		}
		if update {
			groupname.String=v
			_, err = stmtIns.Exec(content,userid,groupname)
			if err!=nil {
				return err
			}
		}
	}
	for _,v:=range original.groups {
		update:=true
		for _,w:=range list.groups {
			if v==w {
				update=false
			}
		}
		if update {
			groupname.String=v
			_, err = stmtIns2.Exec(content,userid,groupname)
			if err!=nil {
				return err
			}
		}
	}
	return nil
}



func (lists *authlists) Create() error {
	tablename,err:=lists.sqllist.Table().Get(lists.dest)
	if err==nil {
		return errors.New("authlist already exists")
	}
	if tablename,err=lists.sqllist.Table().Add(lists.dest);err!=nil {
		return err
	}
	_,err=lists.sqllist.database.Exec("create table "+tablename+
	" (id integer NOT NULL AUTO_INCREMENT,content varchar(100) NOT NULL,userid INTEGER UNIQUE,groupname varchar(100) UNIQUE,PRIMARY KEY (id));")
	if err!=nil {
		lists.sqllist.Table().Delete(tablename)
		return err
	}
	return nil
}


func (lists *authlists) Destroy() error {
	_,err:=lists.sqllist.Table().Get(lists.dest)
	if err!=nil {
		return errors.New("authlist not exists")
	}
	lists.sqllist.Table().Delete(lists.dest)
	return nil
}

func (lists *authlists) New() AuthList {
	return newauthlist()
}















func newauthmanager(sqllist *sql_list) *authmanager{
	var manager authmanager
	manager.sqllist=sqllist
	return &manager
}

type authmanager struct {
	sqllist *sql_list
}

func (manager *authmanager) User(userid int64) AuthLists{
	lists:=newauthlists("/system/AUTH/USERS/"+fmt.Sprintf("%d",userid),manager.sqllist)
	return lists
}

func (manager *authmanager) Group(groupname string) AuthLists{
	lists:=newauthlists("/system/AUTH/GROUPS/"+groupname,manager.sqllist)
	return lists
}

func (manager *authmanager) File(filename string) AuthHandler{
	destlist:=make([]string,0,100)
	for ;true; {
		if i:=strings.LastIndex(filename,"/");i==-1{
			destlist=append(destlist,"/system/AUTH/FILES/"+filename)
			break
		}else{
			destlist=append(destlist,"/system/AUTH/FILES"+filename)
			filename=filename[:i]
		}
	}

	handler:=newauthhandler(destlist,manager.sqllist)
	return handler
}

func (manager *authmanager) Func(funcname string) AuthHandler{
	destlist:=make([]string,0,100)
	destlist=append(destlist,"/system/AUTH/FUNCS/"+funcname)
	destlist=append(destlist,"/system/AUTH/FUNCS/")
	handler:=newauthhandler(destlist,manager.sqllist)
	return handler
}
