<!-- QM FILE TARGET View  -->
<!-- Coded By MarAngelo -->
<!-- Coded Year 2015 -->
<style>
html {
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
}

#tm_home_view {
	width: 100%;
}

hr {
	padding-right: 20px;
	width: 50%;
}

body {
	overflow-x: hidden;
	overflow-y: visible;
}

#advance_span {
	padding-top: 15px;
}

/* #advance_search {
	color: #0083bf;
} */
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

.advance-criteria select {
	width: 100px;
	text-indent: 0.01px;
	text-overflow: "";
	color: #000;
	border-radius: 15px;
}

fieldset {
	background-color: #f2f2f3;
	width: 100%;
	height: 100%;
	border-color: #1797c0;
	border: thin;
}

#qm_tm_req_list_page {
	max-width: 100%;
}

table.display {
	margin: 0 auto;
	width: 100%;
	clear: both;
	border-collapse: collapse;
	table-layout: fixed;
	word-wrap: break-word;
}

td:nth-child {
	text-align: center !important;
}
</style>
<body>
	<div id="qm_file_target_page">

		<fieldset>
			<table id="file_new_target_list_for_qm" class="display">
				
			</table>
			<br /> <br /> <a href="javascript:void(0);" id="add_target"
				class="buttonA">Add
				Default Target</a>
		</fieldset>
	</div>
</body>
<script type="text/javascript"
	src="modules/com.quality.file.target.page.js"></script>