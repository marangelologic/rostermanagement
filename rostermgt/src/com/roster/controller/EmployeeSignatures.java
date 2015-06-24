package com.roster.controller;

public class EmployeeSignatures {
	public static String GetAllRoles(String emp_id) {
		return "select role_id,role_name from hdpr.tbl_roster_role_mapping";
	}

	public static String GetEmployeeDetails(String emp_id) {

		return "";
	}

	public static String GetContractualDetails(String empId) {

		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT * FROM hdpr.tbl_roster_contractual_employees WHERE c_emp_id='"
				+ empId + "'");

		return "";
	}

	public static String GetAllRolses() {
		return "select role_id,role_name from hdpr.tbl_roster_role_mapping ORDER BY role_name ASC";
	}

	public static String GetAllResignedEmp() {
		StringBuilder sb = new StringBuilder();

		sb.append("SELECT * from hdpr.tbl_roster_resigned_mapping WHERE is_replaced != '1' ORDER BY resigned_emp_name ASC");
		return sb.toString();
	}

	public static String GetPortalRoles() {
		StringBuilder sb = new StringBuilder();

		sb.append("SELECT * from hdpr.tbl_roster_portal_role ORDER BY portal_role_name ASC");
		return sb.toString();
	}

	public static String UpdateResignedEmployeesStatus(String empid) {
		StringBuilder sb = new StringBuilder();

		sb.append("UPDATE hdpr.tbl_roster_resigned_mapping SET is_replaced='1' WHERE resigned_emp_id='"
				+ empid + "'");
		return sb.toString();
	}

	public static String AddContractualEmployee(String emp_id, String emp_name,
			String email, String start_date, String end_date, String tm_id,
			String reason, String workgroup) {

		StringBuilder sb = new StringBuilder();
		sb.append(" INSERT INTO hdpr.tbl_roster_contractual_employees(");
		sb.append("\"c_emp_id\",\"c_emp_name\",\"c_emp_email\",\"c_emp_start_date\",\"c_emp_end_date\" ");
		sb.append("\"c_tmid\",\"c_reason_for_hiring\",\"c_work_group\") VALUES ");
		sb.append("('" + emp_id + "','" + emp_name + "','" + email + "',");
		sb.append("'" + start_date + "','" + end_date + "','" + tm_id + "',");
		sb.append("'" + reason + "','" + workgroup + "')");

		return sb.toString();
	}

	public static String AddLeaveEmployee(String emp_id, String leave_id,
			String leave_type, String start_date, String end_date) {

		StringBuilder sb = new StringBuilder();

		sb.append(" INSERT INTO hdpr.tbl_roster_emp_leave_mapping(\"emp_id\",\"leave_id\",");
		sb.append("\"leave_start_date\",\"leave_end_date\") VALUES(");
		sb.append("'" + emp_id + "',");
		sb.append("'" + leave_id + "',");
		sb.append("'" + start_date + "',");
		sb.append("'" + end_date + "')");

		return sb.toString();
	}

	public static String GetCurrentStatus(String curr_status, String emp_id) {
		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT a.emp_id, FROM hdpr.tbl_roster_historical_mapping a INNER JOIN");
		sb.append(" hdpr.tbl_roster_employees ON (a.emp_id = b.emp_id) WHERE b.emp_id = '"
				+ emp_id + "'");
		sb.append(" AND emp_status='" + curr_status + "'");
		return sb.toString();
	}

	public static String AddToTableStatus(String currentStatus, String emp_id,
			String sDate, String eDate, String emp_name, String subType) {

		StringBuilder sb = new StringBuilder();

		sb.append("INSERT INTO hdpr.tbl_roster_historical_mapping(\"emp_id\",\"emp_name\",");
		sb.append("\"type\",\"start_date\",\"end_date\",\"is_current\",\"sub_type\") VALUES");
		sb.append("('" + emp_id + "',");
		sb.append("'" + emp_name + "',");
		sb.append("'" + currentStatus + "',");
		sb.append((sDate.equals("")) ? null + "," : ("'" + sDate + "',"));
		sb.append((eDate.equals("")) ? null + "," : ("'" + eDate + "',"));
		sb.append("'1',");
		sb.append("'" + subType + "')");
		return sb.toString();

	}

	public static String AddtoPromotedList(String emp_id, String old_id,
			String sDate, String taleo, String position) {
		StringBuilder sb = new StringBuilder();

		sb.append(" INSERT INTO hdpr.tbl_roster_promoted_mapping(\"promoted_emp_id\",\"old_emp_id\",\"taleo_req_id\",\"start_date\",\"position\"");
		sb.append(") VALUES (");
		sb.append("'" + emp_id + "',");
		sb.append("'" + old_id + "',");
		sb.append("'" + taleo + "',");
		sb.append("'" + sDate + "','" + position + "')");

		return sb.toString();
	}

	public static String GetAttribute(String emp_id) {

		StringBuilder sb = new StringBuilder();
		sb.append("SELECT * FROM hdpr.tbl_roster_historical_mapping WHERE emp_id='"
				+ emp_id + "' AND is_current='1'");

		return sb.toString();
	}

	public static String MakeAttibuteHistorical(String emp_id) {

		StringBuilder sb = new StringBuilder();
		sb.append("UPDATE hdpr.tbl_roster_historical_mapping SET is_current='0' WHERE emp_id='"
				+ emp_id + "'");

		return sb.toString();
	}

	public static String UpdateAttribute(String emp_id, String serial_id,
			String sDate, String eDate) {

		StringBuilder sb = new StringBuilder();
		sb.append("UPDATE hdpr.tbl_roster_historical_mapping SET start_date='"
				+ sDate + "'");
		sb.append(", end_date='" + eDate + "' WHERE emp_id='" + emp_id
				+ "' AND historical_serial_id='" + serial_id + "'");

		return sb.toString();
	}

	public static String UpdateEmployeeInterimStatus(String empId,
			String interimVal) {
		StringBuilder sb = new StringBuilder();

		sb.append(" UPDATE  hdpr.tbl_roster_employees SET is_interim ='"
				+ interimVal + "'");
		sb.append(" WHERE emp_id='" + empId + "'; commit;");
		return sb.toString();

	}

	public static String MakeInterimHistorical(String empId) {
		StringBuilder sb = new StringBuilder();
		sb.append(" UPDATE hdpr.tbl_roster_interim_tm_list SET is_interim='0', "
				+ "end_date = current_date, is_current='0' WHERE emp_id='"
				+ empId + "' AND is_current='1'; commit;");

		return sb.toString();
	}

	public static String InsertInterimTM(String emp_id) {

		StringBuilder sb = new StringBuilder();
		sb.append(" INSERT INTO hdpr.tbl_roster_interim_tm_list(\"emp_id\",\"start_date\",\"is_interim\",\"is_current\") ");
		sb.append(" VALUES ");
		sb.append("('" + emp_id + "',current_date,'1','1')");
		return sb.toString();
	}

	public static String GetAllEmployeeForQM() {
		StringBuilder sb = new StringBuilder();
		sb.append(" SELECT c.tm_employee_id,c.tm_name,a.* FROM hdpr.tbl_roster_employees a INNER JOIN  ");
		sb.append(" hdpr.tbl_roster_emp_tm_mapping b ON b.emp_id = a.emp_id AND is_current_tm='1' ");
		sb.append(" INNER JOIN hdpr.tbl_roster_tm_mapping c ON b.tm_id = c.tm_employee_id");

		return sb.toString();
	}

	public static String UpdateCurrentEmpTmInfo(String empId, String tmId,
			String start_date, String end_date) {

		StringBuilder sb = new StringBuilder();
		sb.append(" UPDATE hdpr.tbl_roster_emp_tm_mapping ");
		sb.append(" set  start_date=");
		sb.append((start_date.equals("")) ? null + ","
				: ("'" + start_date + "',end_date="));
		sb.append((end_date.equals("")) ? null : ("'" + end_date + "'"));
		sb.append(" WHERE emp_id='" + empId + "' AND");
		sb.append(" tm_id='" + tmId + "' AND is_current_tm='1'");
		return sb.toString();
	}

	public static String UpdateCurrentEmpWgInfo(String empId, String wgname,
			String start_date, String end_date) {

		StringBuilder sb = new StringBuilder();
		sb.append(" UPDATE hdpr.tbl_roster_emp_wg_mapping ");
		sb.append(" set  start_date=");
		sb.append((start_date.equals("")) ? null + ","
				: ("'" + start_date + "',end_date="));
		sb.append((end_date.equals("")) ? null : ("'" + end_date + "'"));
		sb.append(" WHERE emp_id='" + empId + "' AND");
		sb.append(" wg_names='" + wgname + "' AND is_current='1'");
		return sb.toString();
	}

	public static String UpdateHistoricalData(String historicalId,
			String sDate, String eDate) {

		StringBuilder sb = new StringBuilder();
		sb.append(" UPDATE hdpr.tbl_roster_emp_tm_mapping SET start_date='");
		sb.append(sDate + "',");
		sb.append(" end_date='" + eDate + "'");
		sb.append("WHERE emp_tm_serial_mapping ='" + historicalId + "'");

		return sb.toString();
	}

	public static String DeleteHistoricalData(String historicalId) {

		StringBuilder sb = new StringBuilder();
		sb.append(" DELETE FROM hdpr.tbl_roster_emp_tm_mapping WHere emp_tm_serial_mapping='"
				+ historicalId + "'");

		return sb.toString();
	}
	
	public static String DeleteWgHistoricalData(String historicalId) {

		StringBuilder sb = new StringBuilder();
		sb.append(" DELETE FROM hdpr.tbl_roster_emp_wg_mapping WHere serial_emp_wg_mapping='"
				+ historicalId + "'");

		return sb.toString();
	}

	public static String GetEmpPsmMapping(String empId) {
		StringBuilder sb = new StringBuilder();

		sb.append(" SELECT * FROM hdpr.tbl_roster_emp_psm_mapping_cc WHERE emp_id='"
				+ empId + "' AND is_current_psm='1'");
		return sb.toString();

	}

	public static String UpdateEmpPsmMapping(String empId, String psmId,
			String psmName, String psmEmail) {

		StringBuilder sb = new StringBuilder();

		sb.append(" Update hdpr.tbl_roster_emp_psm_mapping_cc SET is_current_psm ='0' WHERE emp_id='"
				+ empId + "'; commit;");
		sb.append(" INSERT INTO hdpr.tbl_roster_emp_psm_mapping_cc(\"emp_id\",\"psm_id\",\"psm_name\",\"psm_email\",\"is_current_psm\")VALUES('"
				+ empId + "',");
		sb.append("'" + psmId + "',");
		sb.append("'" + psmName + "',");
		sb.append("'" + psmEmail + "','1');");

		return sb.toString();

	}

	public static String UpdateWgHistoricalData(String historicalId,
			String sDate, String eDate) {

		StringBuilder sb = new StringBuilder();
		sb.append(" UPDATE hdpr.tbl_roster_emp_wg_mapping SET start_date='");
		sb.append(sDate + "',");
		sb.append(" end_date='" + eDate + "'");
		sb.append("WHERE serial_emp_wg_mapping ='" + historicalId + "'");

		return sb.toString();
	}
}
