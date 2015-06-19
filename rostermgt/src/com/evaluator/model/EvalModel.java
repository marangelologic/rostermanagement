package com.evaluator.model;

public class EvalModel {

	public static String GetAllEvaluators() {
		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT * FROM hdpr.tbl_roster_evaluator_mapping WHERE is_active='1'  ORDER BY evaluator_name ");
		return sb.toString();
	}

	public static String GetEvalInfo(String evalId) {

		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT * FROM hdpr.tbl_roster_evaluator_mapping WHERE evaluator_em_id='");
		sb.append(evalId + "'");

		return sb.toString();
	}

	public static String UpdateEvaluator(String evalId, String evaluatorName,
			String evaluatorEmail) {

		StringBuilder sb = new StringBuilder();
		sb.append(" UPDATE hdpr.tbl_roster_evaluator_mapping SET evaluator_name='");
		sb.append(evaluatorName + "',evaluator_email='");
		sb.append(evaluatorEmail + "' WHERE evaluator_em_id='" + evalId + "'");
		return sb.toString();
	}

	public static String DeactivateEval(String evalId) {

		StringBuilder sb = new StringBuilder();
		sb.append(" UPDATE hdpr.tbl_roster_evaluator_mapping SET is_active='");
		sb.append("0' WHERE evaluator_em_id='" + evalId + "'");
		return sb.toString();
	}
	
	public static String AddEvaluator(String evalId, String evaluatorName,
			String evaluatorEmail) {

		StringBuilder sb = new StringBuilder();
		sb.append(" INSERT INTO hdpr.tbl_roster_evaluator_mapping(");
		sb.append("\"evaluator_em_id\",\"evaluator_name\",\"evaluator_email\",\"is_active\") VALUES");
		sb.append("('" + evalId + "',");
		sb.append("'" + evaluatorName + "',");
		sb.append("'" + evaluatorEmail + "','1'); select 'success'");
		return sb.toString();
	}
	public static String GetLastInsertedId(){
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT MAX(tbl_serial_id) as \"lastInsertedId\" FROM hdpr.tbl_roster_qa_requests");
		
		return sb.toString();
	}
	
	public static String AddEvaluation(String evalSerialId, String target, String evalId, String employeeId){
		
	StringBuilder sb = new StringBuilder();
	sb.append(" INSERT INTO  hdpr.tbl_roster_target_request_evaluation_mapping(");
	sb.append("\"qm_request_id\",");
	sb.append("\"qm_target\",");
	sb.append("\"qm_eval_id\",");
	sb.append("\"is_current\",\"emp_id\") VALUES");
	sb.append("(");
	sb.append("'" + evalSerialId + "',");
	sb.append("'" + target + "',");
	sb.append("'" + evalId + "','1','" + employeeId + "'); commit;");
	
	
	return sb.toString();
	
	}
	
	public static String UpdateToHistorical(String evalSerialId){
		
		StringBuilder sb = new StringBuilder();
		sb.append("UPDATE hdpr.tbl_roster_target_request_evaluation_mapping ");
		sb.append(" SET is_current='0' WHERE qm_request_id =");
		sb.append("'" + evalSerialId + "'");
		
		
		return sb.toString();
	
	}
}
