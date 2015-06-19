$(document).ready(function() {
	globalobj.myStopFunction();
	$("#add_wg").hide();
	GetWorkGroupList();
	globalobj.SetPrevHistory("view/vwgl");
	$("#add_wg").click(function() {
		AddWg();
	});
	globalobj.SecurePages();
	globalobj.AddAuditTrail(globalobj.userId,globalobj.username,"vwgl",globalobj.dateToday,"view");
});

function GetWorkGroupList() {
	globalobj.ShowLoadingPage();
	var data = "";
	var i = 0;

	data = data + "<thead> <tr> <th style='color: black'>Number </th> ";
	data = data + " <th style='color: black'> Work Group Name</th> ";
	data = data + " <th style='color: black'> Update </th> ";
	data = data + " <th style='color: black'> Delete </th></tr></thead><tbody>";
	$
			.ajax({
				type : "POST",
				url : "wgbl",
				data : "{\"wg_names\": \"\", \"identity\":\"" + localStorage.getItem("0b8b667e7722bc7e363b601ce584259d")
						+ "\",\"role\":\"" + localStorage.getItem("29a7e96467b69a9f5a93332e29e9b0de")
						+ "\",\"signature\":\"" + "getllwg"
						+ "\"}",
				contentType : "application/x-www-form-urlencoded",   
				dataType : "json",  
				success : function(response) {
					$("#work_group_list_view").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (i = 0; i < resultsArray.length; i++) {
						data = data + " <tr> <td style='padding-left:20px;'>"
								+ parseInt(parseInt(1) + parseInt(i))
								+ " </td>";
						data = data
								+ " <td style='padding-left:10px;'><a href='javascript:void(0)' onclick='globalobj.ViewWGDetail(\""
								+ resultsArray[i].wg_name + "\")'>"
								+ resultsArray[i].wg_name + "</a></td>";
						data = data  
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Update Work Group Info?'  href='javascript:void(0);' class='edit' onClick='UpdateWgInfo(\""
								+ resultsArray[i].wg_name + "\")'>"
								+ "<img src='img/Users-Edit-User-icon.png' />"
								+ " </a></td>";    
						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a class='delete' title='Delete Employee Info?' href='javascript:void(0);' onClick='DeleteWg(\""
								+ resultsArray[i].wg_serial_id + "\",\""
								+ resultsArray[i].wg_name + "\")'>"
								+ "<img src='img/user2-delete-icon.png' />"  
								+ " </td> </tr>";
					}
					$("#work_group_list_view").append(data + " </tbody>");
				},
				complete : function(e) {
					$("#work_group_list_view").dataTable(
							{
								"lengthMenu" : [ [-1, 25, 50, 100, 200 ],
										[ "All",25, 50, 100, 200 ] ],
								"bDeferRender" : true,
								"scrollX" : false,
								"bScrollCollapse" : false,
								"sScrollY" : "400px",
								"pagingType" : "full_numbers"

							});
					$("#add_wg").show();
					globalobj.SecurePages();
					$.unblockUI();

				}
			});
}

function UpdateWgInfo(id) {
	jQuery("#content").load("view/uwgp");
	globalobj.SetWGId(id);
	return false;
}
function AddWg() {
	globalobj.ViewAddWgPage();
}

function DeleteWg(wgId, wgName) {
	var answer = confirm("Sure You want to delete the workgroup?");
	if (answer == true) {
		// globalobj.ShowLoadingPage();
		$.ajax({
			type : "POST",
			url : "ProdFamily",
			data : "{\"wgPSM\":\"" + "\",signature:\"" + "deletewg"
					+ "\",prodFamName:\"" + "" + "\",prodFamId:\"" + ""
					+ "\",prodFamDesc:\"" + "" + "\",langCenterId:\"" + ""
					+ "\",langCenterName:\"" + "" + "\",langCenterDesc:\"" + ""
					+ "\",wgName:\"" + wgName + "\",wgId:\"" + wgId
					+ "\",wgTargetHC:\"" + "" + "\",wgWfHC:\"" + "" + "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				
				
			},
			complete : function(e) {
				// jQuery("#content").load("view/vwgl");
			}
		});
	}
}