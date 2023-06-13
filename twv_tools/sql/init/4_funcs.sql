
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


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FUNCS/Login","login_func");

create table login_func (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);

insert into login_func (content,userid,authority) VALUES ("USER",1,1);
insert into login_func (content,authority) VALUES ("DEFAULT",81);


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FUNCS/ATA_Login","ata_login_func");

create table ata_login_func (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);

insert into ata_login_func (content,userid,authority) VALUES ("USER",1,1);
insert into ata_login_func (content,authority) VALUES ("DEFAULT",81);


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FUNCS/ATA_Set","ata_set_func");

create table ata_set_func (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);

insert into ata_set_func (content,userid,authority) VALUES ("USER",1,1);
insert into ata_set_func (content,authority) VALUES ("DEFAULT",81);