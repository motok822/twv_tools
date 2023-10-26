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


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (1,NULL,"ROOT");

insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (2,1,"テント");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (3,2,"7天");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (4,3,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (5,4,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (6,4,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (7,4,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (8,3,"β");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (9,8,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (10,8,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (11,8,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (12,3,"γ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (13,12,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (14,12,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (15,12,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (16,3,"δ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (17,16,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (18,16,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (19,16,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (20,2,"45天");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (21,20,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (22,21,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (23,21,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (24,21,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (25,20,"β");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (26,25,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (27,25,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (28,25,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (29,20,"γ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (30,29,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (31,29,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (32,29,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (33,20,"δ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (34,33,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (35,33,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (36,33,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (37,20,"ε");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (38,37,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (39,37,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (40,37,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (41,2,"6天");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (42,41,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (43,42,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (44,42,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (45,42,"フライ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (46,2,"12天");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (47,46,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (48,47,"本体");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (49,47,"ポール");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (50,47,"フライ");

insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (51,1,"コッヘル");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (52,51,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (53,52,"特大");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (54,52,"大");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (55,52,"中");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (56,51,"β");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (57,56,"特大");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (58,56,"大");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (59,56,"中");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (60,51,"γ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (61,60,"特大");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (62,60,"大");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (63,60,"中");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (64,51,"δ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (65,64,"大");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (66,64,"中");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (67,51,"ε");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (68,67,"大");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (69,51,"ζ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (70,69,"大");

insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (71,1,"ヘッド");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (72,71,"");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (73,72,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (74,72,"β");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (75,72,"γ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (76,72,"δ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (77,72,"ε");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (78,72,"ζ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (79,72,"η");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (80,72,"Θ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (81,72,"λ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (82,72,"μ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (83,72,"π");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (84,72,"ρ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (85,72,"σ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (86,72,"φ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (87,72,"ω");

insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (88,1,"L装");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (89,88,"");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (90,89,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (91,89,"β");


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (92,1,"ヘルボ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (93,92,"");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (94,93,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (95,93,"β");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (96,93,"γ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (97,93,"δ");


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (98,1,"エキボ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (99,98,"");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (100,99,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (101,99,"β");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (102,99,"γ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (103,99,"δ");


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (104,1,"藪ノコ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (105,104,"");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (106,105,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (107,105,"β");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (108,105,"γ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (109,105,"δ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (110,105,"ε");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (111,105,"ζ");


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (112,1,"なた");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (113,112,"");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (114,113,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (115,113,"β");


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (116,1,"スノーソー");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (117,116,"");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (118,117,"α");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (119,117,"β");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (120,117,"γ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (121,117,"δ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (122,117,"ε");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (123,117,"ζ");


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (124,1,"ビーコン");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (125,124,"");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (126,125,"A");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (127,125,"B");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (128,125,"E");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (129,125,"F");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (130,125,"G");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (131,125,"H");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (132,125,"M");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (133,125,"O");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (134,125,"Q");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (135,125,"S");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (136,125,"X");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (137,125,"Y");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (138,125,"Z");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (139,125,"新arva");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (140,125,"甲");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (141,125,"乙");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (142,125,"い");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (143,125,"ろ");
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name) VALUES (144,125,"に");


insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,5,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,6,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,7,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,9,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,10,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,11,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,13,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,14,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,15,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,17,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,18,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,19,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,22,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,23,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,24,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,26,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,27,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,28,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,30,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,31,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,32,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,34,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,35,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,36,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,38,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,39,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,40,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,43,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,44,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,45,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,48,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,49,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,50,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,53,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,54,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,55,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,57,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,58,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,59,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,61,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,62,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,63,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,65,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,66,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,68,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,70,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,73,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,74,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,75,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,76,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,77,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,78,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,79,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,80,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,81,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,82,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,83,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,84,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,85,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,86,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,87,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,90,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,91,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,94,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,95,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,96,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,97,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,100,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,101,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,102,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,103,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,106,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,107,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,108,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,109,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,110,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,111,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,114,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,115,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,118,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,119,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,120,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,121,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,122,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,123,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,126,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,127,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,128,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,129,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,130,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,131,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,132,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,133,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,134,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,135,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,136,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,137,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,138,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,139,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,140,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,141,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,142,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,143,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,144,"MOVE",NOW(),"本郷",1);


/*
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,145,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,146,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,147,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,148,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,149,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,150,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,151,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,152,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,153,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,154,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,155,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,156,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,157,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,158,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,159,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,160,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,161,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,162,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,163,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,164,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,165,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,166,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,167,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,168,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,169,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,170,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,171,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,172,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,173,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,174,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,175,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,176,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,177,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,178,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,179,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,180,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,181,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,182,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,183,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,184,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,185,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,186,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,187,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,188,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,189,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,190,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,191,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,192,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,193,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,194,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,195,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,196,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,197,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,198,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,199,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,200,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,201,"MOVE",NOW(),"本郷",1);
insert into EQUIP_INFO_INDEX (UserID,EquipID,Act,T1,MoveDest,PlanID) VALUES (3,202,"MOVE",NOW(),"本郷",1);
*/