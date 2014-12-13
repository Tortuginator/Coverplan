function RenderJSON_Covers(URL){
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if (xmlhttp.responseText===''){
				if (document.getElementById("loadingR") !== null){document.getElementById("loadingR").remove();}
				document.getElementById("tablecontent").innerHTML = '<div class="alert alert-success" role="alert" style="margin-bottom:0px">No covers for Today</div>';
			}else{
				var JSON_A = JSON.parse(xmlhttp.responseText);
				CoverRENDER(JSON_A);
			}
			
		}else if(xmlhttp.status == 404){
			if (document.getElementById("loadingR") !== null){document.getElementById("loadingR").remove();}
			document.getElementById("tablecontent").innerHTML = '<div class="alert alert-danger" role="alert" style="margin-bottom:0px">No Covers found</div>';
		}
	}

	xmlhttp.open("GET", URL, true);
	xmlhttp.send();
}
function CoverRENDER(CoverJSON){
	CoverJSON = ArraySort(CoverJSON);
	document.getElementById("loadingR").remove();
	var rendered = "";
	if (CoverJSON.length === 0 || CoverJSON.length === undefined){
		document.getElementById("tablecontent").innerHTML = '<div class="alert alert-success" role="alert" style="margin-bottom:0px">No covers for Today</div>';
	}else{
			for (var i = 0; i < CoverJSON.length; i++){
				//STATEMENT SELECTOR

				CoverJSON[i].Event = GetEvent(CoverJSON[i].Event);
				CoverJSON[i].Replacement = GetReplacement(CoverJSON[i].Replacement);
				
				//SUB STATEMENT SELECTOR
				if (CoverJSON[i].Replacement === '<span class="label label-default">No Cover</span>'){CoverJSON[i].Event = '<span class="label label-danger">cancled</span>';}
				
				//RENDER Content
				rendered =  rendered + '<tr>'+
							'		<th>' + CoverJSON[i].Lesson + '.</th>'+
							'		<th>' + CoverJSON[i].Class + '</th>'+
							'		<th>' + CoverJSON[i].Event + '</th>'+
							'		<th>' + CoverJSON[i].Absent + '</th>'+
							'		<th>' + CoverJSON[i].Replacement + '</th>'+
							'		<th>' + CoverJSON[i].Subject + '</th>' +
							'		<th>' + CoverJSON[i].Comment + '</th>' +
							'		<th>' + CoverJSON[i].Room + '</th>'+
							'	</tr>';
			}
		
		if (document.getElementById("coverlesson").innerHTML === undefined){
			document.getElementById("tablecontent").innerHTML = '<div class="alert alert-danger" role="alert" style="margin-bottom:0px;"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>No Covers found</div>';
		}else{
			document.getElementById("coverlesson").innerHTML = rendered;
		}
	}
}
function ArraySort(a){
	var TMP_array = [];
	var TMP_index = -1;
	//Sort for Lesson Number
	for (var i = 0; i < 10; i++){
		for (var p = 0; p < a.Covers.length; p++){
			if (a.Covers[p].Lesson === i){
				TMP_index = TMP_index+1;
				TMP_array[TMP_index] = a.Covers[p];
			}
		}
	}
	return TMP_array;
}
function GetEvent(Event){
	Event = Event.toLowerCase();
	switch (Event){
			case "cancled":
				Event = '<span class="label label-danger">' + Event + '</span>';
				break;
			case "covered":
				Event = '<span class="label label-warning">' + Event + '</span>';
				break;
			case "moved":
				Event = '<span class="label label-primary">' + Event + '</span>';
				break;
			case "switched":
				Event = '<span class="label label-success">' + Event + '</span>';
				break;
	}
	return Event;
}
function GetReplacement(Replacement){
	if (Replacement == 'COV1' || Replacement == 'COV2' || Replacement == 'COV3' || Replacement == 'COV4'|| Replacement == 'COV5'||Replacement == 'NOCOV'){
		Replacement = '<span class="label label-default">No Cover</span>';
	}
	return Replacement;
}