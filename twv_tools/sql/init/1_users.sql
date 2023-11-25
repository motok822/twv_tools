
insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/0","guest_user");

create table guest_user (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO guest_user (content,userid) VALUES ("USER",0);
INSERT INTO guest_user (content,groupname) VALUES ("GROUP","Guests");

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
INSERT INTO admin_user (content,groupname) VALUES ("GROUP","Administrators");

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (1,"Administrator","cc10074ecf1dd52f4890fa960e71930e1e79a8d2397da3dd2f1800fe1cf962a7a90f824f5b3f572abde5eba36e05ff334407682380e177dc87f4ffe64c165db5",-1);
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
INSERT INTO SystemUser (content,groupname) VALUES ("GROUP","Users");

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
INSERT INTO test_user (content,groupname) VALUES ("GROUP","Users");

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (3,"TestUser","f6c1788e5bc736fb2b6265a39c15178ded2deac2bd6cd4d27fc5185a9ebbdfd3165d1aad078619184b0fcedbc6b29aa48fd03753788b6758570f60f0beec30e0",-1);
/*password:TestUser*/


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/4","grade_1_test_");

create table grade_1_test_ (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO grade_1_test_ (content,userid) VALUES ("USER",4);
INSERT INTO grade_1_test_ (content,groupname) VALUES ("GROUP","Users");

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (4,"grade_1_test","8ad6b70e7dbffb489197d0779cab1569eff079fc50690f67b671e6d1c95a7373a35bb5e3532b7edbfe9b1d012a2be86183b7c3cec13d1a857403979a612c4965",-1);
/*password:grade_1_test_password*/


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/5","grade_2_test_");

create table grade_2_test_ (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO grade_2_test_ (content,userid) VALUES ("USER",5);
INSERT INTO grade_2_test_ (content,groupname) VALUES ("GROUP","Users");

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (5,"grade_2_test","15b6b2aaccf4b23c2473a964f5613171c0eaf5e040ba24caddd3c3b6cc697e224dd2e4685d1555de220fc467b196c2c43f9f9539338c1b1b86016f0eb54be8e9",-1);
/*password:grade_2_test_password*/


insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/6","grade_3_test_");

create table grade_3_test_ (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO grade_3_test_ (content,userid) VALUES ("USER",6);
INSERT INTO grade_3_test_ (content,groupname) VALUES ("GROUP","Users");

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (6,"grade_3_test","50a54d0cadc9cd37bb424b31714e186111f35251341ae7ee1b4ccc9a433075d339f8c88e9cc65773d6f85a807bc5f555b54ed7636ad27f0ed78dcdc910c3b4f0",-1);
/*password:grade_3_test_password*/



insert into FILEINDEX (tableid,tablename) VALUES ("/system/AUTH/USERS/7","grade_4_test_");
create table grade_4_test_ (
	id integer NOT NULL AUTO_INCREMENT,
	content varchar(100) NOT NULL,
	userid INTEGER UNIQUE,
	groupname varchar(100) UNIQUE,
	PRIMARY KEY (id)
);

INSERT INTO grade_4_test_ (content,userid) VALUES ("USER",7);
INSERT INTO grade_4_test_ (content,groupname) VALUES ("GROUP","Users");

INSERT INTO USERLIST (id,username,password_hash,grade) VALUES (7,"grade_4_test","9415617b31796da8a82f4a7f1ed648a04499e31d1a525a095da8051cf36a185970e5fe9fe0844782ab4557699fb007a4c591e9056cfdb8275658a558f366f66f",-1);
/*password:grade_4_test_password*/
