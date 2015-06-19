var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; // January is 0!
var yyyy = today.getFullYear();
var dateToday = yyyy + '-' + AddZero(mm) + '-' + AddZero(dd);
var counter = 1;
var counter1 = 1;
var counterTM = 1;
var counterWG = 1;
var sample = "";
$(document)
		.ready(
				function() {
					// RenderTestData();
					GetPortalRoles();
					GetPSMList();
					GetProdFamList();
					GetCenterList();
					GetLocationList();
					GetAddRoleCategory();
					GetAllResignedEmp();
					globalobj.SetPrevHistory("view/vsap");
					$("#emp_next_tm_end_date").hide();
					$("#quick_add_tm").hide();
					$("#contractual_dates_add_row").hide();
					$("#emp_next_wg_end_date").hide();
					$("#quick_add_wg").hide();
					$("#leave_row").hide();
					$("#add_emp_form")
							.validate(
									{
										rules : {
											emp_start_training_add_page : {
												required : '#emp_is_training_field:checked'

											},
											emp_end_training_add_page : {
												required : '#emp_is_training_field:checked'
											},
											emp_email_add_page : {
												required : true
											},
											emp_id_add_page : {
												required : true
											},
											emp_name_add_page : {
												required : true
											},
											emp_last_name_add_page : {
												required : true
											},
											emp_add_type : {
												required : true
											},
											emp_next_tm_start_date : {
												required : true
											},
											emp_next_wg_start_date : {
												required : true
											}

										},
										messages : {
											emp_email_add_page : "<p>Please enter your Email Or a valid email address</p>",
											emp_start_training_add_page : "<p>Please enter your Start Date<p>",
											emp_end_training_add_page : "<p>Please enter End Date<p>",
											emp_id_add_page : "<p>Please enter Employee ID<p>",
											emp_name_add_page : "<p>Please enter Employee Name<p>",
											emp_add_type : "<p>Please select an Employee Type<p>"
										},

										errorLabelContainer : $("ul",
												$('div#appendError')),
										wrapper : 'li',
										errorContainer : $('div#appendError'),
										errorPlacement : function(error,
												element) {
											$('#appendError').append(error);
										},
										onfocusout : false,
										onkeyup : false
									});

					enableDateOnClick("emp_start_training_add_page",
							"emp_resigned_add_page", "quick_psm_start_date",
							"emp_end_training_add_page", "emp_end_date_add",
							"emp_next_tm_start_date", "emp_curr_wg_end_date",
							"emp_next_wg_start_date", "emp_hire_add_page",
							"quick_tm_hired_date",
							"emp_start_contract_add_page",
							"emp_end_contract_add_page",
							"emp_start_leave_add_page",
							"emp_end_leave_add_page", "quick_tm_start_date");

					$("#emp_end_leave_add_page")
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
					$("#emp_start_leave_add_page")
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
					$("#emp_hire_add_page")
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
					$("#emp_start_contract_add_page")
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
					$("#emp_end_contract_add_page")
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
					$("#quick_psm_start_date")
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
					//
					$("#tm_chk_box").click(function() {
						globalobj.ShowLoadingPage();
						$("#tm_row_1").toggle('slow', ClearValTM);
						$("#tm_row_2").toggle('slow', $.unblockUI());
						$("#emp_end_date_add").val(dateToday);

					});
					$("#wg_chk_box").click(function() {
						globalobj.ShowLoadingPage();
						$("#wg_row_1").toggle('slow', ClearVal);
						$("#wg_row_2").toggle('slow', $.unblockUI());

					});

					$(".button-1").click(function() {
						addEmployeeInfo();
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
					$("#emp_next_wg_start_date")
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

					$(".button-1").click(function() {
						addEmployeeInfo();
					});
					$("#add_employee_top").click(function() {
						addSpecialistInfo();

					});
					$("#add_employee_bottom").click(function() {
						addSpecialistInfo();
					});

					$("#emp_next_tm_start_date")
							.datepicker(
									{

										defaultDate : "+1w",
										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										onClose : function(selectedDate) {
											$("#emp_next_tm_end_date")
													.datepicker("option",
															"minDate",
															selectedDate);
										},
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
									});

					// emp_hire_add_page
					$("#emp_hire_add_page")
							.datepicker(
									{

										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
									});

					$("#emp_end_training_add_page")
							.datepicker(
									{

										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										onSelect : function(selectedDate) {
											$("#emp_start_training_add_page")
													.datepicker("option",
															"maxDate",
															selectedDate);
										},
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,
										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
									});

					$("#emp_start_training_add_page")
							.datepicker(
									{

										changeMonth : true,
										numberOfMonths : 1,
										dateFormat : 'yy-mm-dd',
										changeYear : true,
										onClose : function(selectedDate) {
											$("#emp_end_training_add_page")
													.datepicker("option",
															"minDate",
															selectedDate);
										},
										showOn : 'button',
										buttonText : 'Show Date',
										buttonImageOnly : true,

										buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
									});
					$(".button-1").click(function() {
						return false;
					});

					$("#tm_chk_box").click(
							function() {
								globalobj.GetAllTMAvailable($(
										"#emp_curre_tm_add_page").val());
							});
					$("#tm_chk_box").click(function() {
						// addSpecialistInfo();
					});
					$("#cancel_add_employee").click(function() {
						globalobj.GetPrevHistory("view/vsap");

					});
					$("#cancel_add_employee_top").click(function() {
						globalobj.GetPrevHistory("view/vsap");
					});

					$("#quick_add_wg_chckbx").click(function() {
						counterWG = counterWG + 1;
						$("#quick_add_wg").slideToggle("slow");
						$("#current_wg_div").slideToggle("slow");
					});
					$("#quick_add_tm_chckbx").click(function() {
						counterTM = counterTM + 1;
						$("#quick_add_tm").slideToggle("slow");
						$("#current_team_div").slideToggle("slow");

					});
					$(".ui-datepicker-trigger").hide();
				});

function GetAllResignedEmp() {
	$("#emp_add_replace_list").html("");
	var data = "";
	$.ajax({
		type : "POST",
		url : "empcontroller",
		data : "{\"emp_id\":\"\",\"signature\":\"getAllresignedemp\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			data = data + "<option value='new'>New</option>";
			data = data + "<option value='promoted'>Promoted</option>";

			for (var i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='"
						+ resultsArray[i].resigned_emp_id + "'>"
						+ resultsArray[i].resigned_emp_name + "</option>";
			}
			$("#emp_add_replace_list").append(data);
		},
		complete : function(e) {

		}
	});
}

function GetAddRoleCategory() {
	globalobj.ShowLoadingPage();
	var data = "";
	$.ajax({
		type : "POST",
		url : "empcontroller",
		data : "{\"emp_id\": \"\", \"signature\": \"getAllroles\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#emp_role_add_page").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
					resultsArray.sort();
					for (var i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].role_name
						+ "'>" + resultsArray[i].role_name + "</option>";
			}
		},
		complete : function(e) {
			$("#emp_role_add_page").append(data);
			ShowTrainingDates();
			GetAllAddSpecialistWgList();
			GetAllAddSpecialistTmList();

		}
	});
}

function GetAllAddSpecialistWgList() {
	var data = "";
	$.ajax({
		type : "POST",
		url : "getallemp",
		data : "{\"wg_names\": \"\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#emp_trans_wg_add").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='" + resultsArray[i].wg_name
						+ "'>" + resultsArray[i].wg_name + "</option>";
			}
			$("#emp_trans_wg_add").append(data);
		},
		complete : function(e) {
			$.unblockUI();
		}
	});
}

function GetAllAddSpecialistTmList() {
	var data = "";
	$.ajax({
		type : "POST",
		url : "empatm",
		data : "{\"tm_name\": \"\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#emp_trans_tm_add").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='"
						+ resultsArray[i].tm_employee_id + "'>"
						+ resultsArray[i].tm_name + "</option>";
			}
			$("#emp_trans_tm_add").append(data);
		},
		complete : function(e) {

		}
	});
}

function AddZero(variable) {
	variable = "0" + variable;
	variable = variable.slice(-2);

	return variable;
}

function enableDateOnClick() {
	for (var i = 0; i < arguments.length; i++) {
		$("#" + arguments[i]).click(function() {
			$(this).datepicker().datepicker("show");
		});
	}
}

function SetMinEndDates() {
	$("#emp_resigned_add_page")
			.datepicker(
					{
						minDate : new Date($("#emp_hire_add_page").val()),
						changeMonth : true,
						numberOfMonths : 1,
						dateFormat : 'yy-mm-dd',
						changeYear : true,
						showOn : 'button',
						buttonText : 'Show Date',
						buttonImageOnly : true,
						buttonImage : 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'
					});
	$("#emp_curr_wg_end_date")
			.datepicker(
					{
						minDate : new Date($("#emp_next_wg_start_date").val()),
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
	$("#emp_end_date_add")
			.datepicker(
					{
						minDate : new Date($("#emp_start_date_add").val()),
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
}

function ShowTrainingDates() {
	$("#training_dates_add_row").hide();
	$("#emp_add_type").change(function() {
		switch ($(this).val()) {
		case "Training":
			$("#training_dates_add_row").show();
			$("#leave_row").hide();
			$("#contractual_dates_add_row").hide();
			break;
		case "Contractual":
			$("#contractual_dates_add_row").show();
			$("#leave_row").hide();
			$("#training_dates_add_row").hide();
			break;
		case "Leave":
			$("#leave_row").show();
			$("#training_dates_add_row").hide();
			$("#contractual_dates_add_row").hide();
			break;
		case "Permanent":
			$("#training_dates_add_row").hide();
			$("#leave_row").hide();
			$("#contractual_dates_add_row").hide();
			break;
		default:
			$("#training_dates_add_row").hide();
			$("#leave_row").hide();
			$("#contractual_dates_add_row").hide();

			break;
		}
	});
}

function addSpecialistInfo() {
	$("#appendError").html("");
	if ($("#add_emp_form").valid()) {
		if ($("#emp_add_type").val() != "") {
			addOnlyEmpInfo();
			addEmployeeInfoWithTM();
			addEmployeeInfoWithWG();
			AddResigned();
			$("#add_employee_top").removeAttr("href");
			$("#add_employee_top").attr("style", "background:#a1a1a1");
			$("#add_employee_top").unbind();
			$("#add_employee_top").off("click", "**");
			$("#add_employee_bottom").removeAttr("href");
			$("#add_employee_bottom").attr("style", "background:#a1a1a1");
			$("#add_employee_bottom").unbind();
			$("#add_employee_bottom").off("click", "**");
		}
	}
}

function addOnlyEmpInfo() {

	switch ($("#emp_add_type").val()) {
	case "Contractual":
		PermanentEmployee();
		AddEmployeeAttribute($("#emp_id_add_page").val(), $(
				"#emp_start_contract_add_page").val(), $(
				"#emp_end_contract_add_page").val(), $("#emp_add_type").val());
		break;
	case "Permanent":
		PermanentEmployee();
		break;
	case "Leave":
		PermanentEmployee();
		AddEmployeeAttribute($("#emp_id_add_page").val(), $(
				"#emp_start_leave_add_page").val(),
				$("#emp_end_leave_add_page").val(), $("#emp_add_type").val());
		break;
	case "Recruitment":
		PermanentEmployee();
		break;
	case "Training":
		PermanentEmployee();
		AddEmployeeAttribute($("#emp_id_add_page").val(), $(
				"#emp_start_training_add_page").val(), $(
				"#emp_end_training_add_page").val(), $("#emp_add_type").val());
		break;
	default:
		alert("Please choose Employee type");
		$("#emp_add_type").focus();
		break;
	}

}

function PermanentEmployee() {
	globalobj.ShowLoadingPage();
	var name = $("#emp_name_add_page").val() + " "
			+ $("#emp_last_name_add_page").val();
	$.ajax({
		type : "POST",
		url : "usis",
		data : "{\"emp_id\": \"" + $("#emp_id_add_page").val() + "\","
				+ "\"emp_is_update\": \"0\"," + "\"emp_name\": \"" + name
				+ "\"," + "\"emp_email\": \"" + $("#emp_email_add_page").val()
				+ "\",\"emp_training_start_date\": \""
				+ $("#emp_start_training_add_page").val()
				+ "\",\"emp_training_end_date\": \""
				+ $("#emp_end_training_add_page").val() + "\","
				+ "\"emp_is_training\": \"" + ReturnIfTraining() + "\","
				+ "\"emp_role\": \"" + $("#emp_role_add_page").val() + "\","
				+ "\"emp_prod_fam\": \"" + $("#emp_prod_family_add_page").val()
				+ "\"," + "\"emp_location\": \""
				+ $("#emp_location_add_page").val() + "\","
				+ "\"emp_center\": \"" + $("#emp_center_add_page").val()
				+ "\"," + "\"emp_hire_date\": \""
				+ $("#emp_hire_add_page").val() + "\","
				+ "\"emp_res_date\": \"" + $("#emp_resigned_add_page").val()
				+ "\",\"taleono\":\"" + $("#emp_add_app_req_no").val()
				+ "\",\"emp_type\":\"" + $("#emp_add_type").val()
				+ "\",\"portal_role\":\"" + $("#emp_add_portal_role").val()
				+ "\"" + "}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			globalobj.returnSuccess();
		},
		complete : function(e) {
			$.unblockUI();

		}
	});
}

function ReturnIfTraining() {
	var isTraining = "0";
	if ($("#emp_is_training_field").is(":checked")) {
		isTraining = "1";
	}
	return isTraining;
}

function returnPresentText(text) {
	var newtext = "";
	if (text == "" || text == null) {
		newtext = "Present";
	}

	return newtext;
}

function ReturnPresent(id) {

	if ((id).val() == "" || (id).val() == null) {
		(id).attr("placeholder", "Present: YYYY-MM-DD");
	}
}

function addEmployeeInfoWithWG() {
	$.ajax({
		type : "POST",
		url : "aucwgi",
		data : "{\"emp_id\": \"" + $("#emp_id_add_page").val() + "\","
				+ "\"wgName\": \"\"," + "\"emp_is_new\": \"1" + "\","
				+ "\"new_wg_name\": \"" + AddQuickNewWG() + "\","
				+ "\"new_start_date\": \"" + ReturnWgStartDate() + "\","
				+ "\"curr_end_date\": \"" + "\"," + "\"cur_start_date\": \"\""
				+ "}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

		},
		error : function(err) {
			alert(err);
		}
	});
}

function addEmployeeInfoWithTM() {

	$.ajax({
		type : "POST",
		url : "auctmi",
		data : "{\"emp_id\": \"" + $("#emp_id_add_page").val() + "\","
				+ "\"tm_id\": \"" + "\"," + "\"new_tm_id\": \""
				+ AddQuickNewTM() + "\",\"emp_is_new\": \"1" + "\","
				+ "\"new_start_date\": \"" + ReturnTmStartDate() + "\","
				+ "\"curr_end_date\": \"" + "\"," + "\"cur_start_date\": \"\""
				+ "}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			if ((counterTM % 2) == 0) {
				addTmInfos($("#quick_tm_fname").val() + " "
						+ $("#quick_tm_lname").val(), $("#quick_tm_number")
						.val(), $("#quick_tm_email").val());
			}
		}
	});
}

function ReturnTmStartDate() {
	var tmStartDate = $("#emp_next_tm_start_date").val();
	if ((counterTM % 2) == 0) {
		tmStartDate = $("#quick_tm_hired_date").val();
	}
	return tmStartDate;
}

function ReturnWgStartDate() {
	var wgStartDate = $("#emp_next_wg_start_date").val();
	if ((counterWG % 2) == 0) {
		wgStartDate = $("#quick_psm_start_date").val();
	}
	return wgStartDate;
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
			$("#emp_prod_family_add_page").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='"
						+ resultsArray[i].product_family_name + "'>"
						+ resultsArray[i].product_family_name + "</option>";
			}
		},
		complete : function(e) {
			$("#emp_prod_family_add_page").append(data);
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
			$("#emp_center_add_page").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='"
						+ resultsArray[i].lang_center_name + "'>"
						+ resultsArray[i].lang_center_name + "</option>";
			}
		},
		complete : function(e) {
			$("#emp_center_add_page").append(data);
		}
	});
}

function GetLocationList() {
	var data = "";
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "getloclist"
				+ "\",prodFamName:\"" + "" + "\",prodFamId:\"" + ""
				+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\"" + ""
				+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\"" + ""
				+ "\",wgName:\"" + "" + "\",wgId:\"" + "" + "\",wgTargetHC:\""
				+ "" + "\",wgWfHC:\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#emp_location_add_page").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='" + resultsArray[i].location_name
						+ "'>" + resultsArray[i].location_name + "</option>";
			}
		},
		complete : function(e) {
			$("#emp_location_add_page").append(data);
		}
	});
}
function ComputeScore() {
	var criteria = (parseInt(arguments.length)) * 10;
	var rating = 0;
	var score = 0;
	for (var i = 0; i < arguments.length; i++) {

		rating = (parseInt((rating)
				+ parseInt(ConvertScore($("#" + arguments[i]).val()))));
	}

	score = parseFloat(parseFloat(rating) / parseFloat(criteria));
	return returnAvg(score);

}

function returnAvg(computedScore) {
	var newcomputedScore = 0;
	if (computedScore < .25) {
		newcomputedScore = "Did Not meet";
	} else if (computedScore >= .25 && computedScore <= .49) {
		newcomputedScore = "Partially met";
	} else if (computedScore >= .50 && computedScore <= .74) {
		newcomputedScore = "Acheived";
	} else if (computedScore == .75) {
		newcomputedScore = "Exceeded";
	} else if (computedScore > .75) {
		newcomputedScore = "Far Exceeded";
	}

	return newcomputedScore;
}

function ConvertScore(score) {
	var newScore = "";
	switch (score) {
	case "Strength":
		newScore = "10";
		break;
	case "Opportunity":
		newScore = "0";
		break;
	case "Acceptable":
		newScore = "6";
		break;
	}
	return parseFloat(newScore);
}
function RenderTestData() {
	var data = "";
	for (var i = 0; i < 5; i++) {
		data = data
				+ "<td><select onchange='ConvertScore($(this).val())' id='score_"
				+ i + "'><option value=''>--</option>";
		data = data
				+ "<option value='Strength'>Strength</option> <option value='Acceptable'>Acceptable</option><option value='Opportunity'>Opportuniy</option></select></td>";
	}
	data = data
			+ "<td><a href='javascript:void(0)' onclick='ComputeScore(\"score_0\",\"score_1\",\"score_2\",\"score_3\",\"score_4\")'>compute</a></td>";
	$("#wg_row_99").append(data);

}

function AddQuickNewTM() {
	var tmVal = $("#emp_trans_tm_add").val();
	if ((counterTM % 2) == 0) {
		tmVal = $("#quick_tm_number").val();

	}

	return tmVal;
}

function AddQuickNewWG() {
	var wgVal = $("#emp_trans_wg_add").val();
	if ((counterWG % 2) == 0) {
		wgVal = $("#quick_wg_name").val();
	}
	return wgVal;
}

function AddNewWG1() {
	if ((counterWG % 2) == 0) {
		AddWgInfo($("#quick_wg_psm").val(), $("#emp_prod_family_add_page")
				.val(), $("#emp_center_add_page").val(), $("#quick_wg_name")
				.val(), '0');
	}
}

function GetPSMList() {
	var data = "";
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + "\",signature:\"" + "getpsmlist"
				+ "\",prodFamName:\"" + "" + "\",prodFamId:\"" + ""
				+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\"" + ""
				+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\"" + ""
				+ "\",wgName:\"" + "" + "\",wgId:\"" + "" + "\",wgTargetHC:\""
				+ "" + "\",wgWfHC:\"" + "" + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			$("#quick_wg_psm").html("");
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {

				data = data + "<option value='" + resultsArray[i].psm_name
						+ "'>" + resultsArray[i].psm_name + "</option>";
			}
		},
		complete : function(e) {
			$("#quick_wg_psm").append(data);
		}
	});
}

function GetPortalRoles() {
	$("#emp_add_portal_role").html("");
	var data = "";
	$.ajax({
		type : "POST",
		url : "empcontroller",
		data : "{\"emp_id\":\"\",\"signature\":\"getportalroles\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {
				data = data + "<option value='"
						+ resultsArray[i].portal_role_name + "'>"
						+ resultsArray[i].portal_role_name + "</option>";
			}
			$("#emp_add_portal_role").append(data);
		},
		complete : function(e) {

		}
	});
}

function AddEmployeeLeave() {
	var name = $("#emp_name_add_page").val() + " "
			+ $("#emp_last_name_add_page").val();
	$.ajax({
		type : "POST",
		url : "emptypecntrl",
		data : "{\"emp_id\":\"" + $("#emp_id_add_page").val() + "\","
				+ "\"emp_type\":\"Leave\"," + "\"leave_type\":\""
				+ $("#emp_leave_add_page").val() + "\","
				+ "\"signature\":\"addLeave\"," + "\"replaced_employee\":\"\","
				+ "\"start_date\":\"" + $("#emp_start_leave_add_page").val()
				+ "\"," + "\"end_date\":\""
				+ $("#emp_start_leave_add_page").val() + "\","
				+ "\"taleo_no\":\"" + $("#emp_add_app_req_no").val() + "\","
				+ "\"description\":\"\"," + "\"is_replaced\":\"0\","
				+ "\"wgname\":\"" + $("#emp_trans_wg_add").val() + "\","
				+ "\"tm_id\":\"" + $("#emp_trans_tm_add").val() + "\","
				+ "\"emp_name\":\"" + name + "\"," + "\"email\":\""
				+ $("#emp_email_add_page").val() + "\"" + "}",
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

//
function addTmInfos(tmName, employeeId, tmEmail) {
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
			AddNewWG1();
		},
		complete : function(e) {
			if (counterWG % 2 != 0) {
				addTMWgInfo(AddQuickNewWG(), ReturnTmStartDate(), "",
						AddQuickNewTM());
			}
			$.unblockUI();
		}
	});
}

function addTMWgInfo(wgName, wgStartDate, wgEndDate, tmId) {

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

		},
		complete : function(e) {
		}
	});
}
function AddWgInfo(psmName, prodFamName, langCenterName, wgName, wgTargetHC) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "ProdFamily",
		data : "{\"wgPSM\":\"" + psmName + "\",\"signature\":\"" + "addwginfo"
				+ "\",\"prodFamName\":\"" + prodFamName + "\",\"prodFamId\":\""
				+ "" + "\",\"prodFamDesc\":\"" + "" + "\",\"langCenterId\":\""
				+ "" + "\",\"langCenterName\":\"" + langCenterName
				+ "\",\"langCenterDesc\":\"" + "" + "\",\"wgName\":\"" + wgName
				+ "\",\"wgId\":\"" + "" + "\",\"wgTargetHC\":\"" + wgTargetHC
				+ "\",\"wgWfHC\":\"" + $("#wg_whc_add_page").val() + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

		},
		complete : function(e) {
			AddWorkGroupTM(AddQuickNewTM(), wgName);
			globalobj.returnSuccess();
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
				+ $("#quick_tm_hired_date").val() + "\",langCenterName:\"" + ""
				+ "\",langCenterDesc:\"" + "" + "\",wgName:\"" + workgroupName
				+ "\",wgId:\"" + tmId + "\",wgTargetHC:\"" + ""
				+ "\",wgWfHC:\"" + "" + "\"}",
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

function AddResigned() {
	var data = "";
	$.ajax({
		type : "POST",
		url : "empcontroller",
		data : "{\"emp_id\":\"" + $("#emp_add_replace_list").val()
				+ "\",\"signature\":\"updatereplacemapping\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

		},
		complete : function(e) {

		}
	});
}

// TO DO: 3-17-2015

function AddEmployeeAttribute(empId, sDate, eDate, type, subType) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "empcontroller",
		data : "{\"emp_id\":\"" + empId + "\",\"sDate\":\"" + sDate
				+ "\",\"subType\":\"" + subType + "\",\"eDate\":\"" + eDate
				+ "\",\"type\":\"" + type
				+ "\",\"signature\":\"addtotablestatus\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

		},
		complete : function(e) {
			$.unblockUI();
		}
	});
}

// TO DO: 3-17-2015
function ReturnNull(paramTonull) {

}
