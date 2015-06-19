$(document).ready(function() {
	$("#eavluator_update_page").css("min-height", $(document).height());
	$("fieldset").css("min-height", parseInt($(document).height() - 400));
	GetEvaluatorInfo(globalobj.GetEvaluatorId());
	$("#cancel_eval_update_top").click(function(){
		CancelButton();
	});
	$("#cancel_eval_update").click(function(){
		CancelButton();
	});  
	
	$("#update_eval_info_button_top").click(function(){
		UpdateEvalInfo($("#eval_id_update_page").val());
	});
	$("#update_eval_info_button").click(function(){
		UpdateEvalInfo($("#eval_id_update_page").val());
	});
});

function GetEvaluatorInfo(evalId) {
	$.ajax({
		type : "POST",
		url : "evalcntrl",
		data : "{\"signature\":\"getevaluatorInfo\",\"evalId\":\""
				+ evalId + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;

			for (var i = 0; i < resultsArray.length; i++) {
				$("#eval_id_update_page").val(resultsArray[0].evaluator_em_id);
				$("#eval_name_update_page").val(resultsArray[0].evaluator_name);
				$("#eval_email_update_page").val(resultsArray[0].evaluator_email);
			}

		},
		complete : function(e) {
			$.unblockUI();
		}
	});
}

function UpdateEvalInfo(evalId) {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "evalcntrl",
		data : "{\"signature\":\"updateevalinfo\",\"evalId\":\""
				+ evalId + "\",\"evalName\":\"" + $("#eval_name_update_page").val() +
				"\",\"evalEmail\":\"" + $("#eval_email_update_page").val() + 
				"\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			var resultsArray = (typeof response) == 'string' ? eval('('
					+ response + ')') : response;
					
		},
		complete : function(e) {
			globalobj.returnSuccess();
			$.unblockUI();
		}
	});
}

function CancelButton(){
	globalobj.ShowLoadingPage();
	$("#content").load("view/evaluators");
}
