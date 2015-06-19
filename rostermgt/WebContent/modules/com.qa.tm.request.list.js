/**
 * Coded By MarAngelo All rights reserved 2015 QA to TM requests list
 */
$(document).ready(function() {
	
});

function GetQmAcitvityList() {
	var data = "";
	data = data
			+ "<table id='test_qa_list' style='width: 70%;' class='display'><thead> <tr> <th style='color: black'>Number</a></th>";
	data = data + "<th style='color: black'>Employee Name</a></th>";
	data = data + "<th style='color: black'>Type</th> ";
	data = data + "<th style='color: black'>Status</th>";//request order
	data = data + "<th style='color: black'>Requested Target</th>";
	data = data + "<th style='color: black'>Quarter</th>";
	data = data + "<th style='color: black'>Year</th>";
	data = data + "<th style='color: black'>Tm Acitivty</th>";
	data = data + "<th style='color: black'>Approved</th>";
	data = data + "<th style='color: black'>Decline</th>";
	data = data + "</tr></thead><tbody>";
	$
			.ajax({
				type : "POST",
				url : "QaTmCtrl",
				data : "{\"signature\":\"getrequests\"" + ",\"quarter\":\""
						+ quarter + "\"" + ",\"tmId\":\"" + tmId + "\""
						+ ",\"optionView\":\"" + option + "\""
						+ ",\"qm_year\":\"" + year + "\"" + ",\"reqOrder\":\""
						+ reqOrder + "\"" + "}",
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
								+ resultsArray[i].tm_current_score + "</td>";

						data = data + " <td style='padding-left:10px;'>"
								+ resultsArray[i].quarter + "</td>";

						data = data + " <td style='padding-left:10px;'>"
								+ resultsArray[i].req_year + "</td>";

						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='"
								+ QmNoActivity(resultsArray[i].reason_qm)
								+ "' href='javascript:void(0);' onClick='alert(\""
								+ QmNoActivity(resultsArray[i].reason_qm)
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