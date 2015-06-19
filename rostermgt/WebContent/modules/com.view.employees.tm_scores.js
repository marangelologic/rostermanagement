$(document).ready(function() {
	GetAllTmManagers();
	$("#tm_select").change(function() {
		GetAllSpecialistPerTm($("#tm_select").val());
	});
});

function GetAllTmManagers() {
	globalobj.ShowLoadingPage();
	var data = "";
	var i = 0;
	$.ajax({
		type : "POST",
		url : "GetAllTmNames",
		data : "{}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#tm_select").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			data = data + "<options>--</options>";
			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].emp_id + "'>"
						+ resultsArray[i].emp_name + "</options>";
			}

		},
		complete : function(e) {
			$("#tm_select").append(data);
			$.unblockUI();
		}
	});

}

function GetAllSpecialistPerTm(id) {
	var data = "";
	var i = 0;
	$.ajax({
		type : "POST",
		url : "GetAllSpecialistPerTm",
		data : "{\"tm_id\":\"" + id + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#list_specialist_per_tm_scores").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			data = data + "<thead><tr><th>Employee Number</th>";
			data = data + "<th>Employee Name</th>";
			data = data + "<th>Total Count</th>";
			data = data + "<th>Total Scores</th>";
			data = data + "<th>Score</th></tr></thead><tbody>";

			for (i = 0; i < resultsArray.length; i++) {
				data = data + "<tr><td>" + resultsArray[i].emp_id + "</td>";
				data = data + "<td>" + resultsArray[i].emp_name + "</td>";
				data = data + "<td>" + resultsArray[i].score_count + "</td>";
				data = data + "<td>" + resultsArray[i].score_total + "</td>";
				data = data + "<td>" + resultsArray[i].score + "</td></tr>";
			}
		},
		complete : function(e) {
			$("#list_specialist_per_tm_scores").append(data + "</tbody>");
		}
	});

}