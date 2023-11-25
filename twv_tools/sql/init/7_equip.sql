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
	Weight integer,
	Priority integer,
	/*0:nothing,1:for old grader,-1:for young grader,2:for appropriate role*/
	PRIMARY KEY (ID)
);


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (1,NULL,"ROOT",0,0);

insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (2,1,"テント",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (3,2,"7天",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (4,3,"α",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (5,4,"本体",1500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (6,4,"ポール",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (7,4,"フライ",1300,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (8,3,"β",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (9,8,"本体",1500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (10,8,"ポール",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (11,8,"フライ",1300,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (12,3,"γ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (13,12,"本体",1500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (14,12,"ポール",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (15,12,"フライ",1300,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (16,3,"δ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (17,16,"本体",1500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (18,16,"ポール",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (19,16,"フライ",1300,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (20,2,"45天",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (21,20,"α",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (22,21,"本体",800,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (23,21,"ポール",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (24,21,"フライ",500,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (25,20,"β",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (26,25,"本体",800,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (27,25,"ポール",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (28,25,"フライ",500,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (29,20,"γ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (30,29,"本体",800,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (31,29,"ポール",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (32,29,"フライ",500,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (33,20,"δ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (34,33,"本体",800,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (35,33,"ポール",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (36,33,"フライ",500,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (37,20,"ε",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (38,37,"本体",800,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (39,37,"ポール",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (40,37,"フライ",500,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (41,2,"6天",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (42,41,"α",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (43,42,"本体",1000,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (44,42,"ポール",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (45,42,"フライ",800,1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (46,2,"12天",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (47,46,"α",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (48,47,"本体",600,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (49,47,"ポール",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (50,47,"フライ",250,1);

insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (51,1,"コッヘル",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (52,51,"α",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (53,52,"特大",700,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (54,52,"大",450,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (55,52,"中",250,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (56,51,"β",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (57,56,"特大",700,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (58,56,"大",450,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (59,56,"中",250,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (60,51,"γ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (61,60,"特大",700,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (62,60,"大",450,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (63,60,"中",250,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (64,51,"δ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (65,64,"大",450,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (66,64,"中",250,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (67,51,"ε",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (68,67,"大",450,-1);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (69,51,"ζ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (70,69,"大",450,-1);

insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (71,1,"ヘッド",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (72,71,"",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (73,72,"α",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (74,72,"β",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (75,72,"γ",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (76,72,"δ",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (77,72,"ε",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (78,72,"ζ",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (79,72,"η",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (80,72,"Θ",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (81,72,"λ",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (82,72,"μ",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (83,72,"π",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (84,72,"ρ",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (85,72,"σ",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (86,72,"φ",500,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (87,72,"ω",500,0);

insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (88,1,"L装",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (89,88,"",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (90,89,"α",2500,2);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (91,89,"β",2500,2);


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (92,1,"ヘルボ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (93,92,"",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (94,93,"α",600,2);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (95,93,"β",600,2);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (96,93,"γ",600,2);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (97,93,"δ",600,2);


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (98,1,"エキボ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (99,98,"",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (100,99,"α",600,2);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (101,99,"β",600,2);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (102,99,"γ",600,2);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (103,99,"δ",600,2);


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (104,1,"藪ノコ",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (105,104,"",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (106,105,"α",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (107,105,"β",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (108,105,"γ",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (109,105,"δ",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (110,105,"ε",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (111,105,"ζ",200,0);


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (112,1,"なた",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (113,112,"",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (114,113,"α",700,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (115,113,"β",700,0);


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (116,1,"スノーソー",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (117,116,"",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (118,117,"α",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (119,117,"β",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (120,117,"γ",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (121,117,"δ",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (122,117,"ε",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (123,117,"ζ",200,0);


insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (124,1,"ビーコン",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (125,124,"",0,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (126,125,"A",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (127,125,"B",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (128,125,"E",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (129,125,"F",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (130,125,"G",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (131,125,"H",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (132,125,"M",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (133,125,"O",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (134,125,"Q",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (135,125,"S",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (136,125,"X",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (137,125,"Y",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (138,125,"Z",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (139,125,"新arva",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (140,125,"甲",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (141,125,"乙",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (142,125,"い",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (143,125,"ろ",200,0);
insert into EQUIP_CLASS_INDEX (ID,ParentID,Name,Weight,Priority) VALUES (144,125,"に",200,0);


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