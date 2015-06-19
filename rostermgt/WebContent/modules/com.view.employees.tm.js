/*employee list */
/* coded by marangelo for TR reporting team. */
/* javascript for displaying employee and team manager list */
var TmList = "";
var interimList = "";
$(document).ready(
		function() {
			globalobj.myStopFunction();
			GetTMList();
			GetInterim();
			MakeEmployeesPerTmList();
			$("#add_employee").hide();
			globalobj.SetPrevHistory("view/vssc");
			globalobj.AddAuditTrail(globalobj.userId, globalobj.username,
					"vssc", globalobj.dateToday, "view");
		});

function MakeEmployeesPerTmList() {
	globalobj.ShowLoadingPage();
	var data = "";
	var i = 0;

	data = data
			+ "<thead> <tr> <th style='color: black'> Employee Number</th> ";
	data = data + " <th style='color: black'>Employee Name</th> ";
	data = data + " <th style='color: black'>Role</th> ";
	data = data + " <th style='color: black'>Status</th> ";
	data = data + " <th style='color: black'>Active</th> ";
	data = data + " <th style='color: black'>Update</th> ";
	data = data + " <th style='color: black'>Delete </th> </tr></thead><tbody>";
	$
			.ajax({
				type : "POST",
				url : "getemplist",
				data : "{}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					$("#employee_per_tm_table_view").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<tr><td style='padding-left:20px; width: 130px; align: center;'><a href='javascript:void(0);' onClick='globalobj.ViewSpecialistDetail(\""
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
								+ " </td>";
						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Update Employee Info?' href='javascript:void(0);' onClick='UpdateEmployeeInfo(\""
								+ resultsArray[i].emp_id + "\",\""
								+ resultsArray[i].emp_status + "\",\""
								+ resultsArray[i].serial_employees_id + "\")'>"
								+ "<img src='img/Users-Edit-User-icon.png' />"
								+ " </a></td>";
						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Resigned Employee?' href='javascript:void(0);' onClick='DeleteEmployee(\""
								+ resultsArray[i].emp_id + "\",\""
								+ resultsArray[i].emp_status + "\",\""
								+ resultsArray[i].serial_employees_id + "\")'>"
								+ "<img src='img/user2-delete-icon.png' />"
								+ " </td> </tr>";
					}
					$("#employee_per_tm_table_view").append(data + interimList + TmList);

				},
				complete : function(e) {
					$("#employee_per_tm_table_view").dataTable(
							{

								"lengthMenu" : [ [ 25, 50, 100, 200, -1 ],
										[ 25, 50, 100, 200, "All" ] ],
								"bDeferRender" : true,
								"sScrollX" : "100%",
								"bScrollCollapse" : false,
								"sScrollY" : "400px",
								"pagingType" : "full_numbers",
								"iDisplayLength" : -1,
								"order" : [ [ 2, "desc" ] ]
							});
					$("#add_employee").show();
					$.unblockUI();
				}
			});
}

function GetTMList() {
	globalobj.ShowLoadingPage();
	var data = "";
	var i = 0;
	$
			.ajax({
				type : "POST",
				url : "tmrequest",
				data : "{\"signature\": \"gettmlist\"" + "," + "\"tmname\":\""
						+ "" + "\"" + "," + "\"tmId\":\"" + "" + "\"" + ","
						+ "\"tm_is_active\":\"" + "" + "\"" + ","
						+ "\"tm_wg_name\":\"" + "" + "\"" + ","
						+ "\"tm_wg_start_date\":\"" + "" + "\"" + ","
						+ "\"tm_wg_end_date\":\"" + "" + "\"" + ","
						+ "\"tmEmail\":\"" + "" + "\"" + "}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					$("#team_manager_list_view").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (i = 0; i < resultsArray.length; i++) {
						data = data
								+ " <tr> <td style='padding-left:20px;'><a href='javascript:void(0)' onClick='ShowTmDetailPage(\""
								+ resultsArray[i].tm_employee_id + "\")'>"
								+ resultsArray[i].tm_employee_id + " </a></td>";
						data = data
								+ " <td style='padding-left:10px;'><a href='javascript:void(0)' onClick='ShowTmDetailPage(\""
								+ resultsArray[i].tm_employee_id + "\")'>"
								+ resultsArray[i].tm_name
								+ "</a></td><td align='center'>TM</td>";
						data = data + " <td align='center'>Permanent</td>";
						data = data + " <td align='center'>Yes</td>";

						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Update Team Manager Info?' href='javascript:void(0);' onClick='ShowTMPage(\""
								+ resultsArray[i].tm_employee_id + "\")'>"
								+ "<img src='img/Users-Edit-User-icon.png' />"
								+ " </a></td>";
						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Delete Info?' href='javascript:void(0);' onClick='DeleteTm(\""
								+ resultsArray[i].tm_employee_id + "\")'>"
								+ "<img src='img/user2-delete-icon.png' />"
								+ " </td> </tr>";
					}
					TmList = data + "</tbody>";

				},
				complete : function(e) {

				}
			});

}

function GetInterim() {
	var data = "";
	var i = 0;
	$
			.ajax({
				type : "POST",
				url : "tmrequest",
				data : "{\"signature\": \"getinterrimtm\"" + "," + "\"tmname\":\""
						+ "" + "\"" + "," + "\"tmId\":\"" + "" + "\"" + ","
						+ "\"tm_is_active\":\"" + "" + "\"" + ","
						+ "\"tm_wg_name\":\"" + "" + "\"" + ","
						+ "\"tm_wg_start_date\":\"" + "" + "\"" + ","
						+ "\"tm_wg_end_date\":\"" + "" + "\"" + ","
						+ "\"tmEmail\":\"" + "" + "\"" + "}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (i = 0; i < resultsArray.length; i++) {
						data = data
						+ "<tr><td style='padding-left:20px; width: 130px; align: center;'><a href='javascript:void(0);' onClick='globalobj.ViewSpecialistDetail(\""
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
						+ "Interim TM" + "</td>";
				data = data + " <td align='center'>"
						+ resultsArray[i].emp_status + "</td>";
				data = data
						+ " <td align='center'>"
						+ globalobj
								.ReturnYesNo(resultsArray[i].emp_is_active)
						+ " </td>";
				data = data
						+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Update Employee Info?' href='javascript:void(0);' onClick='UpdateEmployeeInfo(\""
						+ resultsArray[i].emp_id + "\",\""
						+ resultsArray[i].emp_status + "\",\""
						+ resultsArray[i].serial_employees_id + "\")'>"
						+ "<img src='img/Users-Edit-User-icon.png' />"
						+ " </a></td>";
				data = data
						+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Resigned Employee?' href='javascript:void(0);' onClick='DeleteEmployee(\""
						+ resultsArray[i].emp_id + "\",\""
						+ resultsArray[i].emp_status + "\",\""
						+ resultsArray[i].serial_employees_id + "\")'>"
						+ "<img src='img/user2-delete-icon.png' />"
						+ " </td> </tr>";
					}
					interimList = data;
				},
				complete : function(e) {
				}
			});
}

function UpdateEmployeeInfo(id, status, serialId) {
	jQuery("#content").load("view/usip");
	globalobj.SetEmpStatus(status);
	if (status == "Recruitment") {
		globalobj.SetEmployeeId(id);
	} else {
		globalobj.SetEmployeeId(id);
	}
	return false;

}

function DeleteEmployee(id, status, serialId) {
	var answer = confirm("WAIT!!! This is still an on-going developement,\nPlease Email MarAngelo For customization, additional information related to this form  and other inquiries,\nClick OK to Proceed..");
	if (answer == true) {
		window.location = 'mailto:marangelo.delatorre@thomsonreuters.com';
	}
}
function ShowTMPage(id) {
	globalobj.SetTMId(id);
	jQuery("#content").load("view/utmi");
	return false;
}
function ShowTmDetailPage(id) {
	globalobj.SetTMId(id);
	jQuery("#content").load("view/vtmdp");
	return false;
}

function DeleteTm(id) {
	var answer = confirm("Are you sure you want to delete Team Manager?");
	if (answer == true) {
		globalobj.ShowLoadingPage();
		$.ajax({
			type : "POST",
			url : "tmrequest",
			data : "{\"signature\": \"deletetm\"" + "," + "\"tmname\":\"" + ""
					+ "\"" + "," + "\"tmId\":\""
					+ id
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
					+ "\"tmEmail\":\"" + "" + "\"" + "}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				$("#team_manager_list_view").html("");
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
			},
			complete : function(e) {
				jQuery("#content").load("view/vssc");
				globalobj.returnSuccess();
			}
		});
	}
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