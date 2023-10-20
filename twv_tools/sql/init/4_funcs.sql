
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FUNCS/","default_func");

create table default_func (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);

insert into default_func (content,userid,authority) VALUES ("USER",1,1);
insert into default_func (content,groupname,authority) VALUES ("GROUP","Administrators",1);
