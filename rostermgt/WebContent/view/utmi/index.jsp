<!-- Team Manager Update View  -->
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
	width: auto;
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

/* input[type="text"],input[type="email"] {
	max-height: 20px;
	padding: 3px;
	border-color: #1797c0;
	max-width: 140px;
	overflow: auto;
} */
/* 
select[multiple] {
	height: auto;
}

select {
	width: 148px;
	height: 24px;
	border-color: #1797c0;
} */

.buttonA:hover {
	background: #0083bf;
}

.new {
	font-style: italic;
}

.hidden_class {
	display: none;
}

.member_list:hover {
	color: #1797c0;
}
</style>

<div id="tm_update_page">
	<fieldset>
		<legend>Team Information</legend>
		<a href="javascript:void(0);" id="update_tm_info_button_top"
			class="buttonA edit">Update</a> <a href="javascript:void(0);"
			id="cancel_tm_update_top" class="buttonA">Cancel</a>
		<table>
			<tr>
				<td>Employee ID</td>
				<td><input type="text" id="tm_id_update_page"
					 placeholder="First Last Name"
					disabled="disabled" /></td>
				<td>Team Manager Name:</td>
				<td><input type="text" id="tm_name_update_page"
					 placeholder="First Last Name" /></td>
				<td>Team Manager Email Address:</td>
				<td><input type="text" id="tm_email_update_page"
					 placeholder="email@thomsonreuters.com" /></td>


			</tr>

			<tr>
				<td>Hired Date</td>
				<td><input type="text" id="hired_date_update_page"
					 placeholder="YYYY-MM-DD" /></td>
				<td>Resigned Date</td>
				<td><input type="text" id="resigned_date_update_page"
					 placeholder="YYYY-MM-DD" /></td>
				<td></td>
				<td></td>

			</tr>

		</table>

		<p>&nbsp;</p>
		<p>&nbsp;</p>
		Work Group(s):
		<hr />

		<table id="list_specialist_per_tm_scores">

		</table>
		<a href="javascript:void(0);" onclick="AddMoreWGFields()"
			class="buttonA">Add More WorkGroups</a>
		<p>&nbsp;</p>
		<hr />
		<label class="boldit">Members</label>

		<p>&nbsp;</p>
		<div id="member_tm_list"></div>
		<p>&nbsp;</p>
		<p>&nbsp;</p>

		<a href="javascript:void(0);" id="update_tm_info_button"
			class="buttonA">Update</a> <a href="javascript:void(0);"
			id="cancel_tm_update" class="buttonA">Cancel</a>
	</fieldset>
</div>

<script type="text/javascript" src="modules/com.tm.update.page.js">
	
</script>