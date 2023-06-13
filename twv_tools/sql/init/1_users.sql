
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/0","guest_user");

create table guest_user (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO guest_user (content,userid) VALUES ("USER",0);

INSERT INTO USERLIST (id,username,password_hash) VALUES (0,"Guest","cc5ec2b61fbbdd18d85dd14ab60db397b21b5548999a6afd3ce9557b19c300494a5fd29987e03a6f06677c209b88de47684388de8250671cdd778799eecd018a");
/*password:Guest*/


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/1","admin_user");

create table admin_user (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO admin_user (content,userid) VALUES ("USER",1);

INSERT INTO USERLIST (id,username,password_hash) VALUES (1,"Admin","cc10074ecf1dd52f4890fa960e71930e1e79a8d2397da3dd2f1800fe1cf962a7a90f824f5b3f572abde5eba36e05ff334407682380e177dc87f4ffe64c165db5");
/*password:Makihata23*/
