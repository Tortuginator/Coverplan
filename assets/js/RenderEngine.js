function RenderJSON_Covers(URL){
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var JSON_A = JSON.parse(xmlhttp.responseText);
			CoverRENDER(JSON_A);
		}
	}

	xmlhttp.open("GET", URL, true);
	xmlhttp.send();
}
function CoverRENDER(CoverJSON){
	document.getElementById("loadingR").remove();
	var rendered = "";
	if (CoverJSON.Covers.length === 0){
		document.getElementById("tablecontent").innerHTML = '<div class="alert alert-danger" role="alert" style="margin-bottom:0px;"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>No Covers found</div>';
	}else{
			for (var i = 0; i < CoverJSON.Covers.length; i++){
				//STATEMENT SELECTOR

				CoverJSON.Covers[i].Event = GetEvent(CoverJSON.Covers[i].Event);
				
				//RENDER Content
				rendered =  rendered + '<tr>'+
							'		<th>' + CoverJSON.Covers[i].Lesson + '.</th>'+
							'		<th>' + CoverJSON.Covers[i].Class + '</th>'+
							'		<th>' + CoverJSON.Covers[i].Event + '</th>'+
							'		<th>' + CoverJSON.Covers[i].Absent + '</th>'+
							'		<th><span class="label label-default">' + CoverJSON.Covers[i].Replacement + '</span></th>'+
							'		<th>' + CoverJSON.Covers[i].Subject + '</th>' +
							'		<th>' + CoverJSON.Covers[i].Comment + '</th>' +
							'		<th>' + CoverJSON.Covers[i].Room + '</th>'+
							'	</tr>';
			}
		
		if (document.getElementById("coverlesson").innerHTML === undefined){
			document.getElementById("tablecontent").innerHTML = '<div class="alert alert-danger" role="alert" style="margin-bottom:0px;"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>No Covers found</div>';
		}else{
			document.getElementById("coverlesson").innerHTML = rendered;
		}
	}
}
function GetEvent(Event){
	switch (Event){
			case "Cancled":
				Event = '<span class="label label-danger">' + Event + '</span>';
				break;
			case "Covered":
				Event = '<span class="label label-warning">' + Event + '</span>';
				break;
			case "Moved":
				Event = '<span class="label label-primary">' + Event + '</span>';
				break;
			case "Switched":
				Event = '<span class="label label-success">' + Event + '</span>';
				break;
	}
	return Event;
}