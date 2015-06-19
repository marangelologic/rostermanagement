<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Manager Activity</title>
<link rel="shortcut icon" type="image/x-icon"
	href="img/Gnome-Stock-Person-64.ico">
<link href="js/index.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-1.11.1.js"></script>
<script type="text/javascript"
	src="js/jquery-validation-1.13.1/dist/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="js/blockui/blockui.js"></script>
<style>
html {
	overflow-x: visible;
	overflow-y: visible;
}
</style>
<script type="text/javascript">
	$(document)
			.ready(
					function() {
						$
								.blockUI({
									message : '<span><img src="img/loading-45x45.gif">&nbsp; <label style="padding-bottom:80px; vertical-align:text-top;color:#cccccc; font-family: Tahoma, Arial, sans-serif; font-size: x-small"> THOMSON REUTERS ROSTER MANAGEMENT </label></span>'
								});
						$("#tm_to_qa_logs").hide();
						GetTmActivity(getUrlParameter("serialId"));
						$("#save_comment_from_tm_qa").click(function() {
							AddQMActivity();

						});

					});

	function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
				return sParameterName[1];
			}
		}
	}

	function sendUpdate() {
		$(window).unload(function() {

		});
	}
	function AutoUpdateCommentForQM() {

	}

	function ReplaceNewLine(NewLine) {
		var toBR = NewLine.replace(/\\u00a0/g, " ");
		toBR = toBR.replace(/\\n/g, "<br />");
		return toBR;
	}

	function GetTmActivity(serialId) {

		$
				.blockUI({
					message : '<span><img src="img/loading-45x45.gif">&nbsp; <label style="padding-bottom:80px; vertical-align:text-top;color:#cccccc; font-family: Tahoma, Arial, sans-serif; font-size: xx-small"> THOMSON REUTERS ROSTER MANAGEMENT </label></span>'
				});
		$.ajax({
			type : "POST",
			url : "../hdpr-rmgt/QaTmCtrl",
			data : '{"serialId":"' + serialId + '","signature":"getcomment"}',
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;
				$("#from_tm_to_qa_activity").html(resultsArray[0].reason_tm);
				$("#from_qa_to_tm_activity").html(resultsArray[0].reason_qm);
			},
			complete : function(e) {
				tinymce.init({
					statusbar : false,
					force_br_newlines : true,
					forced_root_block : '',
					force_p_newlines : true,
					entity_encoding : "raw",
					mode : "specific_textareas",
					editor_selector : "tmMcEditor",
					readonly : 1
				});

				tinymce.init({
					statusbar : false,
					force_br_newlines : true,
					forced_root_block : '',
					force_p_newlines : true,
					entity_encoding : "raw",
					mode : "specific_textareas",
					editor_selector : "qaMcEditor"
				});
				$.unblockUI();
				$("#tm_to_qa_logs").show();
			}
		});
		//.html(ReplaceNewLine(
	}
	function ReplaceStrings(stringToReplace) {

		var text = stringToReplace;
		text = text.replace(/&#32;/g, ':&nbsp;');
		text = text.replace(/\n/g, '<br />');
		text = text.replace(/=/g, "$");
		text = text.replace(/\\"/g, "~");
		//text = text.replace(/^style:/g, 'style=');
		text = text.substring(1, text.length - 1);

		return text;
	}

	function AddQMActivity() {
		var obj = tinymce.util.JSON.serialize(tinymce.get(
				'from_qa_to_tm_activity').getContent());
		$.ajax({
			type : "POST",
			url : "../hdpr-rmgt/QaTmCtrl",
			data : '{"serialId":"' + getUrlParameter("serialId")
					+ '","signature":"updateqmcomment","reasonQm":"'
					+ ReplaceStrings(obj) + '"}',
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			success : function(response) {
				var resultsArray = (typeof response) == 'string' ? eval('('
						+ response + ')') : response;

			},
			complete : function(e) {
				window.close();
			}
		});
	}
</script>
<style>
body {
	overflow: visible;
	font-family: Tahoma, Arial, sans-serif;
	font-style: normal;
	font-size: 12px;
	font-family: Tahoma, Arial, sans-serif;
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
</head>
<body>
	<div id="tm_to_qa_logs">
		<span>Team Manager View</span>
		<p>&nbsp;</p>
		<textarea id="from_tm_to_qa_activity" class="tmMcEditor"></textarea>
		<p>&nbsp;</p>
		<span style="padding-top: 5px"> Quality Manager's</span>
		<p>&nbsp;</p>
		<textarea id="from_qa_to_tm_activity" class="qaMcEditor"></textarea>
		<a id="save_comment_from_tm_qa" href="javascript:void(0)"
			class="buttonA" style="float-right: 0; padding-right: 20px;">Save</a>
	</div>
</body>
</html>