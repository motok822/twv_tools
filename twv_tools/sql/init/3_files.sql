
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


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FILES/index.html","index_html_file");

create table index_html_file (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);

insert into index_html_file (content,userid,authority) VALUES ("USER",1,1);
insert into index_html_file (content,authority) VALUES ("DEFAULT",27);


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FILES/tutorial.html","tutorial_html_file");

create table tutorial_html_file (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);

insert into tutorial_html_file (content,userid,authority) VALUES ("USER",1,1);
insert into tutorial_html_file (content,authority) VALUES ("DEFAULT",27);

insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FILES/dist/manifest.json","manifest_file");

create table manifest_file (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);

insert into manifest_file (content,userid,authority) VALUES ("USER",1,1);
insert into manifest_file (content,authority) VALUES ("DEFAULT",27);

insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FILES/api_mgr","file_api_mgr");

create table file_api_mgr (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);

insert into file_api_mgr (content,authority) VALUES ("DEFAULT",27);