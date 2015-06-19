$(document).ready(function() {
	GetEvaluatorsList();
	$("#add_evaluator_button").hide();
	$("#add_evaluator_button").click(function() {
		SHowAddPage();
	});
});

function GetEvaluatorsList() {
	$("#evaluators_list_home_view").html("");
	var data = "";
	var i = 0;
	data = data
			+ "<table id='test_tables' class='display'><thead> <tr> <th style='color: black'>Employee Number</a></th>";
	data = data + "<th style='color: black'>Evaluator Name</a></th>";
	data = data + "<th style='color: black'>Update</th> ";
	data = data + "<th style='color: black'>Delete</th>";
	data = data + "</tr></thead><tbody>";
	globalobj.ShowLoadingPage();
	$
			.ajax({
				type : "POST",
				url : "evalcntrl",
				data : "{\"signature\":\"getallevaluators\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (i = 0; i < resultsArray.length; i++) {
						data = data + " <tr> <td style='text-align:center'>"
								+ resultsArray[i].evaluator_em_id + " </td>";
						data = data
								+ " <td style='padding-left:10px;'><a href='javascript:void(0)'>"
								+ resultsArray[i].evaluator_name + "</a></td>";
						data = data
								+ " <td style='padding-left:10px; text-align: center;'><a title='Update Employee Info?'  href='javascript:void(0);' class='edit' onClick='ShowEvaluatorUpdatePage(\""
								+ resultsArray[i].evaluator_em_id + "\")'>"
								+ "<img src='img/Users-Edit-User-icon.png' />"
								+ " </a></td>";
						data = data
								+ " <td style='padding-left:10px; text-align: center;'><a class='delete' title='Delete Employee Info?' href='javascript:void(0);' onClick='DeleteEvaluator(\""
								+ resultsArray[i].evaluator_em_id + "\")'>"
								+ "<img src='img/user2-delete-icon.png' />"
								+ " </td> </tr>";
					}
					$("#evaluators_list_home_view").append(
							data + " </tbody></table>");
				},
				complete : function(e) {
					$("#test_tables").dataTable(
							{
								"lengthMenu" : [ [ -1, 25, 50, 100, 200 ],
										[ "All", 25, 50, 100, 200 ] ],
								"bDeferRender" : true,
								"scrollX" : false,
								"bScrollCollapse" : false,
								"sScrollY" : "400px",
								"pagingType" : "full_numbers",
								"iDisplayLength": -1,
			                    "bAutoWidth": false,
			                    "sScrollX": "100%",
			                    "aaSorting": []

							});
					$("#add_evaluator_button").show();
					$.unblockUI();

				}
			});
}

function ShowEvaluatorUpdatePage(empId) {
	globalobj.ShowLoadingPage();
	globalobj.SetEvaluatorId(empId);
	$("#content").load("view/ueip");

}

function SHowAddPage() {
	globalobj.ShowLoadingPage();
	$("#content").load("view/aevp");
	globalobj.ShowLoadingPage();
}

function DeleteEvaluator(empId){
	globalobj.ShowLoadingPage();
	$
	.ajax({
		type : "POST",
		url : "evalcntrl",
		data : "{\"signature\":\"deactivateval\",\"evalId\":\"" + empId + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			
		},
		complete : function(e) {
			globalobj.returnSuccess();
			GetEvaluatorsList();
		}
	});
}


