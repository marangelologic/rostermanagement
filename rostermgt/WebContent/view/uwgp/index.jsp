<!-- Work Group Update View  -->
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
	width: 100%;
}

.boldit {
	font-weight: bold;
}
#member_wg_list{
	display: hidden;
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

.style-one {
	background: #999999;
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

<div id="wg_update_page">
	<fieldset>
		<legend>Work Group Information</legend>
		<a href="javascript:void(0);" id="update_wg_info_button"
			class="buttonA edit">Update</a> <a href="javascript:void(0);"
			id="cancel_wg_update" class="buttonA">Cancel</a>

		<p>&nbsp;</p>
		<table>
			<tr>
				<td>Work Group ID:</td>
				<td><input type="text" id="wg_id_update_page" /></td>

				<td>Work Group Name:</td>
				<td><input type="text" id="wg_name_update_page" /> <input
					type="hidden" id="wg_old_name" /></td>


				<td>Work Group Center</td>
				<td><select id="wg_upadte_center"></select></td>

			</tr>

			<tr>
				<td>Work Group Product Family</td>
				<td><select id="wg_upadte_product_family"></select></td>
				<td>Work Group Target Head Count:</td>
				<td><input type="text" id="wg_thc_update_page" /></td>

				<td>Work Group Current Head Count:</td>
				<td><input type="text" id="wg_chc_update_page" disabled /></td>
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

		<p>&nbsp;</p>
		<hr class="style-one">
		Team manager(s):
		<div id="tm_wg_list"></div>
		<a class="buttonA" href="javascript:void(0)"
			onclick="AddMoreTmFields()" id="add_update_new_tm_quick">Add New
			Team Manager</a>
		<p>&nbsp;</p>
		
		<table id="member_wg_list" class="display"></table>

		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<hr class="style-one">
		<a href="javascript:void(0);" id="update_wg_info_button_low"
			class="buttonA">Update</a> <a href="javascript:void(0);"
			id="cancel_wg_update_low" class="buttonA">Cancel</a>


	</fieldset>

</div>

<script type="text/javascript" src="modules/com.wg.update.page.js">
	
</script>