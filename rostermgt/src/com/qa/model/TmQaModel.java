package com.qa.model;

public class TmQaModel {

	public static String GetAllRequests(String isAll, String type,
			String quarter, String year, String status) {

		StringBuilder sb = new StringBuilder();

		if (isAll.equals("All")) {
			sb.append(" SELECT * FROM hdpr.tbl_roster_qa_requests ORDER BY CASE request_status WHEN 'unread' THEN 1 ELSE 2 END");
		} else if (isAll.equals("quarter")) {
			sb.append(" Select *  from hdpr.tbl_roster_qa_requests WHERE req_year=");
			sb.append("'" + year + "' AND quarter='");
			sb.append(quarter
					+ "' AND request_sub_type='"
					+ type
					+ "'"
					+ " AND request_status='"
					+ status
					+ "' ORDER BY CASE request_status WHEN 'unread' THEN 1 ELSE 2 END");
		} else {
			sb.append(" SELECT * FROM hdpr.tbl_roster_qa_requests WHERE quarter='"
					+ quarter + "'");
			sb.append("AND req_year='" + year + "'");
			sb.append("AND request_sub_type='" + type + "'");
			sb.append("AND request_status='"
					+ status
					+ "' AND request_type='"
					+ isAll
					+ "' ORDER BY CASE request_status WHEN 'unread' THEN 1 ELSE 2 END");
		}
		return sb.toString();

	}

	public static String GetCurrentTargets(String empId, String tmId,
			String quarter, String year, String reqsubtype) {

		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT * FROM hdpr.tbl_roster_qa_requests WHERE emp_id='");
		sb.append(empId + "' AND tm_id ='");
		sb.append(tmId + "' AND quarter='");
		sb.append(quarter + "' AND req_year='");
		sb.append(year + "' AND  is_current_record='1' AND request_sub_type='"
				+ reqsubtype + "'" + " AND decision_type='approved'");

		return sb.toString();
	}

	public static String SetTargetHistorical(String empId, String subtype,
			String decType) {
		StringBuilder sb = new StringBuilder();
		if (!(decType.equals("2"))) {
			sb.append(" update hdpr.tbl_roster_qa_requests SET is_current_record='0' WHERE emp_id='"
					+ empId + "' AND request_sub_type='" + subtype + "'");
		} else {
			sb.append(" SELECT 'declined' as \"declined\" ");
		}
		return sb.toString();
	}

	public static String GetCurrentRequests(String tmId, String quarter,
			String option, String year, String order, String status) {
		StringBuilder sb = new StringBuilder();
		if (option.equals("All")) {
			sb.append(" Select * from hdpr.tbl_roster_qa_requests WHERE tm_id='");
			sb.append(tmId
					+ "' ORDER BY CASE request_status WHEN 'unread' THEN 1 ELSE 2 END");
		} else if (option.equals("quarter")) {
			sb.append(" Select *  from hdpr.tbl_roster_qa_requests WHERE tm_id='");
			sb.append(tmId + "' AND req_year=");
			sb.append("'" + year + "' AND quarter='");
			sb.append(quarter + "' AND request_status='" + status + "'");
		} else {
			sb.append(" Select *  from hdpr.tbl_roster_qa_requests WHERE tm_id='");
			sb.append(tmId + "' AND req_year=");
			sb.append("'" + year + "' AND quarter='");
			sb.append(quarter + "' AND request_status='" + status
					+ "' AND request_order='" + order + "'");
		}
		return sb.toString();
	}

	public static String GetAllSerialInformation(String id) {
		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT * FROM  hdpr.tbl_roster_qa_requests WHERE tbl_serial_id='"
				+ id + "'");

		return sb.toString();
	}

	public static String UpdateTmRequest(String id, String tm_req_status,
			String dec_type, String dec_date, String app_week_no,
			String reportingStatus, String imp360Status, String isCurrent,
			String currentScore) {
		StringBuilder sb = new StringBuilder();

		sb.append(" UPDATE hdpr.tbl_roster_qa_requests SET tm_req_status='");
		sb.append(tm_req_status + "',decision_type='");
		sb.append(dec_type + "', decision_date='");
		sb.append(dec_date + "', qa_approval_week_no='");
		sb.append(app_week_no + "', reporting_status='");
		sb.append(reportingStatus + "', imp360_status='");
		sb.append(imp360Status + "',is_current_record='");
		sb.append(isCurrent + "', request_order='" + dec_type
				+ "', request_status='read', request_type='" + dec_type + "'");
		sb.append(",tm_current_score='" + currentScore + "'");
		sb.append("  WHERE tbl_serial_id='" + id + "'");

		return sb.toString();
	}

	public static String UpdateTmRequest(String id, String reportingStatus,
			String imp360Status) {
		StringBuilder sb = new StringBuilder();

		sb.append(" UPDATE hdpr.tbl_roster_qa_requests SET reporting_status='");
		sb.append(reportingStatus + "', imp360_status='");
		sb.append(imp360Status + "'");
		sb.append("  WHERE tbl_serial_id='" + id + "'");

		return sb.toString();
	}

	public static String CountNewreqs() {
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT COUNT(*) as \"countReqs\" FROM hdpr.tbl_roster_qa_requests WHERE request_status ='unread'");

		return sb.toString();
	}

	public static String UpdateQmActivity(String serialId, String comment) {
		StringBuilder sb = new StringBuilder();
		sb.append(" UPDATE hdpr.tbl_roster_qa_requests SET reason_qm ='"
				+ comment + "' WHERE tbl_serial_id='" + serialId + "'");
		return sb.toString();
	}

	public static String GetTmTargetEvaluatorMapping(String requestId) {
		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT evaluator_name, tbl_req.* FROM hdpr.tbl_roster_target_request_evaluation_mapping tbl_req LEFT JOIN");
		sb.append(" hdpr.tbl_roster_evaluator_mapping eval ON eval.evaluator_em_id = tbl_req.qm_eval_id WHERE qm_request_id= '"
				+ requestId + "'");
		return sb.toString();
	}
	public static String UpdateEvaluatorTarget(String target, String evalqmId){
		StringBuilder sb = new StringBuilder();
		
		sb.append(" UPDATE hdpr.tbl_roster_target_request_evaluation_mapping SET qm_target='");
		sb.append(target + "'" + " WHERE qm_eval_serial_id='" + evalqmId + "'; select 'successful'");
		
		return sb.toString();
	}
	
	public static String DeleteeEvaluatorTarget(String evalqmId){
		StringBuilder sb = new StringBuilder();
		
		sb.append(" DELETE FROM hdpr.tbl_roster_target_request_evaluation_mapping WHERE qm_eval_serial_id='" + evalqmId + "'; select 'successful'");
		
		return sb.toString();
	}

}
