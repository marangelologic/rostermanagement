<!-- Graph page -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2014 -->
<style>
@import url(http://fonts.googleapis.com/css?family=Oxygen+Mono);

html {
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
	overflow: visible;
}

fieldset {
	padding: 1em;
	width: 100%;
	border-color: #ffffff;
	background-color: #ffffff;
	border: thin;
	overflow: visible;
}

.buttonA {
	text-align: center;
	text-decoration: none;
	font-family: Tahoma, Arial, sans-serif; */
	-webkit-font-smoothing: antialiased;
	font-style: normal;
	font-size: 12px;
	color: #FFF;
	background: #1b9bff;
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

/* Cloud */
/* Gradient color1 - color2 - color1 */
hr.style-one {
	border: 0;
	height: 1px;
	background: #333;
	background-image: -webkit-linear-gradient(left, #1797c0, #1797c0, #1797c0);
	background-image: -moz-linear-gradient(left, #1797c0, #1797c0, #1797c0);
	background-image: -ms-linear-gradient(left, #1797c0, #1797c0, #1797c0);
	background-image: -o-linear-gradient(left, #1797c0, #1797c0, #1797c0);
}

thead {
	font-weight: bold;
}

.buttonA:hover {
	background: #1b9bff;
}

.member_list {
	text-decoration: none;
	color: black;
}

.member_list:hover {
	color: #23ebbc;
	text-decoration: underline;
}

#tbl_mem_list {
	border: 0;
	text-align: center;
}

#tbl_mem_list td {
	text-align: center;
}

fieldset {
	min-height: 500px;
	border-color: #BABABA; /*#23ebbc*/
}

#tenure_table {
	display: inline-block;
	float: left;
	margin: 0;
	padding-left: 10px;
	/* border: 1px solid #1797c0; */
	text-align: left;
	width: auto;
}

tr:nth-child(even) {
	background: #f0f9ff;
}

tr:nth-child(odd) {
	background: #FFF
}

#tenure_table td {
	min-width: 212px;
}

#tenure_table tr {
	line-height: 20px;
}

#avg_tenure_table tr {
	line-height: 20px;
}

#avg_tenure_table td {
	min-width: 50px;
}

body {
	overflow-y: visible;
}

#avg_tenure_table {
	/* border: 1px solid #1797c0; */
	text-align: left;
	padding-left: 10px;
	padding-right: 10px;
	float: right;
	width: auto;
	max-width: 400px;
	min-width: 300px;
	min-height: 310px;
}

th {
	text-align: left;
}

table.tablesorter tbody tr.normal-row td {
	background: #888;
	color: #fff;
}

table.tablesorter tbody tr.alt-row td {
	background: #555;
	color: #fff;
}
</style>
<section class="content">
	<div id="wg_update_page">
		<fieldset>
			<legend>Global Roster Information</legend>

			<div id="graph1" width="100%"></div>

			<hr />
			<div>
				<table id="pipeline_table" class="display" width="100%"></table>
			</div>
			<br />
			<hr />
			<div id="grap2" style="display: none">

				<table id="tenure_table" rules="none" style="min-height: 417px;">

				</table>
				&nbsp;
				<table id="avg_tenure_table" rules="none">

				</table>

			</div>


			<div id="grap3"></div>



		</fieldset>

	</div>
</section>
<script type="text/javascript" src="modules/com.graph.page.js">
	
</script>