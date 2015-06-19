<!-- Specialist Detail View  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2014 -->
<link href="js/cmxform.css" rel="stylesheet" type="text/css"></link>
<style>
html {
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
}

body {
	overflow-y: visible;
}

label {
	font-weight: 600;
}

select {
	width: 181px;
	height: 26px;
	border-color: #1797c0;
}

fieldset {
	background-color: #f2f2f3;
	padding: 1em;
	width: 100%;
	height: 100%;
	border-color: #1797c0;
	border: thin;
}

legend {
	font-weight: bold;
}

tr:last-child {
	border-bottom: none;
	border: thin;
}

td:last-child {
	width: inherit;
}

#wg_detail_page {
	overflow-y: visible;
}

.lineH {
	border: thin;
}

table {
	width: 100%;
	border-collapse: collapse;
}

.boldit {
	font-weight: bold;
}

.buttonA {
	text-align: center;
	text-decoration: none;
	font-family: Tahoma, Arial, sans-serif;
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

hr {
	height: 1px;
	/* Set the hr color */
	color: #999999; /* old IE */
	background-color: #999999; /* Modern Browsers */
}

input {
	height: 20px;
	padding: 3px;
	border-color: #1797c0;
}

.buttonA:hover {
	background: #0083bf;
}

.new {
	font-style: italic;
}

.member_list:hover {
	color: #1797c0;
}

table {
	border-collapse: collapse;
}

table {
	width: 100%;
}

</style>

<div id="specialist_detail_page">
	<fieldset>
		<legend>Organizational Information</legend>

		<a href="javascript:void(0);" onclick="detailSpecialistInfo()"
			class="buttonA edit">Edit</a> <a href="javascript:void(0);"
			id="cancel_detail_employee_top" class="buttonA">Cancel</a>

		<table width="100%" class="header">
			<tr>
				<td width="10%">Employee Number:</td>
				<td><label id="emp_id_detail_page" name="emp_id_detail_page"></label></td>

				<td>Employee Name:</td>
				<td><label id="emp_name_detail_page"
					name="emp_name_detail_page"></label></td>
			</tr>
			<tr>
				<td>Email Address:</td>
				<td><label id="emp_email_detail_page"
					name="emp_email_detail_page"></label></td>

				<td>Role:</td>
				<td><label id="emp_role_detail_page"
					name="emp_role_detail_page"></label></td>
			</tr>
			<tr>
				<td>Product Family:</td>
				<td><label id="emp_prod_family_detail_page"
					name="emp_prod_family_detail_page"></label></td>

				<td>Location:</td>
				<td><label id="emp_location_detail_page"
					name="emp_location_detail_page"></label></td>
			</tr>
			<tr>
				<td>Center:</td>
				<td><label id="emp_center_detail_page"
					name="emp_center_detail_page"></label></td>
				<td></td>
				<td></td>
			</tr>

			<tr>
				<td>Hired Date :</td>
				<td><label id="emp_hire_detail_page"
					name="emp_hire_detail_page"></label></td>

				<td>Resigned Date :</td>
				<td><label id="emp_resigned_detail_page"
					name="emp_resigned_detail_page"></label></td>
			</tr>
			<tr>
				<td>Employee Status</td>
				<td><label id="emp_is_training_detail_field"
					name="emp_is_training_field"></label></td>
				<td>Taleo Number:</td>
				<td><label id="emp_taleo_no_detail_field"></label></td>
			</tr>
			<tr id="training_dates_detail_row">
				<td><label id="emp_start_detail_field"></label></td>
				<td><label id="emp_start_training_detail_page"
					name="emp_start_training_detail_page"></label></td>

				<td><label id="emp_end_detail_field"></label></td>
				<td><label id="emp_end_training_detail_page"
					name="emp_end_training_detail_page"></label></td>
			</tr>
		</table>
		<br />
		<legend> Team information </legend>
		<hr />
		<table>
			<tr>
				<td>Team Manager:</td>
				<td><label id="emp_curre_tm_detail_page"
					name="emp_curre_tm_detail_page"></label></td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td><label for="emp_start_date_detail">Start Date :</label></td>
				<td><label name="emp_start_date_detail"
					id="emp_start_date_detail"></label></td>

				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
		</table>
		<br />
		<legend>Work Group Information </legend>
		<hr />
		<p></p>
		<table>
			<tr>
				<td>Wokgroup:</td>
				<td><label id="emp_curr_wg_detail_page"
					name="emp_curr_wg_detail_page"></label></td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>

			</tr>
			<tr>
				<td>Start Date:</td>
				<td><label id="emp_curr_wg_detail_date"
					name="emp_curr_wg_detail_date"></label></td>

				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
		</table>
		<p>&nbsp;</p>

		<legend>Historical Data</legend>

		<table width="100%" id="historical_detail_table" frame="box">

		</table>
		<p>&nbsp;</p>
		<table id="historical_detail_wg_table" style="width: 100%"
			frame="border">

		</table>

		<p>&nbsp;</p>
		<a href="javascript:void(0);" onclick="detailSpecialistInfo()"
			class="buttonA">Edit</a> <a href="javascript:void(0);"
			id="cancel_detail_employee" class="buttonA">Cancel</a>
	</fieldset>
</div>
<!-- <script type="text/javascript" src="js/require.js"></script> -->
<script type="text/javascript" src="modules/com.emp.detail.page.js">
	
</script>
