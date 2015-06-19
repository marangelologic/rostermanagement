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

td:first-child,td:third-child {
	width: auto;
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

<div id="tm_add_page">
	<fieldset>
		<legend>Team Information</legend>
		<a href="javascript:void(0);" id="add_tm_info_button_top"
			class="buttonA">Add</a> <a href="javascript:void(0);"
			id="cancel_tm_add_top" class="buttonA">Cancel</a>
		<table>
			<tr>
				<td>Employee ID:</td>
				<td><input type="text" placeholder="7 DIGIT EMPLOYEE ID"
					id="tm_id_add_page" /></td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>

			</tr>
			<tr>
				<td>First Name:</td>
				<td><input type="text" placeholder="First Name"
					id="tm_name_add_page" /></td>
				<td>Last Name:</td>
				<td><input type="text" placeholder="Last Name"
					id="tm_name_last_add_page" /></td>
				<td>Address:</td>
				<td><input type="text" id="tm_email_add_page"
					placeholder="email@thomsonreuters.com" /></td>
				<td>&nbsp;</td>


			</tr>
		</table>
		<hr />
		<table id="tbl_tm_wg_mapping">
			<tr>
				<td>Workgroup:</td>
				<td><select id="tm_wg_add_page_1" style="display: block;"></select></td>
				<td>Start date:</td>
				<td><input type="text" id="tm_start_date_add_page_1"
					class="newAppendStart" placeholder="DATE: YYYY-MM-DD" /></td>
				<td>End Date:</td>
				<td><input type="text" id="tm_end_date_add_page_1"
					placeholder="DATE: YYYY-MM-DD" /></td>
				<td>&nbsp;</td>
		</table>
		<a class="buttonA" href="javascript:void(0)"
			onclick="AddMoreWGFields()" id="add_new_tm_quick">Associate Work
			Group</a> </label>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<div id="member_tm_list"></div>
		<p>&nbsp;</p>
		<p>&nbsp;</p>

		<a href="javascript:void(0);" id="add_tm_info_button" class="buttonA">Add</a>
		<a href="javascript:void(0);" id="cancel_tm_add" class="buttonA">Cancel</a>
	</fieldset>
</div>

<script type="text/javascript" src="modules/com.tm.add.page.js">
	
</script>