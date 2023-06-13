
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FILES/index.html","table_9827342384");

/*
CREATE TABLE table_98278792832384 LIKE AUTH_DEFAULT_FILE;
INSERT INTO table_98278792832384 SELECT * FROM AUTH_DEFAULT_FILE;
CREATE TABLE table_9827342384 AS SELECT * FROM AUTH_DEFAULT_FILE;

*/
create table table_9827342384 (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);


INSERT INTO table_9827342384 SELECT * FROM AUTH_DEFAULT_FILE;

insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/FILES/login.html","table_98278792832384");

/*INSERT INTO newtable SELECT * FROM oldtable;*/

create table table_98278792832384 (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	authority integer NOT NULL,
	PRIMARY KEY (id)
);
insert into table_98278792832384 (content,authority) VALUES ("DEFAULT",1);