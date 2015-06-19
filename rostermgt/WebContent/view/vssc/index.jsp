<!--  Specialist List View  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2014 -->

<style>
html {
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
	
}

body{
	overflow-y: scroll; 
}
#specialist_home_view {
	width: 100%;
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
	
}	


.buttonA:hover {
	background: #0083bf;
}
</style>

<body>
	<div id="specialist_home_view">
		<table id="employee_per_tm_table_view" class="display">
		</table>
		<br />
		<br />
		<a href="javascript:void(0);" id="add_employee" onclick="globalobj.ViewAddSpecialistPage()" class="buttonA">Add Employee</a>
	</div>
</body>
<script type="text/javascript" src="modules/com.view.employees.tm.js"></script>