<!-- Team Manager detail View  -->
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



.boldit {
	font-weight: bold;
	color : #999999;
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
	color: #1797c0; /* old IE */
	background-color: #1797c0; /* Modern Browsers */
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

.trstyle td {
	border-bottom: solid 1px rgba(168, 168, 168, 0.2);
	/* border-bottom-width: 1px; */
	text-align: left;
}

.trstyle {
	width: 100%;
}


</style>

<div id="tm_detail_page">
	<fieldset>
		<legend>Team Information</legend>
		<a href="javascript:void(0);" id="detail_tm_info_button_top"
			class="buttonA edit">Edit</a> <a href="javascript:void(0);"
			id="cancel_tm_detail_top" class="buttonA">Cancel</a>
		<p>&nbsp;</p>
		<table width="100%">
			<tr>
				<td>Team Manager Name:</td>
				<td><label id="tm_name_detail_page"></label></td>
				<td>Team Manager Email Address:</td>
				<td><label id="tm_email_detail_page"></label></td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>

			</tr>
		</table>
		<hr />
		<p><span style="color: #999999">Work Group List</span></p>
		<hr />
		<table class='display' id='workgroup_list_tm_table'></table>
		<hr />
		<p>&nbsp;</p>
		<label class="boldit">Direct Reports</label>
		<hr />
		<table id="tm_member_detail_table" class="display"></table>

		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>

		<a href="javascript:void(0);" id="detail_tm_info_button"
			class="buttonA edit">Edit</a> <a href="javascript:void(0);"
			id="cancel_tm_detail" class="buttonA">Cancel</a>
	</fieldset>
</div>

<script type="text/javascript" src="modules/com.tm.detail.page.js">
	
</script>