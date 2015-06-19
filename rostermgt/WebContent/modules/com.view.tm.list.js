$(document).ready(function() {
	globalobj.myStopFunction();
	$("#add_tm").hide();
	GetTMList();
	globalobj.SetPrevHistory("view/vtml");
	$("#add_tm").click(function() {
		AddTM();
	});
	globalobj.AddAuditTrail(globalobj.userId,globalobj.username,"vtml",globalobj.dateToday,"view");
});

function GetTMList() {
	globalobj.ShowLoadingPage();
	var data = "";
	var i = 0;
	data = data + "<thead> <tr> <th style='color: black'>Number</a></th>";
	data = data + "<th style='color: black'>Team Manager Name</a></th>";
	data = data + "<th style='color: black'>Update</th> ";
	data = data + "<th style='color: black'>Delete</th>";
	data = data + "</tr></thead><tbody>";
	$
			.ajax({
				type : "POST",
				url : "tmrequest",
				data : "{\"signature\": \"gettmlist\"" + "," + "\"tmname\":\""
						+  localStorage
						.getItem("29a7e96467b69a9f5a93332e29e9b0de") + "\"" + "," + "\"tmId\":\""
						+ localStorage
								.getItem("0b8b667e7722bc7e363b601ce584259d")
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

					for (i = 0; i < resultsArray.length; i++) {
						data = data + " <tr><td><a href='javascript:void(0)' onClick='ShowTmDetailPage(\""
								+ resultsArray[i].tm_employee_id + "\")'>"+ resultsArray[i].tm_employee_id+"</a> </td>";
						data = data
								+ " <td style='padding-left:10px;'><a href='javascript:void(0)' onClick='ShowTmDetailPage(\""
								+ resultsArray[i].tm_employee_id + "\")'>"
								+ resultsArray[i].tm_name + "</a></td>";
						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Update Team Manager Info?' href='javascript:void(0);' class='edit' onClick='ShowTMPage(\""
								+ resultsArray[i].tm_employee_id + "\")'>"
								+ "<img src='img/Users-Edit-User-icon.png' />"
								+ " </a></td>";
						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Delete Info?' href='javascript:void(0);' class='delete' onClick='DeleteTm(\""
								+ resultsArray[i].tm_employee_id + "\")'>"
								+ "<img src='img/user2-delete-icon.png' />"
								+ " </td> </tr>";
					}
					$("#team_manager_list_view").append(data + " </tbody>");

				},
				complete : function(e) {
					$("#team_manager_list_view").dataTable(
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

					globalobj.SecurePages();
					$("#add_tm").show();
				}
			});
}
function AddTM() {
	jQuery("#content").load("view/vtmap");
	return false;
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
				globalobj.returnSuccess();
				globalobj.ViewTmList();
			}
		});
	}
}