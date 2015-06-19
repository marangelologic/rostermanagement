$(document).ready(function() {
	FileNewTargetaList();

	$("#add_target").click(function() {
		Update();
	});

});

function FileNewTargetaList() {
	$("#file_new_target_list_for_qm").html("");
	globalobj.ShowLoadingPage();
	var data = "";
	var i = 0;
	data = data + "<thead> <tr>  <th style='color: black'>Select</th> ";
	data = data + "<th style='color: black'> Employee Number</th> ";

	data = data + " <th style='color: black'>Employee Name</th> ";
	data = data + " <th style='color: black'>Role</th> ";
	data = data + " <th style='color: black'>Status</th> ";
	data = data + " <th style='color: black'>Active</th> ";

	data = data + "</tr></thead><tbody>";
	$
			.ajax({
				type : "POST",
				url : "empcontroller",
				data : "{\"signature\":\"getqmemployees\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					$("#file_new_target_list_for_qm").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<tr><td style='text-align:center'><span align='center'><input type='checkbox' em-nm='"
								+ resultsArray[i].emp_name + "' emp-tm='"
								+ resultsArray[i].tm_name + "' emp-tm-id='"
								+ resultsArray[i].tm_employee_id

								+ "' class='selectedTarget' id=\""
								+ resultsArray[i].emp_id + "\" /></span></td>";
						data = data
								+ "<td style='padding-left:20px; width: 130px; align: center; text-align:center'><a href='javascript:void(0);' onClick='globalobj.ViewSpecialistDetail(\""
								+ resultsArray[i].emp_id + "\",\""
								+ resultsArray[i].emp_status + "\",\""
								+ resultsArray[i].serial_employees_id + "\")'>"
								+ resultsArray[i].emp_id + "</a></td>";
						data = data
								+ " <td style='padding-left:10px;'><a href='javascript:void(0);' onClick='globalobj.ViewSpecialistDetail(\""
								+ resultsArray[i].emp_id + "\",\""
								+ resultsArray[i].emp_status + "\",\""
								+ resultsArray[i].serial_employees_id + "\")'>"
								+ resultsArray[i].emp_name + "</a></td>";
						data = data + " <td align='center'>"
								+ ReturnRole(resultsArray[i].role) + "</td>";
						data = data + " <td align='center'>"
								+ resultsArray[i].emp_status + "</td>";
						data = data
								+ " <td align='center'>"
								+ globalobj
										.ReturnYesNo(resultsArray[i].emp_is_active)
								+ " </td></tr>";
					}
					$("#file_new_target_list_for_qm").append(data + "</tbody>");

				},
				complete : function(e) {
					$("#file_new_target_list_for_qm").dataTable(
							{

								"lengthMenu" : [ [ 25, 50, 100, 200, -1 ],
										[ 25, 50, 100, 200, "All" ] ],
								"bDeferRender" : true,
								"sScrollX" : "100%",
								"bScrollCollapse" : false,
								"sScrollY" : "400px",
								"pagingType" : "full_numbers",
								"iDisplayLength" : -1,
								"order" : [ [ 2, "asc" ] ]
							});
					$("#file_new_target_list_for_qm_length")
							.append("New Target : <input type='text' id='qm_filed_score' /> <br />Evaluator &nbsp;&nbsp; <br /> <select id='qm_evaluator' style='width:173px;'></select>");
					$.unblockUI();
					GetAllevaluatorList();
				}
			});
}

function ReturnRole(role) {
	var newRole = role;
	if (role == "quality") {
		newRole = "Quality Manager";
	} else if (role == "admin") {
		newRole = "Admin";
	}
	return newRole;
}

function GetAllevaluatorList() {
	globalobj.ShowLoadingPage();
	$("#qm_evaluator").html("");
	var data = "";
	$.ajax({
		type : "POST",
		url : "qctrl",
		data : "{\"signature\":\"getevaluationlist\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

			for (var i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='"
						+ resultsArray[i].evaluator_em_id + "'>"
						+ resultsArray[i].evaluator_name + "</option>";
			}
			$("#qm_evaluator").append(data);

		},
		complete : function(e) {
			$.unblockUI();
		}

	});
}
function Update() {
	var checkedLength = $('.selectedTarget:checked').length;
	$("input:checkbox").each(function() {
		if ($(this).is(":checked")) {
			var tmName = $(this).attr("emp-tm");
			var tmId = $(this).attr("emp-tm-id");
			var empnamee =$(this).attr("em-nm");
			var empId =  $(this).attr("id");
			$.ajax({
				type : "POST",
				url : "QaTmCtrl",
				data : "{\"signature\":\"updatetohistoricaldata\",\"empId\":\"" +  $(this).attr("id")
						+ "\",\"reqSubType\":\"target\",\"dec_type\": \"3\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
		
				},
				complete : function(e) {
					AddRequestScore(tmName, tmId,
							empnamee, empId, "approved",
							"target", globalobj.dateToday, "", globalobj
									.GetQuarterOftheMonth(""), "New", "New", "read",
							"Quality Manager Set", $("#qm_filed_score").val(), $(
									"#qm_filed_score").val(), globalobj.dateToday, "1",
							globalobj.GetWeekNumber(), "", "submitted", $(
									"#qm_evaluator").val(), $(
									"#qm_evaluator option:selected").text());
				}
		
			});
		}
	});
}

function GetAllSelectedEmpl() {
	var checkedLength = $('.selectedTarget:checked').length;
	$("input:checkbox").each(
			function() {
				if ($(this).is(":checked")) {
					AddRequestScore($(this).attr("emp-tm"), $(this).attr(
							"emp-tm-id"), $(this).attr("em-nm"), $(this).attr(
							"id"), "approved", "target", globalobj.dateToday,
							"", globalobj.GetQuarterOftheMonth(""), "New",
							"New", "read", "Quality Manager Set", $(
									"#qm_filed_score").val(), $(
									"#qm_filed_score").val(),
							globalobj.dateToday, "1",
							globalobj.GetWeekNumber(), "", "submitted",$("#qm_evaluator").val(),$("#qm_evaluator option:selected").text());
				}
			});
}
/*
 * AddRequestScore(globalobj.GetTmName(), localStorage
 * .getItem("0b8b667e7722bc7e363b601ce584259d"), $( "#tm_qa_emp_name
 * option:selected").text(), $( "#tm_qa_emp_id").val(), "New",
 * $("#tm_qa_request_type") .val(), $("#tm_qm_quarter_start_date").val(), $(
 * "#tm_qm_quarter_end_date").val(), $("#tm_qa_target_quarter").val(), "New",
 * "New", "unread", globalobj.ReplaceStrings(obj), $("#current_tm_qa_score")
 * .val(), $("#requested_tm_qa_score").val(), globalobj.dateToday, "3",
 * globalobj.GetWeekNumber(), "", $( "#tm_qa_status_submitted").val());
 */

function AddRequestScore(tmName, tmId, empName, empId, reqType, reqSubType,
		sDate, eDate, quarter, imp360Status, reportingStatus, reqStatus,
		reasonTm, prevScore, currScore, reqDate, isCurrentRecord, reqWeekNo,
		approvalWeekNo, reqOrder,evalId,evalName) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "qctrl",
		data : "{\"signature\":\"adddefaultqaScorevalidated\"," + "\"tmName\":" + "\""
				+ tmName + "\"," + "\"tmId\":" + "\"" + tmId + "\","
				+ "\"empName\":" + "\"" + empName + "\"," + "\"empId\":" + "\""
				+ empId + "\"," + "\"reqType\":" + "\"" + reqType + "\","
				+ "\"reqSubType\":" + "\"" + reqSubType + "\"," + "\"sDate\":"
				+ "\"" + sDate + "\"," + "\"eDate\":" + "\"" + eDate + "\","
				+ "\"quarter\":" + "\"" + quarter + "\"," + "\"imp360Status\":"
				+ "\"" + imp360Status + "\"," + "\"reportingStatus\":" + "\""
				+ reportingStatus + "\"," + "\"reqStatus\":" + "\"" + reqStatus
				+ "\"," + "\"reasonTm\":" + "\"" + reasonTm + "\","
				+ "\"prevScore\":" + "\"" + prevScore + "\","
				+ "\"currScore\":" + "\"" + currScore + "\"," + "\"reqDate\":"
				+ "\"" + reqDate + "\"," + "\"isCurrentRecord\":" + "\""
				+ isCurrentRecord + "\"," + "\"reqWeekNo\":" + "\"" + reqWeekNo
				+ "\"," + "\"approvalWeekNo\":" + "\"" + approvalWeekNo + "\","
				+ "\"qm_year\":" + "\"" + globalobj.GetYear() + "\","
				+ "\"wgName\":" + "\"" + "" + "\","
  
				+ "\"evalId\":" + "\"" + evalId + "\"," + "\"evalName\":" + "\""
				+ evalName + "\","

				+ "\"reqOrder\":" + "\"" + reqOrder + "\"" + "}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
		},
		complete : function(e) {
			$.unblockUI();
			globalobj.returnSuccess();

		}
	});
}
