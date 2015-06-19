<!-- Add New Request Page  -->
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
	overflow-x: hidden;
	overflow-y: visible;
}

select {
	width: 100%;
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

img.ui-datepicker-trigger {
	position: relative;
}

legend {
	font-weight: bold;
}

td {
	padding: 5px;
}

td:nth-child(even) {
	width: 20%;
}
/* 
.trstyle td {
	border-bottom: solid 1px rgba(168,168,168, 0.2);
	/* border-bottom-width: 1px; */
}
* /
tr:last-child {
	border-bottom: none;
	border: thin;
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

textarea {
	margin: 0px;
	width: 100%;
	height: 151px;
	padding: 3px;
	border-color: #1797c0;
	resize: none;
}

input {
	height: 26px;
	width: 100%;
	padding: 3px;
	border-color: #1797c0;
}

input,select {
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.buttonA:hover {
	background: #0083bf;
}

.new {
	font-style: italic;
}
</style>
<div>
	<form>
		<fieldset>
			<legend>Request for new target</legend>
			<a href="javascript:void(0)" class="buttonA"
				id="cancel_tm_qa_request_top">Cancel</a> <a
				href="javascript:void(0)" class="buttonA" id="add_tm_qa_request_top">Add</a>
			<table>
				<tr class="trstyle">
					<td><span>Employee ID:</span></td>
					<td><input type="text" id="tm_qa_emp_id" disabled="disabled" /></td>
					<td>Workgroup</td>
					<td><input type="text" id="tm_qa_wg_name" disabled="disabled" /></td>
				</tr>
				<tr>
					<td>Name</td>
					<td><select id="tm_qa_emp_name" name="tm_qa_emp_name"></select>
					</td>
					<td>Status</td>
					<td><input type="text" id="tm_qa_status_submitted"
						value="submitted" disabled="disabled" /></td>
					<td>Request Type</td>
					<td><select id="tm_qa_request_type">
							<option value="target">Target Change</option>
							<option value="exemption">Weekly Exemption</option>
					</select></td>
				</tr>

				<tr>
					<td>Current Target</td>
					<td><input type="text" id="current_tm_qa_score"
						disabled="disabled" /></td>
					<td>Requested Target</td>
					<td><select id="requested_tm_qa_score">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>

							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>

					</select></td>
					<!-- <td>Impact 360 Update</td>
					<td><select id="tm_qa_emp_name" name="tm_qa_emp_name">
							<option value="New">New</option>
							<option value="In Progress">In Progress</option>
							<option value="Completed">Completed</option>
							<option value="No Action Required">No Action Required</option>
					</select></td>
					<td>Reporting Update</td>
					<td><select disabled="disabled">
							<option value="New" selected="selected">New</option>
							<option value="In Progress">In Progress</option>
							<option value="Completed">Completed</option>
							<option value="No Action Required">No Action Required</option>
					</select></td> -->
					<td>Quarter</td>
					<td><select id="tm_qa_target_quarter">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
					</select></td>
				</tr>
				<tr>
					<td>Start Date</td>
					<td><input type="text" id="tm_qm_quarter_start_date"
						placeholder="YYYY-MM-DD" /></td>
					<td>End Date</td>
					<td><input type="text" id="tm_qm_quarter_end_date"
						placeholder="YYYY-MM-DD" /></td>

				</tr>

				<tr id="eval_row_1" class="apend-eval">
					<td>Evaluator 1</td>
					<td><select id='new_eval_1' class="apend-eval-evaluator"></select></td>
					<td>Target</td>
					<td><select id="eval_target_1" class="apend-eval-target"></select></td>
					<td></td>
					<td></td>

				</tr>

				<tr>
					<td><a href='javascript:void(0)' class='buttonA' id="add_evaluator">Add Evaluator</a></td>
				</tr>

				<tr>
					<td>Team manager Comments</td>
					<td colspan="5"><textarea class="mceEditor"
							id="tm_qa_description" cols="8" rows="10"></textarea></td>

				</tr>
				<tr>
					<td>Quality Managers' Recommendations</td>
					<td colspan="5"><textarea cols="8" rows="10"
							class="myTextEditor" id="tm_from_qa_description"
							disabled="disabled"></textarea></td>
				</tr>

			</table>
			<div>
				<a href="javascript:void(0)" class="buttonA"
					id="cancel_tm_qa_request_bottom">Cancel</a> <a
					href="javascript:void(0)" class="buttonA"
					id="add_tm_qa_request_bottom">Add</a>
			</div>
		</fieldset>
	</form>
</div>
<script type="text/javascript"
	src="modules/com.add.tm.quality.request.js"></script>