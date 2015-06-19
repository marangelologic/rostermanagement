<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script type="text/javascript" src="js/jquery-1.11.1.js"></script>
<script type="text/javascript" src="js/DataTables-1.10.2/media/js/jquery.js"></script>
<script type="text/javascript" src="js/DataTables-1.10.2/media/js/jquery.dataTables.js"></script>
<script type="text/javascript" src="js/blockui/blockui.js"></script>
<script type="text/javascript" src="modules/com.global.obj.js"></script>
<link href="js/DataTables-1.10.2/media/css/jquery.dataTables.css" type="text/css" rel="stylesheet">

<script type="text/javascript">
var globalobj = new GlobalObjects();
$(document).ready(function(){ 
	$(".edit_tab").hover(function() {  
        $("#property-hover").html("<p>Put some loading text here while the ajax call loads</p>");
	});
	MakeEmployeesPerTmList();
});
function MakeEmployeesPerTmList() {   
	$
			.blockUI({
				message : '<span><img src="img/loading-45x45.gif" >&nbsp; <label style="padding-bottom:80px; vertical-align:text-top; color:#cccccc; font-family: Tahoma, Arial, sans-serif;"> THOMSON REUTERS ROSTER MANAGEMENT </label></span>'
			});
	var data = "";
	var i = 0;
	alert("mar");
	data = data + "<thead> <tr> <th><a href='#'> Employee Number</a> </th> ";
	data = data + " <th>Employee Name</a></th> ";
	data = data + " <th><a href=''>Active </a></th> ";
	data = data + " <th></th> ";
	data = data + " <th></th> </tr></thead> ";
	data = data + "<tfoot> <tr> <th><a href=''> Employee Number</a> </th> ";
	data = data + " <th><a href=''>Employee Name</a></th> ";
	data = data + " <th><a href=''>Active </a></th> ";
	data = data + " <th></th> ";
	data = data + " <th></th> </tr></tfoot><tbody>";
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
								+ " <tr> <td style='padding-left:20px; width: 130px; align: center;''>"
								+ resultsArray[i].emp_id + " </td>";
						data = data + " <td style='padding-left:10px;'>  "
								+ resultsArray[i].emp_name + " </td>";
						data = data
								+ " <td align='center'>"
								+ globalobj
										.ReturnYesNo(resultsArray[i].emp_is_active)
								+ " </td>";
						data = data
								+ " <td class="edit_tab" style='padding-left:10px; width: 50px; align: center;'><a href='javascript:void(0);' onClick='UpdateEmployeeInfo(\""
								+ resultsArray[i].emp_id + "\")'>"
								+ "<img src='img/Users-Edit-User-icon.png' />"
								+ " </a></td>";
						data = data
								+ " <td style='padding-left:10px; width: 50px; align: center;'><a href='javascript:void(0);' onClick='UpdateEmployeeInfo(\""
								+ resultsArray[i].emp_id + "\")'>"
								+ "<img src='img/user2-delete-icon.png' />"
								+ " </td> </tr>";
					}
					$("#employee_per_tm_table_view").append(data + " </tbody>");

				},
				complete : function(e) {
					$("#employee_per_tm_table_view").dataTable({"lengthMenu": [[10, 25, 50, 200], [10, 25, 50, 200]]});
					$.unblockUI();

				}
			});
}
</script>
<title>home roster</title>
</head>
<body>
	<table id="employee_per_tm_table_view" class="display">
	</table>
</body>
</html>