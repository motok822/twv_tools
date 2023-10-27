//reference
//https://observablehq.com/@d3/mobile-patent-suits

var chart={
	window_setting:{width:700,height:500,x:0,y:0},
	objects:{
		nodes:[{id:0,type:"pin",x:200,y:200,r:30},{id:1,type:"pin",x:400,y:400,r:30}],
		links:[{id:0,from:0,to:1,type:"arrow",route:"NORMAL"},{id:1,from:1,to:0,type:"arrow",route:"NORMAL"}],
	},
	css:{circle:{circle_out:{"r":10,"fill":"green","stroke":"black","stroke-width":2}/*,"circle_in":{}*/},path:{arrow:{"stroke-width":"2","fill":"white","fill-opacity":0},route_color:{"NORMAL":"black","ER":"red"}}},
}

const svg=d3.select("body").append("svg")
load(chart,svg)

/*
var width=700
var height=500
svg.attr("width",width)
	.attr("height",height)
const dataset = [ 5, 10, 15, 20, 25 ];

svg.selectAll("circle")
 .data(dataset)
 .enter()
 .append("circle")
 .attr("cx",(d,i)=>(i*50+25))
 .attr("cy",height/2)
 .attr("r",(d)=>(d));
 */
function load(chart,svg){
	
	svg.attr("width",chart.window_setting.width)
	svg.attr("height",chart.window_setting.height)
	
	var objects=svg.selectAll("g").data(chart.objects.nodes.concat(chart.objects.links)).join("g")
	var nodes=new Array()
	nodes["pin"]=objects.filter((d,i)=>(d.type=="pin"))
	var links=objects.filter((d,i)=>(d.type=="arrow"))
	{
		let colors=new Array()
		for(const v in chart.css.path.route_color){
			if(!colors.includes(chart.css.path.route_color[v])){
				colors.push(chart.css.path.route_color[v])
			}
		}
		if(!colors.includes("black")){
			colors.push("black")
		}
	}
	
	{
		let lin_path=links.append("path")
			.attr("d",(d)=>(linkArc(d.from,d.to,chart)))
			.attr("stroke",(d)=>{
				if(!chart.css.path.route_color[d.route]){
					return chart.css.path.route_color[d.route]
				}
				return "black"
			})
			.attr("marker-end",(d)=>{
				if(!chart.css.path.route_color[d.route]){
					console.log(chart)
					return "url(#arrow-end_"+chart.css.path.route_color[d.route]+")"
				}
				return "url(#arrow-end_black)"
			})
		for(let v in chart.css.path.arrow){
			lin_path.attr(v,chart.css.path.arrow[v])
		}
	}
	{
		let cir=nodes["pin"].append("circle")
		.attr("cx",(d)=>(d.x-chart.window_setting.x))
		.attr("cy",(d)=>(d.y-chart.window_setting.y))
		for(let v in chart.css.circle.circle_out){
			cir.attr(v,chart.css.circle.circle_out[v])
		}
	}
	
}

function linkArc(source,dest,chart){
	let source_coord={x:0,y:0}
	let dest_coord={x:0,y:0}
	for(const v of chart.objects.nodes){
		if(v.id==source){
			source_coord.x=v.x
			source_coord.y=v.y
		}
	}
	for(const v of chart.objects.nodes){
		if(v.id==dest){
			dest_coord.x=v.x
			dest_coord.y=v.y
		}
	}
	let vector=source_coord-dest_coord
  const r=Math.hypot(dest_coord.x-source_coord.x,dest_coord.y-source_coord.y);
  return "M"+(source_coord.x-chart.window_setting.x)+","+(source_coord.y-chart.window_setting.y)+"\r\n"+"A"+r+","+r+" 0 0,1 "+(dest_coord.x-chart.window_setting.x)+","+(dest_coord.y-chart.window_setting.y)
}