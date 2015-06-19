<!-- Work Group detail View  -->
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

<div id="wg_detail_page">
	<fieldset>
		<legend>Work Group Information</legend>
		<a href="javascript:void(0);" id="detail_wg_info_button"
			class="buttonA edit">Edit</a> <a href="javascript:void(0);"
			id="cancel_wg_detail" class="buttonA">Cancel</a>

		<p>&nbsp;</p>
		<table>
			<tr class="trstyle">
				<td>Work Group ID:</td>
				<td><label id="wg_id_detail_page"></label></td>

				<td nowrap>Work Group Name:</td>
				<td><label id="wg_name_detail_page"></label></td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
			
			<tr class="trstyle">
				<td>Work Group Center:</td>
				<td><label id="wg_detail_center"></label></td>
				<td>Work Group Product Family:</td>
				<td><label id="wg_detail_product_family"></label></td>
			</tr>
			<tr class="trstyle">
				<td>Work Group Target Head Count:</td>
				<td><label id="wg_thc_detail_page"></label></td>

				<td>Work Group Current Head Count:</td>
				<td><label id="wg_chc_detail_page"></label></td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
		</table>
		<p>&nbsp;</p>

		<span style="color: #999999">Active Team manager(s):</span>
		<p>&nbsp;</p>
		<table id="wg_detail_tm_wg_list"></table>
		<p>&nbsp;</p>
		
		<span style="color: #999999">Team Members(s):</span>
		<p>&nbsp;</p>
		<div id="wg_detail_member_tm_former_list"></div>
		
		<table id="wg_detail_member_wg_list" class="display"></table>

		
		<hr class="style-one">
		<a href="javascript:void(0);" id="detail_wg_info_button_low"
			class="buttonA">Edit</a> <a href="javascript:void(0);"
			id="cancel_wg_detail_low" class="buttonA">Cancel</a>
	</fieldset>
</div>

<script type="text/javascript" src="modules/com.wg.detail.page.js"></script>