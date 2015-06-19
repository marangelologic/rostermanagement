$(document).ready(function() {
	

	$("#add_eval_info_button_top").click(function() {
		AddNewEvaluator();
	});
	
	$("#add_eval_info_button").click(function() {
		AddNewEvaluator();
	});
	
	$("#cancel_eval_add_top").click(function(){
		CancelAddEval();
	});
	
	$("#cancel_eval_add").click(function(){
		CancelAddEval();
	});
	$.unblockUI();
});

function AddNewEvaluator() {
	globalobj.ShowLoadingPage();
	$.ajax({
		type : "POST",
		url : "evalcntrl",
		data : "{\"signature\":\"addeval\",\"evalId\":\""
				+ $("#eval_id_add_page").val() + "\",\"evalName\":\""
				+ $("#eval_name_add_page").val() + "\",\"evalEmail\":\""
				+ $("#eval_email_add_page").val() + "\"}",
		contentType : "application/x-www-form-urlencoded",
		dataType : "json",
		success : function(response) {
			globalobj.returnSuccess();
		},
		complete : function(e) {

			$.unblockUI();
			$("#add_eval_info_button_top").removeAttr("href");
			$("#add_eval_info_button_top").attr("style", "background:#a1a1a1");
			$("#add_eval_info_button_top").unbind();
			$("#add_eval_info_button_top").off("click", "**");
			$("#add_eval_info_button").removeAttr("href");
			$("#add_eval_info_button").attr("style", "background:#a1a1a1");
			$("#add_eval_info_button").unbind();
			$("#add_eval_info_button").off("click", "**");

		}
	});
}

function CancelAddEval(){
	globalobj.ShowLoadingPage();
	$("#content").load("view/evaluators");
}