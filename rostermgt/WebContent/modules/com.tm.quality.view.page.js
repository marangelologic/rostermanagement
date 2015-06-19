var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; // January is 0!
var yyyy = today.getFullYear();
var dateToday = yyyy + '-' + AddZero(mm) + '-' + AddZero(dd);

$(document).ready(
		function() {
			/*$("#tm_qa_request_container").hide();*/
			$(".params").hide();
			globalobj.SetTmName(localStorage
					.getItem("0b8b667e7722bc7e363b601ce584259d"));
			populateQuaterFields();
			$('#add_new_qa_requests').click(function() {
				globalobj.ShowLoadingPage();
				$('#content').load('view/vatmqmr');
			});
			// GetCurrentRequest("", "");
			
			GetTmRequestList(localStorage
					.getItem("0b8b667e7722bc7e363b601ce584259d"), "", "All",
					"", "","");
			$("#tm_qa_home_view").hide();
			$("#advance_search").click(function() {
				toggleSearch();
			});

			$("#filter_tm_qa_list").click(
					function() {
						GetTmRequestList(localStorage
								.getItem("0b8b667e7722bc7e363b601ce584259d"),
								$("#qa_target_list").val(),
								$("#qa_option_list").val(), $(
										"#qa_tm_select_year").val(), $(
										"#qa_option_list").val(),$("#qa_tm_sub_type").val());
					});
			$("#qa_option_list").change(function() {
				toggleParameters($("#qa_option_list").val());
			});

		});

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
	//
	$("#qa_target_list").append(data);

}
function ReplaceNewLine(NewLine){
	
	var toBR = NewLine.replace(/\\u00a0/g," ");
	toBR  = toBR .replace(/\\n/g,"<br />");
	return toBR;
}

function GetQuarterOftheMonth() {
	var currentMonth = 0;
	var quarter = 0;

	currentMonth = (new Date()).getMonth();
	quarter = Math.floor(((currentMonth + 11) / 3) % 4) + 1;
	return quarter;
}
function GetWeekNumber() {

	return $.datepicker.iso8601Week(new Date());

}
function ShowNewTmQMRequestPage() {
	
}

function GetTmRequestList(tmId, quarter, option, year, reqOrder,status) {
	
	$("#team_manager_request_list_view").html("");
	globalobj.ShowLoadingPage();
	var data = "";
	data = data
			+ "<table id='test_qa_list' style='width: 70%;' class='display'><thead> <tr> <th style='color: black'>Number</a></th>";
	data = data + "<th style='color: black'>Employee Name</a></th>";
	data = data + "<th style='color: black'>Type</th> ";
	data = data + "<th style='color: black'>Status</th>";// request order
	data = data + "<th style='color: black'>Requested Target</th>";
	data = data + "<th style='color: black'>Quarter</th>";
	data = data + "<th style='color: black'>Year</th>";
	data = data + "<th style='color: black'>Qm Acitivty</th>";
	data = data + "</tr></thead><tbody>";
	$
			.ajax({
				type : "POST",
				url : "QaTmCtrl",
				data : "{\"signature\":\"getrequests\"" + ",\"quarter\":\""
						+ quarter + "\"" + ",\"tmId\":\"" + tmId + "\""
						+ ",\"optionView\":\"" + option + "\""
						+ ",\"qm_year\":\"" + year + "\"" + ",\"reqOrder\":\""
						+ reqOrder + "\",\"status\":\"" + status + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (var i = 0; i < resultsArray.length; i++) {
						data = data + " <tr><td><a href='javascript:void(0)'>"
								+ resultsArray[i].emp_id + "</a> </td>";
						data = data
								+ " <td style='padding-left:10px;'><a href='javascript:void(0)')'>"
								+ resultsArray[i].emp_name + "</a></td>";
						data = data
								+ " <td style='padding-left:10px;'>"
								+ ReturnStringType(resultsArray[i].request_sub_type)
								+ "</td>";

						data = data + " <td style='padding-left:10px;'>"
								+ resultsArray[i].request_order + "</td>";

						data = data + " <td style='padding-left:10px;'>"
								+resultsArray[i].tm_current_score + "</td>";

						data = data + " <td style='padding-left:10px;'>"
								+ resultsArray[i].quarter + "</td>";

						data = data + " <td style='padding-left:10px;'>"
								+ resultsArray[i].req_year + "</td>";

						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='"
								+ QmNoActivity(resultsArray[i].reason_qm)
								+ "' href='javascript:void(0);' onClick='popUpComment(\""
								+ QmNoActivity(resultsArray[i].reason_qm
										+ "\",\""
										+ resultsArray[i].tbl_serial_id)
								+ "\")'>"
								+ "<img src='img/comments-icon.png' />"
								+ " </td> </tr>";
					}
					$("#team_manager_request_list_view").append(
							data + " </tbody><table>");
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
								"iDisplayLength" : -1
							});
					$.unblockUI();
				}
			});
}
function toggleSearch() {
	globalobj.ShowLoadingPage();
	$("#tm_qa_home_view").toggle(
			"slow",
			function() {
				if ($("#tm_qa_home_view").is(":hidden") == false) {
					$("#advance_search").text("- Simple Menu");
					$.unblockUI();
				} else {
					$("#advance_search").text("+ Advance Search");
					GetTmRequestList(localStorage
							.getItem("0b8b667e7722bc7e363b601ce584259d"), "",
							"All", "", "","");
				}
				
			});
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

function QmNoActivity(comment) {
	var newString = comment;
	if (comment == "" || comment == undefined || comment == null
			|| comment == "undefined") {
		newString = "This is still under review by the Quality Managers";
	}

	return newString;
}

function popUpComment(comment, serialId) {
	window.open("../rostermgt/tmqmlogpage.jsp?serialId=" + serialId, "",
			"width=500, height=1130");

}

function AppendSelect(id,val){
	var data = "<select id='requested_" + id +"'></select>";
	return data;
}

function toggleParameters(sValue) {
	if (sValue == "All") {
		$(".params").hide();
	} else {
		$(".params").show();
	}

}
