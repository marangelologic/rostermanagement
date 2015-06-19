<!-- Work Group add View  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2014 -->
<link href="js/cmxform.css" rel="stylesheet" type="text/css"></link>
<style>
html {
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
}

legend {
	padding-bottom: 10px;
}

.hasDatepicker {
	width: 100%;
}

body {
	overflow-x: hidden;
	overflow-y: visible;
}

fieldset {
	background-color: #f2f2f3;
	padding: 1em;
	width: 82%;
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

td:first-child,td:third-child {
	width: auto;
}

table {
	border-collapse: collapse;
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
	color: #1797c0; /* old IE */
	background-color: #1797c0; /* Modern Browsers */
}

input[type="text"],input[type="email"] {
	max-height: 20px;
	padding: 3px;
	border-color: #1797c0;
	max-width: 140px;
}

select[multiple] {
	height: auto;
}

select {
	width: 148px;
	height: 24px;
	border-color: #1797c0;
}

.buttonA:hover {
	background: #0083bf;
}

.new {
	font-style: italic;
}

.hidden_class {
	display: none;
}
</style>

<div id="wg_add_page">
	<fieldset>
		<legend>Work Group Information</legend>
		<a href="javascript:void(0);" id="add_wg_info_button" class="buttonA">Add</a>
		<a href="javascript:void(0);" id="cancel_wg_add" class="buttonA">Cancel</a>

		<p>&nbsp;</p>
		<table id="add_wg_table">
			<tr>
				<td>Work Group Name:</td>
				<td><input type="text" id="wg_name_add_page" /></td>
				<td>Assign PSM</td>
				<td><select id="add_wg_psm"></select></td>
				<td>Work Group Center</td>
				<td><select id="wg_add_center"></select></td>
			</tr>
			<tr>
				<td>Work Group Product Family</td>
				<td><select id="wg_add_product_family"></select></td>
				<td>Work Group Target Head Count:</td>
				<td><input type="text" id="wg_thc_add_page"
					placeholder="VOLUME" value="0" /></td>
				<td>Work Force Recommended Head Count:</td>
				<td><input type="text" id="wg_whc_add_page"
					placeholder="VOLUME" value="0" /></td>
			</tr>
			<tr style="border-bottom: 1px solid #bababa">
				<td><p>&nbsp;</p></td>
				<td><p>&nbsp;</p></td>
				<td><p>&nbsp;</p></td>
				<td><p>&nbsp;</p></td>
				<td><p>&nbsp;</p></td>
				<td><p>&nbsp;</p></td>
			</tr>

			<tr id="tr_add_tm_wg_1">
				<td>Assign Team Manager</td>
				<td><select id="add_team_manager_1" class="newAppendManager"></select></td>
				<td class="hidden_class">Work Group Code</td>
				<td class="hidden_class"><select id="add_wg_code"></select></td>
				<td>Start Date</td>
				<td><input type="text" id="wg_tm_start_date_add_page_1"
					class='newAppendStart' placeholder="DATE: YYYY-MM-DD" /></td>
				<td>End Date</td>
				<td><input type="text" class="newAppendEnd"
					id="wg_tm_end_date_add_page_1" placeholder="DATE: YYYY-MM-DD" /></td>
			</tr>
		</table>
		<a class="buttonA" href="javascript:void(0)"
			onclick="AddMoreTmFields()" id="add_new_tm_quick">Associate TM</a>
		<br />
		Create New Team Manager? <input type="checkbox" id="create_new_tm" />
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

				</tr>
				<tr class="new">
					<td>Start Date with Manager</td>
					<td><input type="text" id="quick_tm_start_date"
						placeholder="Date: YYYY-MM-DD" /></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
			</table>
			<hr />
		</div>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p style="border-bottom: 1px solid #bababa">&nbsp;</p>
		<div id="">
			<a class="buttonA" href="javascript:void(0);"
				id="add_wg_info_button_low">Add</a> <a href="javascript:void(0);"
				id="cancel_wg_add_low" class="buttonA">Cancel</a>
		</div>
	</fieldset>
</div>

<script type="text/javascript" src="modules/com.wg.add.page.js">
	
</script>