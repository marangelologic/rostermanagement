var counterTMFields = 1;
$(document)
		.ready(
				function() {
					globalobj.SetPrevHistory("view/utmi");
					GetTmDetailInfo(globalobj.GetTMId());
					$("#cancel_tm_update").click(function() {
						globalobj.GetPrevHistory("view/utmi");
					});
					$("#update_tm_info_button")
							.click(
									function() {
										UpdateTmInfos($("#tm_name_update_page")
												.val(), $(""), $(
												"#tm_email_update_page").val());
									});
					$("#cancel_tm_update_top").click(function() {
						globalobj.GetPrevHistory("view/utmi");
					});
					$("#update_tm_info_button_top")
							.click(
									function() {
										UpdateTmInfos($("#tm_name_update_page")
												.val(), globalobj.GetTMId(), $(
												"#tm_email_update_page").val());
									});

					enableDateOnClick("tm_start_date_update_page",
							"tm_end_date_update_page");
					$("#tm_end_date_update_page")
							.datepicker(
									{
										minDate : 0,
										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif',
										onSelect : function(selectedDate) {
											$("#tm_start_date_update_page")
													.datepicker("option",
															"maxDate",
															selectedDate);
										}
									});
					$("#hired_date_update_page").datepicker(
							{
								
								changeMonth : true,

								numberOfMonths : 1,
								dateFormat : 'yy-mm-dd',
								changeYear : true,
								showOn : 'both',
								buttonText : 'Show Date',
								buttonImageOnly : true,
								buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
								
							});
					$("#resigned_date_update_page").datepicker(
							{
								
								changeMonth : true,

								numberOfMonths : 1,
								dateFormat : 'yy-mm-dd',
								changeYear : true,
								showOn : 'both',
								buttonText : 'Show Date',
								buttonImageOnly : true,
								buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
								
							});	
					$("#tm_start_date_update_page")
							.datepicker(
									{
										maxDate : new Date($(
												"#tm_end_date_update_page")
												.val()),
										minDate : 0,
										changeMonth : true,

										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif',
										onSelect : function(selectedDate) {
											$("#tm_end_date_update_page")
													.datepicker("option",
															"minDate",
															selectedDate);
										}
									});

				});
function enableDateOnClick() {
	for (var i = 0; i < arguments.length; i++) {
		$("#" + arguments[i]).click(function() {
			$(this).datepicker().datepicker("show");
		});
	}
}
function GetTmDetailInfo(tm_id) {
	var i = 0;
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "tmrequest",
		data : "{\"signature\": \"gettmdetailinfo\"" + "," + "\"tmname\":\""
				+ "" + "\"" + "," + "\"tmId\":\""
				+ tm_id
				+ "\""
				+ ","
				+ "\"tm_is_active\":\""
				+ ""
				+ "\""
				+ ","
				+ "\"tm_wg_name\":\""
				+ ""
				+ "\""
				+ ","
				+ "\"tm_wg_start_date\":\""
				+ ""
				+ "\""
				+ ","
				+ "\"tm_wg_end_date\":\""
				+ ""
				+ "\""
				+ ","
				+ "\"tmEmail\":\""
				+ "" + "\"" + "}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

			for (i = 0; i < resultsArray.length; i++) {
				$("#tm_id_update_page").val(resultsArray[0].tm_employee_id);
				$("#tm_name_update_page").val(resultsArray[0].tm_name);
				$("#tm_email_update_page").val(resultsArray[0].tm_email);
				$("#hired_date_update_page").val(resultsArray[0].hired_date);

			}  
			getAllworkGroupListByTM(tm_id);

		},
		complete : function(e) {
			$("#tm_name_update_page").attr("style", "");
			GetTmMembers(tm_id);

		}
	});
}

function GetTmMembers(tm_id) {
	$
			.ajax({
				type : "POST",
				url : "gctmlist",
				data : "{\"emp_id\":\"" + tm_id + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					$("#member_tm_list").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					var data = "<table class='tbl_mem_list'>";
					data = data
							+ "<tr><td> <b> Employee Name</b> </td> <td style='text-align: left'><b>Start Date for this Team Manager </b> </td></tr>";
					data = data
							+ "<tr><td>&nbsp;</td><td style='text-align: left'>&nbsp;</td></tr>";
					for (var i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<tr><td><a href='javascript:void(0)' onclick='globalobj.redirectToEmpPage(\""
								+ resultsArray[i].emp_id
								+ "\")' class='member_list'>"
								+ resultsArray[i].emp_name
								+ "</a></td><td style='text-align: left'>"
								+ resultsArray[i].start_date + "</td></tr>";
					}
					if (resultsArray.length <= 3) {

						data = data + "<tr><td>&nbsp;</td></tr>";
						data = data + "<tr><td>&nbsp;</td></tr>";
					}
					if (resultsArray.length <= 0) {
						for (var i = 0; i < 3; i++) {
							data = data + "<tr><td>&nbsp;</td></tr>";
						}
					}

					$("#member_tm_list").append(data + "</table>");

				},
				complete : function(e) {
					$("#wg_id_update_page").attr("disabled", "disabled");
				}
			});

}

function UpdateTmInfos(tmName, employeeId, tmEmail) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "tmrequest",
		data : "{\"signature\": \"updatetminfo\"" + "," + "\"tmname\":\""
				+ tmName + "\"" + "," + "\"tmId\":\"" + employeeId + "\"" + ","
				+ "\"tm_is_active\":\"" + "1" + "\"" + ","
				+ "\"tm_wg_name\":\"" + "" + "\"" + ","
				+ "\"tm_wg_start_date\":\"" + "" + "\"" + ","
				+ "\"tm_wg_end_date\":\"" + "" + "\"" + "," + "\"tmEmail\":\""
				+ tmEmail + "\"" + "}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

		},
		complete : function(e) {
			CleanTmWg(globalobj.GetTMId());

		}
	});
}

function UpdateTMWgInfo(wgName, wgStartDate, wgEndDate, tmId) {

	$.ajax({
		type : "POST",
		url : "tmrequest",
		data : "{\"signature\": \"updatetmwg\"" + "," + "\"tmname\":\"" + ""
				+ "\"" + "," + "\"tmId\":\""
				+ tmId
				+ "\""
				+ ","
				+ "\"tm_is_active\":\""
				+ ""
				+ "\""
				+ ","
				+ "\"tm_wg_name\":\""
				+ wgName
				+ "\""
				+ ","
				+ "\"tm_wg_start_date\":\""
				+ wgStartDate
				+ "\""
				+ ","
				+ "\"tm_wg_end_date\":\""
				+ wgEndDate
				+ "\""
				+ ","
				+ "\"tmEmail\":\"" + "" + "\"" + "}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
		},
		complete : function(e) {
			globalobj.returnSuccess();
		}
	});
}

function CleanTmWg(tmId) {
	$.ajax({
		type : "POST",
		url : "tmrequest",
		data : "{\"signature\": \"deletetmwginfo\"" + "," + "\"tmname\":\""
				+ "" + "\"" + "," + "\"tmId\":\""
				+ tmId
				+ "\""
				+ ","
				+ "\"tm_is_active\":\""
				+ ""
				+ "\""
				+ ","
				+ "\"tm_wg_name\":\""
				+ ""
				+ "\""
				+ ","
				+ "\"tm_wg_start_date\":\""
				+ ""
				+ "\""
				+ ","
				+ "\"tm_wg_end_date\":\""
				+ ""
				+ "\""
				+ ","
				+ "\"tmEmail\":\""
				+ "" + "\"" + "}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
		},
		complete : function(e) {
			GetAllWGS();
		}
	});
}

function GetTMMembers(tm_id) {
	$
			.ajax({
				type : "POST",
				url : "gwgm",
				data : "{\"wg_names\":\"" + wgName + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					$("#member_wg_list").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					var data = "<table class='tbl_mem_list'>";
					data = data
							+ "<tr><td> <b> Employee Name</b> </td> <td><b>Start Date for this Work Group </b> </td></tr>";
					data = data + "<tr><td>&nbsp;</td><td>&nbsp;</td></tr>";
					for (var i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<tr><td><a href='javascript:void(0)' class='member_list'>"
								+ resultsArray[i].emp_name
								+ "</a></td><td style='text-align: center'>"
								+ resultsArray[i].start_date + "</td></tr>";
					}
					if (resultsArray.length <= 3) {

						data = data + "<tr><td>&nbsp;</td></tr>";
						data = data + "<tr><td>&nbsp;</td></tr>";
					}
					if (resultsArray.length <= 0) {
						for (var i = 0; i < 3; i++) {
							data = data + "<tr><td>&nbsp;</td></tr>";
						}
					}

					$("#member_wg_list").append(data + "</table>");

				},
				complete : function(e) {
					GetCurrentHeadCount(wgName);
					GetTargetHeadCount(wgName);
					$("#wg_id_update_page").attr("disabled", "disabled");
				}
			});
}
function getAllworkGroupList(id) {
	globalobj.ShowLoadingPage();
	$("#update_wg_name_" + id).html();
	var data = "";
	$.ajax({
		type : "POST",
		url : "getallemp",
		data : "{\"wg_names\":\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='" + resultsArray[i].wg_name
						+ "'>" + resultsArray[i].wg_name + "</option>";
			}
		},
		complete : function(e) {
			$("#update_wg_name_" + id).append(data);
			$.unblockUI();
		}
	});
}

function AddMoreWGFields() {

	var dataTable = "";

	dataTable = dataTable + "<tr id='tr_add_tm_wg_" + counterTMFields + "'>";
	dataTable = dataTable + "<td>New Work Group "
			+ "</td><td><select id='update_wg_name_" + counterTMFields
			+ "' class='newAppendWG" + "'></select></td>";
	dataTable = dataTable
			+ "<td>Start Date</td><td><input type='text' style='display:inline-block;' class='newAppendStart' placeholder='DATE: YYYY-MM-DD' id='wg_tm_start_date_update_page_"
			+ counterTMFields + "' value='' /></td>";
	dataTable = dataTable
			+ "<td>End Date</td><td><input class='newAppendEnd' placeholder='DATE: YYYY-MM-DD' type='text' id='wg_tm_end_date_update_page_"
			+ counterTMFields
			+ "' /></td><td><a data-current-number='"
			+ counterTMFields
			+ "' href='javascript:void(0)' onclick='clearTR(\"tr_add_tm_wg_"
			+ counterTMFields
			+ "\")'><img src='img/trash24x24.png' style='width:19px;' /></a></td></tr>";

	$("#list_specialist_per_tm_scores").append(dataTable);
	TransformToDate(counterTMFields);
	getAllworkGroupList(counterTMFields);
	counterTMFields = parseInt(counterTMFields) + 1;
}

function getAllworkGroupListByTM(tm_id) {
	var dataTable = "";
	$("#list_specialist_per_tm_scores").html("");
	globalobj.ShowLoadingPage();
	$
			.ajax({
				type : "POST",
				url : "ProdFamily",
				data : "{\"wgPSM\":\"" + "\",signature:\"" + "getallwgpertm"
						+ "\",prodFamName:\"" + "" + "\",prodFamId:\"" + ""
						+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\"" + ""
						+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\""
						+ "" + "\",wgName:\"" + "" + "\",wgId:\"" + tm_id
						+ "\",wgTargetHC:\"" + "" + "\",wgWfHC:\"" + "" + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					+"<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
					for (var i = 0; i < resultsArray.length; i++) {

						dataTable = dataTable + "<tr id='tr_add_tm_wg_"
								+ counterTMFields + "'>";
						dataTable = dataTable
								+ "<td>Work Group "
								+ "</td><td><input type='hidden' id='update_wg_name_"
								+ counterTMFields + "' class='newAppendManager"
								+ "' value='" + resultsArray[i].wg_name
								+ "' ><input type='text' value='"
								+ resultsArray[i].wg_name
								+ "' disabled='disabled' /> </td>";
						dataTable = dataTable
								+ "<td>Start Date</td><td><input type='text' style='display:inline-block' class='newAppendStart' placeholder='DATE: YYYY-MM-DD' id='wg_tm_start_date_update_page_"
								+ counterTMFields + "' value='"
								+ resultsArray[i].start_date + "' /></td>";
						dataTable = dataTable
								+ "<td>End Date</td><td><input class='newAppendEnd' placeholder='DATE: YYYY-MM-DD' type='text' id='wg_tm_end_date_update_page_"
								+ counterTMFields + "' value='"
								+ ReturnNull(resultsArray[i].end_date)
								+ "' /></td><td>&nbsp;</td></tr>";

						counterTMFields = parseInt(counterTMFields) + 1;
					}
					$("#list_specialist_per_tm_scores").append(dataTable);
				},
				complete : function(e) {
					$.unblockUI();
					for (var j = 1; j <= counterTMFields; j++) {
						TransformToDate(j);
					}

				}
			});

}
function ReturnNull(date) {
	newDate = date;
	if (date == "" || date == null || date == "undefined" || date == undefined) {
		newDate = "";
	}

	return newDate;
}
function TransformToDate(counter1) {
	$("#wg_tm_start_date_update_page_" + counter1)
			.datepicker(
					{
						show : true,
						defaultDate : "+1w",
						changeMonth : true,
						numberOfMonths : 1,
						dateFormat : 'yy-mm-dd',
						changeYear : true,
						showOn : 'button',
						buttonText : 'Show Date',
						buttonImageOnly : true,
						buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
					}).datepicker("show");

	$("#wg_tm_end_date_update_page_" + counter1)
			.datepicker(
					{
						show : true,
						defaultDate : "+1w",
						changeMonth : true,
						numberOfMonths : 1,
						dateFormat : 'yy-mm-dd',
						changeYear : true,
						showOn : 'button',
						buttonText : 'Show Date',
						buttonImageOnly : true,
						buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
					}).datepicker("show");
	$("#wg_tm_start_date_update_page_" + counter1).click(function() {
		$(this).datepicker().datepicker("show");
	});
	$("#wg_tm_end_date_update_page_" + counter1).click(function() {
		$(this).datepicker().datepicker("show");
	});

}
function AddWorkGroupMultiTM(tmId, workgroupName, isActive, startDate, endDate) {
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "addmultiwgtm"
				+ "\",\"prodFamName\":\"" + "" + "\",\"prodFamId\":\""
				+ isActive + "\",prodFamDesc:\"" + endDate
				+ "\",langCenterId:\"" + startDate + "\",langCenterName:\""
				+ "" + "\",\"langCenterDesc\":\"" + "" + "\",wgName:\""
				+ workgroupName + "\",wgId:\"" + tmId + "\",wgTargetHC:\"" + ""
				+ "\",wgWfHC:\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

		},
		complete : function(e) {

			$.unblockUI();
		}
	});
}
function GetAllWGS() {
	$('.newAppendStart').each(
			function() {
				globalobj.ShowLoadingPage();
				var idNo = (this.id).replace(/[^\d.]/g, '');

				// wgId, TmId,isActive,startDate,endDate
				AddWorkGroupMultiTM($("#update_wg_name_" + idNo).val(), $(
						"#tm_id_update_page").val(), returnIfActive($(
						"#wg_tm_end_date_update_page_3" + idNo).val()), $(
						"#wg_tm_start_date_update_page_" + idNo).val(), $(
						"#wg_tm_end_date_update_page_" + idNo).val());
			});

}

function clearTR(tr) {
	$("#" + tr).html("");
}
function returnIfActive(endDate) {
	var endDateValue = "0";
	if (endDate == null || endDate == "") {
		endDateValue = "1";
	}
	return endDateValue;
}

