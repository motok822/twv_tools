insert into FILEINDEX (tableid,tablename) VALUES ("/system/PLAN/PLAN_INDEX","PLAN_INDEX");


create table PLAN_INDEX (
 Id integer AUTO_INCREMENT,
 Name varchar(100) NOT NULL,
 FYear integer NOT NULL,
 PlanType varchar(100) NOT NULL,
 PlanNum integer,
 ReserveStart DATETIME,
 ReserveEnd DATETIME,
 ClimeStart DATETIME,
 ClimeEnd DATETIME,
 LastUpdate DATETIME NOT NULL,
 Members varchar(1024),
 PRIMARY KEY (Id)
);
/* FYear=Fiscal Year */
/* PlanType=INDIVIDUAL,CLUB,EQUIP_MAINTENANCE*/
/* Members=ID;ID;ID; ... */

/*insert into PLAN_INDEX (Name,FYear,PlanType,ClimeStart,ClimeEnd,LastUpdate,Members) VALUES ("装備点検",2023,"EQUIP_MAINTENANCE","2023-09-01 18:45:00.000","2023-09-01 18:46:00.000","2023-09-01 18:45:00.000","3");*/
insert into PLAN_INDEX (Name,FYear,PlanType,ClimeStart,ClimeEnd,LastUpdate,Members) VALUES ("装備点検",2023,"EQUIP_MAINTENANCE",NOW(),NOW(),NOW(),"2");