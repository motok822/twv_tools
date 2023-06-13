
insert into FILEINDEX (tableid,tablename) VALUES ("/system/COOKIE/SESSION_ID","COOKIE_SESSION_ID");
insert into FILEINDEX (tableid,tablename) VALUES ("/system/COOKIE/ATA","COOKIE_ATA");
/*Automatic Token Authentication*/


create table COOKIE_SESSION_ID (
	token varchar(100) UNIQUE,
	userid integer NOT NULL,
	expiration DATETIME NOT NULL,
	PRIMARY KEY (token)
);

create table COOKIE_ATA (
	token varchar(100) UNIQUE,
	userid integer NOT NULL,
	expiration DATETIME NOT NULL,
	PRIMARY KEY (token)
);
