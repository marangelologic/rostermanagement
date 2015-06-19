$(document).ready(function() {
	
	GetWGPipeline();
	GetTenureperProdFam();
	GetAveTenureperProdFam();
	graph1(); 
	globalobj.SetPrevHistory("view/vggd");
});

function graph1() {
	globalobj.ShowLoadingPage();
	var data = '<graph labelDisplay="auto" rotateNames="1" lineThickness="1" showColumnShadow="0" showLegend="1" showShadow="0" SYAxisMaxValue="300" alternateHGridAlpha="60" anchorSides="10" bgAlpha="100" yAxisName="Center Population" canvasBorderColor="FFFFFF" caption="Helpdesk Headcounts" decimalPrecision="0" numDivLines="2"  showValues="0" formatNumberScale="0">';

	data = data + '<categories>';

	$
			.ajax({
				type : "POST",
				url : "gcpsmh",
				data : "{}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					var i;
					resultsArray = resultsArray.sort();
					for (i = 0; i < resultsArray.length; i++) {
						data = data + '<category name="'
								+ resultsArray[i].wg_prod_family + '" />';

					}

					data = data + '<category name="work force"/>';  
					data = data + '</categories>';
					data = data
							+ "<dataset seriesname='Target Head Count' color='"
							+ "#505050" + "' showValues='1'>";
					for (i = 0; i < resultsArray.length; i++) {
						data = data + '<set value="'
								+ resultsArray[i].target_head_counts + "\" link='JavaScript:WorkGroupDrillDown(\""
								+ resultsArray[i].wg_prod_family + "\")' />";
					}
					data = data + "</dataset>";
					data = data
							+ "<dataset renderas='Area' showValues='1' seriesname='Productive Head Count' color='"
							+ "#21a8ff" + "'>";
					for (i = 0; i < resultsArray.length; i++) {
						data = data + '<set value="'
								+ resultsArray[i].current_head_count
								+ "\" link='JavaScript:WorkGroupDrillDown(\""
								+ resultsArray[i].wg_prod_family + "\")' />";
					}
					data = data + "</dataset>";

					data = data
							+ '<dataset showValues="1" showValues="5" seriesName="Workforce Head Count" width="100%" color="#BABABA" showValues="1" chartTopMargin="15" parentYAxis="P" valuePosition="ABOVE">';
					for (i = 0; i < resultsArray.length; i++) {
						data = data + '<set value="'
								+ resultsArray[i].wf_head_counts
								+ "\" link='JavaScript:WorkGroupDrillDown(\""
								+ resultsArray[i].wg_prod_family + "\")' />";
					}    
					data = data + "</dataset>";  
				},     
				complete : function(e) {    
  
					data = data + '</graph>';
					var myChart = new FusionCharts(
							"js/FusionChartsFree/Charts/FCF_MSColumn2D.swf",
							"myChartId", "1000", "500","0"); 

					myChart.setDataXML(data);
					myChart.render("graph1");
					$("#grap2").show();
					$.unblockUI();
				}
			});

}
function MakeID(sequence) {
	var color;
	switch (sequence) {
	case 1:
		color = "1D8BD1";
		break;
	case 2:
		color = "F1683C";
		break;
	case 3:
		color = "2AD62A";
		break;
	case 4:
		color = "DBDC25";
		break;
	case 5:
		color = "666699";
		break;
	case 6:
		color = "990033";
		break;
	case 7:
		color = "99FF33";
		break;
	case 8:
		color = "CC3333";
		break;
	case 9:
		color = "FF3300";
		break;
	case 10:
		color = "996633";
		break;
	default:
		color = "6699CC";
		break;
	}
	return color;
}

function WorkGroupDrillDown(psm) {
	globalobj.ShowLoadingPage();
	$("#graph1").html("");
	var data = '<graph yAxisName="Center Population"  maxColWidth="1"  canvasBorderColor="FFFFFF" plotSpacePercent="100" showColumnShadow="0" lineThickness="3" borderColor="1D" caption="'
			+ psm
			+ '\'s workgroup" decimalPrecision="0" rotateNames="1" numDivLines="2"  showValues="1" formatNumberScale="1">';

	data = data + '<categories>';

	$.ajax({
		type : "POST",
		url : "gawgbpsm",
		data : "{\"psm\":\"" + psm + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
			var i;
			resultsArray = resultsArray.sort();

			for (i = 0; i < resultsArray.length; i++) {
				data = data + '<category name="' + resultsArray[i].wg_names
						+ '" />';
			}
			data = data + '<category name="" />';
			data = data + '<category name="" />';
			data = data + '<category name="" />';
			data = data + '<category name="" />';
			data = data + '</categories>';
			data = data + "<dataset seriesname='Target Head Count' color='"
					+ "#BABABA" + "'>";
			for (i = 0; i < resultsArray.length; i++) {
				data = data + '<set value="'
						+ resultsArray[i].target_head_count
						+ '" thickness ="1" link="JavaScript:graph1()" />';
			}
			
			data = data + "</dataset>";
			data = data + "<dataset seriesname='Productive Head Count' color='"
					+ "#21a8ff" + "'>";
			for (i = 0; i < resultsArray.length; i++) {
				data = data + '<set value="'
						+ resultsArray[i].current_head_count + '" link="JavaScript:graph1()" />';
			}
			data = data + "</dataset>";
		},
		complete : function(e) {  

			data = data + '</graph>';
			var myChart = new FusionCharts(
					"js/FusionChartsFree/Charts/FCF_StackedColumn2D.swf",
					"myChartId", "800", "300");

			myChart.setDataXML(data);
			myChart.render("graph1");
			$.unblockUI();
		}
	});
}

function GetTenureperProdFam() {
	var data = "";
	var aCountTotal = 0;
	var bCountTotal = 0;
	var dCountTotal = 0;
	var eCountTotal = 0;
	$
			.ajax({
				type : "POST",
				url : "adcntrl",
				data : "{\"signature\":\"gettenureperprodfam\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					data = data
							+ '<thead><tr><td colspan="5" style="text-align: center">Tenure Time Buckets In Months</td></tr>';
					data = data
							+ '<tr style="overflow: hidden; font-weight: bold;">';
					data = data + '<td style="border:1px solid black; padding: 8px;">Product Family</td>';
					data = data + '<td style="border:1px solid black; padding: 8px;">Less than 6</td>';
					data = data + '<td style="border:1px solid black; padding: 8px;">6-12</td>';
					data = data + '<td style="border:1px solid black; padding: 8px;">12 - 24</td>';
					data = data + '<td style="border:1px solid black; padding: 8px;">More than 24</td></tr></thead>';

					data = data + '<tbody>';

					for (var i = 0; i < resultsArray.length; i++) {
						aCountTotal = aCountTotal + resultsArray[i].acountmonth;
						bCountTotal = bCountTotal + resultsArray[i].bcountmonth;
						dCountTotal = dCountTotal + resultsArray[i].dcountmonth;
						eCountTotal = eCountTotal + resultsArray[i].ecountmonth;

						data = data + "<tr><td>"
								+ resultsArray[i].product_family_name + "</td>";
						data = data + "<td style='text-align: center'>" + resultsArray[i].acountmonth
								+ "</td>";
						data = data + "<td style='text-align: center'>" + resultsArray[i].bcountmonth
								+ "</td>";
						data = data + "<td style='text-align: center'>" + resultsArray[i].dcountmonth
								+ "</td>";
						data = data + "<td style='text-align: center'>" + resultsArray[i].ecountmonth
								+ "</td>";
						data = data + "</tr>";

					}
					data = data
							+ '<tr style="border-bottom: 1px solid #1797c0; overflow: hidden"><td colspan="5">&nbsp;</td></tr>';

					data = data + '<tr style="font-weight: bold; text-align: center">';
					data = data + '<td>Total</td>';
					data = data + '<td>' + aCountTotal + '</td>';
					data = data + '<td>' + bCountTotal + '</td>';
					data = data + '<td>' + dCountTotal + '</td>';
					data = data + '<td>' + eCountTotal + '</td>';
					data = data + '</tr>';
					data = data + '</tbody>';
				},

				complete : function(e) {
					$("#avg_tenure_table").append(data);
				},
				error : function(xhr) {

				}
			});

}
function ReturnZero(count){
	var a =0;
	if(isNaN(count) || count == ""|| count == null){
		a = 0;
	}else{
		a = count;
	}
	return a;
}

function GetAveTenureperProdFam() {
	$("#tenure_table").html("");
	var data = "";
	var avgTotal = 0;
	var avg = 0;
	$
			.ajax({
				type : "POST",
				url : "adcntrl",
				data : "{\"signature\":\"getavetenureperprodfam\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					data = data
							+ '<thead><tr><td colspan="2" style="text-align: center">Tenure Time Buckets In Months</td></tr>';
					data = data
							+ '<tr style=" overflow: hidden; font-weight: bold;">';
					data = data + '<td style="border:1px solid black; padding: 8px;">Product Family</td>';
					data = data
							+ '<td style="text-align:right; padding-right: 35px;border:1px solid black;">Average</td></tr></thead>';

					data = data + '<tbody>';
 
					for (var i = 0; i < resultsArray.length; i++) {
						avg = parseFloat(resultsArray[i].monthCount
								/ resultsArray[i].empCount);
						
						
						avgTotal = avgTotal + ReturnZero(avg);
						data = data + "<tr><td>"  
								+ resultsArray[i].product_family_name + "</td>";
						data = data
								+ "<td style='text-align:right; padding-right: 35px;'>"
								+ (isNaN(avg) ? "0" : (avg).toFixed(2)) + "</td>";
						data = data + "</tr>";

					}
					data = data + '<tr>';
					data = data + '<td>&nbsp;</td>';
					data = data + '<td>&nbsp;</td>';
					data = data + '<tr>';
					data = data + '<td>&nbsp;</td>';
					data = data + '<td>&nbsp;</td>';
					data = data
							+ '<tr style="border-bottom: 1px solid #1797c0; overflow: hidden"><td colspan="5">&nbsp;</td></tr>';
					data = data + '</tr>';
					data = data + '<tr style="font-weight: bold;">';
					data = data + '<td>Total</td>';
					data = data
							+ '<td  style="text-align:right; padding-right: 35px;">'
							+ (parseFloat(parseFloat(avgTotal) / resultsArray.length))
									.toFixed(2) + '</td>';
					data = data + '</tr>';
					data = data + '</tbody>';
				},

				complete : function(e) {
					$("#tenure_table").append(data);
				},
				error : function(xhr) {

				}
			});

}

function GetWGPipeline() {
	$("#pipeline_table").html("");
	var data = "";
	$
			.ajax({
				type : "POST",
				url : "adcntrl",
				data : "{\"signature\":\"getpipeline\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;

					data = data
							+ '<thead><tr><td colspan="7">Hiring plan</td></tr>';
					data = data
							+ '<tr overflow: hidden; font-weight: bold;">';
					data = data + '<td>Work Group</td>';
					data = data + '<td>Budgeted HC</td>';
					data = data + '<td>Recruitment</td>';
					data = data + '<td>Training</td>';
					data = data + '<td>Current HC</td>';
					data = data + '<td>Workforce Recommended HC</td>';
					data = data + '<td>Over/Under</td></tr></thead>';

					data = data + '<tbody>';

					for (var i = 0; i < resultsArray.length; i++) {
						
						data = data + "<tr><td><a href='javascript:void(0)' onclick='globalobj.ViewWGDetail(\"" + resultsArray[i].wg_name + "\")'>" + resultsArray[i].wg_name + "</a></td>";
						data = data + "<td>" + resultsArray[i].wg_psm_target_head_count
								+ "</td>";
						data = data + "<td>" + resultsArray[i].recruitment
								+ "</td>";
						data = data + "<td>" +resultsArray[i].training
						+ "</td>";
						data = data + "<td>" + ReturnCurrenHC(resultsArray[i].current_head_count,resultsArray[i].recruitment,resultsArray[i].training)
								+ "</td>";
						data = data + "<td>" + resultsArray[i].wg_wf_head_count
								+ "</td>";
						data = data + "<td>" + ReturnCurrenHC(resultsArray[i].current_head_count,resultsArray[i].recruitment,resultsArray[i].training,resultsArray[i].wg_wf_head_count)
						+ "</td>";
						data = data + "</tr>";

					}  
					$("#pipeline_table").append(data);
				},

				complete : function(e) {
					
					$("#pipeline_table").dataTable(
							{
								
								"lengthMenu" : [ [ 25, 50,100, 200 ],
										[ 25, 50,100, 200 ] ],
								"bDeferRender" : true,
								"sScrollX": "100%",
							    "bScrollCollapse": false,
							    "sScrollY": "400px",
							    "border" : false
							});
				},
				error : function(xhr) {
					
				}
			});

}  

function ReturnCurrenHC(){
	var d = 0;
	var e = 0;
	var f = 0;
	if(arguments.length == 3){
		d = parseInt(arguments[1]) + parseInt(arguments[2]);
		e = parseInt(arguments[0]) - d;
	}else{
		d = parseInt(arguments[1]) + parseInt(arguments[2]);
		f = arguments[0] - parseInt(arguments[3]);
		e = parseInt(f) - d;
	}
	return e;
}

function GetPortalRoleList(){
	
}
