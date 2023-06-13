insert into FILEINDEX (tableid,tablename) VALUES ("/system/PLAN/PLAN_INDEX","PLAN_INDEX");


create table PLAN_INDEX (
	Id integer AUTO_INCREMENT,
	FYear integer NOT NULL,
	PlanType varchar(100) NOT NULL,
	PlanNum integer,
	ReserveStart DATETIME,
	ReserveEnd DATETIME,
	ClimeStart DATETIME,
	ClimeEnd DATETIME,
	Members varchar(1024),
	PRIMARY KEY (Id)
);