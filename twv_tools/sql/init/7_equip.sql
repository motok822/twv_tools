insert into FILEINDEX (tableID,tablename) VALUES ("/system/EQUIP/EQUIP_INFO_INDEX","EQUIP_INFO_INDEX");

create table EQUIP_INFO_INDEX (
	ID integer AUTO_INCREMENT,
	UserID integer NOT NULL,
	EquipID integer NOT NULL,
	Act varchar(100) NOT NULL,
	T1 DATETIME NOT NULL,
	T2 DATETIME,
	MoveDest varchar(100),
	PlanID integer,
	PRIMARY KEY (ID)
);

insert into FILEINDEX (tableID,tablename) VALUES ("/system/EQUIP/EQUIP_CLASS_INDEX","EQUIP_CLASS_INDEX");

create table EQUIP_CLASS_INDEX (
	ID integer NOT NULL,
	ParentID integer,
	Name varchar(100) NOT NULL,
	PRIMARY KEY (ID)
);

insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest) VALUES (1,7,"MOVE",NOW(),"本郷");
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest) VALUES (1,8,"MOVE",NOW(),"本郷");
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest) VALUES (1,9,"MOVE",NOW(),"本郷");

insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (0,NULL,"ROOT");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (1,0,"7天");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (2,1,"DEFAULT");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (3,2,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (4,2,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (5,2,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (6,1,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (7,6,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (8,6,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (9,6,"フライ");