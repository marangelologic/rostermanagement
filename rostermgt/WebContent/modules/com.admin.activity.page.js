$(document)
		.ready(
				function() {

					$("#add_psm_div").hide();
					$("#add_center_div").hide();

					$("#add_product_fam_div").hide();
					$("#add_role_div").hide();
					$("#edit_psm_div").hide();

					$("#add_psm_chkbx").click(function() {
						$("#add_psm_div").slideToggle("slow");
					});

					$("#add_center_chkbx").click(function() {
						$("#add_center_div").slideToggle("slow");
					});

					$("#add_product_fam_chkbx").click(function() {
						$("#add_product_fam_div").slideToggle("slow");
					});

					$("#add_role_chkbx").click(function() {
						$("#add_role_div").slideToggle("slow");
					});
					$("#admin_activity_hire_date")
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

					$("#admin_activity_hire_date").click(function() {
						$(this).datepicker().datepicker("show");
					});

				});

function showPSMListPage() {
	$("#edit_psm_div").slideToggle("slow");
}

function GetPSMList() {
	globalobj.ShowLoadingPage();
	var data = "";
	var i = 0;
	
	data = data + "<thead> <tr> <th style='color: black'> Employee Number</th> ";
	data = data + " <th style='color: black'>PSM Name</th> ";
	data = data + " <th style='color: black'>Active</th> ";
	data = data + " <th style='color: black'>Update</th> ";
	data = data + " <th style='color: black'>Delete </th> </tr></thead><tbody>";
	$
			.ajax({
				type : "POST",
				url : "qmcontroller",
				data : "{\"signature\":" + "getpsmlist" + "," +
				"\"psmempId\":" + "" + "," +
				"\"psmFname\":" + "" + "," +
				"\"psmLName\":" + "" + "," +
				"\"psmHiredDate\":" + "" + "," +
				"\"psmEmail\":" + "" + "," +
				"\"centerName\":" + "" + "," +
				"\"prodFamName\":" + "" +
				"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					$("#employee_per_tm_table_view").html("");
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					for (i = 0; i < resultsArray.length; i++) {
						data = data
								+ " <tr> <td style='padding-left:20px; width: 130px; align: center;''>"
								+ resultsArray[i].psm_employee_number + " </td>";
						data = data + " <td style='padding-left:10px;'><a href='javascript:void(0);' onClick='globalobj.ViewSpecialistDetail(\"" + (resultsArray[i].psm_employee_number) + "\")'>"
								+ resultsArray[i].psm_name + "</a></td>";
						data = data + " <td align='center'>"
								+ globalobj.ReturnYesNo(resultsArray[i].emp_is_active) + " </td>";
						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Update Employee Info?' href='javascript:void(0);' onClick='UpdateEmployeeInfo(\""
								+ resultsArray[i].psm_employee_number + "\")'>"
								+ "<img src='img/Users-Edit-User-icon.png' />"
								+ " </a></td>";
						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a title='Resigned Employee?' href='javascript:void(0);' onClick='DeleteEmployee(\""
								+ resultsArray[i].psm_employee_number + "\")'>"
								+ "<img src='img/user2-delete-icon.png' />"
								+ " </td> </tr>";
					}
					$("#employee_per_tm_table_view").append(data + " </tbody>");

				},
				complete : function(e) {
					$("#employee_per_tm_table_view").dataTable(	
							{
								
								"lengthMenu" : [ [ 25, 50,100, 200 ],
										[ 25, 50,100, 200 ] ],
								"bDeferRender" : true,
								"sScrollX": "100%",
							    "bScrollCollapse": false,
							    "sScrollY": "400px",
							    "pagingType": "full_numbers"
							});
					$("#add_employee").show();
					$.unblockUI();
				}
			});
}