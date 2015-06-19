$(document).ready(function() {
	globalobj.SetPrevHistory("view/vsip");
	GetEmployeeDetailInfo(globalobj.GetEmployeeId());
	$("#cancel_detail_employee").click(function() {
		globalobj.ViewEmpList();
	});
	$("#cancel_detail_employee_top").click(function() {
		globalobj.ViewEmpList();
	});

});

function GetEmployeeDetailInfo(id) {
	globalobj.ShowLoadingPage();
	var i = 0;
	$
			.ajax({
				type : "POST",
				url : "empinfo",
				data : "{\"emp_id\": \"" + id + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {

					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (i = 0; i < resultsArray.length; i++) {
						$("#emp_id_detail_page").text(resultsArray[0].emp_id)
								.attr("disabled");
						$("#emp_name_detail_page").text(
								resultsArray[0].emp_name);
						$("#emp_email_detail_page").append(
								EmailMe(resultsArray[0].email));
						$("#emp_role_detail_page").text(resultsArray[0].role);
						$("#emp_curre_tm_detail_page").text(
								resultsArray[0].tm_name);
						$("#emp_location_detail_page").text(
								resultsArray[0].emp_location);
						$("#emp_prod_family_detail_page").text(
								resultsArray[0].emp_product_family);
						$("#emp_center_detail_page").text(
								resultsArray[0].emp_center);
						$("#emp_start_date_detail").text(
								resultsArray[0].emp_tm_start_date);
						$("#emp_end_date_detail").text(
								resultsArray[0].emp_tm_end_date);
						// $("#emp_role_detail_page").text(resultsArray[0].role);
						$("#emp_hire_detail_page").text(
								resultsArray[0].emp_hired_date);
						$("#emp_resigned_detail_page").text(
								resultsArray[0].emp_resigned_date);
						$("#emp_curre_tm_id_detail_page").text(
								resultsArray[0].tm_id);
						$("#emp_start_training_detail_page").text(
								resultsArray[0].emp_training_start_date);
						$("#emp_end_training_detail_page").text(
								resultsArray[0].emp_training_end_date);
						$("#emp_taleo_no_detail_field").text(
								resultsArray[0].emp_req_num);
						$("#emp_is_training_detail_field").text(
								resultsArray[0].emp_status);
						CallStatus(resultsArray[0].emp_status, globalobj
								.GetEmployeeId());
					}
				},
				complete : function(e) {

					GetDetailCurrentWG(id);
					GetDetailWorkgRoupHistory(id);
					ShowDetailHistoricalData();
				}
			});
}

function CallStatus(emp_status, emp_id) {
	switch (emp_status) {
	case "Contractual":
		CallContractual(emp_id);
		$("#emp_start_detail_field").text("Contract Start Date");
		$("#emp_end_detail_field").text("Contract End Date");
		break;
	case "Leave":
		CallEmployeeLeave();
		$("#emp_start_detail_field").text("Leave Start Date");
		$("#emp_end_detail_field").text("Leave End Date");
		break;
	case "Training":
		CallEmployeeTraining();
		$("#emp_start_detail_field").text("Training Start Date");
		$("#emp_end_detail_field").text("Training End Date");
		break;
	case "Promoted":
		CallPromoted();
		break;
	default:
		// alert("Default");
		break;
	}
}

function CallContractual(emp_id) {
	$.ajax({
		type : "POST",
		url : "gcwdps",
		data : "{\"emp_id\": \"" + emp_id + "\",\"is_latest\":\"yes\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			$("#emp_curr_wg_detail_page").text(resultsArray[0].wg_names);
			$("#emp_curr_wg_detail_date").text(resultsArray[0].start_date);
		}
	});
}

function CallEmployeeLeave() {

}

function CallEmployeeTraining() {

}

function CallPromoted() {

}

function CallRecruiment() {

}

function EmailMe(email) {
	return "<a class='buttonB' href='mailto:"
			+ email
			+ "' onclick='javascript:void(0)'>"
			+ email
			+ "</a>&nbsp;<img src='http://www.necoindia.com/wp-content/uploads/2012/12/email.gif' />";
}

function detailsetIstraining(isTraining) {
	var train = "NO";
	if (isTraining == "1") {
		train = "YES";
	}
	return train;
}
function detailSpecialistInfo() {
	jQuery("#content").load("view/usip");
	return false;
}

function GetDetailCurrentWG(emp_id) {
	$.ajax({
		type : "POST",
		url : "gcwdps",
		data : "{\"emp_id\": \"" + emp_id + "\",\"is_latest\":\"yes\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			$("#emp_curr_wg_detail_page").text(resultsArray[0].wg_names);
			$("#emp_curr_wg_detail_date").text(resultsArray[0].start_date);
		}
	});
}

function GetDetailWorkgRoupHistory(emp_id) {
	var data = "";
	$("#historical_detail_wg_table").html("");
	$
			.ajax({
				type : "POST",
				url : "gcwdps",
				data : "{\"emp_id\": \"" + emp_id + "\",\"is_latest\":\"no\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					data = data + "<tr class='boldit'>";
					data = data + "<td>&nbsp;</td>";
					data = data + "<td>Work Group</td>";
					data = data + "<td>Start Date</td>";
					data = data
							+ "<td>End Date</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
					for (var int = 0; int < resultsArray.length; int++) {
						data = data + "<tr>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>" + resultsArray[int].wg_names
								+ "</td>";
						data = data + "<td>" + resultsArray[int].start_date
								+ "</td>";
						data = data + "<td>" + resultsArray[int].end_date
								+ "</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td></tr>";
					}

				},
				complete : function(e) {
					$("#historical_detail_wg_table").append(data);

				}
			});
}

function ShowDetailHistoricalData() {
	var data = "";
	$
			.ajax({
				type : "POST",
				url : "gtmhd",
				data : "{\"emp_id\": \"" + globalobj.GetEmployeeId() + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					data = data + "<tr class='boldit'>";
					data = data + "<td>&nbsp;</td>";
					data = data + "<td>Team Manager</td>";
					data = data + "<td>Start Date</td>";
					data = data
							+ "<td>End Date</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
					for (var int = 0; int < resultsArray.length; int++) {
						data = data + "<tr>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>" + resultsArray[int].tm_name
								+ "</td>";
						data = data + "<td>"
								+ resultsArray[int].emp_tm_start_date + "</td>";
						data = data + "<td>"
								+ resultsArray[int].emp_tm_end_date + "</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "<td>&nbsp;</td>";
						data = data + "</tr>";
					}

				},
				complete : function(e) {
					$("#historical_detail_table").append(data);
					$.unblockUI();
				}
			});
}

function GetDatesFromType(status) {
	switch (status) {
	case "Contractual":
		break;
	case "Leave":
		break;
	case "Permanent":
		break;
	case "Recruitment":
		break;
	case "Training":
		break;
	default:
		alert("Invalid Employee Type");
	}
}

function GetEmployeeAttribute(empId) {

	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "empcontroller",
		data : "{\"emp_id\":\"" + empId
				+ "\",\"signature\":\"getdetailattribute\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {

			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {
				$("#emp_start_training_update_page").text(
						resultsArray[i].start_date);
				$("#emp_end_training_update_page")
						.text(resultsArray[i].end_date);
			}

		},
		complete : function(e) {
			$.unblockUI();
		}
	});
}