/**
 * Coded by MarAngelo
 */

//
var counter = 1;
var prevCounter = 1;
$(document)
		.ready(
				function() {
					globalobj.AddAuditTrail(globalobj.userId,
							globalobj.username, "vatmqmr", globalobj.dateToday,
							"view");
					GetAllEvaluators();
					$("#add_evaluator").click(function() {
						globalobj.ShowLoadingPage();
						addNewEvaluator();

					});
					$("#eval_target_1").append(appendScore());
					tinymce.init({
						statusbar : false,
						force_br_newlines : true,
						forced_root_block : '',
						force_p_newlines : true,
						entity_encoding : "raw",
						mode : "specific_textareas",
						editor_selector : "mceEditor"
					});

					tinymce.init({
						statusbar : false,
						force_br_newlines : true,
						forced_root_block : '',
						force_p_newlines : true,
						entity_encoding : "raw",
						mode : "specific_textareas",
						editor_selector : "myTextEditor",
						readonly : true
					});

					$("#tm_qa_target_quarter").val(
							globalobj.GetQuarterOftheMonth("", ""));
					globalobj.ShowLoadingPage();
					globalobj.SetTmName(localStorage
							.getItem("0b8b667e7722bc7e363b601ce584259d"));
					GetTmMembers(localStorage
							.getItem("0b8b667e7722bc7e363b601ce584259d"));
					setEmpId("tm_qa_emp_name", "tm_qa_emp_id");
					$("#tm_qm_quarter_start_date")
							.datepicker(
									{

										defaultDate : "+1w",
										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										showOn : 'both',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif',

										onSelect : function(dateText, inst) {
											$(
													"#emp_wg_update_week_number_field")
													.val(
															$.datepicker
																	.iso8601Week(new Date(
																			dateText)));
										}

									});
					$("#tm_qm_quarter_end_date")
							.datepicker(
									{

										defaultDate : "+1w",
										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										showOn : 'both',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif',

										onSelect : function(dateText, inst) {
											$(
													"#emp_wg_update_week_number_field")
													.val(
															$.datepicker
																	.iso8601Week(new Date(
																			dateText)));
										}

									});

					$("#add_tm_qa_request_top").click(
							function() {
								UpdateTohistorical($("#tm_qa_emp_id").val(), $(
										"#tm_qa_request_type").val());

							});
					$("#add_tm_qa_request_bottom").click(
							function() {
								UpdateTohistorical($("#tm_qa_emp_id").val(), $(
										"#tm_qa_request_type").val());
							});
					$("#cancel_tm_qa_request_top").click(function() {
						tinymce.get("tm_qa_description").remove();
						tinymce.get("tm_from_qa_description").remove();
						globalobj.ShowLoadingPage();
						$('#content')['load']('view/vtmqalist');
						return false;
					});
					$("#cancel_tm_qa_request_bottom").click(function() {
						tinymce.get("tm_from_qa_description").remove();
						tinymce.get("tm_qa_description").remove();
						globalobj.ShowLoadingPage();
						$('#content')['load']('view/vtmqalist');
						return false;
					});

					$("#tm_qa_request_type")
							.change(
									function() {

										if ($("#tm_qa_emp_id").val() == "") {
											$("#tm_qa_request_type").val(
													"Target change").attr(
													"selected", "selected");
											alert("Please choose a sepacialist");
										}

										if ($("#tm_qa_request_type").val() != "Target change") {
											$("#requested_tm_qa_score").attr(
													"disabled", "disabled");
										} else {
											$("#requested_tm_qa_score").attr(
													"disabled", false);
										}

									});

				});

function GetTmMembers(tm_id) {
	var data = "";
	var empId = "";
	$.ajax({
		type : "POST",
		url : "gctmlist",
		data : "{\"emp_id\":\"" + tm_id + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#member_tm_list").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			data = "<option value=''>--</option>";

			for (var i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].emp_id + "'>"
						+ resultsArray[i].emp_name + "</option>";
			}

		},
		complete : function(e) {
			$("#tm_qa_emp_name").append(data);
			$.unblockUI();

		}
	});

}
function GetCurrentWG(emp_id) {
	globalobj.ShowLoadingPage();
	$("#tm_qa_wg_name").val("");
	$.ajax({
		type : "POST",
		url : "gcwdps",
		data : "{\"emp_id\": \"" + emp_id + "\",\"is_latest\":\"yes\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			if (emp_id == "") {
				$("#tm_qa_wg_name").val("");
			} else {
				$("#tm_qa_wg_name").val(resultsArray[0].wg_names);
			}
		},
		complete : function(e) {
			GetQuarterTargets(emp_id, localStorage
					.getItem("0b8b667e7722bc7e363b601ce584259d"), globalobj
					.GetQuarterOftheMonth("", ""), globalobj.GetYear(), $(
					"#tm_qa_request_type").val());
		}
	});

}

function setEmpId(getEL, SetElVal) {
	$("#" + getEL).change(function() {
		$("#" + SetElVal).val($("#" + getEL).val());
		GetCurrentWG($("#" + SetElVal).val());
	});

}
function GetQuarterTargets(empId, tmId, quarter, year, reqsubtype) {
	$("#current_tm_qa_score").val("");
	$
			.ajax({
				type : "POST",
				url : "QaTmCtrl",
				data : "{\"signature\":\"gettargets\",\"empId\":\"" + empId
						+ "\",\"tmId\":\"" + tmId + "\",\"quarter\":\""
						+ quarter + "\",\"qm_year\":\"" + year
						+ "\",\"reqSubType\":\"" + reqsubtype + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					if (resultsArray.length <= 0) {
						$("#current_tm_qa_score").val("10");
					} else {
						for (var i = 0; i < resultsArray.length; i++) {
							if (resultsArray[0].decision_type == "declined") {

								$("#current_tm_qa_score")
										.val(
												returnDefault(resultsArray[0].tm_prev_score));
							} else {

								$("#current_tm_qa_score")
										.val(
												returnDefault(resultsArray[0].tm_current_score));
							}

						}
					}
				},
				complete : function(e) {
					$.unblockUI();
				}
			});
}

/*
 * ReturnTmName(), AddQuickNewTM(), $( "#emp_name_update_page").val(),
 * $("#emp_id_update_page").val(), "New", "New", "", "", GetQuarterOftheMonth(),
 * "New", "New", "Submitted", "Newly Added Employee", "10", "10", dateToday,
 * "1", GetWeekNumber(),"","Unread"
 * 
 */

function AddRequestScore(tmName, tmId, empName, empId, reqType, reqSubType,
		sDate, eDate, quarter, imp360Status, reportingStatus, reqStatus,
		reasonTm, prevScore, currScore, reqDate, isCurrentRecord, reqWeekNo,
		approvalWeekNo, reqOrder) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "qctrl",
		data : "{\"signature\":\"adddefaultqaScore\"," + "\"tmName\":" + "\""
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
				+ "\"wgName\":" + "\"" + $("#tm_qa_wg_name").val() + "\","

				+ "\"evalId\":" + "\"" + $("#new_eval_1").val() + "\","
				+ "\"evalName\":" + "\""
				+ $("#new_eval_1 option:selected").text() + "\","

				+ "\"reqOrder\":" + "\"" + reqOrder + "\"" + "}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {

			ReturnLastID();

			SendMail(globalobj.GetTmName(), empName, $("#tm_qa_request_type")
					.val(), globalobj.GetYear(), quarter);
			globalobj.returnSuccess();
		}
	});
}

function returnDefault(currentScore) {
	var newScore = currentScore;

	if (currentScore == "" || currentScore == null || currentScore == undefined
			|| currentScore == "undefined") {
		newScore = 10;
	}

	return newScore;
}

function UpdateTohistorical(empId, type) {
	var obj = tinymce.util.JSON.serialize(tinymce.get('tm_qa_description')
			.getContent());
	$.ajax({
		type : "POST",
		url : "QaTmCtrl",
		data : "{\"signature\":\"updatetohistoricaldata\",\"empId\":\"" + empId
				+ "\",\"reqSubType\":\"" + type + "\",\"dec_type\": \"3\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
			AddRequestScore(globalobj.GetTmName(), localStorage
					.getItem("0b8b667e7722bc7e363b601ce584259d"), $(
					"#tm_qa_emp_name option:selected").text(), $(
					"#tm_qa_emp_id").val(), "New", $("#tm_qa_request_type")
					.val(), $("#tm_qm_quarter_start_date").val(), $(
					"#tm_qm_quarter_end_date").val(),
					$("#tm_qa_target_quarter").val(), "New", "New", "unread",
					globalobj.ReplaceStrings(obj), $("#current_tm_qa_score")
							.val(), $("#requested_tm_qa_score").val(),
					globalobj.dateToday, "3", globalobj.GetWeekNumber(), "", $(
							"#tm_qa_status_submitted").val());
		}
	});
}// EmailToTm

function SendMail(tmName, AgentName, type, year, quarter) {
	globalobj.ShowLoadingPage();

	$.ajax({
		type : "POST",
		url : "EmailToTm",
		data : "{\"signature\": \"" + "toQm" + "\"," + "\"agentName\": \""
				+ AgentName + "\"," + "\"tmNames\": \"" + tmName + "\","
				+ "\"type\": \"" + type + "\"," + "\"year\": \"" + year + "\","
				+ "\"quarter\":\"" + quarter + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "text/html",
		success : function(response) {

		},
		complete : function(e) {
			$.unblockUI();
		}
	});

}

function GetAllEvaluator(counter) {
	var data = "";
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "evalcntrl",
		async : false,
		data : "{\"signature\":\"getallevaluators\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			data = data + "<select class='apend-eval-evaluator' id='new_eval_"
					+ counter + "'>";
			data = data + "<option value=''>";
			data = data + "--</option>";
			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='"
						+ resultsArray[i].evaluator_em_id + "'>";
				data = data + resultsArray[i].evaluator_name + "</option>";
			}

		},
		complete : function(e) {

			$.unblockUI();

		}
	});
	return data + "</select>";

}

function GetAllEvaluators() {
	var data = "";
	globalobj.ShowLoadingPage();
	$("#eval_target_1").html("");
	$.ajax({
		type : "POST",
		url : "evalcntrl",
		data : "{\"signature\":\"getallevaluators\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

			data = data + "<option value=''>";
			data = data + "--</option>";
			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='"
						+ resultsArray[i].evaluator_em_id + "'>";
				data = data + resultsArray[i].evaluator_name + "</option>";
			}

		},
		complete : function(e) {
			$("#new_eval_1").append(data);

		}
	});

}

function addNewEvaluator() {
	globalobj.ShowLoadingPage();
	var data = "";
	counter = parseInt(counter + 1);
	var createEl = GetAllEvaluator(counter);
	data = data + "<tr class='apend-eval' id='eval_row_" + counter + "'>";
	data = data + "<td>Evaluator " + counter + "</td>";
	data = data + "<td>" + createEl + "</td>";
	data = data + "<td>Target</td>";

	data = data + "<td><select class='apend-eval-target' id='eval_target_"
			+ counter + "'>" + appendScore() + "</select></td>";
	data = data
			+ "<td><a href='javascript:void(0)' onclick='DeleteEvaluator(\""
			+ counter + "\")'> <img src='img/trash24x24.png' /></a>";
	$(data).insertAfter("#" + "eval_row_" + prevCounter);
	prevCounter = parseInt(prevCounter + 1);

}

function DeleteEvaluator(counter) {
	$("#eval_row_" + counter).html("");

}

function appendScore() {
	var data = "";
	for (var i = 0; i <= 12; i++) {
		data = data + "<option value='" + i + "'>" + i + "</option>";
	}

	return data;
}
function addToEvaluationTable(lastInsertedId, evalId, target, employeeId) {
	$.ajax({
		type : "POST",
		url : "evalcntrl",
		data : "{\"signature\":\"addevaluatortarget\"" + ",\"evalSerialId\":\""
				+ lastInsertedId + "\"" + ",\"evalId\":\"" + evalId + "\""
				+ ",\"target\":\"" + target + "\",\"employeeId\":\""
				+ employeeId + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {
		}
	});
}
function ReturnLastID() {
	$.ajax({
		type : "POST",
		url : "evalcntrl",
		data : "{\"signature\":\"getlatestId\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

			for (var i = 0; i < resultsArray.length; i++) {

				$(".apend-eval-target").each(
						function() {
							var evalId = $(this).attr("id").substring(12);
							addToEvaluationTable(
									resultsArray[0].lastInsertedId, $(
											"#new_eval_" + evalId).val(), $(
											"#eval_target_" + evalId).val(), $(
											"#tm_qa_emp_name").val());
						});
			}

		},
		complete : function(e) {

		}
	});

}
