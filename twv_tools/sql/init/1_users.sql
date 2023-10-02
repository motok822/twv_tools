
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/0","guest_user");

create table guest_user (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO guest_user (content,userid) VALUES ("USER",0);

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (0,"Guest","cc5ec2b61fbbdd18d85dd14ab60db397b21b5548999a6afd3ce9557b19c300494a5fd29987e03a6f06677c209b88de47684388de8250671cdd778799eecd018a",-1);
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

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (1,"Admin","cc10074ecf1dd52f4890fa960e71930e1e79a8d2397da3dd2f1800fe1cf962a7a90f824f5b3f572abde5eba36e05ff334407682380e177dc87f4ffe64c165db5",-1);
/*password:Makihata23*/

insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/2","SystemUser");

create table SystemUser (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO SystemUser (content,userid) VALUES ("USER",2);
INSERT INTO SystemUser (content,groupname) VALUES ("GROUP","USERS");

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (2,"SystemUser","c7d40d4259743068fa09931acc786acfccfb19493b805fe470db9f982aabcca20e890acdc0dd7ca45c95393aa8f51fc11959580346c930abf3211cbe37090048",-1);
/*password:SystemUser*/

insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/3","test_user");

create table test_user (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO test_user (content,userid) VALUES ("USER",3);
INSERT INTO test_user (content,groupname) VALUES ("GROUP","USERS");

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (3,"TestUser","f6c1788e5bc736fb2b6265a39c15178ded2deac2bd6cd4d27fc5185a9ebbdfd3165d1aad078619184b0fcedbc6b29aa48fd03753788b6758570f60f0beec30e0",-1);
/*password:TestUser*/

