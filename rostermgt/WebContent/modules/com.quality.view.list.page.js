/**
 * qm list
 */

$(document).ready(function() {
	GetAllRequestList("", "", "", "All", "");
	$("#tm_qa_home_view").hide();
	populateQuaterFields();
	globalobj.timer = setInterval(function() {

		CountNewRequesttest();
	}, 5000);

	$("#advance_search").click(function() {
		globalobj.ShowLoadingPage();
		$("#tm_qa_home_view").toggle("slow", function() {  

			if ($("#tm_qa_home_view").is(":hidden") == true) {
				$("#advance_search").text("+ Advance Search");
				GetAllRequestList("", "", "", "All", "");
			} else {
				$("#advance_search").text("- Simple Menu");
				
			}
			$.unblockUI();
		});
		$("#filter_qa_tm_list").click(function() {
			AdvancedSearchQM();
		});

	});

});

function GetAllRequestList(quarter, year, status, isAll, type) {
	$("#qm_list_view").html("");
	globalobj.ShowLoadingPage();
	var data = "";
	data = data
			+ "<table id='test_qa_list' class='display'><thead style='font-size:medium'> <tr><th style='color: black'>Status</th>";
	data = data + "<th style='color: black'>Manager</a></th>";
	data = data + "<th style='color: black'>Employee</th>";
	data = data + "<th style='color: black;'>Type</a></th>";// request order
	data = data + "<th style='color: black'>Action</th>";// request order
	data = data + "<th style='color: black'>Current Target</th>";
	data = data + "<th style='color: black'>Requested Target</th>";
	data = data + "<th style='color: black'>Impact 360</th>";
	data = data + "<th style='color: black'>Reporting</th>";
	data = data + "<th style='color: black'>Quarter</th>";
	data = data + "<th style='color: black'>Dates</th>";
	data = data + "<th style='color: black'></th>";
	data = data + "<th style='color: black'></th>";
	data = data + "<th style='color: black'></th>";
	data = data + "<th style='color: black'></th>";
	data = data + "</tr></thead><tbody>";
	// isAll, type, quarter, year, status
	$
			.ajax({
				type : "POST",
				url : "QaTmCtrl",
				data : "{\"signature\":\"advancesearch\"" + ",\"isAll\":\""
						+ isAll + "\"" + ",\"quarter\":\"" + quarter + "\""
						+ ",\"qm_year\":\"" + year + "\"" + ",\"type\":\""
						+ type + "\"" + ",\"status\":\"" + status + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (var i = 0; i < resultsArray.length; i++) {
						data = data + "<tr><td style='color:red'>"
								+ resultsArray[i].request_status + "</td>";
						data = data + " <td><a href='javascript:void(0)'>"
								+ resultsArray[i].tm_name + "</a> </td>";
						data = data
								+ " <td style='padding-left:10px;'><a href='javascript:void(0)')'>"
								+ resultsArray[i].emp_name + "</a></td>";
						data = data
								+ " <td style='padding-left:10px;'>"
								+ ReturnStringType(resultsArray[i].request_sub_type)
								+ "</td>";

						data = data + " <td style='padding-left:10px;'>"
								+ resultsArray[i].request_type + "</td>";
						data = data + " <td width: 5px;'>"
								+ HideScore(resultsArray[i].request_sub_type,resultsArray[i].tm_prev_score) + "</td>";

						data = data + " <td width: 5px;'>"
								+ AppendSelect(i,resultsArray[i].tm_current_score,resultsArray[i].request_sub_type) + "</td>";

						data = data + " <td style='padding-left:10px;'>"
								+ "<select id='impact_qm_status_"
								+ resultsArray[i].tbl_serial_id
								+ "' onchange='UpdateTAgging(\""
								+ resultsArray[i].tbl_serial_id + "\")'>"
								+ SelectStatus(resultsArray[i].imp360_status)
								+ "</td>"; /* imptact 360 */
						data = data
								+ " <td style='padding-left:10px;'>"
								+ "<select id='reporting_qm_status_"
								+ resultsArray[i].tbl_serial_id
								+ "' onchange='UpdateTAgging(\""
								+ resultsArray[i].tbl_serial_id
								+ "\")'>"
								+ SelectStatus(resultsArray[i].reporting_status)
								+ "</select></td>"; /* reporting status */

						data = data + " <td  style=\"text-align:center\">"
								+ resultsArray[i].quarter + "</td>";

						data = data
								+ " <td>"
								+ globalobj
										.returnBlank(resultsArray[i].start_date)
								+ "</td>";

						data = data + " <td title='Approve?'>"
								+ "<a href='javascript:void(0)' onClick=\""
								+ "UpdateProgress('"
								+ resultsArray[i].tbl_serial_id
								+ "','approved','" + i +"')\">"
								+ "<img src='img/tag-green-icon.png' /></a>"
								+ "</td>";

						data = data
								+ " <td title='Decline?'>"
								+ "<a href='javascript:void(0)' onClick=\""
								+ "UpdateProgress('"
								+ resultsArray[i].tbl_serial_id
								+ "','declined')\">"
								+ "<img src='img/tag-blue-delete-icon.png' /></a>"
								+ "</td>";

						data = data
								+ " <td title='Team Manager activity' style='padding-left:10px; align: center;'><a title='"
								+ QmNoActivity(resultsArray[i].reason_tm)
								+ "' href='javascript:void(0);' onClick='popUpCommentQm(\""
								+ QmNoActivity(resultsArray[i].reason_tm
										+ "\",\""
										+ resultsArray[i].tbl_serial_id)
								+ "\")'>"
								+ "<img src='img/comments-icon.png' />"
								+ " </td>";
						data = data + "<td title='Evaluator info'><a href='javascript:void(0);' onclick='PopUpEvaluatorInfo(\"" +  resultsArray[i].tbl_serial_id +"\")'>";
						data = data + "<img src=\"img/1433341510_info_16.png\" /></a></td> </tr>";
					}
					$("#qm_list_view").append(data + " </tbody><table>");
				},
				complete : function(e) {
					$("#test_qa_list").dataTable(
							{

								"lengthMenu" : [ [ 25, 50, 100, 200, -1 ],
										[ 25, 50, 100, 200, "All" ] ],
								"bDeferRender" : true,
								"sScrollX" : "100%",
								"bScrollCollapse" : false,
								"sScrollY" : "400px",
								"pagingType" : "full_numbers",
								"iDisplayLength" : -1,
								"bAutoWidth" : false,
								"sScrollX" : "100%",

								"columns" : [ {
									"width" : "50%"
								}, {
									"width" : "50%"
								}, {
									"width" : "50%"
								}, {
									"width" : "50%"
								}, {
									"width" : "50%"
								}, {
									"width" : "50%"
								}, {
									"width" : "55%"
								}, {
									"width" : "50%"
								}, {
									"width" : "50%"
								}, {  
									"width" : "50%"
								}, {
									"width" : "50%"
								}, {
									"width" : "20%",
									"bSortable" : false
								}, {
									"width" : "20%",
									"bSortable" : false
								}, {
									"width" : "20%",
									"bSortable" : false
								}, {
									"width" : "20%",
									"bSortable" : false
								}  ],
								"aaSorting" : []
							});
					$.unblockUI();
				}
			});
}
function QmNoActivity(comment) {
	var newString = comment;
	if (comment == "" || comment == undefined || comment == null
			|| comment == "undefined") {
		newString = "This is still under review by the Quality Managers";
	}

	return newString;
}
function popUpCommentQm(comment, serialId) {
	window.open("../rostermgt/qmtmlogpage.jsp?serialId=" + serialId, "",
			"width=500, height=1130");

}
function ReturnStringType(type) {
	var newString = "";
	if (type == "target") {
		newString = "Target Change";
	} else {
		newString = "Weekly Exemption";
	}
	return newString;

}

function SelectStatus(type) {
	var data = "";
	var dataType = [ "New", "In Progress", "Completed", "N/A" ];
	for (var i = 0; i < dataType.length; i++) {
		if (type == dataType[i]) {
			data = data + "<option selected='selected' value='" + dataType[i]
					+ "'>" + dataType[i] + "</option>";
		} else {
			data = data + "<option value='" + dataType[i] + "'>" + dataType[i]
					+ "</option>";
		}
	}

	return data;
}

function TagAsDecision(serialId, tag) {

}

function ReturnIsCurrent(decision) {
	var toDeciosion = decision;
	if (decision == "approved") {
		toDeciosion = 1;
	} else if (decision == "declined") {
		toDeciosion = 2;
	}

	return toDeciosion;
}

function UpdateProgress(id, decision,num) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "QaTmCtrl",
		data : "{\"signature\":\"updaterequest\"" + ",\"tm_req_status\":\""
				+ "validated" + "\"" + ",\"dec_date\":\""
				+ globalobj.dateToday
				+ "\",\"isCurrentRecord\":\""
				+ ReturnIsCurrent(decision)
				+ "\",\"dec_type\":\""
				+ decision
				+ "\""
				+ ",\"app_week_no\":\""
				+ globalobj.GetWeekNumber()
				+ "\""
				+ ",\"serialId\":\""
				+ id
				+ "\""
				+ ",\"reportingStatus\":\""
				+ $("#reporting_qm_status_" + id).val()
				+ "\""
				+ ",\"imp360Status\":\""
				+ $("#impact_qm_status_" + id).val()
				+ "\"" + ",\"req_type\":\"" + decision + "\""
				+",\"currScore\":\"" + (($("#requested_" + num).val() == undefined) ? 0 :$("#requested_" + num).val())  + "\"" 
				+ "}",
		dataType : "json",
		success : function(response) {
		},
		complete : function(e) {
			CountNewRequest();
			globalobj.returnSuccess();
			$.unblockUI();
			GetAllRequestList("", "", "", "All", "");
		}
	});
}
function CountNewRequesttest() {

	var newCounts = 0;
	$.ajax({
		type : "POST",
		url : "QaTmCtrl",
		data : "{\"signature\":\"getallnewreqs\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {
				newCounts = resultsArray[0].countReqs;
			}

		},
		complete : function(e) {
			if (newCounts == 0) {
				$("#qm_new_res").hide();
			} else {
				$("#qm_new_res").show();
				$("#qm_new_res").text(newCounts);
			}
		}
	});

}

function AdvancedSearchQM() {
	// quarter, year, status, isAll, type
	GetAllRequestList($("#qa_target_list").val(),
			$("#qa_tm_select_year").val(), $("#qa_tm_sub_type").val(), $(
					"#qa_option_list").val(), $("#qa_subtype").val());
}
function populateQuaterFields() {
	var quarterArray = new Array("1", "2", "3", "4");
	var data = "";
	for (var i = 0; i < quarterArray.length; i++) {

		if (quarterArray[i] == GetQuarterOftheMonth()) {
			data = data + "<option value='" + quarterArray[i]
					+ "' selected='selected'>" + quarterArray[i] + "</option>";
		} else {
			data = data + "<option value='" + quarterArray[i] + "'>"
					+ quarterArray[i] + "</option>";
		}
	}
	$("#qa_target_list").append(data);

}
function GetQuarterOftheMonth() {
	var currentMonth = 0;
	var quarter = 0;

	currentMonth = (new Date()).getMonth();
	quarter = Math.floor(((currentMonth + 11) / 3) % 4) + 1;
	return quarter;
}
function UpdateTAgging(id) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "QaTmCtrl",
		data : "{\"signature\":\"taggingmethod\"," + "\"imp360Status\":\""
				+ $("#impact_qm_status_" + id).val() + "\","
				+ "\"reportingStatus\":\"" + $("#reporting_qm_status_" + id).val()
				+ "\"," + "\"serialId\":\"" + id + "\"" + "}",
		dataType : "json",
		success : function(response) {
		},
		complete : function(e) {
			globalobj.returnSuccess();
			$.unblockUI();
		}
	});
}
function AppendSelect(id,val,type){
	var data = "<select id='requested_" + id +"'>";
	for (var i=1; i<=12; i++){
		if(i==val){
			data = data + "<option value='" + i +"' selected='selected'>" + i +"</option>";
		}else{
			data = data + "<option value='" + i +"'>" + i +"</option>";
		}
	}
	if(type=="exemption"){
		data = "";
	}
	return data;
}

function HideScore(type, score) {
var newScore = score;
	if (type == "exemption") {
		newScore = "";
	}
	return newScore;
}


function PopUpEvaluatorInfo(qmreq) {
	window.open("../rostermgt/qmevaluatorspage.jsp?qmreq=" + qmreq, "",
			"width=500, height=1130");

}

