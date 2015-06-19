var counter = 0;
var counter1 = 2;
var NewCounter = 1;
$(document)
		.ready(
				function() {
					globalobj.ShowLoadingPage();
					globalobj.SetPrevHistory("view/vwgap");
					GetProdFamList();
					GetCenterList();
					$("#quick_add_tm").hide();
					GetTMList("add_team_manager_" + NewCounter);
					getPSMList();
					enableDateOnClick("wg_tm_start_date_add_page_1",
							"wg_tm_end_date_add_page_1", "quick_tm_hired_date",
							"quick_tm_start_date");
					$("#cancel_wg_add").click(function() {
						globalobj.GetPrevHistory("view/vwgap");
					});

					$("#add_wg_info_button")
							.click(
									function() {
										AddWgInfo($("#add_wg_psm").val(),
												$("#wg_add_product_family")
														.val(),
												$("#wg_add_center").val(), $(
														"#wg_name_add_page")
														.val(), $(
														"#wg_thc_add_page")
														.val());
										$(this).removeAttr("href");
										$(this).attr("style",
												"background:#a1a1a1");
										$(this).unbind();
										$(this).off("click", "**");
										$("#add_wg_info_button_low").unbind();
										$("#add_wg_info_button_low").off(
												"click", "**");
										$("#add_wg_info_button_low")
												.removeAttr("href");
										$("#add_wg_info_button_low").attr(
												"style", "background:#a1a1a1");
									});
					$("#create_new_tm").click(function() {
						$("#quick_add_tm").slideToggle();
					});
					$("#cancel_wg_add_low").click(function() {
						globalobj.GetPrevHistory("view/vwgap");
					});
					$("#add_wg_info_button_low").click(
							function() {
								AddWgInfo($("#add_wg_psm").val(), $(
										"#wg_add_product_family").val(), $(
										"#wg_add_center").val(), $(
										"#wg_name_add_page").val(), $(
										"#wg_thc_add_page").val());
								$(this).removeAttr("href");
								$(this).attr("style", "background:#a1a1a1");
								$(this).unbind();
								$(this).off("click", "**");
								$("#add_wg_info_button").unbind();
								$("#add_wg_info_button").off("click", "**");
								$("#add_wg_info_button").removeAttr("href");
								$("#add_wg_info_button").attr("style",
										"background:#a1a1a1");
							});
					$("#wg_tm_start_date_add_page_1")
							.datepicker(
									{

										defaultDate : "+1w",
										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
									});
					$("#quick_tm_start_date")
							.datepicker(
									{

										defaultDate : "+1w",
										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
									});
					$("#quick_tm_hired_date")
							.datepicker(
									{

										defaultDate : "+1w",
										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
									});
					$("#wg_tm_end_date_add_page_1")
							.datepicker(
									{

										defaultDate : "+1w",
										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
									});
				});
function enableDateOnClick() {
	for (var i = 0; i < arguments.length; i++) {
		$("#" + arguments[i]).click(function() {
			$(this).datepicker().datepicker("show");
		});
	}
}
function AddWgInfo(psmName, prodFamName, langCenterName, wgName, wgTargetHC) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + psmName + "\",\"signature\":\"" + "addwginfo"
				+ "\",\"prodFamName\":\"" + prodFamName + "\",\"prodFamId\":\"" + ""
				+ "\",\"prodFamDesc\":\"" + "" + "\",\"langCenterId\":\"" + ""
				+ "\",\"langCenterName\":\"" + langCenterName
				+ "\",\"langCenterDesc\":\"" + "" + "\",\"wgName\":\"" + wgName
				+ "\",\"wgId\":\"" + "" + "\",\"wgTargetHC\":\"" + wgTargetHC
				+ "\",\"wgWfHC\":\"" + $("#wg_whc_add_page").val() + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			globalobj.returnSuccess();
		},
		complete : function(e) {
			GetAllTMs();

		}   	   
	});
}

function GetProdFamList() {
	var data = "";
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "getprodfamlist"
				+ "\",prodFamName:\"" + "" + "\",prodFamId:\"" + ""
				+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\"" + ""
				+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\"" + ""
				+ "\",wgName:\"" + "" + "\",wgId:\"" + "" + "\",wgTargetHC:\""
				+ "" + "\",wgWfHC:\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#wg_add_product_family").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='"
						+ resultsArray[i].product_family_name + "'>"
						+ resultsArray[i].product_family_name + "</option>";

			}
		},
		complete : function(e) {
			$("#wg_add_product_family").append(data);

		}
	});

}

function AddWorkGroupTM(tmId, workgroupName) {
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "addtmwg"
				+ "\",prodFamName:\"" + "" + "\",prodFamId:\"" + ""
				+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\""
				+ $("#wg_tm_start_date_add_page").val()
				+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\"" + ""
				+ "\",wgName:\"" + workgroupName + "\",wgId:\"" + tmId
				+ "\",wgTargetHC:\"" + "" + "\",wgWfHC:\"" + "" + "\"}",
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

function AddWorkGroupMultiTM(tmId, workgroupName, isActive, startDate, endDate) {
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "addmultitmwg"
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
function GetCenterList() {
	var data = "";
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "getallcenters"
				+ "\",prodFamName:\"" + "" + "\",prodFamId:\"" + ""
				+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\"" + ""
				+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\"" + ""
				+ "\",wgName:\"" + "" + "\",wgId:\"" + "" + "\",wgTargetHC:\""
				+ "" + "\",wgWfHC:\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#wg_add_center").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='"
						+ resultsArray[i].lang_center_name + "'>"
						+ resultsArray[i].lang_center_name + "</option>";
			}
		},
		complete : function(e) {
			$("#wg_add_center").append(data);
		}
	});

}
function GetTMList(id) {
	globalobj.ShowLoadingPage();
	var data = "";
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "getalltms"
				+ "\",prodFamName:\"" + "" + "\",prodFamId:\"" + ""
				+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\"" + ""
				+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\"" + ""
				+ "\",wgName:\"" + "" + "\",wgId:\"" + "" + "\",wgTargetHC:\""
				+ "" + "\",wgWfHC:\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			// $("#add_team_manager").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='"
						+ resultsArray[i].tm_employee_id + "'>"
						+ resultsArray[i].tm_name + "</option>";
			}
			$("#" + id).append(data);
		},
		complete : function(e) {

			$.unblockUI();
		}
	});

}

function addTMFields() {

	var data = "";
	counter = counter + 1;

	data = data + "<tr><td><input type='text' id='tm_names_" + counter
			+ "' /></td>";
	data = data
			+ "<td><input class='sample_class' type='text' id='tm_star_date_"
			+ counter + "' /></td><td></td><td></td></tr>";

	$("#add_wg_table").append(data);
	$("#tm_star_date_" + counter).datepicker();
}

function gettmValues() {

	$(".sample_class").each(
			function(index) {
				alert($(this).val() + " tm: date,"
						+ $("#tm_names_" + parseInt(index + 1)).val());
			});
}

function getPSMList() {
	var data = "";
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "getpsmlist"
				+ "\",\"prodFamName\":\"" + "" + "\",prodFamId:\"" + ""
				+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\"" + ""
				+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\"" + ""
				+ "\",wgName:\"" + "" + "\",wgId:\"" + "" + "\",wgTargetHC:\""
				+ "" + "\",wgWfHC:\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#add_wg_psm").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='" + resultsArray[i].psm_name
						+ "'>" + resultsArray[i].psm_name + "</option>";
			}
		},
		complete : function(e) {
			$("#add_wg_psm").append(data);
		}
	});

}

function GetAllWgAbv() {
	var data = "";
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "gwtwgabv"
				+ "\",prodFamName:\"" + "" + "\",prodFamId:\"" + ""
				+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\"" + ""
				+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\"" + ""
				+ "\",wgName:\"" + "" + "\",wgId:\"" + "" + "\",wgTargetHC:\""
				+ "" + "\",wgWfHC:\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#wg_add_product_family").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='"
						+ resultsArray[i].product_family_name + "'>"
						+ resultsArray[i].product_family_name + "</option>";
			}
		},
		complete : function(e) {
			$("#wg_add_product_family").append(data);
			$.unblockUI();
		}
	});
}

function AddMoreTmFields() {

	var dataTable = "";

	dataTable = dataTable + "<tr id='tr_add_tm_wg_" + counter1 + "'>";
	dataTable = dataTable + "<td>New Team Manager "
			+ "</td><td><select id='add_team_manager_" + counter1
			+ "' class='newAppendManager" + "'></select></td>";
	dataTable = dataTable
			+ "<td>Start Date</td><td><input type='text' style='display:inline-block' class='newAppendStart' placeholder='DATE: YYYY-MM-DD' id='wg_tm_start_date_add_page_"
			+ counter1 + "' /></td>";
	dataTable = dataTable
			+ "<td>End Date</td><td><input class='newAppendEnd' placeholder='DATE: YYYY-MM-DD' type='text' id='wg_tm_end_date_add_page_"
			+ counter1
			+ "' /></td><td><a data-current-number='"
			+ counter1
			+ "' href='javascript:void(0)' onclick='clearTR(\"tr_add_tm_wg_"
			+ counter1
			+ "\")'><img src='img/trash24x24.png' style='width:19px;' /></a></td></tr>";

	$("#add_wg_table").append(dataTable);

	TransformToDate(counter1);
	counter1 = counter1 + 1;
	NewCounter = NewCounter + 1;
}

function clearTR(tr) {
	$("#" + tr).html("");
}
function TransformToDate(counter1) {
	$("#wg_tm_start_date_add_page_" + counter1)
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

	$("#wg_tm_end_date_add_page_" + counter1)
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

	$("#wg_tm_start_date_add_page_" + counter1).click(function() {
		$(this).datepicker().datepicker("show");
	});
	$("#wg_tm_end_date_add_page_" + counter1).click(function() {
		$(this).datepicker().datepicker("show");
	});
	GetTMList("add_team_manager_" + counter1);
}
function returnIfActive(endDate) {
	var endDateValue = "0";
	if (endDate == null || endDate == "") {
		endDateValue = "1";
	}
	return endDateValue;
}

function GetAllTMs() {
	// var $items = $('.newAppendStart');
	// startDate = startDate // langCenterDesc = endDate
	// tmId, workgroupName, isActive, startDate, endDate
	if ($("#create_new_tm").is(":checked")) {
		AddWorkGroupQuickTM($("#quick_tm_number").val(), $("#wg_name_add_page")
				.val(), "1", $("#quick_tm_start_date").val(), "");
	}
	$('.newAppendStart').each(
			function() {
				globalobj.ShowLoadingPage();
				var idNo = (this.id).replace(/[^\d.]/g, '');

				// tmId, workgroupName,isActive,startDate,endDate
				AddWorkGroupMultiTM($("#add_team_manager_" + idNo).val(), $(
						"#wg_name_add_page").val(), returnIfActive($(
						"#wg_tm_end_date_add_page_" + idNo).val()), $(
						"#wg_tm_start_date_add_page_" + idNo).val(), $(
						"#wg_tm_end_date_add_page_" + idNo).val());

			});

}
function AddWorkGroupQuickTM(tmId, workgroupName, isActive, startDate, endDate) {
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "addmultitmwg"
				+ "\",\"prodFamName\":\"" + "" + "\",\"prodFamId\":\""
				+ isActive + "\",prodFamDesc:\"" + endDate
				+ "\",langCenterId:\"" + startDate + "\",langCenterName:\""
				+ "" + "\",\"langCenterDesc\":\"" + "" + "\",wgName:\""
				+ workgroupName + "\",wgId:\"" + tmId + "\",wgTargetHC:\"" + ""
				+ "\",wgWfHC:\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

		},
		complete : function(e) {
			addTmInfos($("#quick_tm_fname").val() + $("#quick_tm_lname").val(),
					$("#quick_tm_number").val(), $("#quick_tm_email").val());
		}
	});

}

function addTmInfos(tmName, employeeId, tmEmail) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "tmrequest",
		data : "{\"signature\":\"addtminfo\"" + "," + "\"tmname\":\"" + tmName
				+ "\"" + "," + "\"tmId\":\"" + employeeId + "\"" + ","
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
			globalobj.returnSuccess();
		}
	});
}
