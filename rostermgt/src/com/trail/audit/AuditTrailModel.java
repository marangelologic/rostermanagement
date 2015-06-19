package com.trail.audit;

public class AuditTrailModel {

	public static String InsertAudits(String emp_id, String emp_name, String date, String page,String action){
		StringBuilder sb = new StringBuilder();
		sb.append("INSERT INTO hdpr.tbl_roster_audit_trail(\"emp_id\",\"emp_name\",\"date\",\"action\",\"page\")");
		sb.append(" VALUES ");
		sb.append("(");
		sb.append("'" + emp_id + "',");
		sb.append("'" + emp_name + "',");
		sb.append("current_date,");
		sb.append("'" + action + "',");
		sb.append("'" + page + "')");
		
		
		return sb.toString();
	}
}
