<!-- Evaluator Update Page  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2015 -->
<link href="js/cmxform.css" rel="stylesheet" type="text/css"></link>

<style>
html {
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
	height: 100%;
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
	height: 100%;
}

fieldset {
	background-color: #f2f2f3;
	padding: 1em;
	width: 100%;
	min-height: 100%;
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

input[type="text"],input[type="email"] {
	max-height: 20px;
	padding: 3px;
	border-color: #1797c0;
	max-width: 140px;
	overflow: auto;
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

.member_list:hover {
	color: #1797c0;
}
.button-field { 
    position: absolute; 
    bottom: 0; 
}
</style>

<div id="eavluator_update_page">
	<fieldset>
		<legend>Evaluator Information</legend>
		<a href="javascript:void(0);" id="update_eval_info_button_top"
			class="buttonA edit">Update</a> <a href="javascript:void(0);"
			id="cancel_eval_update_top" class="buttonA">Cancel</a>
		<table id="table_evaluator_update">
		<tr>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td>Employee ID:</td>
				<td><input type="text" id="eval_id_update_page"
					style="width: 100%" placeholder="Employee ID" disabled="disabled" /></td>
				<td>Evaluator Name:</td>
				<td><input type="text" id="eval_name_update_page"
					style="width: 100%" placeholder="First and Last Name" /></td>
				<td>Evaluator Manager Email Address:</td>
				<td><input type="text" id="eval_email_update_page"
					style="width: 100%" placeholder="email@thomsonreuters.com" /></td>
			</tr>
			
		</table>
		
		<p>&nbsp;</p>
		<p>&nbsp;</p>
			<div class="button-field">
			<a href="javascript:void(0);" id="update_eval_info_button"
				class="buttonA">Update</a> <a href="javascript:void(0);"
				id="cancel_eval_update" class="buttonA">Cancel</a>
		</div>
	</fieldset>
</div>

<script type="text/javascript" src="modules/com.eval.update.page.js">
	
</script>