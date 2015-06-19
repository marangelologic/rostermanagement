$(document).ready(function() {
	GetAllQmReports();
});

function GetAllQmReports() {
	var data = "";
	globalobj.ShowLoadingPage();
	$
			.ajax({
				type : "POST",
				url : "lar",
				data : "{\"reportType\":\"quality\"}",
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				success : function(response) {
					var resultsArray = (typeof response) == 'string' ? eval('('
							+ response + ')') : response;
					data = "<ul>";
					for (var i = 0; i < resultsArray.length; i++) {
						data = data
								+ "<li><a href='javascript:void(0);' id='rep_link_" + i + "' class='buttonA' onclick='DownloadExcel(\""
								+ resultsArray[i].link + globalobj.GetQuarterOftheMonth("","") + "\")'>"
								+ resultsArray[i].work_force_report_name
								+ "</a></li>";
					}
				},
				complete : function(e) {
					$("#repqmlist").append(data + "</ul>");
					$.unblockUI();
				}
			});
}

function DownloadExcel(link) {
	 window.open(link, "_blank");
	 window.close();
	 event.preventDefault();
	 return false;
}