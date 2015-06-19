<!-- Admin Add Page  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2014 -->
<link href="js/cmxform.css" rel="stylesheet" type="text/css"></link>
<style>
html {
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
	overflow-x: hidden;
}

body {
	overflow: visible;
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

td {
	padding: 5px;
}

tr:last-child {
	border-bottom: none;
	border: thin;
}

table {
	border-collapse: collapse;
}

table {
	padding-left: 80px;
	width: 100%;
}

.boldit {
	font-weight: bold;
}

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
	margin: 5px 0;
	-webkit-transition: all 0.2s ease-in-out;
	-ms-transition: all 0.2s ease-in-out;
	-moz-transition: all 0.2s ease-in-out;
	-o-transition: all 0.2s ease-in-out;
	transition: all 0.2s ease-in-out;
}

hr {
	height: 1px;
	/* Set the hr color */
	color: #1797c0; /* old IE */
	background-color: #bababa; /* Modern Browsers */
}

input {
	height: 20px;
	padding: 3px;
	border-color: #1797c0;
}

.buttonA:hover {
	background: #0083bf;
}

label {
	color: #ffffff;
	padding-left: 10px;
	font-weight: bold;
}

input[type=checkbox],input[type=radio] {
	vertical-align: middle;
	position: relative;
	bottom: 1px;
}

input[type=text],input[type=email] {
	border-color: #bababa;
}

.dynamic-div {
	max-height: 130px;
	overflow-y: auto;
}

form {
	padding: 25px 0px 0px 0px;
}
</style>

<div id="specialist_update_page">
	<fieldset>
		<legend>Admin Page</legend>
		<a href="javascript:void(0);" onclick="showPSMListPage()">show
			list</a> <a href="javascript:void(0);" onclick="AddAllActivities"
			class="buttonA">Add</a> <a href="javascript:void(0);"
			id="cancel_update_employee_top" class="buttonA">Cancel</a>

		<form name="update_emp_form" id="update_emp_form">
			<table width="100%">
			</table>

			<div id="admin_psm_div" style="background-color: #bababa">
				<label> <input type="checkbox" id="add_psm_chkbx" /> PSM
					Information
				</label>
			</div>
			<hr />
			<div id="add_psm_div">
				<table>
					<tr>
						<td>Employee ID</td>
						<td><input type="text" /></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>First Name</td>
						<td><input type="text" /></td>
						<td>Last Name</td>
						<td><input type="text" /></td>
					</tr>
					<tr>
						<td>Hired Date</td>
						<td><input type="text" id="admin_activity_hire_date" /></td>
						<td>Email Address</td>
						<td><input type="email" /></td>
					</tr>

				</table>
				<hr />
			</div>
			<div id="edit_psm_div" class="dynamic-div">
				<table>
					<tr>
						<td>Edit Employee ID</td>
						<td><input type="text" /></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>First Name</td>
						<td><input type="text" /></td>
						<td>Last Name</td>
						<td><input type="text" /></td>
					</tr>
					<tr>
						<td>Hired Date</td>
						<td><input type="text" id="edit_admin_activity_hire_date" /></td>
						<td>Email Address</td>
						<td><input type="email" /></td>
					</tr>
					
				</table>

			</div>
			<hr id="edit_psm_margin" />

			<div id="admin_center_div" style="background-color: #bababa">
				<label> <input type="checkbox" id="add_center_chkbx" />
					Center Information
				</label>
			</div>
			<hr />
			<div id="add_center_div">
				<table>
					<tr>
						<td>Center Name</td>
						<td><input type="text" /></td>
					</tr>
				</table>
				<hr />
			</div>

			<div id="admin_product_fam_div" style="background-color: #bababa">
				<label> <input type="checkbox" id="add_product_fam_chkbx" />
					Product Family Information
				</label>
			</div>
			<hr />
			<div id="add_product_fam_div">
				<table>
					<tr>
						<td>Product Family Name</td>
						<td><input type="text" /></td>
					</tr>
				</table>
				<hr />
			</div>



			<div id="admin_role_div" style="background-color: #bababa">
				<label> <input type="checkbox" id="add_role_chkbx" /> Role
					Information
				</label>
			</div>
			<hr />
			<div id="add_role_div">
				<table>
					<tr>
						<td>Role Name</td>
						<td><input type="text" /></td>
					</tr>
				</table>
				<hr />
			</div>

			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<a href="javascript:void(0);" onclick="AddAllActivities()"
				class="buttonA">Add</a> <a href="javascript:void(0);"
				id="cancel_update_employee" class="buttonA">Cancel</a>
		</form>
	</fieldset>

</div>
<script type="text/javascript" src="modules/com.admin.activity.page.js">
	
</script>
