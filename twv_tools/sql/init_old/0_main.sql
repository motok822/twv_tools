use go_database


create table FILEINDEX (
	tableid varchar(100) UNIQUE KEY,
	tablename varchar(100) UNIQUE KEY,
	PRIMARY KEY (tableid)
);


insert into FILEINDEX (tableid,tablename) VALUES ("/system/USERLIST","USERLIST");
insert into FILEINDEX (tableid,tablename) VALUES ("/system/FILEINDEX","FILEINDEX");
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/DEFAULT_GROUP","AUTH_DEFAULT_GROUP");
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/DEFAULT_USER","AUTH_DEFAULT_USER");
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/DEFAULT_FUNC","AUTH_DEFAULT_FUNC");
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/DEFAULT_FILE","AUTH_DEFAULT_FILE");

create table USERLIST (
	id integer NOT NULL AUTO_INCREMENT,
	username varchar(100) NOT NULL UNIQUE,
	password_hash varchar(512) NOT NULL,
	PRIMARY KEY (id)
)
AUTO_INCREMENT=1;

/*id 0 for "not found" aka guest user*/

create table AUTH_DEFAULT_GROUP (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER,
	groupname varchar(100),
	PRIMARY KEY (id)
);
/*
content:USER or GROUP
*/

create table AUTH_DEFAULT_USER (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);



create table AUTH_DEFAULT_FILE (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);
/*
content:DEFAULT or USER or GROUP
authority:ternary numeral,0:null,1:accept,2:deny
*/
/*
/system/AUTH/FILES/*
*/

insert into AUTH_DEFAULT_FILE (content,authority) VALUES ("DEFAULT",0);
insert into AUTH_DEFAULT_FILE (content,groupname,authority) VALUES ("GROUP","Guest",2);
insert into AUTH_DEFAULT_FILE (content,groupname,authority) VALUES ("GROUP","Administrators",1);


create table AUTH_DEFAULT_FUNC (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);
/*
content:DEFAULT or USER or GROUP
authority:ternary numeral,0:null,1:accept,2:deny
*/
/*
/system/AUTH/FUNCS/*
*/


insert into AUTH_DEFAULT_FUNC (content,authority) VALUES ("DEFAULT",0);
insert into AUTH_DEFAULT_FUNC (content,groupname,authority) VALUES ("GROUP","Guest",2);
