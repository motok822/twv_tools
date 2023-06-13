insert into USERLIST (username,password_hash,lastactivity) VALUES ("Administrator","cc10074ecf1dd52f4890fa960e71930e1e79a8d2397da3dd2f1800fe1cf962a7a90f824f5b3f572abde5eba36e05ff334407682380e177dc87f4ffe64c165db5");

insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/GROUPS/Admininistrators","table_80349");
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/1","table_08712048");

CREATE TABLE table_80349 LIKE AUTH_DEFAULT_GROUP;

CREATE TABLE table_08712048 LIKE AUTH_DEFAULT_USER;
insert into table_80349 (children_type,userid) VALUES ("USER",1);
insert into table_08712048 (groupname) VALUES ("Administrators");