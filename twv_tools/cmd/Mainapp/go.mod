module github.com/windows-server-2003/twv_tools/cmd/Mainapp

go 1.20

replace github.com/windows-server-2003/twv_tools/pkg/functions => ../../pkg/functions

replace github.com/windows-server-2003/twv_tools/pkg/sql_list => ../../pkg/sql_list

replace github.com/windows-server-2003/twv_tools/pkg/html_transport => ../../pkg/html_transport

require (
	github.com/go-sql-driver/mysql v1.7.0
	github.com/windows-server-2003/twv_tools/pkg/functions v0.0.0-00010101000000-000000000000
	github.com/windows-server-2003/twv_tools/pkg/http_engine v0.0.0-00010101000000-000000000000
	github.com/windows-server-2003/twv_tools/pkg/http_engine_imp v0.0.0-00010101000000-000000000000
	github.com/windows-server-2003/twv_tools/pkg/sql_list v0.0.0-00010101000000-000000000000
)

require (
	github.com/windows-server-2003/twv_tools/pkg/http_tools v0.0.0-00010101000000-000000000000 // indirect
	github.com/windows-server-2003/twv_tools/pkg/localmgr v0.0.0-00010101000000-000000000000 // indirect
	golang.org/x/exp v0.0.0-20230626212559-97b1e661b5df // indirect
)

replace github.com/windows-server-2003/twv_tools/pkg/http_engine => ../../pkg/http_engine

replace github.com/windows-server-2003/twv_tools/pkg/http_tools => ../../pkg/http_tools

replace github.com/windows-server-2003/twv_tools/pkg/http_engine_imp => ../../pkg/http_engine_imp

replace github.com/windows-server-2003/twv_tools/pkg/localmgr => ../../pkg/localmgr
