<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Evalutors</title>
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

<style>
html {
	overflow-x: visible;
	overflow-y: visible;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		$("#qm_eval_table").dataTable();
	});
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
	<table id="qm_eval_table" class="display" width="100%">
		<thead>
			<tr>
				<th style="color: black;">samples</th>
				<th style="color: black;">sample</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>mar</td>
				<td>angelo</td>
			</tr>
		</tbody>
	</table>
</body>
</html>