<!--  Specialist Per Team Manager List View  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2014 -->

<head>
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

#wg_update_page {
	overflow-y: visible;
}

table {
	padding-left: 80px;
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
</style>

</head>
<fieldset>
	<legend>Team Manager List</legend>

	<label for="teamManager">TM:</label> <select id="tm_select" /></select>
	<div id="member_tm_list" class="mem_list"></div>
	
	<table id="list_specialist_per_tm_scores" width='100%'>
	
	</table>
</fieldset>
<script type="text/javascript"
	src="modules/com.view.employees.tm_scores.js"></script>