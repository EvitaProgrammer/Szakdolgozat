$(function(){
	var onSlide = function(e){
		var columns = $(e.currentTarget).find("td");
		var ranges = [], total = 0, i, s ="Ranges: ", w;
		for(i = 0; i<columns.length; i++){
			w = columns.eq(i).width()-14 - (i==0?1:0);
			ranges.push(w);
			total+=w;
		}		 
		for(i=0; i<columns.length; i++){			
			ranges[i] = 90*ranges[i]/total+1910;
		}
		s=s.slice(0,-1);			
		//$("#text").html("Selected range: " +Math.round(ranges[1]*10)/10 +"% starting at: "+ Math.round(ranges[0]*10)/10 +"%");
		$("#text").html("From " + Math.round(ranges[0]) + " To " + Math.round(ranges[1]+ranges[0]-1910));
		csuszka_tol = Math.round(ranges[0]);
		csuszka_ig = Math.round(ranges[1]+ranges[0]-1910);
	}
	
	$("#range").colResizable({
		liveDrag:true, 
		draggingClass:"rangeDrag",
		gripInnerHtml:"<div class='rangeGrip'></div>", 
		onResize:onSlide,
		minWidth:12
	});
});