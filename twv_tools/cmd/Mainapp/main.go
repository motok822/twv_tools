//module github.com/windows-server-2003/twv_tools/cmd/Mainapp
//main.go


package main

import (
	"log"
	"database/sql"
	"github.com/go-sql-driver/mysql"
	"github.com/windows-server-2003/twv_tools/pkg/functions"
	"github.com/windows-server-2003/twv_tools/pkg/sql_list"
	//"github.com/windows-server-2003/twv_tools/pkg/html_transport"
	_ "github.com/windows-server-2003/twv_tools/pkg/http_engine"
	"github.com/windows-server-2003/twv_tools/pkg/http_engine_imp"
	"net/http"
	"time"
	_ "io"
	
)

func main(){
	//db,err := sql.Open("mysql","go_user:go_password@tcp(mysql:3306)/go_database")
	time.Sleep(200 * time.Second)
	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		log.Fatal(err.Error())
	}
	c := mysql.Config{
		DBName:    "go_database",
		User:      "go_user",
		Passwd:    "go_password",
		Addr:      "mysql:3306",
		//Addr:      "localhost:3306",
		Net:       "tcp",
		ParseTime: true,
		Collation: "utf8mb4_unicode_ci",
		AllowNativePasswords: true,
		Loc:       jst,
	}
	db, err := sql.Open("mysql", c.FormatDSN())
	
	if err != nil {
		log.Fatal(err.Error())
	}
	defer db.Close()
	
	//sm := http.NewServeMux()
	//sm.HandleFunc("/func/",func_runnner)
	sqllist:=sql_list.NewSQLList(db)
	myserver:=http_engine_imp.NewHTTPServer(sqllist)
	functions.Initialize(myserver)
	
	my_serv := &http.Server{
		Addr:           ":443",
		ReadTimeout:    10 * time.Second,
		Handler:        myserver,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Fatal(my_serv.ListenAndServeTLS("../../cert/localhost/server.crt","../../cert/localhost/server.key"))
	////log.Fatal(my_serv.ListenAndServe())
	
}