<!-- Specialist add View  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2014 -->
<!-- <link href="js/cmxform.css" rel="stylesheet" type="text/css"></link> -->
<style>
html {
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
	overflow: visible;
}

body {
	overflow: visible;
}

.ui-datepicker-trigger {
	position: relative;
	top: 0px;
	right: 0px;
}
/* select {
	width: 181px;
	height: 26px;
	border-color: #1797c0;
} */
fieldset {
	padding-top: "10px";
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
/* 
.trstyle td {
	border-bottom: solid 1px rgba(168,168,168, 0.2);
	/* border-bottom-width: 1px; 
}

tr:last-child {
	border-bottom: none;
	border: thin;
} */
table {
	border-collapse: collapse;
	padding-left: 80px;
	width: 100%;
	table-layout: auto;
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
	margin: 5px 0; */
	-webkit-transition: all 0.2s ease-in-out;
	-ms-transition: all 0.2s ease-in-out;
	-moz-transition: all 0.2s ease-in-out;
	-o-transition: all 0.2s ease-in-out;
	transition: all 0.2s ease-in-out;
	*/
}

hr {
	height: 1px;
	/* Set the hr color */
	color: #999999; /* old IE */
	background-color: #999999; /* Modern Browsers */
}

#tm_tbl {
	border-collapse: collapse;
}

#tbl_curr_tm {
	border-collapse: collapse;
}

.buttonA:hover {
	background: #0083bf;
}

.new {
	font-style: italic;
}

input[type="text"],input[type="email"] {
	padding: 3px;
	border-color: #1797c0;
	width: 181px;
}

select[multiple] {
	height: auto;
}

select {
	width: 181px;
	border-color: #1797c0;
}

.buttonA:hover {
	background: #0083bf;
}

img {
	vertical-align: middle;
}

.new {
	font-style: italic;
}
</style>

<div id="specialist_add_page">
	<fieldset>
		<legend>Organizational Information</legend>
		<div id="appendError"></div>
		<a href="javascript:void(0);" class="buttonA" id="add_employee_top">Add</a>
		<a href="javascript:void(0);" id="cancel_add_employee_top"
			class="buttonA">Cancel</a>
		<form name="add_emp_form" id="add_emp_form">
			<table>
				<tr>
					<td>Employee Number:</td>
					<td><input type="text" id="emp_id_add_page"
						name="emp_id_add_page" placeholder="7 DIGIT EMPLOYEE ID" /></td>

					<td>First Name:</td>
					<td><input type="text" id="emp_name_add_page"
						name="emp_name_add_page" placeholder="First Name" /></td>
					<td>Last Name:</td>
					<td><input type="text" id="emp_last_name_add_page"
						name="emp_name_add_page" placeholder="Last Name" /></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>

				</tr>
				<tr>
					<td title="Position of the individual employee.">Position/Title:</td>
					<td><select id="emp_role_add_page" name="emp_role_add_page"></select></td>
					<td>Product Family:</td>
					<td><select id="emp_prod_family_add_page"
						name="emp_prod_family_add_page"></select></td>

					<td>Location:</td>
					<td><select id="emp_location_add_page"
						name="emp_location_add_page"></select></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>

				<tr>
					<td>Center:</td>
					<td><select id="emp_center_add_page"
						name="emp_center_add_page"></select></td>

					<td>Hired Date :</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_hire_add_page" name="emp_hire_add_page" /></td>
					<td>Email Address:</td>
					<td><input type="email" id="emp_email_add_page"
						name="emp_email_add_page" class="required"
						placeholder="email@thomsonreuters.com" /></td>
					<td>&nbsp;</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="hidden"
						id="emp_resigned_add_page" name="emp_resigned_add_page" /></td>
				</tr>
				<tr>
					<td>Taleo Req No. :</td>
					<td><input type="text" id="emp_add_app_req_no"
						name="emp_add_app_req_no" placeholder="JREQ NUMBER" /></td>

					<td>Employee to be replaced :</td>
					<td><select id="emp_add_replace_list"
						name="emp_add_replace_list"></select></td>
					<td title="Portal Adminstration task.">Role :</td>
					<td><select id="emp_add_portal_role"
						name="emp_add_portal_role"></select></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>

				<tr>
					<td>Employee Type :</td>
					<td><select id="emp_add_type" name="emp_add_type">
							<option value="">--</option>
							<option value="Contractual">Contractual</option>
							<option value="Leave">Leave</option>
							<option value="Permanent">Permanent</option>
							<option value="Recruitment">Recruitment</option>
							<option value="Training">Training</option>
					</select> <!-- emp_is_training_field --></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>

				<tr id="leave_row">
					<td>Leave Type :</td>
					<td><select id="emp_leave_add_page" name="emp_leave_add_page">
							<option value="medical">Medical</option>
							<option value="vacation">Vacation</option>
							<option value="Maternity">Maternity</option>
					</select></td>
					<td>Leave Start Date :</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_start_leave_add_page" name="emp_start_leave_add_page" /></td>

					<td>Leave End Date :</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_end_leave_add_page" name="emp_end_leave_add_page" /></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr id="contractual_dates_add_row">
					<td>Contract Start Date :</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_start_contract_add_page"
						name="emp_start_contract_add_page" /></td>

					<td>Contract End Date :</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_end_contract_add_page" name="emp_end_contract_add_page" /></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr id="training_dates_add_row">
					<td>Training Start Date :</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_start_training_add_page"
						name="emp_start_training_add_page" /></td>

					<td>Training End Date :</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_end_training_add_page" name="emp_end_training_add_page" />
					</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>

				</tr>
			</table>

		</form>
		<div id="current_team_div">
			<legend> Team information </legend>
			<hr />
			<table>
				<tr>
					<td class="new">Add Team Manager:</td>
					<td><select id="emp_trans_tm_add" name="emp_trans_tm_add"></select></td>
					<td class="new">Add Start Date with Manager:</td>
					<td><input type="text" placeholder="Date: YYYY-MM-DD"
						id="emp_next_tm_start_date" name="emp_next_tm_start_date" /><span
						style="color: red">*</span></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr id="tm_row_2">
					<td class="new"></td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_next_tm_end_date" name="emp_next_tm_end_date" /> <input
						type="hidden" id="emp_tm_add_week_number_field"
						name="emp_tm_add_week_number_field" value="" /></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
			</table>

		</div>

		<a href="javascript:void(0)" id="quick_add_tm_chckbx" class="buttonA">New
			Team Manager</a>
		<hr />
		<div id="quick_add_tm">
			<table>
				<tr class="new">
					<td>Employee Number</td>
					<td><input type="text" id="quick_tm_number"
						placeholder="7 DIGIT EMPLOYEE ID" /></td>
					<td>First Name</td>
					<td><input type="text" id="quick_tm_fname" /></td>
					<td>Last Name</td>
					<td><input type="text" id="quick_tm_lname" /></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr class="new">
					<td>Email</td>
					<td><input type="email" id="quick_tm_email"
						placeholder="email@thomsonreuters.com" /></td>
					<td>Hired Date</td>
					<td><input type="text" id="quick_tm_hired_date"
						placeholder="DATE: YYYY-MM-DD" /></td>
					<td>Taleo Req No.</td>
					<td><input type="text" id="quick_tm_taleo_number"
						placeholder="JREQ NUMBER" /></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>

				</tr>
				<tr class="new">
					<td>Start Date with Manager</td>
					<td><input type="text" id="quick_tm_start_date"
						placeholder="Date: YYYY-MM-DD" /></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
			</table>
			<hr />
		</div>
		<div id="current_wg_div">
			<legend>Work Group Information </legend>
			<hr />

			<table>
				<tr id="wg_row_1">
					<td class="new">New Workgroup</td>
					<td><select id="emp_trans_wg_add" name="emp_trans_wg_add"></select></td>
					<td class="new">New Work Group Start Date:</td>
					<td><input type="text" id="emp_next_wg_start_date"
						name="emp_next_wg_start_date" placeholder="Date: YYYY-MM-DD" /><span
						style="color: red">*</span></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
			</table>
		</div>

		<a href="javascript:void(0)" id="quick_add_wg_chckbx" class="buttonA">New
			Work Group</a>
		<div id="quick_add_wg">
			<hr />
			<table>
				<tr class="new">
					<td>Work Group Name</td>
					<td><input type="text" id="quick_wg_name" /></td>
					<td>Start Date</td>
					<td><input type="text" id="quick_psm_start_date"
						placeholder="Date: YYYY-MM-DD" /></td>
					<td>PSM</td>
					<td><select id="quick_wg_psm"></select></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
			</table>
		</div>
		<p>&nbsp;</p>
		<a href="javascript:void(0);" id="add_employee_bottom" class="buttonA">Add</a>
		<a href="javascript:void(0);" id="cancel_add_employee" class="buttonA">Cancel</a>
	</fieldset>
</div>
<script type="text/javascript" src="modules/com.emp.add.page.js">
	
</script>
