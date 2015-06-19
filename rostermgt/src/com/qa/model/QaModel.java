package com.qa.model;

public class QaModel {

	public static String AddQATargetSCore(String tmName, String tmId,
			String empName, String empId, String reqType, String reqSubType,
			String sDate, String eDate, String quarter, String imp360Status,
			String reportingStatus, String reqStatus, String reasonTm,
			String prevScore, String currScore, String reqDate,
			String isCurrentRecord, String reqWeekNo, 
			String approvalWeekNo,String year,String wgNname,String reqOrder,
			String evalId, String evalName
			) {

		StringBuilder sb = new StringBuilder();

		sb.append(" INSERT INTO hdpr.tbl_roster_qa_requests (\"tm_name\",\"tm_id\",\"emp_name\",\"emp_id\", ");
		sb.append("\"request_type\",\"request_sub_type\",\"start_date\",\"end_date\",\"quarter\", ");
		sb.append("\"imp360_status\",\"reporting_status\",\"request_status\",\"reason_tm\",\"tm_prev_score\",\"tm_current_score\",");
		sb.append("\"request_date\",\"is_current_record\",\"tm_to_qa_req_week_no\",\"qa_approval_week_no\",\"req_year\",\"request_order\","
		+"\"tm_work_group_name\",\"evaluator_emp_id\",\"evaluator_name\")");

		sb.append(" VALUES ");

		sb.append("('" + tmName + "',");
		sb.append("'" + tmId + "',");
		sb.append("'" + empName + "',");
		sb.append("'" + empId + "',");
		sb.append("'" + reqType + "',");
		sb.append("'" + reqSubType + "',");
		sb.append(((sDate.equals("") ? null : "'" +  sDate + "'")) + ",");
		sb.append(((eDate.equals("") ? null : "'" +  eDate + "'")) + ",");
		sb.append("'" + quarter + "',");   
		sb.append("'" + imp360Status + "',");
		sb.append("'" + reportingStatus + "',"); 
		sb.append("'" + reqStatus + "',");
		sb.append("'" + reasonTm + "',");
		sb.append("'" + prevScore + "',");
		sb.append("'" + currScore + "',"); 
		sb.append(((reqDate.equals("") ? null : "'" +  reqDate + "'")) + ",");
		sb.append("'" + isCurrentRecord + "',");
		sb.append("'" + reqWeekNo + "',");  
		sb.append("'" + approvalWeekNo + "',");
		sb.append("'" + year +"',");
		sb.append("'" + reqOrder + "',");
		sb.append("'" + wgNname + "',");
		sb.append("'" + evalId +"',");
		sb.append("'" + evalName + "'); commit; select ");
		

		return sb.toString();
	}
	
	public static String AddQATargetSCoreValidated(String tmName, String tmId,
			String empName, String empId, String reqType, String reqSubType,
			String sDate, String eDate, String quarter, String imp360Status,
			String reportingStatus, String reqStatus, String reasonTm,
			String prevScore, String currScore, String reqDate,
			String isCurrentRecord, String reqWeekNo, 
			String approvalWeekNo,String year,String wgNname,String reqOrder,
			String evalId, String evalName
			) {

		StringBuilder sb = new StringBuilder();

		sb.append(" INSERT INTO hdpr.tbl_roster_qa_requests (\"tm_name\",\"tm_id\",\"emp_name\",\"emp_id\", ");
		sb.append("\"request_type\",\"request_sub_type\",\"start_date\",\"end_date\",\"quarter\", ");
		sb.append("\"imp360_status\",\"reporting_status\",\"request_status\",\"reason_tm\",\"tm_prev_score\",\"tm_current_score\",");
		sb.append("\"request_date\",\"is_current_record\",\"tm_to_qa_req_week_no\",\"qa_approval_week_no\",\"req_year\",\"request_order\","
		+"\"tm_work_group_name\",\"evaluator_emp_id\",\"evaluator_name\",\"tm_req_status\")");

		sb.append(" VALUES ");

		sb.append("('" + tmName + "',");
		sb.append("'" + tmId + "',");
		sb.append("'" + empName + "',");
		sb.append("'" + empId + "',");
		sb.append("'" + reqType + "',");
		sb.append("'" + reqSubType + "',");
		sb.append(((sDate.equals("") ? null : "'" +  sDate + "'")) + ",");
		sb.append(((eDate.equals("") ? null : "'" +  eDate + "'")) + ",");
		sb.append("'" + quarter + "',");   
		sb.append("'" + imp360Status + "',");
		sb.append("'" + reportingStatus + "',"); 
		sb.append("'" + reqStatus + "',");
		sb.append("'" + reasonTm + "',");
		sb.append("'" + prevScore + "',");
		sb.append("'" + currScore + "',"); 
		sb.append(((reqDate.equals("") ? null : "'" +  reqDate + "'")) + ",");
		sb.append("'" + isCurrentRecord + "',");
		sb.append("'" + reqWeekNo + "',");  
		sb.append("'" + approvalWeekNo + "',");
		sb.append("'" + year +"',");
		sb.append("'" + reqOrder + "',");
		sb.append("'" + wgNname + "',");
		sb.append("'" + evalId +"',");
		sb.append("'" + evalName + "','validated')");
		

		return sb.toString();
	}

	public static String TagAsPermanent(String empId) {
		StringBuilder sb = new StringBuilder();
		sb.append(" INSERT INTO hdpr.tbl_roster_tag_permanent(");
		sb.append(" \"emp_id\",\"tag_status\",\"tag_date\") VALUES");
		sb.append("('" + empId + "','1',current_date)");

		return sb.toString();
	}

	public static String GetPermanentStatus(String empId) {
		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT COUNT(*) as \"permanenttag\" FROM hdpr.tbl_roster_tag_permanent WHERE emp_id = '" + empId + "' ");
		return sb.toString();
	}
	
	public static String GetEvaluatorList() {
		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT * FROM hdpr.tbl_roster_evaluator_mapping ORDER BY evaluator_name"); 
		return sb.toString();
	}
}
