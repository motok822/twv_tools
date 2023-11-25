
function getbyid(arr,id){
	for(const v of arr){
		if(v.id==id) return v
	}
	return null
}
const conv_x = (x)=>(x-chart.window_setting.x)
const conv_y = (y)=>(y-chart.window_setting.y)

const unconv_x = (x)=>(x+chart.window_setting.x)
const unconv_y = (y)=>(y+chart.window_setting.y)

var chart=getchart()
var nodes
var links
var tags
var simulation

function viewer(){
	chart=getchart()
	for(let v of chart.objects.links){
		v.source=v.from
		v.target=v.to
	}
	
	d3.select("body").selectAll("svg").remove()
	const svg=d3.select("body").append("svg")
		.attr("width",window.innerWidth)
		.attr("height",window.innerHeight)

		
	links=svg.selectAll("path").data(chart.objects.links).enter().append("path")
		.attr("stroke-width", 1)
		.attr("stroke",(d)=>(chart.line_color[d.type][d.route]!=null?chart.line_color[d.type][d.route]:(chart.line_color[d.type]["def"]!=null?chart.line_color[d.type]["def"]:"black")))
		.attr("fill","white")
		.attr("fill-opacity",0)
		.attr("marker-end",(d)=>("url(#arrow-end_"+(chart.line_color[d.type][d.route]!=null?chart.line_color[d.type][d.route]:(chart.line_color[d.type]["def"]!=null?chart.line_color[d.type]["def"]:"black")))+")")
	var colors=new Array()
	for(let p in chart.line_color.NORMAL)	colors.push(chart.line_color.NORMAL[p])
	for(let p in chart.line_color.OR)	colors.push(chart.line_color.OR[p])
	for(let p in chart.line_color.ER)	colors.push(chart.line_color.ER[p])
	svg.append("defs").selectAll("marker")
	.data(colors).enter()
	.append("marker")
		.attr("id", d =>("arrow-end_"+d))
		.attr("markerUnits","strokeWidth")
		.attr("viewBox", "0 0 10 10")
		.attr("refX",10)
		.attr("refY",5)
		.attr("markerWidth", 10)
		.attr("markerHeight", 10)
		.attr("orient", "auto")
	.append("polygon")
		.attr("points","0,0 5,5 0,10 10,5 ")
		.attr("fill",d=>(d));

	nodes=svg.selectAll("g").data(chart.objects.nodes).enter().append("g")
	nodes.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended))

	tags=svg.selectAll("text").data(chart.objects.tags).enter().append("text")
		.text((d)=>(d.value))
		.call(d3.drag()
			.on("start", tag_dragstarted)
			.on("drag", tag_dragged)
			.on("end", tag_dragended))
		

	simulation = d3.forceSimulation()
		.force("link", d3.forceLink())
		.force("charge", d3.forceManyBody())
		//.force("center", d3.forceCenter(200, 150));

	simulation
		.nodes(chart.objects.nodes)
		.on("tick", ticked);

	simulation.force("link")
		.links(chart.objects.links)
		.distance((d)=>{
			if(d.route=="bush") return 0.5*d.distance*chart.window_setting.line_magnification;
			return d.distance*chart.window_setting.line_magnification;
		})
}
function ticked(){
	nodes.selectAll("circle").remove()
	nodes
		.append("circle")
			.attr("r",chart.window_setting.pin_radius*chart.window_setting.zoom)
			.attr("cx",(d)=>(conv_x(d.x)))
			.attr("cy",(d)=>(conv_y(d.y)))		
			.attr("fill","white")
			.attr("fill-opacity",0)
			.attr("stroke","black")
			.attr("stroke-width",2)
	nodes.filter((d)=>(d.type=="end_pin"))
		.append("circle")
			.attr("r",0.5*chart.window_setting.pin_radius*chart.window_setting.zoom)
			.attr("cx",(d)=>(conv_x(d.x)))
			.attr("cy",(d)=>(conv_y(d.y)))		
			.attr("fill","white")
			.attr("fill-opacity",0)
			.attr("stroke","black")
			.attr("stroke-width",2)
		
	links	
		.attr("d",(d)=>(linkArc(d.source,d.target,chart.window_setting.pin_radius*chart.window_setting.zoom)))
		//.attr("d",(d)=>(linkArc(d.source,d.target)))
	tags
		.attr("font-size",chart.window_setting.fontsize*chart.window_setting.zoom)
	tags.filter((d,i)=>(d.coord_type=="rel"))
		.attr("x",(d)=>(conv_x(d.x+getbyid(chart.objects[d.rel_type],d.rel_id).x)))
		.attr("y",(d)=>(conv_y(d.y+getbyid(chart.objects[d.rel_type],d.rel_id).y)))
	tags.filter((d,i)=>(d.coord_type=="rel_polar"))
		.attr("x",(d)=>{
			if(!d.is_dragging){
				d.x=rel_polar_conv(getbyid(chart.objects[d.rel_type],d.rel_id).source,getbyid(chart.objects[d.rel_type],d.rel_id).target,d.rel_ratio,d.rel_radian).x
				return conv_x(d.x)
			}
			return conv_x(d.x)
		})
		.attr("y",(d)=>{
			if(!d.is_dragging){
				d.y=rel_polar_conv(getbyid(chart.objects[d.rel_type],d.rel_id).source,getbyid(chart.objects[d.rel_type],d.rel_id).target,d.rel_ratio,d.rel_radian).y
				return conv_y(d.y)
			}
			return conv_y(d.y)
		})
}

function rel_polar_conv(source,dest,ratio,radian){
	let unit_vec_hyp=Math.hypot(dest.x-source.x,dest.y-source.y)
	let unit_vec={x:(dest.x-source.x)/unit_vec_hyp,y:(dest.y-source.y)/unit_vec_hyp}
	let unit_vec_rot={x:unit_vec.x*Math.cos(radian)-unit_vec.y*Math.sin(radian),y:unit_vec.x*Math.sin(radian)+unit_vec.y*Math.cos(radian)}
	return {x:(source.x+dest.x)/2.0+unit_vec_hyp*ratio*unit_vec_rot.x,y:(source.y+dest.y)/2.0+unit_vec_hyp*ratio*unit_vec_rot.y}
}

function rel_polar_unconv(source,dest,coord){
	let unit_vec_hyp=Math.hypot(dest.x-source.x,dest.y-source.y)
	let unit_vec={x:(dest.x-source.x)/unit_vec_hyp,y:(dest.y-source.y)/unit_vec_hyp}
	let unit_vec_rot_hyp=Math.hypot(coord.x-(source.x+dest.x)/2.0,coord.y-(source.y+dest.y)/2.0)
	let unit_vec_rot={x:(coord.x-(source.x+dest.x)/2.0)/unit_vec_rot_hyp,y:(coord.y-(source.y+dest.y)/2.0)/unit_vec_rot_hyp}
	let vec_cos=unit_vec.x*unit_vec_rot.x+unit_vec.y*unit_vec_rot.y
	let vec_sin=unit_vec.x*unit_vec_rot.y-unit_vec.y*unit_vec_rot.x
	return {radian:Math.atan2(vec_sin,vec_cos),ratio:unit_vec_rot_hyp/unit_vec_hyp}
}

function linkArc(source,dest,r){
	let hy=Math.hypot(dest.x-source.x,dest.y-source.y)
	let vector={x:(dest.x-source.x)/hy,y:(dest.y-source.y)/hy}
	let source_={x:source.x+vector.x*r,y:source.y+vector.y*r}
	let dest_={x:dest.x-vector.x*r,y:dest.y-vector.y*r}
	const hy_=Math.hypot(dest_.x-source_.x,dest_.y-source_.y);
  return "M"+conv_x(source_.x)+","+conv_y(source_.y)+"\r\n"+"A" +2.5*hy_+" "+2.5*hy_+" 0 "+"0,1 "+conv_x(dest_.x)+","+conv_y(dest_.y)
}

function dragstarted(d) {
	if(!d3.event.active) simulation.alphaTarget(0.3).restart();
	d.fx = d.x;
	d.fy = d.y;
}

function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragended(d) {
	if(!d3.event.active) simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;
}
//tag
function tag_dragstarted(d) {
	d.is_dragging=true
	/*
	if(d.type=="rel_polar"){
		d.event.x=d.ox
		d.event.y=d.oy
	}
	*/
}

function tag_dragged(d) {
	d.x=d3.event.x
	d.y=d3.event.y
	tags.filter((a,i)=>(a.coord_type=="rel")).filter((a,i)=>(a.id==d.id))
		.attr("x",(d)=>(conv_x(d.x+getbyid(chart.objects[d.rel_type],d.rel_id).x)))
		.attr("y",(d)=>(conv_y(d.y+getbyid(chart.objects[d.rel_type],d.rel_id).y)))
	tags.filter((a,i)=>(a.coord_type=="rel_polar")).filter((a,i)=>(a.id==d.id))
		.attr("x",(d)=>(conv_x(d.x)))
		.attr("y",(d)=>(conv_y(d.y)))
}

function tag_dragended(d){
	d.is_dragging=false
	let temp_coord={x:d.x,y:d.y}
	if(d.coord_type=="rel_polar"){
		temp_coord=rel_polar_unconv(getbyid(chart.objects[d.rel_type],d.rel_id).source,getbyid(chart.objects[d.rel_type],d.rel_id).target,temp_coord)
		d.rel_radian=temp_coord.radian
		d.rel_ratio=temp_coord.ratio
	}
}
function delete_max(){
	let newtag=new Array()
	for(const v of chart.objects.tags){
		if(!v.is_maxlimit){
			newtag.push(v)
		}
		
	}
	chart.objects.tags=newtag
	viewer()
}

function spread_time(id,time,from,arr){
	for(let v of chart.objects.links){
		if(v.to==id){
			let target=null
			for(let w of chart.objects.nodes){
				if(w.id==v.from) target=w
			}
			if(target==null) continue
			if(target.type=="end_pin") continue
			if(arr.includes(target.id)) continue
			if(target.time2==null||target.time2>time+v.value){
				if(time+v.value<target.time1||target.time1==null){
					target.time2=target.time1
					target.time2_from=target.time1_from
					target.time1=time+v.value
					target.time1_from=from
				}else{
					target.time2=time+v.value
					target.time2_from=from
				}
				arr.push(target.id)
				spread_time(target.id,time+v.value,from,arr)
			}
		}
	}
	arr.pop()
}

function get_route(from,to,time,route){
	if(time<0){
		return null
	}
	if(time==0&&from==to){
		return route
	}
	for(let v of chart.objects.links){
		if(v.from==from){
			if(route.includes(v.to)) continue
			route.push(v.to)
			let temp_route=get_route(v.to,to,time-v.value,route)
			if(temp_route!=null){
				return temp_route
			}
			route.pop()
		}
	}
	return null
}
function sum_car_route(route){
	console.log(route)
	let sum_time=0
	for(let i=0;i+1<route.length;++i){
		for(let v of chart.objects.links){
			if(v.from==route[i]&&v.to==route[i+1]){
				if(v.route=="car_road"){
					sum_time+=v.value
				}
				break
			}
		}
	}
	return sum_time
}

function calc_max(){
	delete_max()
	if(document.getElementById("daystart").value==""||document.getElementById("dayend").value==""){
		alert("daystart or dayend is not specified")
		return
	}
	let daystart={hour:document.getElementById("daystart").value.split(":")[0],minute:document.getElementById("daystart").value.split(":")[1]}
	let dayend={hour:document.getElementById("dayend").value.split(":")[0],minute:document.getElementById("dayend").value.split(":")[1]}
	for(let v of chart.objects.nodes){
		v.time1=null
		v.time2=null
		if(v.type=="end_pin"){
			v.time1=0
			v.time2=0
		}
	}
	for(let v of chart.objects.nodes){
		if(v.type=="end_pin"){
			spread_time(v.id,0,v.id,[v.id])
		}
	}
	for(let v of chart.objects.nodes){
		if(v.time2==null){
			v.time2=v.time1
			v.time2_from=v.time1_from
		}
	}
	let id_counter=0
	for(let v of chart.objects.tags){
		if(v.id>id_counter){
			id_counter=v.id
		}
	}
	id_counter++
	for(let v of chart.objects.nodes){
		if(v.time2==0) continue
		let is_edge_max=true
		let only_to=null
		for(let w of chart.objects.links){
			if(w.from==v.id){
				if(only_to!=null){
					is_edge_max=false
					break
				}else{
					only_to=w.to
				}
			}
		}
		if(is_edge_max){
			for(let w of chart.objects.links){
				if(w.to==v.id){
					if(w.from!=only_to){
						is_edge_max=false
						break
					}
				}
			}
		}
		let is_max=true
		for(let w of chart.objects.links){
			let compare=null
			if(w.from==v.id) compare=w.to
			if(w.to==v.id) compare=w.from
			if(compare!=null){
				for(let k of chart.objects.nodes){
					if(k.id==compare){
						if(k.time2<v.time2) is_max=false
						break
					}
				}
				if(!is_max) break
			}
		}
		if(is_max||is_edge_max){
			let route1=get_route(v.id,v.time1_from,v.time1,[v.id])
			if(route1==null||route1.length==0){
				console.log("1:"+v.id+","+v.time1_from+","+v.time1)
				continue
			}
			let route2=get_route(v.id,v.time2_from,v.time2,[v.id])
			if(route2==null||route2.length==0){
				console.log("1:"+v.id+","+v.time2_from+","+v.time2)
				continue
			}
			if(route1[1]==route2[1]){
				route2=route1
				v.time2=v.time1
				v.time2_from=v.time1_from
			}
			let result_str=""
			result_str+="("+v.time1
			if(sum_car_route(route1)!=0) result_str+="("+(v.time1-sum_car_route(route1))+")"
			result_str+=","+v.time2
			if(sum_car_route(route2)!=0) result_str+="("+(v.time2-sum_car_route(route2))+")"
			result_str+=");"
			
			let margin=60
			for(let i=0;i+1<route1.length;++i){
				for(let w of chart.objects.links){
					if(w.from==route1[i]&&w.to==route1[i+1]){
						if(w.route=="bush"||w.route=="winter"){
							margin=90
						}
					}
				}
			}
			for(let i=0;i+1<route2.length;++i){
				for(let w of chart.objects.links){
					if(w.from==route2[i]&&w.to==route2[i+1]){
						if(w.route=="bush"||w.route=="winter"){
							margin=90
						}
					}
				}
			}
			
			let limittime=new Date()
			limittime.setHours(dayend.hour)
			limittime.setMinutes(dayend.minute)
			
			limittime.setTime(limittime.getTime()-1.2*1000*60*((((v.time2-sum_car_route(route2))<(v.time1-sum_car_route(route1)))?(v.time1-sum_car_route(route1)):(v.time2-sum_car_route(route2))))-1000*60*margin)
			
			result_str+=limittime.getHours()+":"+limittime.getMinutes()
			chart.objects.tags.push({id:id_counter,value:result_str,is_maxlimit:true,coord_type:"rel",rel_type:"nodes",rel_id:v.id,x:-30,y:-30})
			id_counter++
			console.log(route1,route2)
		}
	}
	
	console.log(chart)
	viewer()
}
