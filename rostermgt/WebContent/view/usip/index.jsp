<!-- Specialist Update View  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2014 -->
<link href="js/cmxform.css" rel="stylesheet" type="text/css"></link>
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
	padding : 10px;
	background-color: #f2f2f3; 
	
}

td {
	padding: 5px;
}

table {
	border-collapse: collapse;
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


<div id="specialist_update_page">
	<fieldset>
		<legend>Organizational Information</legend>
		<div id="appendError"></div>
		<a href="javascript:void(0);" id="update_emp_all_info_top"
			class="buttonA">Update</a> <a href="javascript:void(0);"
			id="cancel_update_employee_top" class="buttonA">Cancel</a>
		<form name="update_emp_form" id="update_emp_form">
			<table width="100%">
				<tr >
					<td>Employee Number:</td>
					<td><input type="text" id="emp_id_update_page"
						name="emp_id_update_page" placeholder="7 DIGIT EMPLOYEE NUMBER" /></td>

					<td>Employee Name:</td>
					<td><input type="text" id="emp_name_update_page"
						name="emp_name_update_page" placeholder="First Last Name"
						class="edit_field" /></td>
					<td>Email Address:</td>
					<td><input type="email" id="emp_email_update_page"
						name="emp_email_update_page" class="required edit_field"
						placeholder="email@thomsonreuters.com" /></td>
				</tr>
				<tr >
					<td>Role:</td>
					<td><select id="emp_role_update_page"
						name="emp_role_update_page" class="edit_field"></select></td>
					<td>Product Family:</td>
					<td><select id="emp_prod_family_update_page"
						name="emp_prod_family_update_page" class="edit_field"></select></td>

					<td>Location:</td>
					<td><select id="emp_location_update_page"
						name="emp_location_update_page" class="edit_field"></select></td>
				</tr>
				<tr >

				</tr>
				<tr >
					<td>Center:</td>
					<td><select id="emp_center_update_page"
						name="emp_center_update_page" class="edit_field"></select></td>

					<td>Hired Date :</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_hire_update_page" name="emp_hire_update_page"
						class="edit_field" /></td>

					<td>Resigned Date :</td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_resigned_update_page" name="emp_resigned_update_page"
						class="edit_field" /></td>
				</tr>

				<tr  id="reason_row">
					<td>Taleo Req:</td>
					<td><input type="text" id="taleo_update_page"
						name="taleo_update_page" placeholder="JREQ NO" /></td>
					<td>Reason</td>
					<td><select id="general_reasons">
							<option value="promoted">Promoted</option>
							<option value="personal">Personal</option>
							<option value="transferred">Transferred</option>
							<option value="performance">Performance</option>
					</select></td>


					<td>Description :</td>
					<td><textarea id="emp_resigned_resaon_update_page"
							name="emp_resigned_resaon_update_page"></textarea></td>
				</tr>
				<tr >
					<td>Employee Type</td>
					<td><select id="emp_update_type" name="emp_update_type"
						current-value="" current-start-date-value=""
						current-end-date-value="" class="edit_field">
							<option value="">--</option>
							<option value="Contractual">Contractual</option>
							<option value="Leave">Leave</option>
							<option value="Permanent">Permanent</option>
							<option value="Recruitment">Recruitment</option>
							<option value="Training">Training</option>
					</select></td>
					<td id="leave_type_label"><span> Leave Type :</span></td>
					<td id="emp_leave_update_page_label"><select
						id="emp_leave_update_page" name="emp_leave_update_page">
							<option value="medical">Medical</option>
							<option value="vacation">Vacation</option>
							<option value="Maternity">Maternity</option>
					</select></td>
					<td>Access Rights:</td>
					<td><select id="emp_update_portal_role" class="edit_field"></select></td>
					<td><label for="flip_1">Interim TM</label> :</td>
					<td><select id="flip_1" name="flip_1" data-role="slider">
							<option value="1">Yes</option>
							<option value="0">No</option>
					</select></td>
				</tr>
				<tr id="training_dates_update_row">
					<td><span id="emp_update_start_date_field"></span></td>
					<td><input placeholder="Date: YYYY-MM-DD" type="text"
						id="emp_start_training_update_page"
						name="emp_start_training_update_page" class="edit_field" /></td>

					<td><span id="emp_update_end_date_field"></span></td>
					<td><input placeholder="Date: YYYY-MM-DD" class="edit_field"
						type="text" id="emp_end_training_update_page"
						name="emp_end_training_update_page" /></td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<br />
			<p>&nbsp;</p>
			<legend> Team information </legend>
			<hr />
			<p></p>

			<table id="tbl_curr_tm" width="100%">
				<tr >
					<td>Current Team Manager:</td>
					<td><input type="text" id="emp_curre_tm_update_page"
						name="emp_curre_tm_update_page" /> <input type="hidden"
						id="emp_curre_tm_id_update_page"
						name="emp_curre_tm_id_update_page" /></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr >
					<td><label for="emp_start_date_update">Start Date :</label></td>
					<td><input type="text" name="emp_start_date_update"
						id="emp_start_date_update" placeholder="DATE: YYYY-MM-DD" /></td>

					<td><label for="emp_end_date_update">End Date :</label></td>
					<td><input type="text" name="emp_end_date_update"
						placeholder="DATE: YYYY-MM-DD" id="emp_end_date_update" /><span
						style="color: red">*</span></td>
					<td>PSM</td>
					<td><select id="emp_psm_update"></select><input type="hidden" id="emp_psm_properties" /></td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
			</table>
			<div id="current_update_team_div">
				<table id="tm_tbl" width="100%">
					<tr >
						<td colspan='4' class="new">Update Team Manager Information?<input
							type="checkbox" id="tm_chk_box" name="tm_chk_box" /></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>

					<tr id="tm_row_12">
						<td colspan='4'>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					<tr id="tm_row_1">
						<td class="new">New Team Manager:</td>
						<td><select id="emp_trans_tm_update"
							name="emp_trans_tm_update"></select></td>
						<td>New Target for Evaluation :</td>
						<td><select id="emp_trans_new_target">
								<option value="0">0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
						</select></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					<tr id="tm_row_2">
						<td class="new">Start Date with Manager:</td>
						<td><input placeholder="Date: YYYY-MM-DD" type="text"
							id="emp_next_tm_start_date" name="emp_next_tm_start_date" /><span
							style="color: red">*</span></td>

						<td class="new"></td>
						<td><input placeholder="Date: YYYY-MM-DD" type="text"
							id="emp_next_tm_end_date" name="emp_next_tm_end_date" /> <input
							type="hidden" id="emp_tm_update_week_number_field"
							name="emp_tm_update_week_number_field" value="" /></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>

					</tr>
					<tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</table>
			</div>
			<a href="javascript:void(0)" id="quick_add_update_tm_chckbx"
				class="buttonA edit">New Team Manager</a>
			<div id="quick_add_update_tm">
				<table>
					<tr class="new">
						<td>Employee Number</td>
						<td><input type="text" id="update_quick_tm_number"
							placeholder="7 DIGIT EMPLOYEE NUMBER" /></td>
						<td>First Name</td>
						<td><input type="text" id="update_quick_tm_fname"
							placeholder="First Name" /></td>
						<td>Last Name</td>
						<td><input type="text" id="update_quick_tm_lname"
							placeholder="Last Name" /></td>
					</tr>
					<tr class="new">
						<td>Email</td>
						<td><input type="email" id="update_quick_tm_email"
							placeholder="email@thomsonreuters.com" /></td>
						<td>Hired Date</td>
						<td><input type="text" id="update_quick_tm_hired_date"
							placeholder="DATE: YYYY-MM-DD" /></td>
						<td>Taleo Req No.</td>
						<td><input type="text" id="update_quick_tm_taleo_number"
							placeholder="JREQ NUMBER" /></td>

					</tr>
					<tr class="new">
						<td>Start Date with Manager</td>
						<td><input type="text" id="quick_tm_start_date"
							placeholder="DATE: YYYY-MM-DD" /></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</table>
				<hr />
			</div>
			<legend>Work Group Information </legend>
			<hr />
			<p></p>
			<div id="current_update_wg_div">
				<table>
					<tr >
						<td>Current Wokgroup:</td>
						<td><input type="text" id="emp_curr_wg_update_page"
							name="emp_curr_wg_update_page" /></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					<tr >
						<td>Current Work Group Start Date:</td>
						<td><input type="text" placeholder="Date: YYYY-MM-DD"
							id="emp_curr_wg_start_date" name="emp_curr_wg_start_date" /></td>

						<td>Current Work Group End Date:</td>
						<td><input placeholder="Date: YYYY-MM-DD" type="text"
							id="emp_curr_wg_end_date" name="emp_curr_wg_end_date" /><span
							style="color: red">*</span></td>
							<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td colspan='4'>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					<tr >
						<td colspan='4' class="new">Update Work Group Information?<input
							type="checkbox" id="wg_chk_box" name="wg_chk_box" /></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					<tr id="wg_row_1">
						<td class="new">New Workgroup</td>
						<td><select id="emp_trans_wg_update"
							name="emp_trans_wg_update"></select></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>

					<tr id="wg_row_2">
						<td class="new">New Work Group Start Date:</td>
						<td><input type="text" id="emp_next_wg_start_date"
							placeholder="DATE: YYYY-MM-DD" name="emp_next_wg_start_date" /><span
							style="color: red">*</span></td>

						<td class="new"></td>
						<td><input type="text" id="emp_next_wg_end_date"
							placeholder="DATE: YYYY-MM-DD" name="emp_next_wg_end_date" /> <input
							type="hidden" id="emp_wg_update_week_number_field"
							name="emp_wg_update_week_number_field" value="" /></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td><input type="hidden" id="tag_as_permanent" value=""></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</table>
			</div>
			<a href="javascript:void(0);" id="quick_add_update_wg_chckbx"
				class="buttonA edit">New Work Group</a>
			<div id="quick_add_update_wg">
				<hr />
				<table>
					<tr class="new">
						<td>Work Group Name</td>
						<td><input type="text" id="update_quick_wg_name" /></td>
						<td>Start Date</td>
						<td><input type="text" id="update_quick_psm_start_date"
							placeholder="DATE: YYYY-MM-DD" /></td>
						<td>PSM</td>
						<td><select id="update_quick_wg_psm"></select></td>
					</tr>
				</table>
			</div>
		</form>
		<legend>Historical Data</legend>
		<hr />
		<p></p>
		<table id="historical_table"></table>
		<hr />
		<p>&nbsp;</p>
		<table id="historical_wg_table"></table>

		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<a href="javascript:void(0);" id="update_emp_all_info_bottom"
			class="buttonA">Update</a> <a href="javascript:void(0);"
			id="cancel_update_employee" class="buttonA">Cancel</a>
	</fieldset>
</div>
<!-- <script type="text/javascript" src="js/require.js"></script> -->


<script type="text/javascript" src="modules/com.emp.update.page.js">
	
</script>
