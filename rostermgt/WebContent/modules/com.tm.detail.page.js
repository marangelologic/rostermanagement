$(document).ready(function() {
	globalobj.ShowLoadingPage();
	GetTmDetailInfoDetailPage(globalobj.GetTMId());
	globalobj.SetPrevHistory("view/vtmdp");
	$("#cancel_tm_detail").click(function() {
		// globalobj.GetPrevHistory("view/vtmdp");
		globalobj.ViewTmList();
	});
	$("#detail_tm_info_button").click(function() {
		globalobj.ShowUpdateTMPage(globalobj.GetTMId());
	});

	$("#cancel_tm_detail_top").click(function() {
		globalobj.ViewTmList();
	});
	$("#detail_tm_info_button_top").click(function() {
		globalobj.ShowUpdateTMPage(globalobj.GetTMId());
	});
});
function GetTmDetailInfoDetailPage(tm_id) {
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
				$("#tm_name_detail_page").text(resultsArray[0].tm_name);
				$("#tm_email_detail_page").text(resultsArray[0].tm_email);
			}
			getAllworkGroupListByTM(tm_id);

		},
		complete : function(e) {
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
					$("#member_tm_list_detail").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					var data = "";
					data = data
							+ "<thead><tr><th>Employee Name</b> </th> <th style='text-align: center'>Start Date for this Work Group </b> </th><th>End Date</th></tr></thead>";
					data = data + "<tbody>";
					for (var i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<tr><td><a href='javascript:void(0)' onclick='globalobj.redirectToEmpPage(\""
								+ resultsArray[i].emp_id
								+ "\")' class='member_list'>"
								+ resultsArray[i].emp_name
								+ "</a></td><td style='text-align: center'>"
								+ resultsArray[i].start_date + "</td><td></td></tr>";
					}
					

					$("#tm_member_detail_table").append(data + "</tbody>");

				},
				complete : function(e) {
					$("#tm_member_detail_table").dataTable({

						"lengthMenu" : [ [ 25, 50, 100, 200, -1 ],
								[ 25, 50, 100, 200, "All" ] ],
						"bDeferRender" : true,
						"sScrollX" : "100%",
						"bScrollCollapse" : false,
						"sScrollY" : "400px",
						"pagingType" : "full_numbers",
						"iDisplayLength" : -1
					});
				}
			});

}

function getAllworkGroupListByTM(tm_id) {
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
					$("#tbl_tm_wg_list").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					var data = "";
					data = data + "<thead><tr><th> Work Group </th> <th> Start Date </th><th>End Date</th></tr>";
					data = data + "</thead><tbody>";
					for (var i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<tr><td style='align:right;'><a href='javascript:void(0)' onclick='globalobj.UpdateWgInfo(\""
								+ resultsArray[i].wg_name 
								+ "\")' class='member_list edit'>"
								+ resultsArray[i].wg_name + "</a></td><td>"
								+ ReturnCurrent(resultsArray[i].start_date)
								+ "</td>";
						data = data + "<td>"
								+ ReturnCurrent(resultsArray[i].end_date)
								+ "</td>";
						data = data + "</tr>";
					}
					

					$("#workgroup_list_tm_table").append(data + "</tbody>");
				},
				complete : function(e) {
					$("#workgroup_list_tm_table").dataTable({

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
					//$("a").css("pointer-events","");
				}
			});

}
function ReturnCurrent(param) {
	var endDateVal = param;
	if (param == null || param == undefined || param == "undefined"
			|| param == "undefiend") {
		endDateVal = "Current";
	}
	return endDateVal;
}
