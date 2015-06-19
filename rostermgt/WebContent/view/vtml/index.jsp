<!--  Team List View  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2014 -->

<style>
html {
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
}
#tm_home_view{
	width: 100%;

}
body {
	overflow-x: hidden;
	overflow-y: visible;
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
<div id="tm_home_view">
<table id="team_manager_list_view" style='width: 100%;'	class="display">
</table>
<a href="javascript:void(0);" id="add_tm" class="buttonA add">Add Team Manager</a>
</div>
</body>
<script type="text/javascript" src="modules/com.view.tm.list.js"></script>