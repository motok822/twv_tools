
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/GROUPS/Guest","table_80390389049");

insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/0","table_087109908232048");

CREATE TABLE table_80390389049 LIKE AUTH_DEFAULT_GROUP;
CREATE TABLE table_087109908232048 LIKE AUTH_DEFAULT_USER;

insert into table_80390389049 (children_type,userid) VALUES ("USER",0);
insert into table_087109908232048 (groupname) VALUES ("Guest");