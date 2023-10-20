
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FILES/","default_file");

create table default_file (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);

insert into default_file (content,userid,authority) VALUES ("USER",1,1);
insert into default_file (content,groupname,authority) VALUES ("GROUP","Administrators",1);

