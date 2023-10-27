var chart={
	window_setting:{x:0,y:0,zoom:1,fontsize:16,pin_radius:8,line_magnification:15},
	objects:{
		nodes:[{id:0,type:"pin",is_water:false,x:200,y:200},{id:1,type:"pin",is_water:false,x:400,y:400}],
		links:[{id:0,from:0,to:1,type:"NORMAL",route:"road",distance:300},{id:1,from:1,to:0,type:"NORMAL",route:"road",distance:300}],
		tags:[{id:0,value:"pin1",coord_type:"rel",rel_type:"nodes",rel_id:1,x:0,y:-50},{id:1,value:30,coord_type:"rel_polar",rel_type:"links",rel_ratio:0.2,rel_id:1,rel_radian:-0.5*Math.PI,rel_from:0,rel_to:1}]
	},
	//css:{circle:{circle_out:{"r":10,"fill":"green","stroke":"black","stroke-width":2},"circle_in":{}},path:{arrow:{"stroke-width":"2","fill":"white","fill-opacity":0},route_color:{"NORMAL":"black","ER":"red"}}},
}

document.getElementById('import_csv_file').addEventListener("change", function(e) {
	let reader= new FileReader()
	reader.readAsText(e.target.files[0])
	reader.onload=(event)=>{
		let rows=event.target.result.split('\r\n')
		let csvdata=new Array()
		let firstskip=true
		for(const v of rows){
			if(firstskip){
				firstskip=false
				continue
			}
			csvdata.push(v.split(','))
		}
		chart = csvdata_to_chart(csvdata)
		viewer()
		e.target.value=""
	}
},false);

document.getElementById('import_json_file').addEventListener("change", function(e) {
	let reader= new FileReader()
	reader.readAsText(e.target.files[0])
	reader.onload=(event)=>{
		chartnew=JSON.parse(event.target.result)
		if(chartnew!=null){
			chart=chartnew
			viewer()
		}
	}
},false);


document.getElementById('save_json_file').addEventListener("click",()=>{
	var url=URL.createObjectURL(new Blob([JSON.stringify(chart)], {type: 'application\/json'}))
	var down_link = document.createElement("a");
	down_link.download = "maxlimit.json";
	down_link.href =url;
	down_link.click();
	URL.revokeObjectURL(url);
});


function getchart(){
	return chart
}



function csvdata_to_chart(csvdata){
	var nodes=new Array()
	var links=new Array()
	let tags=new Array()
	let nodes_map=new Map()
	let id_counter=0
	for(var i=1;i<csvdata.length;i+=2){
		if(csvdata[i][0]=="") continue;
		if(nodes_map.get(csvdata[i][0])!=null) continue
		let attrs=csvdata[i][2].split(";")
		console.log(i)
		nodes.push({id:id_counter,Name:csvdata[i][0],type:attrs.includes("末端")?"end_pin":"pin",is_water:attrs.includes("水場"),x:300+id_counter*10,y:300+id_counter*10})
		nodes_map.set(csvdata[i][0],id_counter)
		id_counter++
	}
	id_counter=0
	let defaultattrs=new Array()
	for(var i=0;i<csvdata.length;i+=2){
		if(csvdata[i][0]!=""){
			defaultattrs=csvdata[i][0].split(";")
		}
		if(i==0) continue
		if(i+1>=csvdata.length) break
		let temp_from=nodes_map.get(csvdata[i-1][0])
		let temp_to=nodes_map.get(csvdata[i+1][0])
		if(temp_from==null||temp_to==null) continue
		let rows=csvdata[i][1].split("/")
		if(rows.length!=2) continue
		if(!Number.isInteger(Number(rows[0]))||!Number.isInteger(Number(rows[1]))) continue
		if(rows[0]==""&&rows[1]=="") continue
		//type,route
		let attrs=csvdata[i][2].split(";")
		
		let temp_type=attrs.includes("本ルート")?"NORMAL":(attrs.includes("OR")?"OR":(attrs.includes("ER")?"ER":""))
		if(temp_type=="") temp_type=defaultattrs.includes("本ルート")?"NORMAL":(defaultattrs.includes("OR")?"OR":(defaultattrs.includes("ER")?"ER":""))
		if(temp_type=="") temp_type="NORMAL"
		
		let temp_route=attrs.includes("道")?"road":(attrs.includes("藪")?"bush":(attrs.includes("沢")?"stream":(attrs.includes("岩")?"rock":(attrs.includes("冬")?"winter":(attrs.includes("林道")?"car_road":"")))))
		if(temp_route=="") temp_route=defaultattrs.includes("道")?"road":(defaultattrs.includes("藪")?"bush":(defaultattrs.includes("沢")?"stream":(defaultattrs.includes("岩")?"rock":(defaultattrs.includes("冬")?"winter":(defaultattrs.includes("林道")?"car_road":"")))))
		if(temp_route=="") temp_route="road"
		
		let temp_distance=0
		if(rows[0]!=""){
			if(rows[1]!=""){
				temp_distance=(Number(rows[0])+Number(rows[1]))/2
			}else{
				temp_distance=Number(rows[0])
			}
		}else{
			temp_distance=Number(rows[1])
		}
		
		if(rows[0]!=""){
			links.push({id:id_counter,value:Number(rows[0]),from:temp_from,to:temp_to,type:temp_type,route:temp_route,distance:temp_distance})
			id_counter++
		}
		if(rows[1]!=""){
			links.push({id:id_counter,value:Number(rows[1]),from:temp_to,to:temp_from,type:temp_type,route:temp_route,distance:temp_distance})
			id_counter++
		}
		
	}
	id_counter=0
	for(const v of nodes){
		tags.push({id:id_counter,value:v.Name,coord_type:"rel",rel_type:"nodes",rel_id:v.id,x:0,y:-15})
		id_counter++
	}
	
	for(const v of links){
		tags.push({id:id_counter,value:v.value,coord_type:"rel_polar",rel_type:"links",rel_ratio:0.1,rel_id:v.id,rel_radian:-0.5*Math.PI})
		id_counter++
	}
	
	return {
		window_setting:{x:0,y:0,zoom:1,fontsize:8,pin_radius:8,line_magnification:4},
		objects:{
		nodes:nodes,
		links:links,
		tags:tags,
	}}
}