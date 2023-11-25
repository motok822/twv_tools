insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/GROUPS/Guests","Group_Guests");

create table Group_Guests (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO Group_Guests (content,userid) VALUES ("USER",0);


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/GROUPS/Administrators","Group_Administrators");

create table Group_Administrators (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO Group_Administrators (content,userid) VALUES ("USER",1);


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/GROUPS/Users","Group_Users");

create table Group_Users (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO Group_Users (content,userid) VALUES ("USER",2);
INSERT INTO Group_Users (content,userid) VALUES ("USER",3);
INSERT INTO Group_Users (content,userid) VALUES ("USER",4);
INSERT INTO Group_Users (content,userid) VALUES ("USER",5);
INSERT INTO Group_Users (content,userid) VALUES ("USER",6);
INSERT INTO Group_Users (content,userid) VALUES ("USER",7);
