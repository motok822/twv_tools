//module github.com/windows-server-2003/twv_tools/pkg/sql_list
//mysql.go

package sql_list

import (
	"database/sql"
	"log"
	_ "fmt"
)


func GetTableName(database *sql.DB,tableid string) (string,error) {
	var tablename string = ""
	stmtOut,err:=database.Prepare("SELECT (tablename) FROM FILEINDEX WHERE tableid = ?")
	if err != nil {
		log.Print("@function getTableName():" + err.Error())
		return tablename,err
	}
	defer stmtOut.Close()
	err = stmtOut.QueryRow(tableid).Scan(&tablename)
	if err != nil {
		log.Print("@function Confirm():" + err.Error()) // proper error handling instead of panic in your app
	}
	return tablename,err
}


func GetAllFiles(database *sql.DB) []string {
	fileindex:=make([]string,0,100)
	rows, err := database.Query("SELECT (tableid) FROM FILEINDEX")
	if err != nil {
		log.Print("@function getAllFiles():" + err.Error())
		return fileindex
	}
	defer rows.Close()
	var str string
	for rows.Next() {
		err := rows.Scan(&str)
		if err != nil {
			log.Print("@function getAllFiles():" + err.Error())
			return fileindex
		}
		fileindex=append(fileindex,str)
	}
	err = rows.Err()
	if err != nil {
		log.Print("@function getAllFiles():" + err.Error())
	}
	return fileindex
}


