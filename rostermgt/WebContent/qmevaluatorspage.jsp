<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Evalutors @ Roster Management tool</title>
<link rel="stylesheet" type="text/css"
	href="//cdnjs.cloudflare.com/ajax/libs/foundation/5.4.7/css/foundation.min.css">
<link rel="stylesheet" type="text/css" href="dataTables.foundation.css">
<link rel="shortcut icon" type="image/x-icon"
	href="img/Gnome-Stock-Person-64.ico">
<link href="js/index.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-1.11.1.js"></script>
<script type="text/javascript"
	src="js/jquery-validation-1.13.1/dist/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="js/blockui/blockui.js"></script>
<script type="text/javascript"
	src="js/DataTables-1.10.2/media/js/jquery.dataTables.js"></script>

<script type="text/javascript"
	src="js/DataTables-1.10.2/media/js/jquery.dataTables.js"></script>
<link href="js/DataTables-1.10.2/media/css/jquery.dataTables.css"
	type="text/css" rel="stylesheet" />
<script type="text/javascript" src="js/blockui/blockui.js"></script>

<style>
html {
	overflow-x: visible;
	overflow-y: visible;
}
body {
	overflow-y: visible;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		//$.blockUI({ message : '<span><img src="img/loading-45x45.gif">&nbsp; <label style="padding-left:45px; vertical-align:text-top;color:#cccccc; font-family: Tahoma, Arial, sans-serif; font-size: x-small"> THOMSON REUTERS ROSTER MANAGEMENT </label></span>' });
		GetQualityEvaluatorsTarget(getUrlParameter("qmreq"));
	});
	function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
				return sParameterName[1];
			}
		}
	}

	function GetQualityEvaluatorsTarget(qmreq) {
		$
				.blockUI({
					message : '<span><img src="img/loading-45x45.gif">&nbsp; <label style="padding-left:45px; vertical-align:text-top;color:#cccccc; font-family: Tahoma, Arial, sans-serif; font-size: x-small"> THOMSON REUTERS ROSTER MANAGEMENT </label></span>'
				});
		var data = "<thead><tr><th>Evaluator</th><th>Target</th><th>Delete</th></tr></thead><tbody>";
		var i = 0;
		$.ajax({
			type : "POST",
			url : "QaTmCtrl",
			data : "{\"signature\":\"gettmtargetevalmapping\",\"qmreq\":\""
					+ qmreq + "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				$("#qm_eval_table").html("");
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;

				for (i = 0; i < resultsArray.length; i++) {
					data = data + "<tr id='eval_map_row_"+ resultsArray[i].qm_eval_serial_id + "'><td>" + resultsArray[i].evaluator_name
							+ "</td>";
					data = data + "<td><select onChange='UpdateTarget(\""
							+ resultsArray[i].qm_eval_serial_id
							+ "\")' id='target_qa_eval_"
							+ resultsArray[i].qm_eval_serial_id + "'>"
							+ AppendTargetScores(resultsArray[i].qm_target)
							+ "</select>" + "</td>";
					data = data + "<td><a href='javascript:void(0)' onClick='DeleteTarget(\"" + resultsArray[i].qm_eval_serial_id + "\")'><img src='img/trash24x24.png' /></a></td></tr>";
				}

				$("#qm_eval_table").append(data + "</tbody>");

			},
			complete : function(e) {
				$.unblockUI();
				
				$("#qm_eval_table").dataTable({
					columns : [ {
						"width" : "40%"
					}, {
						"width" : "40%"
					}, {
						"width" : "20%"
					} ]
				});

			}
		});
	}

	function DeleteTarget(id) {
		$
				.blockUI({
					message : '<span><img src="img/loading-45x45.gif">&nbsp; <label style="padding-left:45px; vertical-align:text-top;color:#cccccc; font-family: Tahoma, Arial, sans-serif; font-size: x-small"> THOMSON REUTERS ROSTER MANAGEMENT </label></span>'
				});
		$
				.ajax({
					type : "POST",
					url : "QaTmCtrl",
					data : "{\"signature\":\"deleteevaluatortarget\",\"qmserialreq\":\""
							+ id + "\"}",
					contentType : "application/x-www-form-urlencoded",
					dataType : "json",
					success : function(response) {
						$("#eval_map_row_" + id).remove();
						$.unblockUI();
					}
				});
	}

	function UpdateTarget(id) {
		$
				.blockUI({
					message : '<span><img src="img/loading-45x45.gif">&nbsp; <label style="padding-left:45px; vertical-align:text-top;color:#cccccc; font-family: Tahoma, Arial, sans-serif; font-size: x-small"> THOMSON REUTERS ROSTER MANAGEMENT </label></span>'
				});
		$.ajax({
			type : "POST",
			url : "QaTmCtrl",
			data : "{\"signature\":\"updateevaluatortarget\",\"currScore\":\""
					+ $("#target_qa_eval_" + id).val()
					+ "\",\"qmserialreq\":\"" + id + "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				$.unblockUI();
			}
		});
	}  

	function AppendTargetScores(currentTarget) {
		$
				.blockUI({
					message : '<span><img src="img/loading-45x45.gif">&nbsp; <label style="padding-left:45px; vertical-align:text-top;color:#cccccc; font-family: Tahoma, Arial, sans-serif; font-size: x-small"> THOMSON REUTERS ROSTER MANAGEMENT </label></span>'
				});
		var data = "";
		for (var i = 0; i <= 12; i++) {
			if (i != currentTarget) {
				data = data + "<option value='" + i +"'>";
				data = data + i + "</option>";
			} else {
				data = data + "<option value='" + i +"' selected='selected'>";
				data = data + i + "</option>";
			}
		}
		return data;
	}
</script>
<style>
.buttonA {
	text-align: center;
	text-decoration: none;
	font-family: Tahoma, Arial, sans-serif; */
	-webkit-font-smoothing: antialiased;
	font-style: normal;
	font-size: 12px;
	color: #FFF;
	background: #0083bf;
	padding: 5px 15px;
	display: inline-block;
	white-space: nowrap;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	margin: 5px 0; */
	-webkit-transition: all 0.2s ease-in-out;
	-ms-transition: all 0.2s ease-in-out;
	-moz-transition: all 0.2s ease-in-out;
	-o-transition: all 0.2s ease-in-out;
	transition: all 0.2s ease-in-out;
}

.buttonA:hover {
	background: #0083bf;
}
</style>

</head>
<body>
	<table id="qm_eval_table"></table>
</body>
</html>