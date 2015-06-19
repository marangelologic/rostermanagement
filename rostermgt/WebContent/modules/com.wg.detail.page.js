$(document).ready(function() {
	
	GetWgDetail(globalobj.GetWGId());
	globalobj.SetPrevHistory("view/vwgd");
	$("#cancel_wg_detail").click(function() {
		globalobj.ViewWgList();
	});
	$("#detail_wg_info_button").click(function() {
		globalobj.UpdateWgInfo(globalobj.GetWGId());
	});

	$("#cancel_wg_detail_low").click(function() {
		globalobj.ViewWgList();
	});
	$("#detail_wg_info_button").click(function() {
		globalobj.UpdateWgInfo(globalobj.GetWGId());
	});
});
function GetWgMembersDetail(wgName) {
	$
			.ajax({
				type : "POST",
				url : "gwgm",
				data : "{\"wg_names\":\"" + wgName + "\",\"role\":\"" + localStorage.getItem("29a7e96467b69a9f5a93332e29e9b0de") + "\"" +
						",\"tm_id\":" + "\"" + localStorage.getItem("0b8b667e7722bc7e363b601ce584259d")+ "\"" +
						"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {      
					$("#wg_detail_member_wg_list").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					var data = "";
					data = data
							+ "<thead><tr><th> <b> Employee Name</b> </th> <th><b>Start Date </b> </th><th><b>End Date</b></th></tr></thead><tbody>";
					for (var i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<tr><td><a href='javascript:void(0)' onclick='globalobj.redirectToEmpPage(\""
								+ resultsArray[i].emp_id
								+ "\")'>"
								+ resultsArray[i].emp_name + "</a></td><td>"
								+ resultsArray[i].start_date + "</td><td>&nbsp;</td></tr>";
					}

					$("#wg_detail_member_wg_list").append(data + "</tbody>");

				},
				complete : function(e) {
					$("#wg_detail_member_wg_list").dataTable({

						"lengthMenu" : [ [ 25, 50, 100, 200, -1 ],
								[ 25, 50, 100, 200, "All" ] ],
						"bDeferRender" : true,
						"sScrollX" : "100%",
						"bScrollCollapse" : false,
						"sScrollY" : "400px",
						"pagingType" : "full_numbers",
						"iDisplayLength" : -1
					});
					GetCurrentHeadCount(wgName);
					GetTargetHeadCount(wgName);
					// $("#wg_id_update_page").attr("disabled","disabled");
				}
			});

}

function GetWgDetail(wgName) {
	var i = 0;
	globalobj.ShowLoadingPage();
	$
			.ajax({
				type : "POST",
				url : "gwgi",
				data : "{\"wg_names\":\"" + wgName + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (i = 0; i < resultsArray.length; i++) {
						$("#wg_id_detail_page").text(
								resultsArray[0].wg_serial_id);
						$("#wg_name_detail_page").text(resultsArray[0].wg_name);
						$("#wg_detail_product_family").text(
								resultsArray[0].wg_prod_family);
						$("#wg_detail_center").text(
								resultsArray[0].wg_language_center);
					}

				},
				complete : function(e) {
					GetWgMembersDetail(wgName);
					GetDetailTmWgList(wgName);
					getInactiveTmWgMapping(wgName);

				}
			});
}

function GetCurrentHeadCount(wgName) {
	globalobj.ShowLoadingPage();
	var heads = 0;
	$.ajax({
		type : "POST",
		url : "gwghc",
		data : "{\"wg_names\":\"" + wgName + "\",\"perWG\":\"yes\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			for (var i = 0; i < resultsArray.length; i++) {
				heads = resultsArray[0].current_head_count;
			}
		},
		complete : function(e) {
			$("#wg_chc_detail_page").text(heads);
			$.unblockUI();
		}
	});
}

function GetTargetHeadCount(wgName) {
	$.ajax({
		type : "POST",
		url : "gwgthd",
		data : "{\"wg_names\":\"" + wgName + "\",\"perWG\":\"yes\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			var data = "";
			for (var i = 0; i < resultsArray.length; i++) {
				$("#wg_thc_detail_page").text(
						ReturnCurrentCount(resultsArray[0].target_head_count));
			}
		},
		complete : function(e) {
			// GetTmWgList(wgName);
		}
	});
}
function GetDetailTmWgList(wgName) {
	$
			.ajax({
				type : "POST",
				url : "gwgtmlist",
				data : "{\"wg_names\":\"" + wgName + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					$("#wg_detail_tm_wg_list").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					var data = "";
					data = data
							+ "<thead><tr class='trstyle'><th><b> Manager Name</b> </th> <th><b> Start Date </b></th><th><b>End Date</b></th></tr></thead><tbody>";
					
					for (var i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<tr><td style='align:right;'><a href='javascript:void(0)' onclick='globalobj.ShowUpdateTMPage(\""
								+ resultsArray[i].tm_employee_id
								+ "\")' class='member_list edit'>"
								+ resultsArray[i].tm_name + "</a></td><td>"
								+ ReturnCurrent(resultsArray[i].start_date)
								+ "</td>";
						data = data + "<td>"
								+ ReturnCurrent(resultsArray[i].end_date)
								+ "</td>";
						data = data + "</tr>";
					}

					$("#wg_detail_tm_wg_list").append(data + "</tbody>");
				},
				complete : function(e) {
					$("#wg_detail_tm_wg_list").dataTable({

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

function ReturnCurrent(param) {
	var endDateVal = param;
	if (param == null || param == undefined || param == "undefined"
			|| param == "") {
		endDateVal = "Current";
	}
	return endDateVal;
}
function ReturnCurrentCount(param) {

	var endDateVal = param;

	if (param == null || param == undefined || param == "undefined"
			|| param == "") {
		endDateVal = "0";
	}
	return endDateVal;
}

function getInactiveTmWgMapping(wgName) {
	globalobj.ShowLoadingPage();

	var data = "";
	$
			.ajax({
				type : "POST",
				url : "ProdFamily",
				data : "{\"wgPSM\":\"" + "" + "\",signature:\""
						+ "getallhistoricalwgtm" + "\",prodFamName:\"" + ""
						+ "\",prodFamId:\"" + "" + "\",prodFamDesc:\"" + ""
						+ "\",langCenterId:\"" + "" + "\",langCenterName:\""
						+ "" + "\",langCenterDesc:\"" + "" + "\",wgName:\""
						+ wgName + "\",wgId:\"" + "" + "\",wgTargetHC:\"" + ""
						+ "\",wgWfHC:\"" + "" + "\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					$("#wg_detail_member_tm_former_list").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					var data = "<table width='60%'  style='table-layout: fixed;' class='tbl_mem_list'>";
					data = data
							+ "<tr class='trstyle'><td><b> Manager Name</b> </td> <td><b> Start Date </b></td><td><b>End Date</b></td></tr>";
					data = data
							+ "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";

					for (var i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<tr><td style='align:right;'><a href='javascript:void(0)' onclick='globalobj.ShowUpdateTMPage(\""
								+ resultsArray[i].tm_employee_id
								+ "\")' class='member_list'>"
								+ resultsArray[i].tm_name + "</a></td><td>"
								+ ReturnCurrent(resultsArray[i].start_date)
								+ "</td>";
						data = data + "<td>"
								+ ReturnCurrent(resultsArray[i].end_date)
								+ "</td>";
						data = data + "</tr>";
					}
					if (resultsArray.length == 0) {
						data = "";
					}
					$("#wg_detail_member_tm_former_list").append(
							data + "</table>");
					$("#wg_detail_member_tm_former_list").attr("width", "60%");
				},
				complete : function(e) {
					globalobj.SecurePages();
				}
			});
}
