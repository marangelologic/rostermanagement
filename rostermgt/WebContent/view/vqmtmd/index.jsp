<!-- QA TM TASK View  -->
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
</style>
<body>
	<div id="qm_tm_req_list_page">

		<span id="advance_span"><a href="javascript:void(0)"
			id="advance_search" class="buttonA">+Advance Search</a></span>
		<!-- <div style="border-bottom: 1px solid; padding-right: 50px"></div> -->
		<div class="advance-criteria" id="tm_qa_home_view">
			Category : <select id="qa_option_list">

				<option value="All">All</option>
				<option value="quarter">By Quarter</option>
				<option value="New">New</option>
				<option value="declined">Declined</option>
				<option value="approved">Approve</option>
			</select><span class="advanced-qa">Quarter</span> <select id="qa_target_list"
				class="advanced-qa"></select> Year : <select id="qa_tm_select_year">
				<option value="2015">2015</option>
				<option value="2016">2016</option>
				<option value="2017">2017</option>
			</select><span class="advanced-qa">Activity :</span> <select id="qa_tm_sub_type"
				class="advanced-qa">
				<option value="read">Received</option>
				<option value="unread">No Activity</option>
			</select> 
			<span class="advanced-qa"> Status :</span>
			<select id="qa_subtype" class="advanced-qa">
				<option value="target">Target Change</option>
				<option value="exemption">Weekly Exemption</option>
			</select>
			<a href="javascript:void(0)" id="filter_qa_tm_list" class="buttonA">Filter</a>
		</div>
		<fieldset>
			<span>&nbsp;</span>
			<div id="qm_list_view"></div>
		</fieldset>
	</div>
</body>
<script type="text/javascript"
	src="modules/com.quality.view.list.page.js"></script>