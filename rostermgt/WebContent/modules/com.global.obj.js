var GlobalObjects = function() {
	this.employee_id = "";
	this.wgId = "";
	this.tmId = "";
	this.history = [];
	this.today = new Date();
	this.dd = this.today.getDate();
	this.mm = this.today.getMonth() + 1; // January is 0!
	this.yyyy = this.today.getFullYear();
	this.dateToday = this.yyyy + '-' + AddZero(this.mm) + '-'
			+ AddZero(this.dd);
	this.timer = "";
	this.tmName = "";
	this.empStatus = "";
	this.GetYear = function() {
		return this.yyyy;
	};
	this.evaluatorId ="";
	this.userId = "";
	this.username = "";
	this.ReturnQMNew = function(NewVal) {

		$("#qm_new_res").text(NewVal);
	};
	this.GetPrevHistory = function(present) {
		var i = this.history.length - 2;
		var j = this.history.length - 3;
		if (this.history[i] == present) {
			$('#content')['load'](this.history[j]);
		} else {
			$('#content')['load'](this.history[i]);

		}
	};

	this.SetTimerFunction = function(timerParm) {
		this.timer = timerParam;
	};

	this.myStopFunction = function() {
		clearInterval(globalobj.getTimerFunction());
	};

	this.getTimerFunction = function() {
		return this.timer;
	};

	this.SetEmpStatus = function(stat) {
		this.empStatus = stat;
	};

	this.GetEmpStatus = function() {
		return this.empStatus;
	};

	this.SetPrevHistory = function(present) {
		this.history.push(present);
	};

	this.GetEmployeeId = function() {
		return this.employee_id;
	};

	this.SetEmployeeId = function(empId) {
		this.employee_id = empId;
	};

	this.GetWGId = function() {
		return this.wgId;
	};

	this.SetWGId = function(wgId) {
		this.wgId = wgId;
	};

	this.GetTMId = function() {
		return this.tmId;
	};

	this.SetTMId = function(tmId) {
		this.tmId = tmId;
	};

	this.SecurePages = function() {
		if (localStorage.getItem("29a7e96467b69a9f5a93332e29e9b0de") == "1d0258c2440a8d19e716292b231e3190") {
			$(".edit").removeAttr("href");
			$(".edit").unbind();
			$(".edit").off("click", "**");
			$(".edit").attr("style", "pointer-events: none");
			$(".delete").removeAttr("href");
			$(".delete").unbind();
			$(".delete").off("click", "**");
			$(".delete").attr("style", "pointer-events: none");

			$(".add").removeAttr("href");
			$(".add").unbind();
			$(".add").off("click", "**");
			$(".add").attr("style", "pointer-events: none");

			$(".edit_field").prop('disabled', true);
		}
	};

	this.GetAllWGAvailable = function(wg_names) {
		this.ShowLoadingPage();
		var data = "";
		$.ajax({
			type : "POST",
			url : "getallemp",
			data : "{\"wg_names\":\"" + wg_names + "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				$("#emp_trans_wg_update").html("");
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
				data = data + "<option>--</option>";
				for (var i = 0; i < resultsArray.length; i++) {
					data = data + "<option>" + resultsArray[i].wg_name
							+ "</option>";
				}

			},
			complete : function(e) {
				$("#emp_trans_wg_update").append(data);
				$.unblockUI();
			}
		});
	};

	this.GetAllTMAvailable = function(tm_name) {
		var data = "";
		this.ShowLoadingPage();
		$.ajax({
			type : "POST",
			url : "empatm",
			data : "{\"tm_name\":\"" + tm_name + "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				$("#emp_trans_tm_update").html("");
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
				data = data + "<option>--</option>";
				for (var i = 0; i < resultsArray.length; i++) {
					data = data + "<option value='"
							+ resultsArray[i].tm_employee_id + "'>"
							+ resultsArray[i].tm_name + "</option>";
				}

			},
			complete : function(e) {
				$("#emp_trans_tm_update").append(data);
				$.unblockUI();
			}
		});
	};
	this.ReturnYesNo = function(variable) {
		if (variable == '1') {
			return "Yes";
		} else {
			return "No";
		}
	};
	this.ViewWgList = function() {
		globalobj.ShowLoadingPage();
		$("#content").load("view/vwgl");

	};
	this.ViewEmpList = function() {
		globalobj.ShowLoadingPage();
		$("#content").load("view/vssc");

	};
	this.ViewTmList = function() {
		globalobj.ShowLoadingPage();
		$("#content").load("view/vtml");

	};
	this.ViewSpecialistDetail = function(id, status, serialId) {
		globalobj.ShowLoadingPage();
		$("#content").load("view/vsip");
		if (status == "Recruitment") {
			globalobj.SetEmployeeId(serialId);
		} else {
			globalobj.SetEmployeeId(id);
		}
	};
	this.ViewWGDetail = function(id) {
		globalobj.ShowLoadingPage();
		$("#content").load("view/vwgd");
		globalobj.SetWGId(id);
	};
	this.ViewAddSpecialistPage = function() {
		globalobj.ShowLoadingPage();
		$("#content").load("view/vsap");
	};
	this.ViewAddWgPage = function() {
		globalobj.ShowLoadingPage();
		$("#content").load("view/vwgap");
	};

	this.returnSuccess = function() {
		iosOverlay({
			text : "Success!",
			duration : 100,
			icon : "js/ios/img/check.png"
		});
		return false;
	};
	this.ShowLoadingPage = function() {
		$
				.blockUI({
					message : '<span><img src="img/loading-45x45.gif">&nbsp; <label style="padding-left:45px; vertical-align:text-top;color:#cccccc; font-family: Tahoma, Arial, sans-serif; font-size: x-small"> THOMSON REUTERS ROSTER MANAGEMENT </label></span>'
				});

	};
	this.redirectToEmpPage = function(id) {
		globalobj.ShowLoadingPage();
		jQuery("#content").load("view/usip");
		globalobj.SetEmployeeId(id);
	};

	this.loadCharts = function() {
		$("#content").load("view/vggd");

	};
   
	this.UpdateWgInfo = function(id) {
		globalobj.ShowLoadingPage();
		jQuery("#content").load("view/uwgp");
		globalobj.SetWGId(id);
		return false;

	};

	this.ShowUpdateTMPage = function(id) {
		globalobj.ShowLoadingPage();
		globalobj.SetTMId(id);
		jQuery("#content").load("view/utmi");
		return false;
	};

	this.SetTmName = function(id) {
		this.ShowLoadingPage();
		$.ajax({
			type : "POST",
			url : "tmrequest",
			data : "{\"signature\":\"gettmdetailinfo\",\"tmId\":\"" + id
					+ "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				$("#emp_trans_tm_update").html("");
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;

				for (var i = 0; i < resultsArray.length; i++) {

					globalobj.tmName = resultsArray[0].tm_name;

				}

			}
		});
	};

	this.GetYear = function() {
		return globalobj.yyyy;
	};

	this.GetQuarterOftheMonth = function(idDates, currentQuart) {
		var currentMonth = 0;
		var quarter = 0;
		currentMonth = (new Date()).getMonth();
		quarter = Math.floor((currentMonth / 3) + 1);
		
		return quarter;
	};

	this.GetWeekNumber = function() {   

		return $.datepicker.iso8601Week(new Date());  
	};

	this.GetTmName = function() {
		return globalobj.tmName;
	};

	this.ReplaceStrings = function(stringToReplace) {

		var text = stringToReplace;
		text = text.replace(/&#32;/g, ':&nbsp;');
		text = text.replace(/\n/g, '<br />');
		text = text.replace(/=/g, "$");
		text = text.replace(/\\"/g, "~");
		// text = text.replace(/^style:/g, 'style=');
		text = text.substring(1, text.length - 1);

		return text;
	};

	this.returnBlank = function(toBlank) {
		var newSpace = toBlank;
		if (toBlank == "" || toBlank == null || toBlank == undefined
				|| toBlank == "undefined")
			newSpace = "";

		return newSpace;
	};

	this.SetSerialId = function(serialId) {
		this.serial = serialId;
	};

	this.GetSerialId = function() {
		return this.serial;
	};

	this.AddAuditTrail = function(empId, empName, page, date,action) {
		this.ShowLoadingPage();
		$.ajax({
			type : "POST",
			url : "au",
			data : "{\"signature\":\"auditrail\"," + "\"emp_id\":\""
					+ empId + "\"," + "\"emp_name\":\"" + empName + "\","
					+ "\"page\":\"" + page + "\"," + "\"date\":\"" + date 
					+"\",\"action\":\"" + action
					+ "\"}",
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {

				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
			}
		});
	};
	this.SetEvaluatorId = function(evalId){
		this.evaluatorId = evalId;
	};
	this.GetEvaluatorId = function(){
		return this.evaluatorId;
	};

}
function AddZero(variable) {
	variable = "0" + variable;
	variable = variable.slice(-2);

	return variable;
}